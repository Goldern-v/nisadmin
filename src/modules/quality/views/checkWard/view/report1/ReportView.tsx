import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Head from './components/Head'
import Table from './components/Table'
import { reportViewModal } from './ReportViewModal'

export interface Props {}

export default function ReportView() {
  useEffect(() => {
    reportViewModal.init()
  }, [])
  return (
    <Wrapper>
      <Head />
      <Table />
    </Wrapper>
  )
}
const Wrapper = styled.div``
