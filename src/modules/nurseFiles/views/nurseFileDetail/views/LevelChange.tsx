import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditLevelChangeModal from '../modal/EditLevelChangeModal'

export interface Props extends RouteComponentProps {}
export default observer(function LevelChange () {
  const editLevelChangeModal = createModal(EditLevelChangeModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editLevelChangeModal.show({
          id: '12'
        })
    }
  ]
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      pyTime: '2012-5',
      jd: '高级护工',
      cj: '高级护士',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '2',
      name: '杨平',
      age: 26,
      address: '西湖区湖底公园1号',
      pyTime: '2015-5',
      jd: '中级护工',
      cj: '中级护士',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '3',
      name: '易小惠',
      age: 29,
      address: '西湖区湖底公园1号',
      pyTime: '2017-5',
      jd: '中级护工',
      cj: '中级护士',
      fj: '有',
      zt: '待护士长审核'
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '职称聘用时间',
      dataIndex: 'pyTime',
      key: '2',
      width: 150,
      align: 'center'
    },
    {
      title: '取得职称',
      dataIndex: 'jd',
      key: '3',
      width: 100,
      align: 'center'
    },
    {
      title: '层级',
      dataIndex: 'cj',
      key: '4',
      width: 200,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '5',
      width: 200,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'zt',
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
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })

  return (
    <BaseLayout title='职称及层级变动' btnList={btnList}>
      <BaseTable dataSource={dataSource} columns={columns} />
      <editLevelChangeModal.Component />
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
