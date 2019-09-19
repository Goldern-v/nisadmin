import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '工作情况登记',
  type: 'nurseRegistrationWork',
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
      nameList: ['startDate', 'endDate']
    },
    {
      label: '夜班',
      type: 'input',
      name: 'nightShift'
    },
    {
      label: '查房',
      type: 'input',
      name: 'checkOut'
    },
    {
      label: '护理会诊',
      type: 'input',
      name: 'nursingConsultation'
    },
    {
      label: '病例讨论',
      type: 'input',
      name: 'caseDiscussion',
    }
  ],
  tableList: [
    {
      title: '年度',
      dataIndex: 'year',
      key: 'year',
      width: 120,
      align: 'center'
    },
    {
      title: '夜班',
      dataIndex: 'nightShift',
      key: 'nightShift',
      width: 200,
      align: 'center'
    },
    {
      title: '查房',
      dataIndex: 'checkOut',
      key: 'checkOut',
      width: 200,
      align: 'center'
    },
    {
      title: '护理会议',
      dataIndex: 'nursingConsultation',
      key: 'nursingConsultation',
      width: 210,
      align: 'center'
    },
    {
      title: '病例讨论',
      dataIndex: 'caseDiscussion',
      key: 'caseDiscussion',
      width: 200,
      align: 'center'
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
