import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import Null from 'src/components/null/Null'
import LeftMenu from './components/LeftMenu/LeftMenu'
import InfoList from './components/InfoList/InfoList'
import MainDetail from './components/MainDetail/MainDetail'
export interface Props extends RouteComponentProps {}

export default function NoticeView() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <LeftMenu />
      <InfoList />
      <MainDetail />
    </Wrapper>
  )
}
const Wrapper = styled.div``
