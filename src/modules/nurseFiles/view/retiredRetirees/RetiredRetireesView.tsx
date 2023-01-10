import styled from 'styled-components'
import React, { useEffect } from 'react'
import Head from './components/Head'
import Table from './components/Table'
import { retiredRetireesViewModal } from './RetiredRetireesViewModal'
import { appStore } from 'src/stores'
import HeadDghm from './components/HeadDghm'

export interface Props {}

export default function RetiredRetirees() {
  useEffect(() => {
    retiredRetireesViewModal.init()
  }, [])
  return (
    <Wrapper>
      {
        'dghm' === appStore.HOSPITAL_ID ?
        <HeadDghm />
        :
        <Head />
      }
      <Table />
    </Wrapper>
  )
}
const Wrapper = styled.div``
