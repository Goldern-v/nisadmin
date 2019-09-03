import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import ArrangeSheet from '../../components/arrangeSheet/ArrangeSheet'
import TopPart from './components/TopPart'
import ExpectSetting from './components/ExpectSetting'
import FlightMenu from './components/FlightMenu'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import { DatePicker, Modal } from 'antd'

export interface Props {}

export default function EditArrangePage() {
  useEffect(() => {
    sheetViewModal.init()
  }, [])
  return (
    <Wrapper>
      <TopPart />
      <ExpectSetting />
      <div className='contain'>
        <div className='left-part'>
          <ArrangeSheet isEdit={true} surplusHeight={250} />
        </div>
        <div className='right-part'>
          <FlightMenu />
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .contain {
    display: flex;
    padding: 0 10px;
  }
  .left-part {
    width: 0;
    flex: 1;
  }
  .right-part {
    width: 250px;
  }
`
