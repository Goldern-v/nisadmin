import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '医院三基考核',
  type: 'nurseHospitalsThreeBase',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '发表年份',
      type: 'yearRangePicker',
      name: 'yearRangePicker',
      nameList: ['yearStartDate', 'yearEndDate']
    },
    {
      label: '理论考核成绩',
      type: 'input',
      name: 'theoryScore'
    },
    {
      label: '技术操作考核成绩',
      type: 'input',
      name: 'technologyScore'
    }
  ],
  tableList: [
    {
      title: '年度',
      dataIndex: 'year',
      key: 'year',
      width: 120,
      align: 'center'
    },
    {
      title: '理论考核成绩',
      dataIndex: 'theoryScore',
      key: 'theoryScore',
      width: 200,
      align: 'center'
    },
    {
      title: '技术操作考核成绩',
      dataIndex: 'technologyScore',
      key: 'technologyScore',
      width: 200,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    }
  ]
}
