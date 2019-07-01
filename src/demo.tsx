import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select } from 'antd'

const { Option } = Select
export interface Props extends RouteComponentProps {}

export default function demo() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <Select style={{ width: 200 }} placeholder='aaa' />
      <Select value={undefined} showSearch style={{ width: '72%' }} placeholder='选择类型' />
    </Wrapper>
  )
}
const Wrapper = styled.div``
