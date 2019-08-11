import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '层级统计',
  type: 'nurseWHHierarchy',
  detailPath: 'RankChange',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '原层级名称',
      type: 'select',
      name: 'nursehierarchyOld',
      dataSource: statisticsViewModal.getDict('层级')
    },
    {
      label: '现层级名称',
      type: 'select',
      name: 'nursehierarchyNew',
      dataSource: statisticsViewModal.getDict('层级')
    },
    {
      label: '现层级时间',
      type: 'dateRangePicker',
      name: 'startDate',
      nameList: ['startDateStart', 'startDateEnd']
    }
  ],
  tableList: [
    {
      title: '原层级名称',
      dataIndex: 'nursehierarchyOld',
      key: 'nursehierarchyOld',
      width: 100,
      align: 'center'
    },
    {
      title: '现层级名称',
      dataIndex: 'nursehierarchyNew',
      key: 'nursehierarchyNew',
      width: 100,
      align: 'center'
    },
    {
      title: '现层级时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: 'fj',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    }
  ]
}
