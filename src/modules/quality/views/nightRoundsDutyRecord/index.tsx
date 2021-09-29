import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Calendar from './Calendar'
import { Button, Icon, DatePicker, Select, message, Input } from "antd";
import moment from 'moment'
import api from './api'
import { fileDownload } from "src/utils/file/file";
import { useRef } from "src/types/react";
const { TextArea } = Input;
interface Props {
  type: string
}

export default observer((props: Props) => {
  const { type } = props
  const [current, setCurrent]:any = useState(moment(new Date))
  const [dataArr, setDataArr]: any[] = useState([])
  const [nurseList, setNurseList]: any[] = useState([])
  const [year, setYear] = useState<Number>(+moment().format('YYYY'))
  const [yearList, setYearList] = useState([] as number[])
  const [month, setMonth]  = useState<string>(moment().format('MM'))
  const [monthList, setMonthList] = useState([] as string[])
  const [weekList, setWeekList] = useState([] as string[])
  const [remarks, setRemarks]:any = useState({})
  const [isPublish, setIsPublish]:any = useState('')

  const titleMap: any = {
    '1': '护士长夜查房排班表',
  }
  const getData = async () => {
    const { data } = await api.getDataGZ({
      dutyTime: year + "-" + month
    })
    return data
  }
  // 构造日历数据
  const statusData = () => {
    const monthStr = moment(current).format('YYYY-MM-DD')
    const firstDay = moment(monthStr).startOf("month") // 本月第一天
    const daysInMonth = firstDay.daysInMonth() // 本月有几天
    const day = firstDay.day() // 本月第一天为周几  （周一：1  ；周二：2  …… 周日：0）
    let daysArr: any[] = Array.from({ length: (day + 6) % 7 }, () => {
      return { 'date': undefined }
    }) // 上个月的几天
    for (let i = 0; i < daysInMonth; i++) {
      const firstDayCopy = moment(monthStr).startOf("month")
      const currentDay = firstDayCopy.add(i, 'd')
      daysArr.push({
        'date': currentDay,
        dutyTime: currentDay.format('YYYY-MM-DD'),
        dutyType: type,
        dutyTypeName: titleMap[type],
      })
    }
    const _weeks = Math.ceil(daysArr.length / 7)
    while (daysArr.length < _weeks * 7) {
      daysArr.push({ 'date': undefined })
    }
    setDataArr(daysArr)
    getData().then(data => {
      setRemarks(data?.dutyMonth?.remarks)
      setIsPublish(data?.dutyMonth?.isPublish)
      const temp = daysArr.map((item, index) => {
        if (item.date) {
          const dateStr = moment(item.date).format('YYYY-MM-DD')
          const findObj = data.dutyRosterList.find((i: any) => {
            return i.dutyTime === dateStr
          })
          item = { ...item, ...findObj }
        }
        return item
      })
      setDataArr(temp)
    })
  }

  const updateData = (data: any[]) => {
    setDataArr(data)
  }
  const handlePublish = () => {
    if(isPublish=="0"){
      setIsPublish(1)
      api.setIsPublish({ 
        dutyTime: year + "-" + month,
        isPublish: 1})
        .then(
          message.success('发布成功'),
        )
    }else{
      setIsPublish(0)
      api.setIsPublish({ 
        dutyTime: year + "-" + month,
        isPublish: 0})
        .then(
          message.success('撤销成功')
        )
    }
  }
  const handleSave = async () => {
    const dutyRosterList = dataArr.filter((item: any) => item.date)
    const res = await api.saveData({ 
      dutyTime: year + "-" + month,
      remarks: remarks,
      dutyRosterList })
      .then(
        message.success('保存成功')
      )
    statusData()
  }

  const handleExport = async () => {
    const res = await api.exportData({
      dutyTime: year + "-" + month
    })
    fileDownload(res)
  }
  const handlePrint = () => {
    
  };

  useEffect(() => {
    api.getAllNurse().then(res => {
      setNurseList(res.data)
    })
    let nowYear:number = +moment().format('YYYY')
    setYearList([nowYear-5,nowYear-4,nowYear-3,nowYear-2,nowYear-1,nowYear,nowYear+1,nowYear+2,nowYear+3,nowYear+4,nowYear+5])
    setMonthList(['01','02','03','04','05','06','07','08','09','10','11','12'])
    setWeekList(['星期一','星期二','星期三','星期四','星期五','星期六','星期日'])
  }, [])

  useEffect(() => {
    setCurrent(year + "-" + month)
  }, [year, month])

  useEffect(() => {
    statusData()
  }, [type, current])

  
  return (
    <Wrapper>
      <SearchBar>
        <div className='page-title'>{titleMap[type]? titleMap[type] : "护士长夜查房排班表"}</div>
        <div className='button-group'>
          <span className='label'>年份:</span>
          <Select
            value={year}
            style={{ width: 100 }}
            showSearch
            onChange={(val: any) => setYear(val)}>
            {yearList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item}>{item}</Select.Option>)}
          </Select>
          <span className='label ml-20'>月份:</span>
          <Select
            value={month}
            style={{ width: 100 }}
            showSearch
            onChange={(val: any) => setMonth(val)}>
            {monthList.map((item: any, idx: any) =>
              <Select.Option key={idx} value={item}>{item}</Select.Option>)}
          </Select>
          <Button onClick={() => statusData()}>查询</Button>
          <Button type='primary' onClick={() => handleExport()}>导出</Button>
          <Button onClick={() => handlePrint()}>打印</Button>
        </div>
      </SearchBar>
      <MainWrapper>
        <div className='calendar-title'>
          <span>{moment(current).format('YYYY 年 M 月')} {titleMap[type]}</span>
          <span className='button1'><Button type='primary' onClick={() => handleSave()}>保存</Button></span>
          <span className='button2'><Button type='primary' onClick={() => handlePublish()}>{isPublish==0?"发布":"撤销"}</Button></span>
        </div>
        <div className='weekBody'>{weekList.map((item: any, idx: any) =><div className='week'>{item}</div>)}</div>
        <div className='calendar-wrapper'>
          <Calendar data={dataArr} updateData={updateData} nurseList={nurseList}/>
        </div>
        <div>
        <h2>备注信息：</h2>
          <TextArea 
            autosize={true}
            value={remarks}
            onChange={(e)=>setRemarks(e.target.value)}/>
        </div>
      </MainWrapper>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  padding: 0 20px 20px;
  .ml-20 {
    margin-left: 20px;
  }
  .pb-30 {
    padding-bottom: 30px;
  }
  .weekBody {
    display: flex;
    border-bottom: 1px solid #ccc;
  }
  .week {
    flex: 1;
    height:50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    background: #B9B4FF;
  }
`

const SearchBar = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .page-title{
    font-weight: bold;
    font-size: 22px;
  }
  .button-group{
    display: flex;
    align-items: center;
    button{
      margin-left:10px;
    }
  }
`

const MainWrapper = styled.div`
  background: #fff;
  height: calc(100% - 50px);
  padding: 0 40px 20px;
  overflow: auto;
  .calendar-title{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    position: relative;
    .button1{
      position: absolute;
      right: 75px;
    }
    .button2{
      position: absolute;
      right: 0px;
    }
  }
  .calendar-wrapper{
  }
  h2{
    margin-top:10px;
  }
`