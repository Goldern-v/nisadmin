import styled from 'styled-components'
import React from 'react'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { recordViewModal } from '../RecordViewModal'
import { appStore } from 'src/stores'

export interface Props {}

export default observer(function Table() {

  const toDetails = (record: any) => {
    appStore.history.push(`/qualityScheduleRecordDetails/${record.id}`)
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '查房编号',
      dataIndex: 'srCode',
      width: 150,
      align: 'center'
    },
    {
      title: '查房日期',
      dataIndex: 'srDate',
      width: 140,
      align: 'center'
    },
    {
      title: '检查病区',
      dataIndex: 'wardName',
      width: 160
    },
    {
      title: '查房类型',
      dataIndex: 'type',
      width: 130,
      align: 'center'
    },
    {
      title: '检查人员',
      dataIndex: 'srName',
      width: 90,
      align: 'center'
    },
    {
      title: '护士在岗情况',
      dataIndex: 'nurseStatus',
      width: 100,
      align: 'center',
      render (status: string) {
        return status == '0' ?  '无问题' : <span style={{ color: 'red' }}>有问题</span>
      }
    },
    {
      title: '病人情况',
      dataIndex: 'patientStatus',
      width: 100,
      align: 'center',
      render (status: string) {
        return status == '0' ?  '无问题' : <span style={{ color: 'red' }}>有问题</span>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 130,
      align: 'center',
      render (status: string) {
        switch (status) {
          case '1':
            return '提交'
          case '2':
            return '待病区处理'
          case '3':
            return '待护理部审核'
          default:
            return ''
        }
      }
    },
    {
      title: '操作',
      dataIndex: '操作',
      width: 80,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span onClick={() => toDetails(record)}>查看</span>
          </DoCon>
        )
      }
    }
  ]
  return (
    <Wrapper>
      <BaseTable
        loading={recordViewModal.tableLoading}
        dataSource={recordViewModal.tableList}
        columns={columns}
        type={['index', 'fixedIndex']}
        surplusHeight={220}
        surplusWidth={300}
        pagination={{
          current: recordViewModal.pageIndex,
          total: recordViewModal.total,
          pageSize: recordViewModal.pageSize
        }}
        onRow={(record) => {
          return {
            onDoubleClick: (e: any) => {
              toDetails(record)
            }
          }
        }}
        onChange={(pagination) => {
          recordViewModal.pageIndex = pagination.current
          recordViewModal.total = pagination.total
          recordViewModal.pageSize = pagination.pageSize
          recordViewModal.onload()
        }}
      />
    </Wrapper>
  )
})
const Wrapper = styled(TabledCon)``
