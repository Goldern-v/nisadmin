import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Calendar from './Calendar'
import { Button, Icon, DatePicker } from "antd";
import moment from 'moment'
import api from './api'
import { fileDownload } from "src/utils/file/file";

interface Props {
  type: string
}

export default observer((props: Props) => {
  const { type } = props
  const [current, setCurrent] = useState(moment(new Date))
  const [dataArr, setDataArr]: any[] = useState([])
  const [nurseList, setNurseList]: any[] = useState([])
  const titleMap: any = {
    '1': '护士长值班表',
    '2': '门诊夜诊护士值班表',
    '3': '产科二值值班表',
    '4': '儿科二值值班表',
  }

  const getData = async () => {
    const timeStr = moment(current).format('YYYY-MM-DD')
    const { data } = await api.getData({
      dutyType: props.type,
      dutyTime: timeStr
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
      const temp = daysArr.map((item, index) => {
        if (item.date) {
          const dateStr = moment(item.date).format('YYYY-MM-DD')
          const findObj = data.find((i: any) => {
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

  const handleSave = async () => {
    const dutyRosterList = dataArr.filter((item: any) => item.date)
    const res = await api.saveData({ dutyRosterList })
    statusData()
  }

  const handleExport = async () => {
    const res = await api.exportData({
      dutyType: type,
      dutyTime: current.format('YYYY-MM-DD'),
    })
    fileDownload(res)
  }

  useEffect(() => {
    api.getAllNurse().then(res => {
      setNurseList(res.data)
    })
  }, [])

  useEffect(() => {
    statusData()
  }, [type, current])

  return (
    <Wrapper>
      <SearchBar>
        <div className='page-title'>{titleMap[type]}</div>
        <div className='button-group'>
          <DatePicker.MonthPicker value={current} onChange={(val) => setCurrent(val)}/>
          <Button onClick={() => statusData()}>查询</Button>
          <Button type='primary' onClick={() => handleExport()}>导出</Button>
        </div>
      </SearchBar>
      <MainWrapper>
        <div className='calendar-title'>
          <span>{moment(current).format('YYYY 年 M 月')} {titleMap[type]}</span>
          <Button type='primary' onClick={() => handleSave()}>保存</Button>
        </div>
        <div className='calendar-wrapper'>
          <Calendar data={dataArr} updateData={updateData} nurseList={nurseList}/>
        </div>
      </MainWrapper>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  padding: 0 20px 20px;
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
  .calendar-title{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    position: relative;
    button{
      position: absolute;
      right: 0px;
    }
  }
  .calendar-wrapper{
    height: calc(100% - 60px);
  }
`