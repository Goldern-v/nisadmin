import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { appStore } from 'src/stores'
import { ScrollBox } from 'src/components/common'
import MainPage from './components/MainPage'
import RightCon from './components/RightCon'
export interface Props {}

export default function WardLogDetail() {
  return (
    <Wrapper>
      <HeadCon className='healthEducationHeadCon'>
        <BaseBreadcrumb
          data={[{ name: '分析报告', link: '/setting/healthEducationReportList' }, { name: '报告详情', link: '' }]}
        />
        <div className='title'>2019年3月份XXXXXXXX表单分析报告</div>
        <div className='aside'>日期：2019-10-10 11:11</div>
        <div className='tool-con'>
          <Button onClick={() => {}}>导出</Button>
          <Button onClick={() => appStore.history.push('/setting/healthEducationReportList')}>返回</Button>
        </div>
      </HeadCon>
      <LeftPart>
        <MainPage />
      </LeftPart>
      <RightPart>
        <RightCon />
      </RightPart>
    </Wrapper>
  )
}
const Wrapper = styled.div``
const HeadCon = styled.div`
  height: 100px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 20px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }
  .aside {
    font-size: 12px;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 20px;
    button {
      margin-left: 15px;
    }
  }
`

const LeftPart = styled(ScrollBox)`
  position: fixed;
  left: 0;
  top: 150px;
  right: 300px;
  bottom: 0;
  background: #eeeeee;
`
const RightPart = styled.div`
  position: fixed;
  width: 300px;
  top: 150px;
  right: 0;
  bottom: 0;
  background: #ffffff;
  border-left: 1px solid #dedede;
`
