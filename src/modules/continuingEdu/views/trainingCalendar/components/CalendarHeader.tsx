import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {CalendarUtilsData} from '../CalendarUtlis'
import { Place } from "src/components/common";
import { Select , Button, DatePicker } from 'antd';
import {TrainingCalendarApi} from '../api/TrainingCalendar'

export default observer(function CalendarHeader() {
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false); // 控制年份下拉打开
  const [AllDeptList, setAllDeptList] = useState([]);
  useEffect(()=>{
    TrainingCalendarApi.getAllDeptList().then((res)=>{
      setAllDeptList(res.data?.deptList)
    })
  },[])

  const handleYearClear = (value:any)=>{

  }
  const handlePanelChange = (value: any) => {
    setyearPickerIsOpen(false)
    CalendarUtilsData.year = value
    CalendarUtilsData.onload()
  }

  const handleChangeMonth = (value:any) => {
    CalendarUtilsData.month = value;
    CalendarUtilsData.onload()
  }
  const handleChangeDept = (value:any) => {
    CalendarUtilsData.deptName = value;
    CalendarUtilsData.deptCode = [];
    let currdept:any = AllDeptList.find((item:any) => item.name == value)
    CalendarUtilsData.deptCode.push(currdept.code);
    CalendarUtilsData.onload()
  }

  const exportCalend = ()=>{
    CalendarUtilsData.export()
  }

  return (
      <Header>
        <Title>培训日历</Title>
        <Place/>
        <span style={{ marginLeft: 15 }}>科室：</span>
        <Select defaultValue={CalendarUtilsData.deptName} style={{ width: 130 }} onChange={handleChangeDept}>
          {AllDeptList.map((item:any)=>{
            return  <Select.Option value={item.name} key={item.code}>{item.name}</Select.Option>
          })}
          
        </Select>
        <span style={{ marginLeft: 15 }}>年度：</span>
        <DatePicker
          style={{ width: 100 }}
          value={CalendarUtilsData.year}
          open={yearPickerIsOpen}
          mode='year'
          className='year-picker'
          placeholder='全部'
          format='YYYY'
          onChange={handleYearClear}
          onOpenChange={ (status: boolean) => {
            setyearPickerIsOpen(status)
          }}
          onPanelChange={handlePanelChange}
        />
        <span style={{ marginLeft: 15 }}>月份：</span>
        <Select defaultValue={CalendarUtilsData.month} style={{ width: 100 }} onChange={handleChangeMonth}>
          {['01','02','03','04','05','06','07','08','09','10','11','12'].map((item:any) => {
            return <Select.Option value={item} key={item} >{item}</Select.Option>
          })}
        </Select>
        <Button style={{ marginLeft: 15 }}  onClick={exportCalend}>导出</Button>
        {/* <Button style={{ marginLeft: 15 }}>打印</Button> */}

      </Header>

  )
})

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;


const Header = styled.div`
  width: 100%;
  height: 60px;
  line-height: 55px;
  padding: 12px 15px;
  font-size: 15px;
  display: flex;
  align-items:center;
  justify-center: center;
  color: #333;
  background-color: #fff;
`;