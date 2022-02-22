import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { qualityAnalysisReportViewModal } from 'src/modules/quality/views/qualityAnalysisReport/QualityAnalysisReportViewModal'
import { retiredRetireesViewModal } from '../StaffMovementEnquiryModal'
import { sexToChina } from 'src/utils/transform/sexToChina'
import service from 'src/services/api'
import { appStore } from 'src/stores'
import qs from 'qs'
export interface Props {}

export default observer(function Table() {
  const toDetails = (record: any) => {
    service.commonApiService.getNurseInformation(record.empNo).then((res) => {
      // appStore.history.push(`/nurseAudit?${qs.stringify(res.data)}`)
      window.open(`/crNursing/manage/#/nurseFileDetail/Leave?empNo=${res.data.empNo}`)
    })
  }
  const columns: ColumnProps<any>[] = [
    {
      title: '姓名',
      dataIndex: 'empName',
      // width: 120
      align: 'center'
    },
    {
      title: '工号',
      dataIndex: 'empNo',
      // width: 120
      align: 'center'
    },
    {
      title: '调动时间',
      dataIndex: 'startDate',
      // width: 120,
      align: 'center'
    },
    {
      title: '原科室',
      dataIndex: 'deptCodeNameOld',
      // width: 120,
      align: 'center'
    },
    {
      title: '新科室',
      dataIndex: 'deptNameNew',
      // width: 120,
      align: 'center'
    },
    {
      title: '职务',
      dataIndex: 'job',
      // width: 120,
      align: 'center'
    }
  ]
  return (
    <Wrapper>
      <BaseTable
        loading={retiredRetireesViewModal.tableLoading}
        dataSource={retiredRetireesViewModal.tableList}
        columns={columns}
        type={['index', 'fixedIndex']}
        surplusHeight={180}
        surplusWidth={300}
        pagination={{
          current: retiredRetireesViewModal.pageIndex,
          total: retiredRetireesViewModal.total,
          pageSize: retiredRetireesViewModal.pageSize
        }}
        onRow={(record) => {
          return {
            onDoubleClick: (e: any) => {
              toDetails(record)
            }
          }
        }}
        onChange={(pagination) => {
          retiredRetireesViewModal.pageIndex = pagination.current
          retiredRetireesViewModal.total = pagination.total
          retiredRetireesViewModal.pageSize = pagination.pageSize
          retiredRetireesViewModal.onload()
        }}
      />
    </Wrapper>
  )
})
const Wrapper = styled(TabledCon)``
