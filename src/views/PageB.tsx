import * as React from 'react'
import styled from 'styled-components'

import { RouteComponentProps } from '../routes'

export interface Props extends RouteComponentProps {}

export interface State {}

export default class PageB extends React.Component<Props, State> {

  public render () {
    return (
      <Wrapper>PageB</Wrapper>
    )
  }

}

const Wrapper = styled.div``
