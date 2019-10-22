import * as React from 'react'
import styled from 'styled-components'

export interface Props {}

export interface State {}

export default class Demo1 extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {}

  public constructor(props: Props) {
    super(props)

    this.state = {
      a: 1
    }
  }

  public a() {}

  public render() {
    const {} = this.props

    return <Wrapper>demo1</Wrapper>
  }
}

const Wrapper = styled.div``
