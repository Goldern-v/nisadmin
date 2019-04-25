import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable from 'src/components/BaseTable'
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
    title: '类型',
    dataIndex: '类型',
    key: '类型',
    align: 'center'
  },
  {
    title: '内容',
    dataIndex: '内容',
    key: '内容',
    width: 300,
    align: 'center'
  },
  {
    title: '科室',
    dataIndex: '科室',
    key: '科室',
    align: 'center'
  },
  {
    title: '当前状态',
    dataIndex: '当前状态',
    key: '当前状态',
    align: 'center'
  },
  {
    title: '提交人',
    dataIndex: '提交人',
    key: '提交人',
    align: 'center'
  },
  {
    title: '提交时间',
    dataIndex: '提交时间',
    key: '提交时间',
    width: 200,
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
        color: ${(p) => p.theme.$mtc};
      `
      return (
        <DoCon>
          <span>查看</span>
        </DoCon>
      )
    }
  }
]
const dataSource = [
  {
    key: '1',
    类型: '护士档案',
    内容: '档案更新【刘萌萌】',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '刘萌萌',
    提交时间: '2019-04-25 16:44'
  },
  {
    key: '2',
    类型: '不良事件',
    内容: '跌倒事件上报',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '陈月君',
    提交时间: '2019-04-25 17:09'
  },
  {
    key: '3',
    类型: '请假',
    内容: '请假申请【刘萌萌】',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '刘萌萌',
    提交时间: '2019-04-25 16:44'
  },
  {
    key: '4',
    类型: '护理会诊',
    内容: '请呼吸科会诊',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '刘萌萌',
    提交时间: '2019-04-25 17:12'
  },
  {
    key: '5',
    类型: '护士档案',
    内容: '档案更新【刘萌萌】',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '刘萌萌',
    提交时间: '2019-04-25 16:44'
  },
  {
    key: '6',
    类型: '不良事件',
    内容: '跌倒事件上报',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '陈月君',
    提交时间: '2019-04-25 17:09'
  },
  {
    key: '5',
    类型: '护士档案',
    内容: '档案更新【刘萌萌】',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '刘萌萌',
    提交时间: '2019-04-25 16:44'
  },
  {
    key: '6',
    类型: '不良事件',
    内容: '跌倒事件上报',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '陈月君',
    提交时间: '2019-04-25 17:09'
  },
  {
    key: '7',
    类型: '请假',
    内容: '请假申请【刘萌萌】',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '刘萌萌',
    提交时间: '2019-04-25 16:44'
  },
  {
    key: '8',
    类型: '护理会诊',
    内容: '请呼吸科会诊',
    科室: '神经内科护理单元',
    当前状态: '待我审核',
    提交人: '刘萌萌',
    提交时间: '2019-04-25 17:12'
  }
]

export default function AuditsTable1 () {
  return (
    <Wrapper>
      <BaseTable dataSource={dataSource} columns={columns} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
