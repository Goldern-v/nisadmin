import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '工作经历',
  type: 'nurseWHWorkExperience',
  detailPath: 'workHistory',
  filterList: [
    {
      label: '科室',
      type: 'select',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },

    {
      label: '单位',
      type: 'input',
      name: 'unit'
    },
    {
      label: '专业技术工作',
      type: 'input',
      name: 'professionalWork'
    },

    {
      label: '技术职称',
      type: 'select',
      name: 'professional',
      dataSource: statisticsViewModal.getDict('技术职称')
    },
    {
      label: '职务',
      type: 'select',
      name: 'post',
      dataSource: statisticsViewModal.getDict('职务')
    },
    {
      label: '开始时间',
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
      title: '开始年月',
      dataIndex: 'startTime',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '结束年月',
      dataIndex: 'endTime',
      key: '3',
      width: 100,
      align: 'center'
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: '4',
      width: 100,
      align: 'center'
    },
    {
      title: '专业技术工作',
      dataIndex: 'professionalWork',
      key: '5',
      width: 150,
      align: 'center'
    },
    {
      title: '技术职称',
      dataIndex: 'professional',
      key: 'professional',
      width: 100,
      align: 'center'
    },
    {
      title: '职务',
      dataIndex: 'post',
      key: 'post',
      width: 100,
      align: 'center'
    }
  ]
}
