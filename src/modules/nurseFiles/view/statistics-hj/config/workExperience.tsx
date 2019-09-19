import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '工作经历',
  type: 'nurseWorkExperience',
  detailPath: 'workHistory',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },

    {
      label: '单位',
      type: 'input',
      name: 'unit'
    },
    {
      label: '开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['startDateStart', 'startDateEnd']
    },
    {
      label: '结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker2',
      nameList: ['endDateStart', 'endDateEnd']
    }
  ],
  tableList: [
    {
      title: '开始年月',
      dataIndex: 'startTime',
      key: '2',
      width: 120,
      align: 'center'
    },
    {
      title: '结束年月',
      dataIndex: 'endTime',
      key: '3',
      width: 120,
      align: 'center'
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: '4',
      width: 250,
      align: 'center'
    }
  ]
}
