import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '学术活动',
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
      label: '工号或姓名',
      type: 'input',
      name: 'studyMajor'
    },
    {
      label: '开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['startDateStart', 'startDateEnd']
    },
    {
      label: '举办地点',
      type: 'input',
      name: 'studyMajor'
    },
    {
      label: '结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['endDateStart', 'endDateEnd']
    },
    {
      label: '学术活动名称',
      type: 'input',
      name: 'unit'
    },
    {
      label: '举办地域',
      type: 'select',
      name: 'unitLocal',
      dataSource: statisticsViewModal.getDict('进修单位')
    },
    {
      label: '举办单位',
      type: 'input',
      name: 'unit'
    },
    {
      label: '以何种资格获得邀请',
      type: 'input',
      name: 'unit'
    },
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
