import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import PromotionAppHeader from './components/PromotionAppHeader'

export default observer(function PromotionApplication() {
  // useEffect(()=>{
  //   CalendarUtilsData.onload()
  // },[])
  return (
    <Wrapper>
      {/* 头部 */}
      <PromotionAppHeader></PromotionAppHeader>
      {/* 主体 */}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  padding: 8px 10px;
`