import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button } from 'src/vendors/antd'

export interface BtnList {
  name: string
  onClick: () => void
}

interface Props {
  btnList: BtnList[]
}
export default function FooterBtnCon(props: Props) {
  return (
    <Wrapper>
      {props.btnList.map((item, idx) => (
        <Button onClick={item.onClick} key={idx}>{item.name}</Button>
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: absolute;
  left: 15px;
  bottom: 12px;
  button {
    margin-right: 10px;
  }
`
