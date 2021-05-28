import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import BaseLayout from '../components/BaseLayout'
import { Button } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
export interface Props { }

export default function WardInnovate() {
  const [tableData, setTableData] = useState([])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
  ]

  return <BaseLayout title='科室创新' btnList={[]}>
    <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
  </BaseLayout>
}