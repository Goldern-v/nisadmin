import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftMenuPage from 'src/components/LeftMenuPage'
import Demo from './views/demo'
export interface Props {}

export default function PersonnelManagementView() {
  const leftMenuConfig = [
    {
      title: '测试',
      path: '/personnelManagement/demo',
      component: Demo
    }
  ]
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
