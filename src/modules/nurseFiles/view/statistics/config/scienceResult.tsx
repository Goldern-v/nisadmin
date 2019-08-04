import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '文章',
  type: 'nurseWHScienceResult',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'select',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '获奖类别',
      type: 'input',
      name: 'resultType'
    },
    {
      label: '成果名称',
      type: 'input',
      name: 'resultName'
    },
    {
      label: '授予单位',
      type: 'input',
      name: 'grantUnit'
    },
    {
      label: '授予单位',
      type: 'input',
      name: 'grantUnit'
    },
    {
      label: '授予开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['startDateStart', 'startDateEnd']
    },
    {
      label: '授予结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker2',
      nameList: ['endDateStart', 'endDateEnd']
    },

    {
      label: '奖励级别',
      type: 'select',
      name: 'winningLevel',
      dataSource: statisticsViewModal.getDict('级别')
    },
    {
      label: '奖励名称、等级',
      type: 'input',
      name: 'winningName'
    }
  ],
  tableList: [
    {
      title: '获奖类别',
      dataIndex: 'resultType',
      key: 'resultType',
      width: 90,
      align: 'center'
    },
    {
      title: '成果名称',
      dataIndex: 'resultName',
      key: 'resultName',
      width: 90,
      align: 'center'
    },
    {
      title: '属于单位',
      dataIndex: 'grantUnit',
      key: 'grantUnit',
      width: 90,
      align: 'center'
    },
    {
      title: '授予时间',
      dataIndex: 'grantDate',
      key: 'grantDate',
      width: 90,
      align: 'center'
    },
    {
      title: '奖励级别',
      dataIndex: 'winningLevel',
      key: 'winningLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '奖励名称',
      dataIndex: 'winningName',
      key: 'winningName',
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
