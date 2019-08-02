import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
export interface Props {}

export default function Table() {
  const columns: ColumnProps<any>[] = [
    {
      title: '片区',
      dataIndex: '片区',
      width: 100,
      align: 'left'
    },
    {
      title: '科室',
      dataIndex: '科室',
      width: 150,
      align: 'left'
    },
    {
      title: '员工号',
      dataIndex: '员工号',
      width: 100
    },
    {
      title: '姓名',
      dataIndex: '姓名',
      width: 100
    },
    {
      title: '性别',
      dataIndex: '性别',
      width: 80
    },
    {
      title: '年龄',
      dataIndex: '年龄',
      width: 80
    },
    {
      title: '职称',
      dataIndex: '职称',
      width: 100
    },
    {
      title: '层级',
      dataIndex: '层级',
      width: 100
    },
    {
      title: '职务',
      dataIndex: '职务',
      width: 100
    },
    {
      title: '最高学历',
      dataIndex: '最高学历',
      width: 100
    },
    {
      title: '状态',
      dataIndex: '状态',
      width: 80
    },
    {
      title: '籍贯',
      dataIndex: '籍贯',
      width: 100,
      align: 'left'
    },
    {
      title: '民族',
      dataIndex: '民族',
      width: 80
    },
    {
      title: '执业证书编号',
      dataIndex: '执业证书编号',
      width: 100,
      align: 'left'
    },
    {
      title: '操作',
      dataIndex: '操作',
      width: 80,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span>操作</span>
          </DoCon>
        )
      }
    }
  ]
  return (
    <Wrapper>
      <BaseTable dataSource={[{}]} columns={columns} type={['index']} surplusHeight={220} surplusWidth={300} pagination={{}} />
    </Wrapper>
  )
}
const Wrapper = styled(TabledCon)``
