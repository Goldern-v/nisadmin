import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '主持科研课题',
  type: 'nurseWHHostScienceCourse',
  detailPath: 'hostingScientific',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      multiple: true,
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '工号或姓名',
      type: 'input',
      name: 'empNo'
    },
    {
      label: '主持科研课题',
      type: 'input',
      name: 'goName'
    },
    {
      label: '课题来源',
      type: 'input',
      name: 'courseSource'
    },
    {
      label: '课题级别',
      type: 'multiplesSelect',
      name: 'courseLevel',
      dataSource: statisticsViewModal.getDict('级别')
    },
    {
      label: '课题类别',
      type: 'multiplesSelect',
      name: 'subjectType',
      dataSource: statisticsViewModal.getDict('课题类别')
    },
    {
      label: '承担单位',
      type: 'input',
      name: 'unit'
    },
    {
      label: '课题批文号',
      type: 'input',
      name: 'approvalNumber'
    },
    {
      label: '项目编号',
      type: 'input',
      name: 'registerNumber'
    },
    {
      label: '开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['startDateStart', 'startDateEnd']
    },
    {
      label: '截止时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker2',
      nameList: ['endDateStart', 'endDateEnd']
    },
    {
      label: '完成情况',
      type: 'multiplesSelect',
      name: 'courseCompletion',
      dataSource: statisticsViewModal.getDict('完成情况')
    },
    {
      label: '时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['completionDateBeginIndex', 'completionDateEndIndex']
    },
  ],
  tableList: [
    {
      title: '主持科研课题',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      align: 'center'
    },
    {
      title: '课题来源',
      dataIndex: 'courseSource',
      key: 'courseSource',
      width: 200,
      align: 'center'
    },
    {
      title: '课题级别',
      dataIndex: 'courseLevel',
      key: 'courseLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '课题类别',
      dataIndex: 'subjectType',
      key: 'subjectType',
      width: 90,
      align: 'center'
    },
    {
      title: '承担单位',
      dataIndex: 'unit',
      key: 'unit',
      width: 160,
      align: 'center'
    },
    {
      title: '课题批文号',
      dataIndex: 'approvalNumber',
      key: 'approvalNumber',
      width: 170,
      align: 'center'
    },
    {
      title: '项目编号',
      dataIndex: 'registerNumber',
      key: 'registerNumber',
      width: 80,
      align: 'center'
    },

    {
      title: '开始时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 110,
      align: 'center'
    },
    {
      title: '截止时间',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 110,
      align: 'center'
    },
    {
      title: '完成情况',
      dataIndex: 'courseCompletion',
      key: 'courseCompletion',
      width: 90,
      align: 'center'
    },
    {
      title: '时间',
      dataIndex: 'completionDate',
      key: 'completionDate',
      width: 180,
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
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 120,
      align: 'center'
    },
  ]
}
