import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {CalendarUtilsData} from '../CalendarUtlis'
import { Spin } from 'antd';
import moment from 'moment'
import CalenderDayMian from './CalendarDayMain'

export default observer(function TariningCalendars() {
  const [weekList,setWeekList] = useState([]as string[]);
  useEffect(()=>{
    setWeekList(['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六',])
  },[])

  
  return (
    <Wrapper>
      <Title>{`${moment(CalendarUtilsData.year).format('YYYY')}年${CalendarUtilsData.month}月${CalendarUtilsData.deptName}培训计划`}</Title>
      {CalendarUtilsData.loading ?  <Spin style={{lineHeight:'400px',height:400}}/> : 
      <Containter>
        <div className="day-header">
          {weekList.map((item: any, idx: any) => <div className='week' key={idx} >{item}</div>)}
        </div>
        <div className='calender-day'>
          <CalenderDayMian  />
        </div>
      </Containter>}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  line-height: 60px;
  background-color: #f2f2f2;
`;
const Containter = styled.div`
  background-color: #fff;
  .day-header{
    display: flex;
    .week {
      flex: 1;
      height:50px;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      background: #4a96bf;
    }
  }
  .calender-day{
    flex:1;
  }
`
