import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Head from './components/Head'
import Table from './components/Table'
import { recordViewModal } from './RecordViewModal'

export interface Props {}

export default function RetiredRetirees() {
  useEffect(() => {
    recordViewModal.init()
  }, [])
  return (
    <Wrapper>
      <Head />
      <Table />
    </Wrapper>
  )
}
const Wrapper = styled.div``
