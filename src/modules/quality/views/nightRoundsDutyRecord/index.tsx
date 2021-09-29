import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Calendar from './Calendar'
import { Button, Icon, DatePicker, Select } from "antd";
import moment from 'moment'
import api from './api'
import { fileDownload } from "src/utils/file/file";
import AddModal from './Calendar/AddModal'
import printing from "printing";
import { useRef } from "src/types/react";

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
  const [month, setMonth]  = useState<String>("01")
  const [monthList, setMonthList] = useState([] as string[])
  const [isAdd, setIsAdd] = useState(false)
  const [editVisible, setEditVisible] = useState(false)

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

  const handleSave = async () => {
    const dutyRosterList = dataArr.filter((item: any) => item.date)
    const res = await api.saveData({ dutyRosterList })
    statusData()
  }
  const handleAddNew = (record: any) => {
    setIsAdd(true)
    setEditVisible(true)
  }

  const handleExport = async () => {
    const res = await api.exportData({
      dutyTime: year + "-" + month
    })
    fileDownload(res)
  }
  const pageRef: any = useRef<HTMLElement>();
  const handlePrint = (isPrint: boolean) => {
    let printFun = isPrint ? printing : printing.preview;
    // let title = document.title
    // document.title = report.reportName
    printFun(pageRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
          .ant-btn {
            display: none;
          }
          .print-page {
            box-shadow: none;
            -webkit-print-color-adjust: exact;
            margin: 0 auto;
          }
          .page-title {
            min-height: 20px;
            padding: 0px 30px 20px;
          }
          .page-title .title {
            text-align: center;
            margin-right: 0;
          }
          table, img {
            page-break-inside: avoid;
          }
          pre {
          page-break-after: avoid;
          }
          * {
            color: #000 !important;
          }
          .footer-title {
            min-height: 0;
            margin-bottom: 0;
          }
      `
    });
  };

  useEffect(() => {
    api.getAllNurse().then(res => {
      setNurseList(res.data)
    })
    let nowYear:number = +moment().format('YYYY')
    setYearList([nowYear-5,nowYear-4,nowYear-3,nowYear-2,nowYear-1,nowYear,nowYear+1,nowYear+2,nowYear+3,nowYear+4,nowYear+5])
    setMonthList(['01','02','03','04','05','06','07','08','09','10','11','12'])
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
          <Button type='primary' onClick={handleAddNew}>新建</Button>
          <Button type='primary' onClick={() => handleExport()}>导出</Button>
          <Button onClick={() => handlePrint(true)}>打印</Button>
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
      <AddModal
        visible={editVisible}
        isAdd={isAdd}
        type={status}
        onOk={() => {
          getData()
          setEditVisible(false)
        }}
        onCancel={() => {
          getData()
          setEditVisible(false)
        }}/>  
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  padding: 0 20px 20px;
  .ml-20 {
    margin-left: 20px;
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