import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '所获奖励',
  type: 'nurseAwardWinning',
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
      label: '获奖项目',
      type: 'input',
      name: 'awardWinningName'
    },
    {
      label: '授奖级别',
      type: 'input',
      name: 'awardlevel'
    },
    {
      label: '批准机关',
      type: 'input',
      name: 'approvalAuthority'
    },
    {
      label: '排名',
      type: 'input',
      name: 'rank'
    }
  ],
  tableList: [
    {
      title: '获奖项目',
      dataIndex: 'awardWinningName',
      key: 'awardWinningName',
      width: 120,
      align: 'center'
    },
    {
      title: '授奖级别',
      dataIndex: 'awardlevel',
      key: 'awardlevel',
      width: 200,
      align: 'center'
    },
    {
      title: '批准机关',
      dataIndex: 'approvalAuthority',
      key: 'approvalAuthority',
      width: 200,
      align: 'center'
    },
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 210,
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
