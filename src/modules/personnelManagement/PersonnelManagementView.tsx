import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftMenuPage from 'src/components/LeftMenuPage'
import ArrangeHome from './views/arrangeHome/ArrangeHome'
export interface Props {}

export default function PersonnelManagementView() {
  const leftMenuConfig = [
    {
      title: '排班管理',
      path: '/personnelManagement/arrangeHome',
      component: ArrangeHome
    }
  ]
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
