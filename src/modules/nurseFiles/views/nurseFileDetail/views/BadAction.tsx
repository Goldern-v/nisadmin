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
      address: '西湖区湖底公园1号',
      date: '2015-03-06',
      sjyy: '未请假提前离岗',
      cljl: '口头警告',
      fj: '有',
      zt: '已审核'
    },
    {
      key: '2',
      name: '杨春',
      age: 24,
      address: '西湖区湖底公园1号',
      date: '2015-04-13',
      sjyy: '早退',
      cljl: '口头警告',
      fj: '有',
      zt: '已审核'
    },
    {
      key: '3',
      name: '赵平',
      age: 34,
      address: '西湖区湖底公园1号',
      date: '2015-03-26',
      sjyy: '报表遗失',
      cljl: '书面检讨',
      fj: '有',
      zt: '已审核'
    },
    {
      key: '4',
      name: '易小惠',
      age: 33,
      address: '西湖区湖底公园1号',
      date: '2015-04-27',
      sjyy: '未请假提前离岗',
      cljl: '口头警告',
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
      width: 43
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '事件原因',
      dataIndex: 'sjyy',
      key: '3',
      width: 300,
      align: 'center'
    },
    {
      title: '处理结论',
      dataIndex: 'cljl',
      key: '4',
      width: 100,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '611',
      width: 150,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'zt',
      key: '61',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'cz',
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
