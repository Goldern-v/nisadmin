import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '举办继续教育培训班',
  type: 'nurseWHContinueStudy',
  detailPath: 'continuingEducation',
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
      label: '名称',
      type: 'input',
      name: 'projectName'
    }
  ],
  tableList: [
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      width: 90,
      align: 'center'
    },
    {
      title: '级别',
      dataIndex: 'projectLevel',
      key: 'projectLevel',
      width: 80,
      align: 'center'
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 210,
      align: 'center'
    },

    {
      title: '课时数',
      dataIndex: 'courseHour',
      key: 'courseHour',
      width: 90,
      align: 'center'
    },
    {
      title: '学员总数',
      dataIndex: 'personTotal',
      key: 'personTotal',
      width: 90,
      align: 'center'
    },
    {
      title: '学员分布区域',
      dataIndex: 'schoolArea',
      key: 'schoolArea',
      width: 210,
      align: 'center'
    },
    {
      title: '学员职称分布',
      dataIndex: 'personTitleArea',
      key: 'personTitleArea',
      width: 210,
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
