import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable from 'src/components/BaseTable'
import windowHeight from 'src/hooks/windowHeight'
import { aMServices } from '../services/AMServices'
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
    dataIndex: 'typeName',
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

export default function AuditsTableDHSZ () {
  const [tableData, setTableData] = useState([])
  const [current, setCurrent] = useState(1)
  const onChange = () => {}
  const onload = () => {
    aMServices.auditeStatusNurse('waitAuditedNurse', current).then((res) => {
      setTableData(res.data.list)
    })
  }
  useEffect(() => {
    onload()
  }, [])
  return (
    <Wrapper>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        pagination={{
          total: 100,
          current: 1
        }}
        onChange={onChange}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div``
