import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import ArrangeSheet from '../../components/arrangeSheet/ArrangeSheet'
import TopPart from './components/TopPart'
import FlightMenu from './components/FlightMenu'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
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
          <ArrangeSheet isEdit={true} surplusHeight={232} />
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
  .contain {
    display: flex;
    padding: 0 10px;
  }
  .left-part {
    width: 0;
    flex: 1;
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
    height: calc(100vh - 220px);
  }
`
