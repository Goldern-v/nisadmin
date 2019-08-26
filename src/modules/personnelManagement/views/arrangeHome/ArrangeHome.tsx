import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import SelectCon from './components/SelectCon'
import ArrangeSheet from './components/arrangeSheet/ArrangeSheet'
export interface Props {}

export default function ArrangeHome() {
  return (
    <Wrapper>
      <SelectCon />
      <ArrangeSheet />
    </Wrapper>
  )
}
const Wrapper = styled.div``
