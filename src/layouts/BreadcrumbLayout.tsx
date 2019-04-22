import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import RouterView, { RouteComponentProps } from 'src/components/RouterView'
import BreadcrumbBox from './components/BreadcrumbBox'
import _ from 'lodash'
import { BreadcrumbItem } from 'src/types/breadcrumb'
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: BreadcrumbItem[]
}

export default function BreadcrumbLayout (props: Props) {
  const [count, setCount] = useState(0)
  const { payload } = props
  useEffect(() => {})
  let currentRouteType = props.match.params.type
  let currentRouteList: any[] = _.flattenDeep(props.payload.map((item) => (item.childrens ? item.childrens : item)))
  // console.log(currentRouteList, 'currentRouteList')
  let CurrentRouteComponent = currentRouteList.find((item) => item.type === currentRouteType).component || null
  console.log('CurrentRouteComponent', CurrentRouteComponent)
  // {/* <RouterView routes={props.routes} /> */} <CurrentRouteComponent />
  return (
    <Wrapper>
      <Header />
      <NavBar {...props} />
      <BreadcrumbBox data={payload} />
      <RouterViewCon>
        <RouterView routes={props.routes} />
      </RouterViewCon>
    </Wrapper>
  )
}
const Wrapper = styled.div``

const RouterViewCon = styled.div`
  flex: 1;
  overflow: auto;
  height: auto;
`
