import { observer } from 'mobx-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Button from '../components/Button'
import RouterView from '../components/RouterView'
import { RouteComponentProps } from '../routes'
import { counterStore } from '../stores'

export interface Props extends RouteComponentProps {}

export interface State {}

@observer
export default class Home extends React.Component<Props, State> {

  private onAdd () {
    counterStore.add()
  }

  public render () {
    const { routes } = this.props

    return (
      <Wrapper>
        <Title>Home&nbsp;<Button onClick={this.onAdd}>{counterStore.count}</Button></Title>
        <List>
          <StyledLink to='/aaa'>page A</StyledLink>
          <StyledLink to='/bbb'>page B</StyledLink>
        </List>
        <Container>
          <RouterView routes={routes}/>
        </Container>
      </Wrapper>
    )
  }

}

const Wrapper = styled.div``

const Title = styled.div``

const List = styled.div``

const StyledLink = styled(Link)`
  display: block;
  color: blueviolet;
`

const Container = styled.div``
