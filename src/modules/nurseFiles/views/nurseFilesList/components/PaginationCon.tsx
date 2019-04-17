import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}
import { Pagination } from 'antd'

function onShowSizeChange (current: number, pageSize: number) {
  console.log(current, pageSize)
}
export default function PaginationCon () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} showQuickJumper />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  clear: both;
  text-align: right;
  padding-top: 10px;
`
