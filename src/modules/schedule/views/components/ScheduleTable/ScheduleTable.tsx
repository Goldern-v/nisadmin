import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import Th from './Th'
import Tr from './Tr'
import Col from './Col'
export interface Props extends RouteComponentProps {}

export interface ThItem {
  key?: string
  value: string
  width?: string
  style?: any
}

export interface TdItem {
  key: string
  value: string
}

interface TableData {
  th: ThItem[]
  tr: TdItem[]
}
const tableData: TableData = {
  th: [
    {
      value: '序号',
      width: '4%'
    },
    {
      value: '工号',
      width: '5%'
    },
    {
      value: '姓名',
      width: '5%'
    },
    {
      value: '层级',
      width: '5%'
    },
    {
      value: '职称',
      width: '5%'
    },
    {
      value: '周一',
      width: '6%'
    },
    {
      value: '周二',
      width: '6%'
    },
    {
      value: '周三',
      width: '6%'
    },
    {
      value: '周四',
      width: '6%'
    },
    {
      value: '周五',
      width: '6%'
    },
    {
      value: '周六',
      width: '6%'
    },
    {
      value: '周日',
      width: '6%'
    },
    {
      value: '备注',
      width: '20%'
    },
    {
      value: '本周工时(小时)',
      width: '7%'
    },
    {
      value: '状态',
      width: '10%'
    }
  ],
  tr: [
    {
      key: '',
      value: '1'
    },
    {
      key: '',
      value: '2'
    },
    {
      key: '',
      value: '3'
    },
    {
      key: '',
      value: '4'
    },
    {
      key: '',
      value: '5'
    },
    {
      key: '',
      value: '6'
    },
    {
      key: '',
      value: '7'
    },
    {
      key: '',
      value: '8'
    },
    {
      key: '',
      value: '9'
    },
    {
      key: '',
      value: '10'
    },
    {
      key: '',
      value: '11'
    },
    {
      key: '',
      value: '12'
    },
    {
      key: '',
      value: '13'
    },
    {
      key: '',
      value: '14'
    },
    {
      key: '',
      value: '15'
    }
  ]
}

export default function ScheduleTable () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <table>
        <Col th={tableData.th} />
        <thead>
          <Th th={tableData.th} />
        </thead>
      </table>
      <Tbody>
        <table>
          <Col th={tableData.th} />

          <Tr tr={tableData.tr} />
        </table>
      </Tbody>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: #fff;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table,
  td,
  tr,
  th {
    border: 1px solid #000;
    min-height: 30px;
    text-align: center;
  }
  th {
    background: #f8f8f8;
    padding: 5px 0;
  }
`

const Tbody = styled.div`
  height: calc(100vh - 300px);
  overflow: auto;
  margin-top: -1px;
`
