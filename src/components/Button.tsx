import * as React from 'react'
import styled from 'styled-components'

export interface Props {
  onClick?: () => void
}

export interface State {}

export default class Button extends React.Component<Props, State> {

  public render () {
    const { onClick, children } = this.props

    return (
      <Wrapper onClick={onClick}>
        {children}
      </Wrapper>
    )
  }

}

const Wrapper = styled.button`
  margin: 0 10px;
  padding: 8px 14px;
  background: white;
  border: 2px solid gray;
  border-radius: 2px;
  outline: none;
  transition: background 0.3s;

  &:hover {
    background: #eee;
  }

  &:active {
    background: #ddd;
  }
`
