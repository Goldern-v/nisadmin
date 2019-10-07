import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { qualityAnalysisReportViewModal } from 'src/modules/quality/views/qualityAnalysisReport/QualityAnalysisReportViewModal'
import { retiredRetireesViewModal } from '../RetiredRetireesViewModal'
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
      title: '片区',
      dataIndex: 'bigDept',
      width: 100,
      align: 'left'
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 150,
      align: 'left'
    },
    {
      title: '员工号',
      dataIndex: 'empNo',
      width: 100
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      width: 100
    },
    {
      title: '职称',
      dataIndex: 'newTitle',
      key: 'newTitle',
      width: 120,
      align: 'center'
    },
    {
      title: '学历',
      dataIndex: 'highestEducation',
      key: 'highestEducation',
      width: 90,
      align: 'center'
    },
    {
      title: '出生年月日',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 120,
      align: 'center'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 90,
      align: 'center'
    },
    {
      title: '取得护士执业证书并从事护理岗位时间',
      dataIndex: 'zyzsDate',
      key: 'zyzsDate',
      width: 200,
      align: 'center'
    },
    {
      title: '离职时间',
      dataIndex: 'leaveDate',
      key: 'leaveDate',
      width: 120,
      align: 'center'
    },
    {
      title: '层级',
      dataIndex: 'nurseHierarchy',
      key: 'nurseHierarchy',
      width: 90,
      align: 'center'
    },
    {
      title: '编制',
      dataIndex: 'workConversion',
      key: 'workConversion',
      width: 90,
      align: 'center'
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center'
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
