import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { Select, Spin } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { appStore, authStore } from 'src/stores'
import ReactEcharts from "echarts-for-react";
import $ from 'jquery'
import FollowUpGroupStatisticalServices from './services/FollowUpGroupStatisticalServices'
import moment from 'moment'
import printing from 'printing'

import { data } from 'jquery'
export interface Props { }
const api = new FollowUpGroupStatisticalServices();
export default function FollowUpGroupStatistical(props: any) {
  const [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1,
  })
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const { queryObj, history } = appStore
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [deptName, setDdeptName] = useState(user.deptName)
  const [empNo, setEmpNo]: any = useState('')
  const [date, setDate]: any = useState([moment().startOf("quarter"), moment().endOf("quarter")])
  const [year, setYear]: any = useState(+moment().format('YYYY'))
  const [month, setMonth]: any = useState(moment().format('MM'))
  const [dataTotal, setDataTotal] = useState(0)
  const [cycle, setCycle]: any = useState('')
  const [empList, setEmpList]: any = useState([])
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOK1, setIsOK1] = useState(false)
  const [isOK2, setIsOK2] = useState(false)
  const [isOK3, setIsOK3] = useState(false)
  const [isOK4, setIsOK4] = useState(false)
  const [monthList, setMonthList]:any = useState([])
  const [wardCodeList, setWardCodeList]:any = useState([])
  const [brokenLineList, setBrokenLineList]:any = useState([])
  const [cylindricalList, setCylindricalList]:any = useState([])
  const [cylindricalList2, setCylindricalList2]:any = useState([])
  const H = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//浏览器窗口高度
  const rowHeight = $('.row1').height() || 0
  const rowHeight2 = $('.row2').height() || 0
  const rowWidth = $('.number_statistical').width() || 0
  const rowWidth2 = $('.row2').width() || 0
  let tableHeight = !(queryObj.wardCode&&queryObj.empNo)? H-(H-110)/2.5 : H-(H-110)/2.2
  
  let yearList:number[] = []
  if(yearList.length == 0){
    for(let i = 2019; i <= +moment().format('YYYY') + 3; i++ ){
      yearList.push(i)
    }
  }
  let cycleList:string[] = []
  if(cycleList.length == 0){
    for(let i = 1; i <= 12; i++ ){
      cycleList.push(`${i}个月`)
    }
  }
  //科室列表
  const [deptList, setDeptList] = useState([] as any)

  const onExport = () => {
    let startDate = date[0] ? moment(date[0]).format('YYYY年MM月DD日') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY年MM月DD日') : ''
    let printbox = document.createElement('div')
    printbox.id = "printpage"
    let titlebox = document.createElement('div')
    titlebox.className = 'print-title'
    let title = `${startDate}-${endDate}${queryObj.empNo?"个人随访统计表":queryObj.wardCode?"科室随访统计表":"全院随访统计表"}`
    titlebox.innerText = title
    let charts1 = document.getElementsByTagName('canvas')[0] || document.createElement('div')
    let chartsbox1 = document.createElement('img')
    let charts2 = document.getElementsByTagName('canvas')[1] || document.createElement('div')
    let chartsbox2 = document.createElement('img')
    chartsbox1.id = "canvasImg1"
    chartsbox2.id = "canvasImg2"
    setTimeout(() => {
      chartsbox1.src = charts1.toDataURL()
      chartsbox2.src = charts2.toDataURL()
      printbox.appendChild(titlebox)
      printbox.appendChild(chartsbox1)
      printbox.appendChild(chartsbox2)
      document.body.appendChild(printbox)
      printing(printbox, {
        injectGlobalCss: true,
        css: `
          #printpage{
            padding-top:1cm;
          }
          #canvasImg1{
            width:26cm;
            height: 8cm;
            margin-left: 2cm
          }
          #canvasImg2{
            width:26cm;
            height: 8cm;
            margin-left: 2cm
          }
          .ant-table-wrapper{
            width:17cm;
            margin:0 auto;
          }
          .ant-pagination,.ant-table-pagination{
            display:none;
          }
          .print-title{
            line-height:40px;
            font-weight:700;
            font-size:25px;
            text-align:center;
            margin-bottom:5px;
          }
          @page{
            margin:0mm;
          }
          .ant-spin-nested-loading{
            height:auto;
          }
          .ant-table-body{
            overflow-y:hidden !important;
          }
        `
      })
      document.body.removeChild(printbox)
    }, 500);
  }
 
  const getData = () => {
    setLoading(true)
    setIsOK1(false)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    api
      .queryPageList({
        ...query,
        wardCode: queryObj.wardCode? queryObj.wardCode:deptSelect,
        startDate,
        endDate,
        empNo: queryObj.empNo? queryObj.empNo:empNo
      })
      .then((res) => {
        setTableData(res.data.list)
        setDataTotal(res.data.totalCount)
        setIsOK1(true)
      }, err => setIsOK1(false))
  }

  const getBrokenLineData = () => {
    setLoading(true)
    setIsOK2(false)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    api
      .getNumberStatistics({
        wardCode: queryObj.wardCode? queryObj.wardCode:deptSelect,
        startDate,
        endDate,
        empNo: queryObj.empNo? queryObj.empNo:empNo
      })
      .then((res) => {
        let monthArr = []
        let data:any = []
        let firstMonth = res.data[0].month.substring(res.data[0].month.length-2,res.data[0].month.length)
        for(let i=firstMonth;monthArr.length<12;i++){
          let str = ""
          if(i.toString().length == 1){
            str = `0${i}`
          }else{
            str = `${i}`
          }
          if(i=='12'){
            monthArr.push(str)
            i = 0
          }else{
            monthArr.push(str)
          }
        }
        setMonthList(monthArr)
        res.data.map((item:any,index:any)=>{
          data.push(item.sum)
        })
        setBrokenLineList(data)
        setIsOK2(true)
      }, err => setIsOK2(false))
  }

  const getCylindricalData = () => {
    setLoading(true)
    setIsOK3(false)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    api
      .getSituationStatistics({
        wardCode: queryObj.wardCode? queryObj.wardCode:deptSelect,
        startDate,
        endDate,
        empNo: queryObj.empNo? queryObj.empNo:empNo
      })
      .then((res) => {
        setCylindricalList(res.data)
        setIsOK3(true)
      }, err => setIsOK3(false))
  }

  const getSituationStatisticsData = () => {
    setLoading(true)
    setIsOK4(false)
    let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    api
      .getSituationStatisticsList({
        wardCode: queryObj.wardCode? queryObj.wardCode:deptSelect,
        startDate,
        endDate,
        type: queryObj.wardCode?2:1,
      })
      .then((res) => {
        let data:any = []
        res.data.map((item:any, index:any)=>{
          let str = ''
          if(item.name.includes('护理单元')){
            str=item.name.replace("护理单元","");
          }else if(item.name.includes('病区')){
            str=item.name.replace("病区","");
          }else{
            str=item.name
          }
          data.push({product:str,total:item.total,completeNumber:item.completeNumber,unCompleteNumber:item.unCompleteNumber,lostVisitNumber:item.lostVisitNumber,wardCode:item.wardCode,empNo:item.empNo})
        })
        setCylindricalList2(data)
        setIsOK4(true)
      }, err => setIsOK4(false))
  }
  
  useEffect(() => {
    getData()
    getBrokenLineData()
    getCylindricalData()
    getSituationStatisticsData()
  }, [
    date,
    month,
    year,
    empNo,
    deptSelect,
  ])

  useEffect(() => {
    if(isOK1&&isOK2&&isOK3&&isOK4){
      setLoading(false)
    }
  }, [
    isOK1,
    isOK2,
    isOK3,
    isOK4,
  ])

  useEffect(() => {
    getData()
    getBrokenLineData()
    getCylindricalData()
    getSituationStatisticsData()
  }, [
    queryObj.wardCode,
    queryObj.empNo,
  ])

  useEffect(() => {
    setDeptSelect(user.deptCode)
    getTemplateList(user.deptCode)
    getDeptList();
  }, []);
  
  const getDeptList = () => {
    api.getNursingUnitAll().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }
  const getTemplateList = (val: any) => {
    api.getUserListByWardCode({wardCode:val}).then(res => {
      if (res.data instanceof Array) setEmpList(res.data);
    })
  }
  const onDetail = (record: any) => {
    appStore.history.push(`/nursingFollowUpDetail?patientId=${record.patientId}`)
  }
  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }
  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'key',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: number) => index + 1
    },
    {
      title: '护理单元',
      dataIndex: 'wardName',
      align: 'center',
      width: 250
    },
    {
      title: '床号',
      dataIndex: 'bedNumber',
      align: 'center',
      width: 50
    },
    {
      title: '姓名',
      dataIndex: 'patientName',
      align: 'center',
      width: 70
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      width: 50,
      render(sex: any) {
        return sex === 0 ? "男" : sex === 1 ? "女" : "";
      }
    },
    {
      title: '联系电话',
      dataIndex: 'contactsPhone',
      width: 120,
      align: 'center'
    },
    {
      title: '联系人',
      dataIndex: 'contactsName',
      width: 150,
      align: 'center'
    },
    {
      title: '病种',
      dataIndex: 'visitDiseaseTypeList[0].diseaseTypeName',
      width: 150,
      align: 'center',
      render:( text: string, record: any) => {
        return (
          <div>
            {record.visitDiseaseTypeList.map((item: any, index: number) => {
              if(index == record.visitDiseaseTypeList.length-1){
                return (
                  <span key={index}>{item.diseaseTypeName}</span>
                )
              }
              return (
                <span key={index}>{item.diseaseTypeName}、</span>
              )
            })}
          </div>
        )
      }
    },
    {
      title: '随访周期',
      dataIndex: 'visitPeriods',
      width: 120,
      align: 'center',
      render(visitPeriods: any) {
        return visitPeriods + "个月";
      }
    },
    {
      title: '随访开始时间',
      dataIndex: 'visitStartDate',
      width: 200,
      align: 'center'
    },
    {
      title: '随访结束时间',
      dataIndex: 'visitEndDate',
      width: 200,
      align: 'center'
    },
    {
      title: '随访小组',
      dataIndex: 'visitTeam.teamName',
      width: 120,
      align: 'center'
    },
    {
      title: '最近随访护士',
      dataIndex: 'newestVisitNurse',
      width: 120,
      align: 'center'
    },
    {
      title: '最新随访时间',
      dataIndex: 'newestVisitDate',
      width: 200,
      align: 'center'
    },
    {
      title: '随访方式',
      dataIndex: 'visitType',
      width: 120,
      align: 'center',
      render(visitType: any) {
        return visitType === 1 ? "" : "电话";
      }
    },
    {
      title: '是否失访',
      dataIndex: 'isLostVisit',
      width: 100,
      align: 'center',
      render(isLostVisit: any) {
        return isLostVisit === 0 ? "否" : isLostVisit === 1 ? "是" : "";
      }
    },
    {
      title: '是否死亡',
      dataIndex: 'isDead',
      width: 100,
      align: 'center',
      render(isDead: any) {
        return isDead === 0 ? "否" : isDead === 1 ? "是" : "";
      }
    },
    {
      title: '随访状态',
      dataIndex: 'visitStatus',
      width: 100,
      align: 'center',
      render( visitStatus: any,record: any, index: number) {
        return (
          <div>
            <span className={visitStatus == 1 ? "active" : ""}>{visitStatus == 0 ? "已结束" :  "进行中" }</span>
          </div>
        )
      }
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDetail(record)}>查看</span>
            <span style={{display:record.visitStatus==0 ? "none" : ""}} onClick={() => onDetail(record)}>随访</span>
          </DoCon>
        )
      }
    }
  ]
  //折线图
  const getOption1 = () => {
    let option = {
      grid: {
        height: "65%",
        width: '90%',
        left: '7%',
        top: '22%',
      },
      xAxis: {
        type: 'category',  // 设置为类目轴
        data: monthList  // 横坐标的刻度标签
      },
      series: [{
        data: brokenLineList,
        type: 'line',
        barWidth : 50,//柱图宽度
        itemStyle: {
          normal: {
            label:{
              show: true,
              position: 'top',
            },
            color: '#6aadf7'
          }
        },
      }],
      yAxis: {
        name: '人次',
        nameTextStyle:{
          align: 'right',
        },
        type: 'value',  // 设置为数值轴，该值有series的data传入
        max: Math.ceil(cylindricalList.total/50)*50,
        min: 0,
        splitNumber: 5,
        axisLabel: {
          show: true,
          interval: 'auto',
        },
      },
      
    };
    return option;
  };
  //柱状图
  const getOption2 = () => {
    let option = {
      grid: {
        height: "64%",
        width: '90%',
        left: '7%',
        top: '22%',
      },
      xAxis: {
        type: 'category',  // 设置为类目轴
        data: ['随访总数','随访完成数','随访未完成数','失访数']  // 横坐标的刻度标签
      },
      series: [{
        data: [cylindricalList.total, cylindricalList.completeNumber, cylindricalList.unCompleteNumber, cylindricalList.lostVisitNumber],
        type: 'bar',
        barWidth : '50%',//柱图宽度
        itemStyle: {
          normal: {
            label:{
              show: true,
              position: 'top',
            },
            color: function(data:any) {
              // 在这里取色
              const colorArr = ['#84bdda','#f2c96b','#ec895e','#eb534c'];
              return colorArr [data.dataIndex];
            }
          }
        }
      }],
      yAxis: {
        name: '人次',
        nameTextStyle:{
          align: 'right',
        },
        type: 'value',  // 设置为数值轴，该值有series的data传入
        max: Math.ceil(cylindricalList.total/50)*50,
        min: 0,
        splitNumber: 5,
        axisLabel: {
          show: true,
          interval: 'auto',
        },
      },
      
    };
    return option;
  };
  //柱状图
  const getOption3 = () => {
    let option = {
      dataset: {
        source: cylindricalList2
      },
      grid: {
        height: "64%",
        width: '94%',
        left: '4%',
        top: '22%',
      },
      xAxis: {
        type: 'category',  // 设置为类目轴
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10,
        }
      ],
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              label:{
                show: true,
                position: 'top',
              },
              color: '#84bdda'
            }
          }
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              label:{
                show: true,
                position: 'top',
              },
              color: '#f2c96b'
            }
          }
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              label:{
                show: true,
                position: 'top',
              },
              color: '#ec895e'
            }
          }
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              label:{
                show: true,
                position: 'top',
              },
              color: '#eb534c'
            }
          }
        },
      ],
      yAxis: {
        name: '人次',
        nameTextStyle:{
          align: 'right',
        },
        type: 'value',  // 设置为数值轴，该值有series的data传入
        max: Math.ceil(cylindricalList.total/50)*50,
        min: 0,
        splitNumber: 5,
        axisLabel: {
          show: true,
          interval: 'auto',
        },
      },
      
    };
    return option;
  };

  let onclick:any = {
    'click': (e:any) => {
      console.log(e.data);
      
      if(!queryObj.wardCode){
        appStore.history.push(`/nursingFollowUp/随访统计?wardCode=${e.data.wardCode}`)
      }else{
        appStore.history.push(`/nursingFollowUp/随访统计?wardCode=${queryObj.wardCode}&&empNo=${e.data.empNo}`)
      }
      
    }
  }

  return <Wrapper>
    <PageHeader>
      <PageTitle>{queryObj.empNo?"个人随访统计表":queryObj.wardCode?"科室随访统计表":"全院随访统计表"}</PageTitle>
      <Place />
      {!queryObj.wardCode&&<span className='label'>科室:</span>}
      {!queryObj.wardCode&&<Select
          value={deptSelect}
          style={{ width: 230 }}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val: string) => {
            setDeptSelect(val)
            getTemplateList(val)
            deptList.map((item:any,index:any)=>{
              if(item.code === val){
                setDdeptName(item.name)
              }
            })
          }}>
          <Select.Option value={''}>全部</Select.Option>
          {deptList.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
        </Select>}
        {!queryObj.empNo&&<span className='label'>科室成员:</span>}
        {!queryObj.empNo&&<Select style={{ width: 100 }} value={empNo} onChange={(value: any) => setEmpNo(value)}>
          <Select.Option value=''>全部</Select.Option>
          {empList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.empNo}>
              {item.empName}
            </Select.Option>
          ))}
        </Select>}
        <span className='label'>时间:</span>
        <DatePicker.RangePicker
          allowClear
          style={{ width: 220 }}
          value={date}
          onChange={(value: any) => setDate(value)}
        />
        <Button type="primary" onClick={() => {
          getData()
          getBrokenLineData()
          getCylindricalData()
          getSituationStatisticsData()
        }}>
          查询
        </Button>
        <Button onClick={onExport} loading={loading}>
          打印
        </Button>
        {queryObj.wardCode&&<Button onClick={() => appStore.history.goBack()}>
          返回
        </Button>}
      </PageHeader>
      <MainCon>
      <Spin spinning={loading}>
        <div className="row1" style={{height: !(queryObj.wardCode&&queryObj.empNo)?'calc((100vh - 150px)/3)':'calc((100vh - 150px)/2.5)'}}>
          <div className="number_statistical" style={{marginRight: '10px'}} id="charts1">
            <div className="title">随访数统计</div>
            <ReactEcharts style={{height:`${rowHeight-65}px`,width:`${rowWidth-10}px`}} option={getOption1()}/>
          </div>
          <div className="number_statistical" id="charts2">
            <div className="title">{queryObj.empNo?"随访情况统计":"随访数统计"}</div>
              <ReactEcharts style={{height:`${rowHeight-65}px`,width:`${rowWidth-10}px`}} option={getOption2()} />
          </div>
        </div>
        {!(queryObj.wardCode&&queryObj.empNo)&&<div className="row2">
          <div className="title">{queryObj.wardCode?"科室成员随访情况统计":"各科室随访情况统计"}</div>
          <div className="tip">
            <img src={require(`./assets/blue.png`)} alt="" />随访总数&nbsp;
            <img src={require(`./assets/yellow.png`)} alt="" />随访完成数&nbsp;
            <img src={require(`./assets/powder.png`)} alt="" />随访未完成数&nbsp;
            <img src={require(`./assets/red.png`)} alt="" />失访数&nbsp;
          </div>
          <ReactEcharts style={{height:`${rowHeight2-65}px`,width:`${rowWidth2-10}px`}} onEvents={onclick} option={getOption3()} />
        </div>}
        <div className="row3">
          <BaseTable 
            columns={columns}
            dataSource={tableData}
            pagination={{
              pageSizeOptions: ['10', '20', '30', '40', '50'],
              onShowSizeChange: handlePageSizeChange,
              onChange: handlePageChange,
              total: dataTotal,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSize: query.pageSize,
              current: query.pageIndex
            }}
            surplusHeight={tableHeight}
            surplusWidth={200} />
        </div>
      </Spin>
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
`

const MainCon = styled.div`
  height: calc(100vh - 120px);
  overflow-y: auto;
  .ant-spin-container{
    overflow: hidden;
  }
  .row1{
    display: flex;
    justify-content: space-evenly;
    .number_statistical{
      flex: 1;
      border-radius: 8px;
      border: 1px solid #e0e8e2;
      background: rgb(255, 255, 255);
      box-sizing: border-box;
      overflow-y: auto;
      .title{
        height: 40px;
        line-height: 40px;
        font-size: 25px;
        font-weight: 700;
        margin: 1% 2%;
        border-bottom: 1px solid #cccccc;
      }
    }
  }
  .row2{
    height: calc((100vh - 150px)/3);
    margin-top: 10px;
    border-radius: 8px;
    border: 1px solid #e0e8e2;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    overflow-y: auto;
    position: relative; 
    .title{
      height: 40px;
      line-height: 40px;
      font-size: 25px;
      font-weight: 700;
      margin: 10px 20px;
      border-bottom: 1px solid #cccccc;
    }
    .tip{
      position: absolute;
      top: 10px;
      right: 30px;
      height: 40px;
      line-height: 40px;
    }
  }
  .row3{
    margin-top: 10px;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid #e0e8e2;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    overflow-y: auto;
    .active{
      color: #00A680;
    }
  }
`
