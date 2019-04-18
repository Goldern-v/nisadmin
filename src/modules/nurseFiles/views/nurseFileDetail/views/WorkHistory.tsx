import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from '../components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditWorkHistoryModal from '../modal/EditWorkHistoryModal'

export interface Props extends RouteComponentProps {}
const editWorkHistoryModal = createModal(EditWorkHistoryModal)
const btnList = [
  {
    label: '添加',
    onClick: () =>
      editWorkHistoryModal.show({
        id: '12'
      })
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

const columns: ColumnProps<any>[] = [
  {
    title: '序号',
    dataIndex: '1',
    key: '1',
    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 43
  },
  {
    title: '开始年月',
    dataIndex: 'name',
    key: '2',
    width: 100,
    align: 'center'
  },
  {
    title: '结束年月',
    dataIndex: '3',
    key: '3',
    width: 100,
    align: 'center'
  },
  {
    title: '单位',
    dataIndex: '4',
    key: '4',
    width: 200,
    align: 'center'
  },
  {
    title: '专业技术工作',
    dataIndex: '5',
    key: '5',
    width: 200,
    align: 'center'
  },
  {
    title: '技术职称',
    dataIndex: '6',
    key: '6',
    width: 150,
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: '7',
    key: '7',
    width: 150,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: '8',
    key: '8',
    width: 100,
    align: 'center',
    render: (a: any, b: any, c: any) => {
      console.log(a, b, c)
      return (
        <DoCon>
          <span>修改</span>
          <span>审核</span>
        </DoCon>
      )
    }
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
      <editWorkHistoryModal.Component />
    </BaseLayout>
  )
})
const Wrapper = styled.div``

const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
`
