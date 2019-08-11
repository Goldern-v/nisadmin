import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '编制变动',
  type: 'nurseWHWorkConversion',
  detailPath: 'OrganizationChange',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '原编制名称',
      type: 'select',
      name: 'workConversionOld',
      dataSource: statisticsViewModal.getDict('工作编制')
    },
    {
      label: '现编制名称',
      type: 'select',
      name: 'workConversionNew',
      dataSource: statisticsViewModal.getDict('工作编制')
    },
    {
      label: '现编制开始时间',
      type: 'dateRangePicker',
      name: 'startDate',
      nameList: ['startDateStart', 'startDateEnd']
    }
  ],
  tableList: [
    {
      title: '原编制名称',
      dataIndex: 'workConversionOld',
      key: 'workConversionOld',
      width: 100,
      align: 'center'
    },
    {
      title: '现编制名称',
      dataIndex: 'workConversionNew',
      key: 'workConversionNew',
      width: 100,
      align: 'center'
    },
    {
      title: '现编制开始时间',
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
