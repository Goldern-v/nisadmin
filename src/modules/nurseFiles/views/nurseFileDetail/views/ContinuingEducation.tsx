import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from '../components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditContinuingEducationModal from '../modal/EditContinuingEducationModal'

export interface Props extends RouteComponentProps {}
export default observer(function EducationalExperience () {
  const editContinuingEducationModal = createModal(EditContinuingEducationModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editContinuingEducationModal.show({
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
      title: '开始时间',
      dataIndex: 'name',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: '3',
      key: '3',
      width: 100,
      align: 'center'
    },
    {
      title: '培训单位',
      dataIndex: '4',
      key: '4',
      width: 200,
      align: 'center'
    },
    {
      title: '培训内容',
      dataIndex: '5',
      key: '5',
      width: 200,
      align: 'center'
    },
    {
      title: '学时',
      dataIndex: '6',
      key: '6',
      width: 150,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: '7',
      key: '7',
      width: 150,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: '8',
      key: '8',
      width: 100,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '9',
      key: '9',
      width: 100,
      align: 'center',
      render: (a: any, b: any, c: any) => {
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
    <BaseLayout title='继续教育' btnList={btnList}>
      <BaseTable dataSource={dataSource} columns={columns} />
      <editContinuingEducationModal.Component />
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
