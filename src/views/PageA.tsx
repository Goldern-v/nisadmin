import * as React from 'react'
import styled from 'styled-components'

import { RouteComponentProps } from '../routes'

export interface Props extends RouteComponentProps {}

export interface State {}

export default class PageA extends React.Component<Props, State> {

  public render () {
    return (
      <Wrapper>PageA</Wrapper>
    )
  }

}

const Wrapper = styled.div``
