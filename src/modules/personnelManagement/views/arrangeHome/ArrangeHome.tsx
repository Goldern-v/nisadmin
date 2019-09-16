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
  return (
    <Wrapper>
      <SelectCon />
      <ArrangeSheet isEdit={false} surplusHeight={155} />
    </Wrapper>
  )
})
const Wrapper = styled.div``
