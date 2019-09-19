import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '职称层级变动',
  type: 'nurseProfessionalAndLevelChange',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '职称聘用时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['startDate', 'endDate']
    },
    {
      label: '职称资格',
      type: 'input',
      name: 'titleQualification'
    },
    {
      label: '层级',
      type: 'select',
      name: 'hierarchy',
      dataSource: statisticsViewModal.getDict('层级')
    }
  ],
  tableList: [
    {
      title: '职称聘用时间',
      dataIndex: 'appointmentTime',
      key: 'appointmentTime',
      width: 120,
      align: 'center'
    },
    {
      title: '职称资格',
      dataIndex: 'titleQualification',
      key: 'titleQualification',
      width: 120,
      align: 'center'
    },
    {
      title: '现层级',
      dataIndex: 'hierarchy',
      key: 'hierarchy',
      width: 80,
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
