import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import { RouteComponentProps } from 'src/components/RouterView'
import HorizontalMenu from './components/HorizontalMenu/HorizontalMenu'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[]
}

export default function HorizontalMenuLayout (props: Props) {
  const [count, setCount] = useState(0)
  const { payload } = props
  useEffect(() => {
    console.log(count, setCount)
    console.log(props, 'props')
  })
  let currentRouteType = props.match.params.type
  let currentRouteList: any[] = _.flattenDeep(props.payload.map((item) => (item.childrens ? item.childrens : item)))
  console.log(currentRouteList, 'currentRouteList')
  let CurrentRouteComponent = currentRouteList.find((item) => item.type === currentRouteType).component || null

  return (
    <Wrapper>
      <Header />
      <NavBar {...props} />
      <HorizontalMenu data={payload} />
      <CurrentRouteComponent />
    </Wrapper>
  )
}
const Wrapper = styled.div``
