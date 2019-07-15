import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import TrainingApi from '../api/TrainingApi'
import { appStore } from 'src/stores'
const BG = require('../images/侧边背景.png')
interface RouteType {
  type: string
  component: any
  name: string
}

export interface Props {
  routeList: RouteType[]
}

export default function leftList(props: Props) {
  const { routeList } = props
  let history = appStore.history
  let {
    path,
    params: { type }
  } = appStore.match
  const [listData, useListData]: any = useState([])
  useEffect(() => {
    useListData(routeList)
  }, [])
  // 列表组件
  const LeftDom = listData.map((item: RouteType) => {
    let isActive: string = type === item.type ? 'active' : ''
    return (
      <Li
        className={isActive}
        onClick={() => {
          history.push('/trainingExamination/' + item.type)
        }}
      >
        {item.name}
      </Li>
    )
  })
  return <Con>{LeftDom}</Con>
}

const Con = styled.div`
  height: 100%;
  width: 100%;
  background: url(${BG});
  background-size: 100% 100%;
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
  position: relative;
  &:hover,
  &.active {
    color: #fff;
    background: ${(p) => p.theme.$mtc};
  }
`
