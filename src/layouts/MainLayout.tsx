import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import RouterView, { RouteComponentProps } from '@/components/RouterView'
export interface Props extends RouteComponentProps {}

export default function MainLayout (props: Props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <Header />
      <NavBar {...props} />
      <RouterViewCon>
        <RouterView routes={props.routes} />
      </RouterViewCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
`
const RouterViewCon = styled.div`
  flex: 1;
  overflow: auto;
`
