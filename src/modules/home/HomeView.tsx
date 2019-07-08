import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import emitter from 'src/libs/ev'
import { authStore } from '../../stores/index'
import { observer } from 'mobx-react-lite'
//引入组件
import QuickButton from './components/QuickButton'//页面快捷键
import ExamineTable from './components/ExamineTable'//待我审核
import NoticeTable from './components/NoticeTable'//通知公告
import ContinuingEducation from './components/ContinuingEducation'//继续教育
import NursingSystem from './components/NursingSystem'//护理制度



export default observer(function HomeView () {
  return (
    <Wrapper>
      <LeftContent>
        <QuickButton/>
        <TableContent>
          <ExamineTable/>
          <NoticeTable/>
        </TableContent>
      </LeftContent>
      <RightContent>
        <ContinuingEducation/>
        <NursingSystem/>
      </RightContent>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  padding:0 10px;
  display:flex;
  background-color: rgba(240,240,240,1);
  box-sizing: border-box;
`
const LeftContent = styled.div`
  margin-top:20px;
  margin-bottom:32px;
  width:calc(100vw - 360px);
  height:calc(100vh - 102px);
`

const RightContent = styled.div`
  margin-top:21px;
  margin-bottom:19px;
  margin-left:25px;
  width:335px;
  height:calc(100vh - 90px);
`
const TableContent = styled.div`
  width:100%;
  height:calc(100vh - 232px);
  display:flex;
  flex-direction: column;
`
