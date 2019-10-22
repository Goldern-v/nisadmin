import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

import { ColumnProps } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
export interface Props {}

export default function TitleTable() {
  const dataSource: any[] = []
  const columns: ColumnProps<any>[] = [
    {
      title: '项目名称'
    },
    {
      title: '列宽度'
    },
    {
      title: '基数'
    },
    {
      title: '下拉选项预设值'
    },
    {
      title: '操作',
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
            <span>编辑</span>
            <span>删除</span>
          </DoCon>
        )
      }
    }
  ]
  return (
    <Wrapper>
      <BaseTable dataSource={dataSource} columns={columns} type={['index']} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
