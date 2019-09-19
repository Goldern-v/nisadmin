import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '教育经历',
  type: 'nurseMedicalEducation',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '毕业学校',
      type: 'input',
      name: 'graduationSchool'
    },
    {
      label: '就读专业',
      type: 'input',
      name: 'readProfessional'
    },
    {
      label: '学历',
      type: 'select',
      name: 'education',
      dataSource: statisticsViewModal.getDict('学历')
    },
    {
      label: '学位',
      type: 'select',
      name: 'degree',
      dataSource: statisticsViewModal.getDict('学位')
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
      title: '就读时间',
      dataIndex: 'readTime',
      key: '2',
      width: 120,
      align: 'center'
    },
    {
      title: '毕业时间',
      dataIndex: 'graduationTime',
      key: '3',
      width: 120,
      align: 'center'
    },
    {
      title: '毕业学校',
      dataIndex: 'graduationSchool',
      key: '4',
      width: 140,
      align: 'center'
    },
    {
      title: '专业',
      dataIndex: 'readProfessional',
      key: '5',
      width: 120,
      align: 'center'
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: '6',
      width: 100,
      align: 'center'
    },
    {
      title: '学位',
      dataIndex: 'degree',
      key: 'degree',
      width: 100,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '7',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    }
  ]
}
