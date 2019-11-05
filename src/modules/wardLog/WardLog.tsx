import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftMenuPage from 'src/components/LeftMenuPage'
import MyCreateList from './page/MyCreateList'
import WardLogDetail from './page/wardLogDetail/WardLogDetail'
export interface Props {}

export default function WardLog() {
  const leftMenuConfig = [
    {
      title: '我创建的',
      path: '/wardLog/myCreateList',
      component: MyCreateList
    }
  ]
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
