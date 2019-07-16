import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import QualityControlRecordHeader from './components/QualityControlRecordHeader'
import QualityControlRecordTable from './components/QualityControlRecordTable'
export interface Props extends RouteComponentProps {}

export default function QualityControlRecord() {
  return (
    <Wrapper>
      <HeaderCon>
        <QualityControlRecordHeader />
      </HeaderCon>
      <MidCon>
        <QualityControlRecordTable />
      </MidCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
`
const HeaderCon = styled.div`
  /* height: 66px; */
`

const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  height: 0;
  margin: 0 15px 5px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  /* padding: 20px; */
  padding-top: 10px;
`
