import * as React from 'react'
import styled from 'styled-components'
import { Button, Icon, Layout, Menu } from 'antd'
import { Route } from 'react-router-dom'
import { SelectParam } from 'antd/lib/menu'
import { observer } from 'mobx-react'

import RouterView, { RouteComponentProps } from '@/components/RouterView'
import { appStore } from '@/stores'

export interface Props extends RouteComponentProps {}

export interface State {
  collapsed: boolean
  selectedMenu: string
}

@observer
export default class ViewHome extends React.Component<Props, State> {
  public static getDerivedStateFromProps (props: any) {
    return {
      selectedMenu: props.location.pathname.split('/')[1]
    }
  }

  private menus = [
    { key: 'users', icon: 'user', title: 'Users' },
    { key: 'videos', icon: 'video-camera', title: 'Videos' },
    { key: 'tags', icon: 'tags-o', title: 'Tags' }
  ]

  public constructor (props: Props) {
    super(props)

    if (!appStore.user) {
      this.props.history.replace('/login')
    }

    this.state = {
      collapsed: true,
      selectedMenu: ''
    }
  }

  private onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed })
  }

  private onMenuSelect = ({ key }: SelectParam) => {
    this.props.history.push('/' + key)
  }

  private onLogout = () => {
    appStore.removeUser()
    this.props.history.replace('/login')
  }

  public render () {
    const { routes } = this.props
    const { selectedMenu, collapsed } = this.state

    if (!appStore.user) return null

    return (
      <Wrapper>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Logo />
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[selectedMenu]}
            onSelect={this.onMenuSelect}
          >
            {this.menus.map(menu => (
              <Menu.Item key={menu.key}>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Title>
              <Route
                children={props => <span>{props.location.pathname}</span>}
              />
            </Title>
            <Extra>
              您好，{appStore.user.name}&nbsp;
              <Button size='small' onClick={this.onLogout}>
                退出
              </Button>
            </Extra>
          </Header>
          <Content>
            <RouterView routes={routes} />
          </Content>
        </Layout>
      </Wrapper>
    )
  }
}

const Wrapper = styled(Layout)`
  height: 400px;
`

const Sider = Layout.Sider

const Logo = styled.div`
  margin: 16px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
`

const Header = styled(Layout.Header)`
  display: flex;
  padding: 0 20px !important;
  background: white !important;
`

const Title = styled.div`
  flex: 1;
`

const Extra = styled.div``

const Content = styled(Layout.Content)`
  padding: 24px 16px !important;
  overflow-y: auto;
`
