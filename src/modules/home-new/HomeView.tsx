import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import emitter from 'src/libs/ev'
import { authStore } from '../../stores/index'
import { observer } from 'mobx-react-lite'
//连接仓库


export default observer(function HomeView () {
  return (
    <Wrapper>
      <LeftContent></LeftContent>
      <RightContent></RightContent>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  padding:0 10px;
  display:flex;
  background-color: rgba(240,240,240,1);
  flex-direction: row;
  box-sizing: border-box;
  /* flex-wrap: wrap; */
`
const LeftContent = styled.div`
  margin-top:20px;
  margin-bottom:32px;
  width:calc(100vw - 360px);
  height:calc(100vh - 102px);
  background-color:blue;
`

const RightContent = styled.div`
  margin-top:18px;
  margin-bottom:32px;
  margin-left:25px;
  width:335px;
  height:calc(100vh - 100px);
  background-color:red;
`
