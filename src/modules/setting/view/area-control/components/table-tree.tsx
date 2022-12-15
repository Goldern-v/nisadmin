import { ColumnProps } from 'antd/lib/table'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { areaControlModel } from '../model'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Obj } from 'src/libs/types'

export interface Props {
}
export default observer(function (props: Props) {

  const addChild = (row: Obj) => {
    console.log('test-row', row)
    areaControlModel.showModal({
      type: '',
      name: '',
      code: '',
      bigDept: row.code,
      id: null
    },
      '添加下一级')
  }
  const onEdit = (row: Obj) => {
    console.log('test-row', row)
    areaControlModel.showModal({
      type: row.type,
      name: row.name,
      code: row.code,
      bigDept: row.bigDept,
      id: row.id
    })
  }
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 70,
      render: (text: string, row: Obj, index: number) => index + 1
    },
    {
      title: "科室名称",
      width: 90,
      dataIndex: 'name',
      align: "center",
    },
    {
      title: "科室属性",
      width: 70,
      dataIndex: 'type',
      align: "center"
    },
    {
      title: "科室编码",
      width: 70,
      dataIndex: 'code',
      align: "center"
    },
    {
      title: "操作",
      width: 70,
      align: "center",
      render(text: string, row: Obj) {
        return <DoCon>
          <span onClick={() => addChild(row)}>添加下一级</span>
          <span onClick={() => onEdit(row)}>编辑</span>
        </DoCon>
      }
    },
  ]
  return (
    <Wrapper>
      <BaseTable
        rowKey={'id'}
        loading={areaControlModel.loading}
        childrenColumnName='childDepts'
        surplusWidth={1000}
        surplusHeight={200}
        dataSource={areaControlModel.tableData}
        columns={columns} />
    </Wrapper>
  )
})

const Wrapper = styled.div`

`