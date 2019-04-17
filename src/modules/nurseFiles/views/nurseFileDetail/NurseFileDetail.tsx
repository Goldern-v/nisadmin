import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import TopCon from './components/TopCon'
import LeftMenu from './components/LeftMenu'
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[]
}

const ROUTE_LIST = [
  {
    type: 'baseInfo',
    component: ''
  }
]

export default function NurseFileDetail (props: Props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
    console.log(props, 'props')
  })
  let currentRouteType = props.match.params.type
  let CurrentRoute = ROUTE_LIST.find((item) => item.type === currentRouteType)

  return (
    <Wrapper>
      <TopCon />
      <MainCon>
        <LeftMenuCon>
          <LeftMenu />
        </LeftMenuCon>
        <DetailCon>{CurrentRoute && CurrentRoute.component && <CurrentRoute.component />}</DetailCon>
      </MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const LeftMenuCon = styled.div`
  width: 160px;
  background: red;
`
const MainCon = styled.div`
  flex: 1;
  align-items: stretch;
  display: flex;
`

const DetailCon = styled.div`
  flex: 1;
  overflow: auto;
`
