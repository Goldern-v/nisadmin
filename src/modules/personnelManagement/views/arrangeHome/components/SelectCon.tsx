import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { selectViewModal } from '../viewModal/SelectViewModal'
export interface Props {}

export default function SelectCon() {
  return <Wrapper>排班首页筛选栏</Wrapper>
}
const Wrapper = styled.div`
  height: 50px;
  background: red;
`
