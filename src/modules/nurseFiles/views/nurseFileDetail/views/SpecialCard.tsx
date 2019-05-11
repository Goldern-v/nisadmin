import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditSpecialCardModal from '../modal/EditSpecialCardModal'

export interface Props extends RouteComponentProps {}
export default observer(function SpecialCard () {
  const editSpecialCardModal = createModal(EditSpecialCardModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editSpecialCardModal.show({
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
      hdTime: '2007-03-08',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-04344-45435-78841',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '杨华',
      age: 28,
      address: '西湖区湖底公园1号',
      hdTime: '2015-03-08',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43434-55434-33443',
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
      title: '获得时间',
      dataIndex: 'hdTime',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '资格名称',
      dataIndex: 'zjName',
      key: '3',
      width: 150,
      align: 'center'
    },
    {
      title: '资格证编号',
      dataIndex: 'zgzNumber',
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
      key: '6',
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
    <BaseLayout title='特殊资格证' btnList={btnList}>
      <BaseTable dataSource={dataSource} columns={columns} surplusHeight={390} />
      <editSpecialCardModal.Component />
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
