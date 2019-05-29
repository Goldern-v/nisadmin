import * as React from 'react'
import styled from 'styled-components'

export interface Props {}

export interface State {
  hasError: any
}

export default class ComponentDidCatch extends React.Component<Props, State> {
  public constructor (props: any) {
    super(props)
    this.state = { hasError: false }
  }

  public componentDidCatch (error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info)
  }

  public render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

const Wrapper = styled.div``
