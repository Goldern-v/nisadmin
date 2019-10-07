import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Head from './components/Head'
import Table from './components/Table'
import { scheduleViewModal } from './ScheduleViewModal'

export interface Props {}

export default function ScheduleView() {
  useEffect(() => {
    scheduleViewModal.init()
  }, [])
  return (
    <Wrapper>
      <Head />
      <Table />
    </Wrapper>
  )
}
const Wrapper = styled.div``
