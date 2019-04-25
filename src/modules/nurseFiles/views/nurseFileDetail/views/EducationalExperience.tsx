import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditExaminationResultsModal from '../modal/EditExaminationResultsModal'

export interface Props extends RouteComponentProps {}
export default observer(function EducationalExperience () {
  const editExaminationResultsModal = createModal(EditExaminationResultsModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editExaminationResultsModal.show({
          id: '12'
        })
    }
  ]
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 26,
      address: '西湖区湖底公园1号',
      jdTime: '1996-09-01',
      byTime: '2012-07-01',
      bySchool: '南华医学院',
      zy: '护理',
      xl: '本科',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '2',
      name: '杨华',
      age: 37,
      address: '南城区海洋公园6号',
      jdTime: '1986-09-01',
      byTime: '2002-07-01',
      bySchool: '南方医科大学',
      zy: '护理',
      xl: '本科',
      fj: '无',
      zt: '待护士长审核'
    },
    {
      key: '3',
      name: '赵平',
      age: 32,
      address: '西湖区湖底公园1号',
      jdTime: '1989-09-01',
      byTime: '2005-07-01',
      bySchool: '南华医学院',
      zy: '护理',
      xl: '本科',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '4',
      name: '杨晓春',
      age: 27,
      address: '西湖区湖底公园1号',
      jdTime: '1991-09-01',
      byTime: '2008-07-01',
      bySchool: '长春医学院',
      zy: '护理',
      xl: '本科',
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
      title: '就读时间',
      dataIndex: 'jdTime',
      key: '2',
      width: 150,
      align: 'center'
    },
    {
      title: '毕业时间',
      dataIndex: 'byTime',
      key: '3',
      width: 150,
      align: 'center'
    },
    {
      title: '毕业学校',
      dataIndex: 'bySchool',
      key: '4',
      width: 200,
      align: 'center'
    },
    {
      title: '专业',
      dataIndex: 'zy',
      key: '5',
      width: 200,
      align: 'center'
    },
    {
      title: '学历',
      dataIndex: 'xl',
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
    <BaseLayout title='教育经历' btnList={btnList}>
      <BaseTable dataSource={dataSource} columns={columns} />
      <editExaminationResultsModal.Component />
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
