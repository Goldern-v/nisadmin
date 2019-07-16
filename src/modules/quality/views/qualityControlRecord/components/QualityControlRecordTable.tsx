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
      title: '制度名称',
      dataIndex: '',
      key: '',
      width: 180,
      align: 'left'
    },
    {
      title: '大小',
      dataIndex: '',
      key: '',
      width: 100,
      align: 'center'
    },
    {
      title: '格式',
      dataIndex: '',
      key: '',
      width: 80,
      align: 'center'
    },

    {
      title: '上传人',
      dataIndex: '',
      key: '',
      width: 80,
      align: 'center'
    },
    {
      title: '权限',
      dataIndex: '',
      key: '',
      width: 100,
      align: 'center'
    },
    {
      title: '上传时间',
      dataIndex: '',
      key: '',
      width: 130,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '',
      key: '',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            <span onClick={() => {}}>预览</span>
            <span onClick={() => {}}>下载</span>
            <span onClick={() => {}}>删除</span>
          </DoCon>
        )
      }
    }
  ]
  const dataSource: any[] = []
  return (
    <Con>
      <TableScrollCon>
        <TableCon>
          <BaseTable
            surplusHeight={205}
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
