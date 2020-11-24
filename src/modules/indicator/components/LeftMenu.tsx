import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import qs from 'qs'
interface RouteType {
  name: string
  columns: any[]
  dataSource: any[]
}

export interface Props {
  routeList: RouteType[]
}

export default function LeftMenu (props: Props) {
  let history = appStore.history
  let {
    path,
    params: { name }
  } = appStore.match

  let [listInfo, setListInfo] = useState([])

  return (
    <Wrapper>
      {props.routeList.map((item: RouteType) => {
        let isActive: string = name === item.name ? 'active' : ''
        let itemInfo: any = listInfo.find((info: any) => info.name === item.name)
        let isBadge: any = itemInfo && itemInfo.statusColor === '1'
        return (
          <Li
            className={isActive}
            key={item.name}
            onClick={() => {
              history.push('/indicator/' + item.name)
            }}
          >
            {item.name}
            {isBadge && <Badge />}
          </Li>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  background: #fff;
  background-size: 100% auto;
  background-repeat: no-repeat;
`
const Li = styled.div`
  height: 32px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 30px;
  padding: 0 12px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  position: relative;
  &:hover,
  &.active {
    color: #fff;
    background: ${(p) => p.theme.$mtc};
  }
`
const Badge = styled.div`
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ff3b30;
  left: 4px;
  top: 4px;
`
