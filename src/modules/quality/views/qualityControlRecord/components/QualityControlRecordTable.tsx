import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import store from 'src/stores'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
// import PaginationCon from './PaginationCon'
import qs from 'qs'
import { qualityControlRecordApi } from 'src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi'
export default observer(function qualityControlRecordTable() {
  let [loading, setLoading] = useState(false)
  let [tableData, setTableData]: any = useState([])
  let [total, setTotal] = useState(50)
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
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
      title: '质控编号',
      dataIndex: 'zkbh',
      key: '',
      width: 180,
      align: 'left'
    },
    {
      title: '质控日期',
      // dataIndex: 'followEvaluateDate',
      dataIndex: 'zkrq',
      key: '',
      width: 120,
      align: 'center'
    },
    {
      title: '质控病区',
      dataIndex: 'zkbq',
      key: '',
      width: 180,
      align: 'center'
    },
    {
      title: '质控表单',
      dataIndex: 'zkbq',
      key: '',
      width: 180,
      align: 'center'
    },

    {
      title: '质控人员',
      dataIndex: 'zkry',
      key: '',
      width: 100,
      align: 'center'
    },
    {
      title: '床号',
      dataIndex: 'ch',
      key: '',
      width: 80,
      align: 'center'
    },
    {
      title: '住院号',
      dataIndex: 'zyh',
      key: '',
      width: 100,
      align: 'center'
    },
    {
      title: '管床护士',
      dataIndex: 'gchs',
      key: '',
      width: 100,
      align: 'center'
    },
    {
      title: '质量结果',
      dataIndex: 'zljg',
      key: '',
      width: 100,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'zt',
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
            <span
              onClick={() => {
                onDoubleClick(row)
              }}
            >
              查看
            </span>
          </DoCon>
        )
      }
    }
  ]
  const dataSource: any[] = [
    {
      key: 1,
      zkbh: '111111111111111',
      zkrq: '2019-07-01',
      zkbq: '神经内科护理单元',
      zkbd: '护理基础质量检查表',
      zkry: '王萌萌',
      ch: '33',
      zyh: 'P3333331',
      gchs: '王晓萌',
      zljg: '60%',
      zt: '待病区处理'
    },
    {
      key: 2,
      zkbh: '111111111111112',
      zkrq: '2019-07-02',
      zkbq: '神经内科护理单元',
      zkbd: '护理基础质量检查表',
      zkry: '王萌萌',
      ch: '33',
      zyh: 'P3333332',
      gchs: '王晓萌',
      zljg: '60%',
      zt: '待病区处理'
    },
    {
      key: 3,
      zkbh: '111111111111113',
      zkrq: '2019-07-03',
      zkbq: '神经内科护理单元',
      zkbd: '护理基础质量检查表',
      zkry: '王萌萌',
      ch: '33',
      zyh: 'P3333333',
      gchs: '王晓萌',
      zljg: '60%',
      zt: '待病区处理'
    },
    {
      key: 2,
      zkbh: '111111111111111',
      zkrq: '2019-07-04',
      zkbq: '神经内科护理单元',
      zkbd: '护理基础质量检查表',
      zkry: '王萌萌',
      ch: '33',
      zyh: 'P3333334',
      gchs: '王晓萌',
      zljg: '60%',
      zt: '待病区处理'
    },
    {
      key: 2,
      zkbh: '111111111111111',
      zkrq: '2019-07-05',
      zkbq: '神经内科护理单元',
      zkbd: '护理基础质量检查表',
      zkry: '王萌萌',
      ch: '33',
      zyh: 'P3333335',
      gchs: '王晓萌',
      zljg: '60%',
      zt: '待病区处理'
    }
  ]
  useEffect(() => {
    qualityControlRecordApi.instanceGetPageByCondition().then((res) => {})
  }, [])
  const onDoubleClick = (record: any) => {
    // appStore.history.push('/continuingEduEmpDetail')
    appStore.history.push(`/qualityControlRecordDetail/${record.zyh}`)
    // store.appStore.history.push(`/quality/qualityControlRecord/${qs.stringify(record)}`)
  }
  return (
    <Con>
      <TableScrollCon>
        <TableCon>
          <BaseTable
            surplusHeight={205}
            // surplusHeight={135}
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            surplusWidth={160}
            onRow={(record: any) => {
              return {
                onDoubleClick: () => onDoubleClick(record)
              }
            }}
            pagination={{
              total: total,
              current: current,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['10', '15', '20'],
              pageSize: pageSize
            }}
          />
        </TableCon>
      </TableScrollCon>
    </Con>
  )
})

const Con = styled.div`
  height: 100%;
  width: 100%;
`
const TableScrollCon = styled.div`
  width: 100%;
  /* overflow-x: auto; */
`

const TableCon = styled.div`
  width: 100%;
  /* margin-bottom:20px; */
`
