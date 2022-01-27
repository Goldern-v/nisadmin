import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { filterItem, PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'
import { appStore } from 'src/stores'
import { ColumnProps } from 'src/vendors/antd'

export const pageObj: PageObj = {
  title: '举办继续教育培训班',
  type: 'nurseWHContinueStudy',
  detailPath: 'continuingEducation',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      multiple: true,
      name: 'deptCode'
    },
    {
      label: '工号或姓名',
      type: 'input',
      name: 'empNo',
      limit: 25
    },
    {
      label: '项目名称',
      type: 'input',
      name: 'projectName'
    },
    {
      label: '项目负责人',
      type: 'input',
      name: 'projectPerson'
    },
    {
      label: '开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['hostStartDateBeginIndex', 'hostStartDateEndIndex']
    },
    {
      label: '结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['hostEndDateBeginIndex', 'hostEndDateEndIndex']
    },
    {
      label: '学员分布区域',
      type: 'input',
      name: 'schoolArea'
    },
    {
      label: '学员职称分布',
      type: 'input',
      name: 'personTitleArea'
    },
    {
      label: '课时数',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      numberUntilInput: true,
      unit: '小时',
      name: 'courseHourBeginIndex',
      name1: 'courseHourEndIndex',
    },
    {
      label: '学员总数',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      numberUntilInput: true,
      unit: '人',
      step: 1,
      name: 'personTotalBeginIndex',
      name1: 'personTotalEndIndex',
    },
  ],
  tableList: [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 210,
      align: 'center'
    },
    {
      title: '项目负责人',
      dataIndex: 'projectPerson',
      key: 'projectPerson',
      width: 100,
      align: 'center'
    },
    {
      title: '举办起止时间',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <div><span>{row.hostStartDate}</span> <span>{row.hostEndDate}</span></div>
      }
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
