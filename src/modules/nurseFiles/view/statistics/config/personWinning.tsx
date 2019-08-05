import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '个人获奖',
  type: 'nurseWHPersonWinning',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'select',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '获奖年月',
      type: 'yearMonthRangePicker',
      name: 'YearMonthRangePicker',
      nameList: ['winningYearStartDate', 'winningYearEndDate']
    },
    {
      label: '获奖名称',
      type: 'input',
      name: 'winningName'
    },
    {
      label: '获奖类别',
      type: 'select',
      name: 'winningType',
      dataSource: statisticsViewModal.getDict('获奖类别')
    },
    {
      label: '获奖级别',
      type: 'select',
      name: 'winningLevel',
      dataSource: statisticsViewModal.getDict('获奖级别')
    }
  ],
  tableList: [
    {
      title: '获奖名称',
      dataIndex: 'winningName',
      key: 'winningName',
      width: 120,
      align: 'center'
    },
    {
      title: '获奖类别',
      dataIndex: 'winningType',
      key: 'winningType',
      width: 90,
      align: 'center'
    },
    {
      title: '获奖级别',
      dataIndex: 'winningLevel',
      key: 'winningLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '获奖年月',
      dataIndex: 'winningYear',
      key: 'winningYear',
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
    }
  ]
}
