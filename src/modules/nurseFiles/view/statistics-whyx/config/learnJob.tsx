import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '学会任职',
  type: 'nurseWHLearnJob',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      multiple: true,
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '工号或姓名',
      type: 'input',
      name: 'empNo'
    },
    {
      label: '起始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['startDateStart', 'startDateEnd']
    },
    {
      label: '结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker2',
      nameList: ['endDateStart', 'endDateEnd']
    },
    {
      label: '任职学会名称',
      type: 'input',
      name: 'learnJobName'
    },
    {
      label: '学会职位',
      type: 'input',
      name: 'learnPosition'
    },
    {
      label: '学会级别',
      type: 'multiplesSelect',
      name: 'learnLevel',
      dataSource: statisticsViewModal.getDict('级别')
    },
  ],
  tableList: [
    {
      title: '起始时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
      align: 'center'
    },
    {
      title: '任职学会名称',
      dataIndex: 'learnJobName',
      key: 'learnJobName',
      width: 200,
      align: 'center'
    },
    {
      title: '学会职位',
      dataIndex: 'learnPosition',
      key: 'learnPosition',
      width: 90,
      align: 'center'
    },
    {
      title: '学会级别',
      dataIndex: 'learnLevel',
      key: 'learnLevel',
      width: 90,
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
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 120,
      align: 'center'
    },
  ]
}
