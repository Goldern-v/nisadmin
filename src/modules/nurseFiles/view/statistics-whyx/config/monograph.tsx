import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '专著',
  type: 'nurseWHMonograph',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '年份',
      type: 'yearRangePicker',
      name: 'yearRangePicker',
      nameList: ['yearStartDate', 'yearEndDate']
    },

    {
      label: '专著名称',
      type: 'input',
      name: 'monographName'
    },
    {
      label: '出版号',
      type: 'input',
      name: 'pressNumber'
    },
    {
      label: '出版日期',
      type: 'dateRangePicker',
      name: 'dateRangePicker2',
      nameList: ['pressStartDate', 'pressEndDate']
    },

    {
      label: '著者',
      type: 'select',
      name: 'participation',
      dataSource: statisticsViewModal.getDict('参编')
    }
  ],
  tableList: [
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      width: 120,
      align: 'center'
    },
    {
      title: '专著名称',
      dataIndex: 'monographName',
      key: 'monographName',
      width: 200,
      align: 'center'
    },
    {
      title: '出版社名称',
      dataIndex: 'pressName',
      key: 'pressName',
      width: 200,
      align: 'center'
    },
    {
      title: '出版号',
      dataIndex: 'pressNumber',
      key: 'pressNumber',
      width: 180,
      align: 'center'
    },
    {
      title: '出版日期',
      dataIndex: 'pressDate',
      key: 'pressDate',
      width: 120,
      align: 'center'
    },
    {
      title: '著者',
      dataIndex: 'participation',
      key: 'participation',
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
