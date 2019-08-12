import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import { DatePicker, Button } from './vendors/antd'
import YearPicker from './components/YearPicker'
import { formatIdCord } from './utils/idCard/idCard'
import FullPageLoading from './components/loading/FullPageLoading'
import { BaseStepBox, BaseStepCon } from './components/BaseStep'
import YearMonthRangePicker from './components/YearMonthRangePicker'
import { numToChinese } from './utils/number/numToChinese'
import YearRangePicker from './components/YearRangePicker'
import AgePicker from './components/AgeRangePicker'
import Watermark from './components/Watermark'
import MultipleDeptSelect from './components/MultipleDeptSelect'
// import XLSX from 'xlsx'
// import { downloadExl } from './excel'

export interface Props extends RouteComponentProps {
  style: any
}

export default function demo(props: Props) {
  // var wb = XLSX.utils.book_new()
  // var ws = XLSX.utils.aoa_to_sheet([['a', 'b'], [1, 2, 3]])
  // XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
  return (
    <Wrapper>
      <MultipleDeptSelect />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 300px;
  position: relative;
  overflow: auto;

  iframe {
    width: 100%;
    height: 600px;
    overflow: hidden;
    display: block;
    pointer-events: none;
  }
`
