import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import ArrangeSheet from '../../components/arrangeSheet/ArrangeSheet'
import TopPart from './components/TopPart'
import FlightMenu from './components/FlightMenu'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import { DatePicker, Modal } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'

export interface Props {}

export default observer(function EditArrangePage() {
  useEffect(() => {
    sheetViewModal.init()
  }, [])
  return (
    <Wrapper>
      <TopPart />
      <div className='contain'>
        <div className='left-part'>
          <ArrangeSheet isEdit={true} surplusHeight={172} />
        </div>
        <div className='right-part'>
          <FlightMenu />
        </div>
      </div>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  background: #fff;
  padding-bottom: 15px;
  margin-bottom: -80px;
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
    height: calc(100vh - 172px);
    overflow: auto;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #eaeaea;
    }
    &::-webkit-scrollbar-track {
      border-radius: 50px;
      background-color: #eaeaea;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 50px;
      background-color: #c2c2c2;
    }
  }
`
