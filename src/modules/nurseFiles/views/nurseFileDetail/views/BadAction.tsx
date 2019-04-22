import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from '../components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditBadActionModal from '../modal/EditBadActionModal'

export interface Props extends RouteComponentProps {}
export default observer(function BadAction () {
  const editBadActionModal = createModal(EditBadActionModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editBadActionModal.show({
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
      title: '日期',
      dataIndex: 'name',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '事件原因',
      dataIndex: '3',
      key: '3',
      width: 300,
      align: 'center'
    },
    {
      title: '处理结论',
      dataIndex: '4',
      key: '4',
      width: 100,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: '611',
      key: '611',
      width: 150,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: '61',
      key: '61',
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
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })

  return (
    <BaseLayout title='护理不良行为（包括医德医风）记录' btnList={btnList}>
      <BaseTable dataSource={dataSource} columns={columns} />
      <editBadActionModal.Component />
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
