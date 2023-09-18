import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '在院工作情况',
  type: 'EditWorkRegistrationFormModal',
  detailPath: 'workHistory',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },

    {
      label: '单位',
      type: 'input',
      name: 'unit'
    },
    // {
    //   label: '专业技术工作',
    //   type: 'select',
    //   name: 'professionalWork',
    //   dataSource: statisticsViewModal.getDict('专业技术工作')
    // },

    // {
    //   label: '技术职称',
    //   type: 'select',
    //   name: 'professional',
    //   dataSource: statisticsViewModal.getDict('技术职称')
    // },
    // {
    //   label: '职务',
    //   type: 'select',
    //   name: 'post',
    //   dataSource: statisticsViewModal.getDict('职务')
    // },
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
      title: '年度',
      dataIndex: 'year',
      key: '2',
      width: 70,
      align: 'center'
    },
    {
      title: '结束年月',
      dataIndex: 'endTime',
      key: '3',
      width: 120,
      align: 'center'
    },
    {
      title: '夜班',
      dataIndex: 'nightShift',
      key: '4',
      width: 70,
      align: 'center'
    },
    {
      title: '查房',
      dataIndex: 'checkOut',
      key: '5',
      width: 70,
      align: 'center'
    },
    {
      title: '护理会诊',
      dataIndex: 'nursingConsultation',
      key: '6',
      width: 70,
      align: 'center'
    },
    {
      title: '病例讨论',
      dataIndex: 'caseDiscussion',
      key: '7',
      width: 70,
      align: 'center'
    },
    {
      title: '个案',
      dataIndex: 'individualCase',
      key: '8',
      width: 70,
      align: 'center'
    },
    {
      title: '小讲课',
      dataIndex: 'lecture',
      key: '9',
      width: 80,
      align: 'center'
    },
    {
      title: '带教',
      dataIndex: 'teaching',
      key: '10',
      width: 70,
      align: 'center'
    },
    {
      title: '证明人',
      dataIndex: 'witness',
      key: '11',
      width: 80,
      align: 'center'
    }
    // {
    //   title: '专业技术工作',
    //   dataIndex: 'professionalWork',
    //   key: '5',
    //   width: 100,
    //   align: 'center'
    // },
    // {
    //   title: '技术职称',
    //   dataIndex: 'professional',
    //   key: 'professional',
    //   width: 100,
    //   align: 'center'
    // },
    // {
    //   title: '职务',
    //   dataIndex: 'post',
    //   key: 'post',
    //   width: 100,
    //   align: 'center'
    // }
  ]
}
