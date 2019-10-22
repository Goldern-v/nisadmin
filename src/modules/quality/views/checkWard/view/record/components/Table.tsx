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

  const columns: any = [
    {
      title: '查房日期',
      dataIndex: 'srDate',
      width: 140,
      align: 'center'
    },
    {
      title: '查房类型',
      dataIndex: 'type',
      width: 130,
      align: 'center'
    },
    {
      title: '检查病区',
      dataIndex: 'wardName',
      width: 120
    },
    {
      title: '检查人员',
      dataIndex: 'srName',
      width: 100,
      align: 'center'
    },
    {
      title: '护士在岗情况',
      dataIndex: 'nurseStatus',
      width: 260,
      align: 'left',
      render(status: string, record: any) {
        return status == '0' ? '无问题' : <span style={{ color: 'red' }}>有问题({record.nurseProblem})</span>
      }
    },
    {
      title: '病人情况',
      dataIndex: 'patientStatus',
      width: 260,
      align: 'left',
      render(status: string, record: any) {
        return status == '0' ? '无问题' : <span style={{ color: 'red' }}>有问题({record.patientProblem})</span>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      align: 'center',
      render(status: string, record: any) {
        if(status == '2'){
          return '病区处理'
        } else if(status == '3'){
          return '科护士长审核'
        }else if(status == '4'){
          return '护理部审核'
        } else if(record.patientStatus == '0' && record.nurseStatus == '0'){
          return '科护士长审核'
        } else {
          return '病区处理'
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
