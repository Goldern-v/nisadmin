import { ColumnProps } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Obj } from 'src/libs/types'
import BaseTable from 'src/modules/setting/common/TableModel'
import styled from 'styled-components'
interface IProps {
  isPreview?: boolean
}
const columns: ColumnProps<any>[] = [
  {
    key: 'idx',
    dataIndex: 'idx',
    title: '序号',
    width: 60,
    align: 'center',
    render(text: any, record: any, idx: number) {
      return idx + 1
    }
  },
  {
    key: 'idx',
    dataIndex: 'idx',
    title: '考核类型',
    width: 100,
    align: 'center',
  },
  {
    key: 'idx',
    dataIndex: 'idx',
    title: '考核项目',
    width: 100,
    align: 'center',
  },
  {
    key: 'idx',
    dataIndex: 'idx',
    title: '考核分数',
    width: 100,
    align: 'center',
  },
  {
    key: 'idx',
    dataIndex: 'idx',
    title: '考核结果',
    width: 100,
    align: 'center',
    render(text: any, record: any, idx: number) {
      return idx + 1
    }
  },
  {
    key: 'idx',
    dataIndex: 'idx',
    title: '补考后成绩',
    width: 100,
    align: 'center',
  },
]
/**固定表-岗前培训考核成绩 */
export default function FixedGrade(props: IProps) {
  const { isPreview = false } = props
  const info: any[] | undefined = []
  return <Wrapper>
    <div className='title'>岗前培训考核成绩</div>
    <BaseTable
      dataSource={isPreview ? [] : info}
      columns={columns}
    />
  </Wrapper>
}
const Wrapper: any = styled.div`
width: 210mm;
/* height: 960mm; */
.title {
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
`