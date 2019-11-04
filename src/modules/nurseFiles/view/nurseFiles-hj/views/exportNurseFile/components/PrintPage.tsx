import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
interface Props {
  children: React.ReactNode
  pageIndex?: string | number
}

export default function PrintPage(props: Props) {
  return (
    <Wrapper className='nurseFilePrintPage'>
      {props.children}
      {props.pageIndex && <Footer>{props.pageIndex}</Footer>}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 660px;
  height: 962px;
  margin: 20mm 20mm 20mm;
  page-break-after: always;
  /* border: 1px solid; */
  position: relative;
  * {
    color: #000;
  }
  table {
    table-layout: fixed;
  }
`
const Footer = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  bottom: -10mm;
  width: 100%;
`
