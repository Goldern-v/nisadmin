import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/es/table'
interface Props {
  model: any
}
export default function SpotDictationTable(props: Props) {
  const [pageSize, setPageSize] = useState(10)
  const [pageObj, setPageObj] = useState({
    pageIndex: 1,
    total: 0,
    current: 1
  })
  const dataSource = [{}]
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '序号',
      key: '序号',
      width: 50,
      align: 'center',
      render(record: any, text: string, index: number) {
        return index + 1
      }
    },
    {
      title: '题目',
      dataIndex: '题目',
      key: '题目',
      width: 400
    },
    {
      title: '出题次数',
      dataIndex: '出题次数',
      key: '出题次数',
      width: 60
    },
    {
      title: '选错次数',
      dataIndex: '选错次数',
      key: '选错次数',
      width: 60
    },
    {
      title: '注解',
      dataIndex: '注解',
      key: '注解',
      width: 150
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 100,
      render() {
        return (
          <DoCon>
            <span>恢复</span>
            <span>删除</span>
          </DoCon>
        )
      }
    }
  ]
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => { }
  }
  return (
    <Wrapper>
      <BaseTable
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        surplusHeight={284}
        pagination={{
          total: pageObj.total,
          current: pageObj.current,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '15', '20'],
          pageSize: pageSize
        }}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div``
