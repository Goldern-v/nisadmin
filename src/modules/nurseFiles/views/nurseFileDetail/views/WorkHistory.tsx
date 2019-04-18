import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from '../components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'

export interface Props extends RouteComponentProps {}

const btnList = [
  {
    label: '添加'
  }
]
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
]

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text: any, record: any, index: number) => index + 1,
    algin: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
]
export default observer(function WorkHistory () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })

  return (
    <BaseLayout title='工作经历' btnList={btnList}>
      <BaseTable dataSource={dataSource} columns={columns} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
