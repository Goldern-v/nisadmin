import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Permission from './Permission'
import Format from './Format'
interface Props {
  row?: any
  getTableData?: any
  needAudit: boolean
}

export default function AuditText(props: Props) {
  let { row, getTableData } = props



  return props.needAudit ? (
    <Wrapper onClick={() => Format(row, getTableData)}>审核</Wrapper>
  ) : (
      <Wrapper onClick={() => Format(row, getTableData)}>查看</Wrapper>
    )
}
const Wrapper = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
  cursor: pointer;
`
