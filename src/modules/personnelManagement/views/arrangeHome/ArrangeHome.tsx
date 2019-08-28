import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import SelectCon from './components/SelectCon'
import ArrangeSheet from './components/arrangeSheet/ArrangeSheet'
import { arrangeService } from './services/ArrangeService'
import { sheetViewModal } from './viewModal/SheetViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
export interface Props {}

export default observer(function ArrangeHome() {
  useEffect(() => {
    sheetViewModal.init()
  }, [])
  return (
    <Wrapper>
      <SelectCon />
      <ArrangeSheet />
    </Wrapper>
  )
})
const Wrapper = styled.div``
