import React, { useState, useEffect } from 'react'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '特殊资格证',
  type: 'nurseSpecialQualification',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '获奖时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['startDate', 'endDate']
    },
    {
      label: '资格证名称',
      type: 'input',
      name: 'specialQualificationName'
    },
    {
      label: '资格证编号',
      type: 'input',
      name: 'specialquaLificationNo'
    }
  ],
  tableList: [
    {
      title: '获奖时间',
      dataIndex: 'time',
      key: 'time',
      width: 100,
      align: 'center'
    },
    {
      title: '资格证名称',
      dataIndex: 'specialQualificationName',
      key: 'specialQualificationName',
      width: 150,
      align: 'left'
    },
    {
      title: '资格证编号',
      dataIndex: 'specialquaLificationNo',
      key: 'specialquaLificationNo',
      width: 180,
      align: 'left'
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
