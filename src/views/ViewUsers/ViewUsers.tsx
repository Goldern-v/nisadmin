import * as React from 'react'
import styled from 'styled-components'
import { message, Spin, Table } from 'antd'

import User from '../../models/User'
import { RouteComponentProps } from '../../components/RouterView'
import { userApiService } from '../../services'
import { to } from '../../libs/fns'

export interface Props extends RouteComponentProps {}

export interface State {
  loading: boolean
  users: User[]
}

export default class ViewUsers extends React.Component<Props, State> {

  public state: State = {
    loading: false,
    users: [],
  }

  private columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    { title: '电话', dataIndex: 'phone' },
  ]

  public componentDidMount ()  {
    this.load()
  }

  private load = async () => {
    this.setState({ loading: true })

    const [err, { users }] = await to(userApiService.listUser())

    this.setState({ loading: false })

    if (err) return message.error(err.message)
    this.setState({ users })
  }

  public render () {
    const { loading, users } = this.state

    return (
      <Wrapper>
        <Spin spinning={loading}>
          <Table rowKey='id' columns={this.columns} dataSource={users}/>
        </Spin>
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  background: white;
`
