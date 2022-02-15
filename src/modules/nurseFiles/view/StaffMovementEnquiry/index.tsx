import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Head from './components/Head'
import Table from './components/Table'
import { retiredRetireesViewModal } from './StaffMovementEnquiryModal'

export interface Props {}

export default function RetiredRetirees() {
  useEffect(() => {
    retiredRetireesViewModal.init()
  }, [])
  return (
    <Wrapper>
      <Head />
      <Table />
    </Wrapper>
  )
}
const Wrapper = styled.div``
