import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Head from './components/Head'
import Table from './components/Table'

export interface Props {}

export default function RetiredRetirees() {
  return (
    <Wrapper>
      <Head />
      <Table />
    </Wrapper>
  )
}
const Wrapper = styled.div``
