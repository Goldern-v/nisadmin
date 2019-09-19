import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable from 'src/components/BaseTable'
export interface Props {
  dataSource: any[]
  loadingTable: boolean
}

export default function 病区明细表(props: Props) {
  const { dataSource, loadingTable } = props
  const columns: any[] = [
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 150,
      align: 'left'
    },
    {
      title: '姓名',
      dataIndex: '',
      width: 100,
      align: 'left'
    },
    {
      title: '住院号',
      dataIndex: '',
      width: 100,
      align: 'left'
    },
    {
      title: '问题',
      dataIndex: 'content',
      width: 300,
      align: 'left'
    },
    {
      title: '个人扣款（元）',
      dataIndex: '',
      width: 100,
      align: 'left'
    },
    {
      title: '科室扣分',
      dataIndex: 'convertDeductScore',
      width: 100,
      align: 'center',
      render(text: any, record: any) {
        return Number(text).toFixed(2)
      }
    }
  ]

  return (
    <Wrapper>
      <BaseTable surplusHeight={240} loading={loadingTable} dataSource={dataSource} columns={columns} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
