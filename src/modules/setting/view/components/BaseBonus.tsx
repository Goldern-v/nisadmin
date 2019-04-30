import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable from 'src/components/BaseTable'
import AddButton from '../../common/AddButton'
import windowHeight from 'src/hooks/windowHeight'
export interface Props extends RouteComponentProps {}

const columns: any = [
  {
    title: '序号',
    dataIndex: '1',
    key: '1',
    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 50
  },
  {
    title: '项目构成',
    dataIndex: '项目构成',
    key: '项目构成',
    align: 'center'
  },
  {
    title: '占比（%）',
    dataIndex: '占比',
    key: '占比',
    width: 300,
    align: 'center'
  },
  {
    title: '预设项目',
    dataIndex: '预设项目',
    key: '预设项目',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'cz',
    key: '8',
    width: 100,
    align: 'center',
    render: (a: any, b: any, c: any) => {
      const DoCon = styled.div`
        display: flex;
        justify-content: space-around;
        font-size: 12px;
        cursor: pointer;

        color: ${(p) => p.theme.$mtc};
      `
      return (
        <DoCon>
          <span>删除</span>
          <span>设置系数</span>
        </DoCon>
      )
    }
  }
]
const dataSource = [
  {
    key: '1',
    项目构成: '工作量',
    占比: '30',
    预设项目: '否'
  },
  {
    key: '1',
    项目构成: '工作质量',
    占比: '15',
    预设项目: '是'
  },
  {
    key: '1',
    项目构成: '关键绩效',
    占比: '15',
    预设项目: '是'
  }
]

export default function AuditsTable3 () {
  return (
    <Wrapper>
      <BaseTable dataSource={dataSource} columns={columns} />
      <AddButton />
    </Wrapper>
  )
}
const Wrapper = styled.div``
