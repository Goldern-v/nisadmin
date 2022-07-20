import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {CalendarUtilsData} from './CalendarUtlis'

import { Select } from 'antd';
import CalendarHeader from './components/CalendarHeader'
import CalendarTable from './components/CalendarTable'

export default observer(function TariningCalendars() {
  useEffect(()=>{
    CalendarUtilsData.onload()
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
