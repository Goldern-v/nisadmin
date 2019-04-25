import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
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
      address: '西湖区湖底公园1号',
      ksTime: '2015-09',
      jsTime: '2017-07',
      pxDW: '护理职工学院',
      pxLR: '全程护理',
      xs: '376',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '2',
      name: '杨平',
      age: 28,
      address: '西湖区湖底公园1号',
      ksTime: '2014-09',
      jsTime: '2016-07',
      pxDW: '护理职工学院',
      pxLR: '全程护理',
      xs: '376',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '3',
      name: '赵立',
      age: 29,
      address: '西湖区湖底公园1号',
      ksTime: '2013-09',
      jsTime: '2015-07',
      pxDW: '护理职工学院',
      pxLR: '全程护理',
      xs: '376',
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
      title: '开始时间',
      dataIndex: 'ksTime',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'jsTime',
      key: '3',
      width: 100,
      align: 'center'
    },
    {
      title: '培训单位',
      dataIndex: 'pxDW',
      key: '4',
      width: 200,
      align: 'center'
    },
    {
      title: '培训内容',
      dataIndex: 'pxLR',
      key: '5',
      width: 200,
      align: 'center'
    },
    {
      title: '学时',
      dataIndex: 'xs',
      key: '6',
      width: 150,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '7',
      width: 150,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'zt',
      key: '8',
      width: 200,
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
