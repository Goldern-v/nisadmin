import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '继续教育',
  type: 'nurseContinuingEducation',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['startDateStart', 'startDateEnd']
    },
    {
      label: '结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['endDateStart', 'endDateEnd']
    },
    {
      label: '杂志名称',
      type: 'input',
      name: 'trainingUnit'
    },
    {
      label: '文章名称',
      type: 'input',
      name: 'trainingContent'
    },
    {
      label: '期刊号',
      type: 'input',
      name: 'hours'
    }
  ],
  tableList: [
    {
      title: '发表开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 120,
      align: 'center'
    },
    {
      title: '发表结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 120,
      align: 'center'
    },

    {
      title: '杂志名称',
      dataIndex: 'trainingUnit',
      key: 'trainingUnit',
      width: 150,
      align: 'left'
    },
    {
      title: '文章名称',
      dataIndex: 'trainingContent',
      key: 'trainingContent',
      width: 200,
      align: 'left'
    },
    {
      title: '期刊号',
      dataIndex: 'hours',
      key: 'hours',
      width: 210,
      align: 'center'
    },
    {
      title: '文章扫描件',
      dataIndex: '文章扫描件',
      key: '文章扫描件',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    }
  ]
}
