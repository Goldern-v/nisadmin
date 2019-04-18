import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'

interface RouteType {
  type: string
  component: any
  name: string
}

export interface Props {
  routeList: RouteType[]
}

const BG = require('../../../images/侧边背景.png')

export default function LeftMenu (props: Props) {
  let history = appStore.history
  let {
    path,
    params: { type }
  } = appStore.match

  return (
    <Wrapper>
      {props.routeList.map((item: RouteType) => {
        let isActive: string = type === item.type ? 'active' : ''
        return (
          <Li
            className={isActive}
            key={item.name}
            onClick={() => {
              history.push('/nurseFileDetail/' + item.type)
            }}
          >
            {item.name}
          </Li>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  background: url(${BG});
  background-size: 100% auto;
  background-repeat: no-repeat;
`
const Li = styled.div`
  height: 32px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 30px;
  padding: 0 16px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  &:hover,
  &.active {
    color: #fff;
    background: ${(p) => p.theme.$mtc};
  }
`
