import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '著作译文论文',
  type: 'nursePaperExperience',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '发表时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['startDate', 'endDate']
    },
    {
      label: '题目',
      type: 'input',
      name: 'title'
    },
    {
      label: '排名',
      type: 'input',
      name: 'rank'
    },
    {
      label: '出版或登载刊物',
      type: 'input',
      name: 'publication'
    }
  ],
  tableList: [
    {
      title: '发表日期',
      dataIndex: 'publicDate',
      key: 'publicDate',
      width: 120,
      align: 'center'
    },
    {
      title: '题目',
      dataIndex: 'title',
      key: 'title',
      width: 160,
      align: 'left'
    },
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      align: 'center'
    },
    {
      title: '出版或登载刊物',
      dataIndex: 'publication',
      key: 'publication',
      width: 180,
      align: 'left'
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
