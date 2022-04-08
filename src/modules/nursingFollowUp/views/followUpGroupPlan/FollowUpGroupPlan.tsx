import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, Place } from 'src/components/common'
import { Select, Spin, message } from 'src/vendors/antd'
import FollowUpGroupPlanServices from './services/FollowUpGroupPlanServices'
import moment from 'moment'
import { appStore, authStore } from 'src/stores'
import $ from 'jquery'

export interface Props { }
const api = new FollowUpGroupPlanServices();
export default function FollowUpGroupPlan(props: any) {

  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [deptName, setDdeptName] = useState(user.deptName)
  const [taskStatus, setTaskStatus]: any = useState('')
  const [year, setYear]: any = useState(+moment().format('YYYY'))
  const [month, setMonth]: any = useState(moment().format('MM'))
  const [periods, setPeriods]: any = useState('')
  const [loading, setLoading] = useState(false)
  const [rowList, setRowList]: any = useState([])
  const [selectList, setSelectList]: any = useState([])
  const [x, setX]: any = useState()
  const [y, setY]: any = useState()
  const [isShow, setIsShow]: any = useState(false)
  const [patientId, setPatientId]: any = useState('')
  const itemWidth = $('.calendar-body-item').width() || 0
  let nowMonth = moment().format('MM')
  let today = moment().format('DD')
  let yearList:number[] = []
  if(yearList.length == 0){
    for(let i = 2019; i <= +moment().format('YYYY') + 3; i++ ){
      yearList.push(i)
    }
  }
  let monthList:string[] = ['01','02','03','04','05','06','07','08','09','10','11','12']
  let cycleList:any = []
  if(cycleList.length == 0){
    for(let i = 1; i <= 12; i++ ){
      cycleList.push({name:`${i}个月`,value:i})
    }
  }

  //一年十二个月总天数
  let month_day_list:number[] = []
  //该月第一天是星期几
  let firstday = 0
  let firstday1 = 0
  //日历行数
  let tr_str = 0
  //该月天数
  let nowMonthDay = 0
  //处理日历数据
  const getCalendarData = (dataList:any) => {
    //考虑到闰年问题会影响二月份的天数
    let Feb_day:number
    if(year%100==0){
      Feb_day=28+(year%400==0?1:0)
    }else{
      Feb_day=28+(year%4==0?1:0)
    }
    month_day_list = [31,28,31,30,31,30,31,31,30,31,30,31]
    month_day_list[1] = Feb_day
    nowMonthDay = month_day_list[month-1]
    firstday = moment(`${year}-${month}-01`).day()  //1 2 3 4 5 6 0
    firstday1 = moment(`${year}-${month}-01`).day() == 0 ? 7 : moment(`${year}-${month}-01`).day()
    tr_str=Math.ceil((nowMonthDay + firstday1 -1)/7);
    let arr:any = []
    let date = 1
    for(let i=0;i<tr_str;i++){
      arr.push([])
      for(let j=0;j<7;j++){
        arr[i] = arr[i] || []
        if(i==0 && firstday1!= 0 && j< firstday1-1 || date>nowMonthDay){
          arr[i].push({date:''})
        }else{
          let dateStr = ''
          if(date && date.toString().length == 1){
            dateStr = `0${date}`
          }else{
            dateStr = `${date}`
          }
          dataList.map((data:any,dataIdx:any)=>{
            let dataDate = data.visitDate.substring(data.visitDate.length-2,data.visitDate.length)
            if (dataDate == date){
              arr[i].push({date:dateStr,planList:data.planList})
            }
          })
          date++
        }
      }
    }
    setRowList(arr)
  }
  
  
  //科室列表
  const [deptList, setDeptList] = useState([] as any)
  //导出
  const onExport = (record: any) => {
    message.error("未开发！请联系开发人员");
  }
 
  const getData = () => {
    setLoading(true)
    api
      .queryNursePageList({
        wardCode: deptSelect,
        status: taskStatus,
        year: year,
        month: month,
        periods: periods,
      })
      .then((res) => {
        getCalendarData(res.data)
        setLoading(false)
      }, err => setLoading(false))
  }
  
  const openSelectBox = (e:any,col:any) => {
    setPatientId(col.patientId)
    setSelectList(col.visitFormList)
    let domReact = e.currentTarget.getBoundingClientRect()
    const selectw = Math.ceil(domReact.left) - 220 - ((250-Math.ceil(itemWidth))/2)
    const selectH = Math.ceil(domReact.top) - 50 + Math.ceil(domReact.height)
    setX(selectw)
    setY(selectH)
    if(isShow){
      setIsShow(false)
    }else{
      setIsShow(true)
    }
  }

  const closeSelect = (e:any) => {
    let targetClass = [...e.target.classList]
    if (!targetClass.includes("selectBox")&&!targetClass.includes("angle")) {
      setIsShow(false)
    }
  }

  const openFormPage = (item:any) => {
    appStore.history.push(`/nursingFollowUpDetail?patientId=${patientId}&selectedMenuKey=${item.selectedMenuKey}`)
  }

  useEffect(() => {
    getData()
  }, [
    taskStatus,
    periods,
    month,
    year,
    deptSelect,
  ])


  useEffect(() => {
    setDeptSelect(user.deptCode)
    getDeptList();
  }, []);
  const getDeptList = () => {
    api.getNursingUnitAll().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }
 
  return <Wrapper onClickCapture={closeSelect}>
    <PageHeader>
      <Place />
      <span className='label'>护理单元:</span>
      <Select
        value={deptSelect}
        style={{ width: 230 }}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(val: string) => {
          setDeptSelect(val)
          deptList.map((item:any,index:any)=>{
            if(item.code === val){
              setDdeptName(item.name)
            }
          })
        }}>
        {/* <Select.Option value={''}>全部</Select.Option> */}
        {deptList.map((item: any, idx: any) =>
          <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
      </Select>
      <span className='label'>任务状态:</span>
      <Select style={{ width: 120 }} value={taskStatus} onChange={(value: any) => setTaskStatus(value)}>
        <Select.Option value=''>全部</Select.Option>
        <Select.Option value='1'>已完成</Select.Option>
        <Select.Option value='2'>未完成</Select.Option>
        <Select.Option value='3'>失访、死亡</Select.Option>
      </Select>
      <span className='label'>时间:</span>
      <Select style={{ width: 80 }} value={year} onChange={(value: any) => setYear(value)}>
        {yearList.map((item: any, index: number) => (
          <Select.Option key={index} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Select style={{ width: 80, marginLeft: '5px' }} value={month} onChange={(value: any) => setMonth(value)}>
        {monthList.map((item: any, index: number) => (
          <Select.Option key={index} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <span className='label'>随访周期:</span>
      <Select style={{ width: 100 }} value={periods} onChange={(value: any) => setPeriods(value)}>
        <Select.Option value=''>全部</Select.Option>
        {cycleList.map((item: any, index: number) => (
          <Select.Option key={index} value={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Button type="primary" onClick={() => getData()}>
        查询
      </Button>
      <Button onClick={onExport}>
        导出
      </Button>
    </PageHeader>
    <MainCon>
      <Spin spinning={loading}>
        <div className="text-title">{deptName}-{month}月份护理随访计划</div>
        <div className="calendar-box">
          <div className="calendar-title">
            <div className="calendar-title-item">星期一</div>
            <div className="calendar-title-item">星期二</div>
            <div className="calendar-title-item">星期三</div>
            <div className="calendar-title-item">星期四</div>
            <div className="calendar-title-item">星期五</div>
            <div className="calendar-title-item">星期六</div>
            <div className="calendar-title-item" style={{borderRight:'none'}}>星期日</div>
          </div>
          <div className="calendar-body">
            {
              rowList.map((item:any,index:any)=>{
                return(
                  <div className="calendar-body-row" id={`${index}`}>
                    {item.map((ul:any,ulIdx:any)=>{
                      return  <div className="calendar-body-item">
                        <div className={nowMonth==month?ul.date==today?"numBg nowday":"numBg":"numBg"}><div className="num">{ul.date}</div></div>
                        {ul.planList&&<div className="msg-list">
                          {ul.planList.map((col:any,colIdx:any)=>{
                            return(<div onClick={(e:any)=>openSelectBox(e,col)} className={col.status == 3?"msg-list-item miss":col.status == 1?"msg-list-item no":"msg-list-item"}>
                              <div className="msg-list-col">
                                <img src={require(`../../assets/${col.status == 3?"miss":col.status == 1?"yes":"no"}.png`)} alt="" />
                                <span>{col.patientName}</span>
                                <span>{col.patientId}</span>
                                <span>({col.periods}月)</span>
                              </div>
                            </div>)
                          })}
                        </div>}
                      </div>
                    })}
                  </div>
                )
              })
            }
          </div>
        </div>
        </Spin>
        <div className='selectBox' style={{ display:isShow?"":"none", top: `${y}px`, left: `${x}px` }}>
          {selectList.map((item:any,index:any)=>{
            return(<div className='selectRow'>
              <p onClick={()=>openFormPage(item)}>{item.formName}</p>
            </div>)
          })}
          <div className='angle'></div>
        </div>
    </MainCon>
  </Wrapper>
}
const Wrapper = styled.div`
  height: calc(100vh - 170px);
  position: relative;
  width: calc(100vw - 240px);
  margin-left:20px;
  .ml-20 {
    margin-left: 20px;
  }
  .selectBox{
    position: absolute;
    border-radius: 7px;
    border-bottom: 1px solid #cccccc;
    width: 250px;
    padding: 5px 0 ;
    background-color: #fef8b7;
    .selectRow{
      height: 20px;
      line-height: 20px;
      padding: 0px 10px;
      margin-top: 5px;
      p{
        color: #4463ee;
        cursor: pointer;
      }
      p:hover{
        text-decoration: underline;
      }
    }
    .angle{
      width:0;
      height:0;
      border: 12px solid transparent;
	    border-bottom-color: #fef8b7;
      position: absolute;
      top: -24px;
      left: 45%;
    }
  }
`

const MainCon = styled.div`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px 0px;
  border-radius: 6px;
  background: rgb(255, 255, 255);
  padding: 0 5px 20px 5px;
  box-sizing: border-box;
  height: calc(100vh - 120px);
  overflow-y: auto;
  .text-title{
    width: 98%;
    margin: 0 auto;
    font-size: 24px;
    padding: 10px 0;
    border-bottom: 1px solid #c9c9ca;
    text-align: center;
    font-weight: bold;
    color: #000;
  }
  .calendar-box{
    margin-top: 20px;
    min-width: 1370px;
    overflow-x: auto;
    .calendar-title{
      height: 30px;
      margin: 0 5px;
      background-color: #bce3d8;
      border: 1px solid #c9c9ca;
      border-bottom: none;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      justify-content: space-evenly;
      .calendar-title-item{
        flex: 1;
        line-height: 30px;
        text-align: center;
        font-weight: 700;
        border-right: 1px solid #c9c9ca;
      }
    }
    .calendar-body{
      border-left: 1px solid #c9c9ca;
      border-bottom: 1px solid #c9c9ca;
      margin: 0 5px 30px 5px;
      .calendar-body-row{
        display: flex;
        justify-content: space-evenly;
        .calendar-body-item{
          flex: 1;
          height: 128px;
          min-width: 180px;
          line-height: 30px;
          text-align: center;
          border-top: 1px solid #c9c9ca;
          border-right: 1px solid #c9c9ca;
          .numBg{
            height: 30px;
            position: relative;
            .num{
              width: 30px;
              height: 30px;
              font-weight: 700;
              font-size: 14px;
              line-height: 30px;
              text-align: center;
              position: absolute;
              right: 10px;
            }
          }
          .nowday{
            background: #fae882;
          }
          .msg-list{
            margin-right: 2px;
            height: 96px;
            background: #fff;
            overflow-y: auto;
            overflow-x: hidden;
            .msg-list-item{
              height: 30px;
              margin-top: 2px;
              border-left: 4px solid #00A680;
              background: #E5FAF1;
              cursor: pointer;
              .msg-list-col{
                height: 30px;
                display: flex;
                justify-content: space-between; 
                align-items: center;
                margin-right: 10px;
                img{
                  margin-left: 10px;
                  width: 16px;
                  height: 16px;
                }
              }
            }
            .msg-list-item:first-of-type {
              margin-top: 0;
            }
            .no{
              background: #F8F8F8;
              color: #CCCCCC;
              border-left: 4px solid #CCCCCC;
            }
            .miss{
              background: #FBE6E6;
              border-left: 4px solid #D30002;
            }
          }
          .msg-list::-webkit-scrollbar {
            width: 2px;    
          }
          .msg-list::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #cccccc;
          }
          .msg-list::-webkit-scrollbar-track {
            border-radius: 0;
            background: #fff;
          }
        }
      }
    }
  }
`
