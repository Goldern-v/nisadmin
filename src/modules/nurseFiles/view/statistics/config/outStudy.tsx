import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '外出进修',
  type: 'nurseWHOutStudy',
  detailPath: 'onEducation',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },

    {
      label: '进修专业',
      type: 'input',
      name: 'nurseName'
    },
    {
      label: '进修单位',
      type: 'input',
      name: 'cardUnit'
    },

    {
      label: '进修单位所属地',
      type: 'select',
      name: 'nurseLevel',
      dataSource: statisticsViewModal.getDict('进修单位')
    },
    {
      label: '进修开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['cardNumberStartDate', 'cardNumberEndDate']
    },
    {
      label: '进修结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['cardNumberStartDate', 'cardNumberEndDate']
    },
    {
      label: '进修时长(天)',
      type: 'input',
      name: 'cardUnit'
    }
  ],
  tableList: [
    {
      title: '进修专业',
      dataIndex: 'studyMajor',
      key: 'studyMajor',
      width: 200,
      align: 'center'
    },
    {
      title: '进修单位',
      dataIndex: 'unit',
      key: 'unit',
      width: 210,
      align: 'center'
    },
    {
      title: '进修单位所属地',
      dataIndex: 'unitLocal',
      key: 'unitLocal',
      width: 110,
      align: 'center'
    },
    {
      title: '进修开始时间',
      dataIndex: 'startDate',
      key: 'winningYear',
      width: 100,
      align: 'center'
    },
    {
      title: '进修结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 100,
      align: 'center'
    },
    {
      title: '进修时长(天)',
      dataIndex: 'studyHour',
      key: 'studyHour',
      width: 80,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: 'fj',
      width: 70,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    }
  ]
}
