import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '社会兼职',
  type: 'nurseWHSocialJob',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '兼职级别',
      type: 'select',
      name: 'socialLevel',
      dataSource: statisticsViewModal.getDict('获奖级别')
    },
    {
      label: '兼职名称',
      type: 'input',
      name: 'socialJobName'
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
    }
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
      title: '社会兼职名称',
      dataIndex: 'socialJobName',
      key: 'socialJobName',
      width: 200,
      align: 'center'
    },
    // {
    //   title: '学会职位',
    //   dataIndex: 'learnPosition',
    //   key: 'learnPosition',
    //   width: 90,
    //   align: 'center'
    // },
    {
      title: '兼职级别',
      dataIndex: 'socialLevel',
      key: 'socialLevel',
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
