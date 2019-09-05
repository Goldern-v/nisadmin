import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import ArrangeSheet from '../../components/arrangeSheet/ArrangeSheet'
import TopPart from './components/TopPart'
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
      <div className='contain'>
        <div className='left-part'>
          <ArrangeSheet isEdit={true} surplusHeight={205} />
        </div>
        <div className='right-part'>
          <FlightMenu />
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: #fff;
  padding-bottom: 16px;
  margin-bottom: -30px;
  overflow: hidden;
  .contain {
    display: flex;
    padding: 0 20px;
  }
  .left-part {
    /* width: 0; */
    /* flex: 1; */
    max-width: calc(100vw - 220px);
    margin: -15px;
  }
  .right-part {
    width: 250px;
    background: #fff;
    padding-bottom: 20px;
    margin-bottom: -20px;
    overflow: hidden;
  }
  .ant-tabs-content {
    height: calc(100vh - 203px);
  }
`
