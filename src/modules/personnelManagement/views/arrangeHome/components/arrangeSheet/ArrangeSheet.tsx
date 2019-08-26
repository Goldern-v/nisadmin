import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
export interface Props {}

export default function ArrangeSheet() {
  let columns: ColumnProps<any>[] = [
    {
      title: '序号',
      render: (text: string, row: any, index: number) => index + 1
    },
    {
      title: '工号'
    },
    {
      title: '姓名'
    },
    {
      title: '层级'
    },
    {
      title: '职称'
    },
    {
      title: (text: string, row: any, index: number) => {
        return (
          <div>
            <div>08-23</div>
            <div>周一</div>
          </div>
        )
      }
    },
    {
      title: (
        <div>
          <div>工时小计</div>
          <div>（小时）</div>
        </div>
      )
    },
    {
      title: (
        <div>
          <div>夜小时数</div>
          <div>（小时）</div>
        </div>
      )
    },
    {
      title: (
        <div>
          <div>累计结余</div>
          <div>（小时）</div>
        </div>
      )
    }
  ]
  return (
    <Wrapper>
      <BaseTable
        columns={columns}
        // dataSource={[{}]}
        footer={() => {
          return <div>排班备注：</div>
        }}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div``
