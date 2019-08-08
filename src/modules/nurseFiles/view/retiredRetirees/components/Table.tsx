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
      window.open(`/crNursing/manage/#/nurseFileDetail/${appStore.match.params.path}?${qs.stringify(res.data)}`)
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
      title: '性别',
      dataIndex: 'sex',
      width: 80,
      render(text: any, row: any) {
        return sexToChina(text)
      }
    },

    {
      title: '年龄',
      dataIndex: 'age',
      width: 80
    },
    {
      title: '职称',
      dataIndex: 'newTitle',
      width: 100,
      align: 'center'
    },
    {
      title: '层级',
      dataIndex: 'nurseHierarchy',
      width: 100,
      align: 'center'
    },
    {
      title: '职务',
      dataIndex: 'job',
      width: 100,
      align: 'center'
    },
    {
      title: '最高学历',
      dataIndex: 'highestEducation',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80
    },
    {
      title: '籍贯',
      dataIndex: 'nativePlace',
      width: 100,
      align: 'left'
    },
    {
      title: '民族',
      dataIndex: 'nation',
      width: 80
    },
    {
      title: '执业证书编号',
      dataIndex: 'zyzsNumber',
      width: 100,
      align: 'left'
    },
    {
      title: '操作',
      dataIndex: '操作',
      width: 80,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span onClick={() => toDetails(record)}>操作</span>
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
        type={['index']}
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
