import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { qualityAnalysisReportViewModal } from 'src/modules/quality/views/qualityAnalysisReport/QualityAnalysisReportViewModal'
import { reportViewModal } from '../ReportViewModal'
import { sexToChina } from 'src/utils/transform/sexToChina'
import service from 'src/services/api'
import { appStore } from 'src/stores'
import qs from 'qs'
export interface Props {}

export default observer(function Table() {

  const toDetails = (record: any) => {
    appStore.history.push(`/qualityScheduleRecordDetails/${record.id}`)
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '查房编号',
      dataIndex: 'srCode',
      width: 170,
      align: 'center'
    },
    {
      title: '查房日期',
      dataIndex: 'srDate',
      width: 100,
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
      width: 140,
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
      width: 140,
      align: 'center',
      render (status: string) {
        switch (status) {
          case '1':
            return '暂存'
          case '2':
            return '待质控组长审核'
          case '3':
            return '待护理部审核'
          case '4':
            return '护理部已评'
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
        loading={reportViewModal.tableLoading}
        dataSource={reportViewModal.tableList}
        columns={columns}
        type={['index', 'fixedIndex']}
        surplusHeight={220}
        surplusWidth={300}
        pagination={{
          current: reportViewModal.pageIndex,
          total: reportViewModal.total,
          pageSize: reportViewModal.pageSize
        }}
        onRow={(record) => {
          return {
            onDoubleClick: (e: any) => {
              toDetails(record)
            }
          }
        }}
        onChange={(pagination) => {
          reportViewModal.pageIndex = pagination.current
          reportViewModal.total = pagination.total
          reportViewModal.pageSize = pagination.pageSize
          reportViewModal.onload()
        }}
      />
    </Wrapper>
  )
})
const Wrapper = styled(TabledCon)``
