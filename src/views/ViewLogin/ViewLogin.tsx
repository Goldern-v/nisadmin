import * as React from 'react'
import styled from 'styled-components'
import { Button, Input, message, Spin } from 'antd'

import { RouteComponentProps } from '../../components/RouterView'
import { appStore } from '../../stores'
import { authApiService } from '../../services'
import { to } from '../../libs/fns'

export interface Props extends RouteComponentProps {}

export interface State {
  loading: boolean
  username: string
  password: string
}

export default class ViewLogin extends React.Component<Props, State> {

  public state: State = {
    loading: false,
    username: '',
    password: '',
  }

  private onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value })
  }

  private onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value })
  }

  private onLogin = async () => {
    this.setState({ loading: true })

    const { username, password } = this.state
    const [err, { token, user }] = await to(authApiService.login(username, password))

    this.setState({ loading: false })

    if (err) return message.error(err.message)

    localStorage.setItem('token', token)
    appStore.updateUser(user)

    message.success('登陆成功')
    this.props.history.replace('/')
  }

  public render () {
    const { loading, username, password } = this.state

    return (
      <Wrapper>
        <Header>
          <Title>React Demo</Title>
        </Header>
        <Container>
          <Spin spinning={loading}>
            <Input
              placeholder='用户名'
              value={username}
              onChange={this.onUsernameChange}
            />
            <Input
              type='password'
              placeholder='密码'
              value={password}
              onChange={this.onPasswordChange}
              onPressEnter={this.onLogin}
            />
            <StyledButton type='primary' disabled={loading} onClick={this.onLogin}>
              {loading ? '登陆中...' : '登陆'}
            </StyledButton>
          </Spin>
        </Container>
        <Footer>
          Powered by&nbsp;
          <a href='http://dev.cr-health.com:380/huangwenhao/react-typescript-boilerplate'>
            react-typescript-boilerplate
          </a>
        </Footer>
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  padding: 30px 50px;
`

const Header = styled.div`
  text-align: center;
`

const Title = styled.h1`
  padding: 0;
`

const Container = styled.div`
  margin: 20px 0;

  input {
    margin-bottom: 15px;
  }
`

const StyledButton = styled(Button as any)`
  width: 100%;
`

const Footer = styled.div`
  text-align: center;
  font-size: 12px;
  color: #aaa;
`
