import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from 'moment';
import {CalendarUtilsData} from '../CalendarUtlis';
import { appStore,authStore } from "src/stores/index";


export default observer(function CalenderDayMian (){

  const [weeks, setWeeks] = useState(5) // 当前月跨多少个周

  // 构造日历排版
  const stateDate = ()=>{
    const current = moment(CalendarUtilsData.year).format('YYYY') + '-' + CalendarUtilsData.month
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
        'date': moment(currentDay).format("DD"),
        list:CalendarUtilsData.tebleData[i+1]
      })
    }
    
    const _weeks = Math.ceil(daysArr.length / 7)
    while (daysArr.length < _weeks * 7) {
      daysArr.push({ 'date': undefined })
    }
    return daysArr
    
  }
  const handleMainOpen = (record:any) => {
    appStore.history.push(`/trainingInfoReview?id=${record.id}`);
  }

  const WeekCmp = (weekData: any[], key: number) => {
    return (
      <WeekWrapper key={key} className='week-wrapper'>
        {weekData.map((item, index) => {
          return (
            item.date ?
            <DayWrapper key={index}>
              <div className="left-day">
                {
                  item.list && 
                  (
                    item.list.map((itemList:any) => {
                      return <div className={item.list.length > 1 ?"border-list" :''} key={itemList.id} onClick={ ()=>{handleMainOpen(itemList)}}>
                      <div className="theme">{itemList.teachingTypeName}</div>
                      <div>开始时间：{itemList.startTime}</div>
                      <div>结束时间：{itemList.endTime}</div>
                      <div>科室：{itemList.deptName}</div>
                      <div>培训主题：{itemList.title}</div>
                      <div>主讲：{itemList.teachers}</div>
                      <div>培训人数：{itemList.personCount}人</div>
                      <div>培训地址：{itemList.address}</div>
                    </div>
                    })
                  )
                }
              </div>
              <div className="right-day">{item.date}</div>
            </DayWrapper> : <DayWrapper key={index}></DayWrapper>
          )
        })}
      </WeekWrapper>
    )
  }

 

  const getWeeks = () => {
    let arr = stateDate()
    const week = arr.length ?  Math.ceil(arr.length / 7) : 5
    const fakeArr = Array.from({ length:week})
    return (
      <React.Fragment>
        {fakeArr.map((item, index) => {
          return WeekCmp(arr.slice(index * 7, index * 7 + 7), index)
        })}
      </React.Fragment>
    )
  }


  return (
    <Wrapper>
      {getWeeks()}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height:100%;
`
const WeekWrapper = styled.div`
  display: flex;
`
const DayWrapper = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  height: 141px;
  display: flex;
  position: relative;
  .left-day{
    height:100%;
    width: 100%;
    padding-left: 6px;
    flex:none;
    text-align: left;
    flex-wrap: wrap;
    font-size: 9px;
    overflow-y:auto;
    overflow-x:hidden;
   
    ::-webkit-scrollbar {
      display: none;
    }
    .border-list{
     margin-bottom: 15px;
      :hover{
        background-color: #fef3b7;
      }
    }
    .theme{
      color: #00f;
      text-align: center;
    }
    .date-dept{
      text-align: center;
    }
  }
  .right-day{
    position: absolute;
    right: 0;
    width:9% !important ;
    flex:none;
    font-weight: bold;
    align-items: flex-start;
  }
  
`