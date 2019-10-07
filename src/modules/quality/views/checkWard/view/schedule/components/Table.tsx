import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { qualityAnalysisReportViewModal } from 'src/modules/quality/views/qualityAnalysisReport/QualityAnalysisReportViewModal'
import { scheduleViewModal } from '../ScheduleViewModal'
import { sexToChina } from 'src/utils/transform/sexToChina'
import service from 'src/services/api'
import { appStore } from 'src/stores'
import qs from 'qs'
export interface Props {}

export default observer(function Table() {

  const toDetails = (record: any) => {
    // appStore.history.push(`/qualityScheduleRecordDetails`)
  }


  
  const columns: ColumnProps<any>[] = [
    {
      title: '工号',
      dataIndex: 'empNo',
      width: 100,
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      width: 100,
      align: 'center'
    },
    {
      title: '时间',
      dataIndex: '',
      colSpan: 11,
      width: 50
    },
    {
      title: '时间1',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '时间2',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '时间3',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '时间4',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '时间5',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '时间6',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '时间7',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '时间8',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '时间9',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '时间10',
      dataIndex: '',
      colSpan: 0,
      width: 50
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 250
    },  
    {
      title: '状态',
      dataIndex: '',
      width: 100,
      render (status: string) {
        return status == '1' ?  '已推送' : '未推送'
      }
    }  
  ]
  return (
    <Wrapper>
      <Title>护理{scheduleViewModal.tableName}计划表</Title>
      <Time>日期：{scheduleViewModal.tableTime}</Time>
      <BaseTable
        loading={scheduleViewModal.tableLoading}
        dataSource={scheduleViewModal.tableList}
        columns={columns}
        type={['index', 'fixedIndex']}
        surplusHeight={220}
        surplusWidth={300}
        onRow={(record) => {
          return {
            onDoubleClick: (e: any) => {
              toDetails(record)
            }
          }
        }}
        onChange={() => {
          scheduleViewModal.onload()
        }}
      />
    </Wrapper>
  )
})
const Wrapper = styled(TabledCon)`
  overflow: hidden;
`
const Title = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`
const Time = styled.div`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-top: 10px;
`
