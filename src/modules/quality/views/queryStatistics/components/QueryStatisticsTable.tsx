import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BaseTable, { DoCon } from 'src/components/BaseTable'

export default function qualityControlRecordTable() {
  let [loading, setLoading] = useState(false)
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '护理单元',
      dataIndex: '',
      key: '',
      width: 180,
      align: 'left'
    },
    {
      title: '质控例数',
      dataIndex: '',
      key: '',
      width: 100,
      align: 'center'
    },
    {
      title: '最低通过率',
      dataIndex: '',
      key: '',
      width: 100,
      align: 'center'
    },

    {
      title: '最高通过率',
      dataIndex: '',
      key: '',
      width: 100,
      align: 'center'
    },
    {
      title: '平均通过率',
      dataIndex: '',
      key: '',
      width: 100,
      align: 'center'
    }
  ]
  const dataSource: any[] = []
  return (
    <Con>
      <TableScrollCon>
        <TableCon>
          <BaseTable
            surplusHeight={255}
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            // surplusHeight={currentRoute.surplusHeight || 250}
            // surplusWidth={currentRoute.surplusWidth || 0}
          />
        </TableCon>
      </TableScrollCon>
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  width: 100%;
`
const TableScrollCon = styled.div`
  width: 100%;
  overflow-x: auto;
`

const TableCon = styled.div``
