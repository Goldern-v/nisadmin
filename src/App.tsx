import * as React from 'react'
import styled from 'styled-components'
import { HashRouter as Router } from 'react-router-dom'

import RouterView from './components/RouterView'
import routes from './configs/routes'

export interface Props {}

export interface State {}

export default class App extends React.Component<Props, State> {

  public render () {
    return (
      <Wrapper>
        <Inner>
          <Router>
            <RouterView routes={routes}/>
          </Router>
        </Inner>
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: #F4F8FB;
`

const Inner = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  width: 600px;
  background: white;
  box-shadow: 8px 14px 38px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03);
  border-radius: 3px;
  transform: translate(-50%, -50%);
`
