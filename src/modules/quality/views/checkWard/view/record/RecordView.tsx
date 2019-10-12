import styled from 'styled-components'
import React, { useEffect } from 'react'
import Head from './components/Head'
import Table from './components/Table'
import { recordViewModal } from './RecordViewModal'

export interface Props {}

export default function RecordView() {
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
