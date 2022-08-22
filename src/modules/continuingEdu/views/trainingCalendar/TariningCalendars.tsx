import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {CalendarUtilsData} from './CalendarUtlis'
import { appStore,authStore } from "src/stores/index";
import CalendarHeader from './components/CalendarHeader'
import CalendarTable from './components/CalendarTable'

export default observer(function TariningCalendars() {
  useEffect(()=>{
    CalendarUtilsData.deptCode.push(authStore.user?.deptCode)
    CalendarUtilsData.deptName = CalendarUtilsData.deptName? CalendarUtilsData.deptName : authStore.user?.deptName
    CalendarUtilsData.onload()
    return ()=>{
      CalendarUtilsData.deptCode = []
      CalendarUtilsData.deptName = ""
    }
  },[])
  return (
    <Wrapper>
      <CalendarHeader />
      <CalendarTable />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
