import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '医学学历教育',
  type: 'nurseWHRegistrationWork',
  detailPath: 'educationalExperience',
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
      label: '查房',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      numberUntilInput: true,
      unit: '小时',
      name: 'nightShiftScopeBegin',
      name1: 'nightShiftEndScopeEnd',
    },
    {
      label: '夜班数',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      numberUntilInput: true,
      unit: '小时',
      name: 'checkOutScopeBegin',
      name1: 'checkOutScopeEnd',
    },
    {
      label: '护理会诊',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      numberUntilInput: true,
      unit: '小时',
      name: 'nursingConsultationScopeBegin',
      name1: 'nursingConsultationScopeEnd',
    },
    {
      label: '病例讨论',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      numberUntilInput: true,
      unit: '小时',
      name: 'caseDiscussionScopeBegin',
      name1: 'caseDiscussionScopeEnd',
    },
    {
      label: '个案',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      numberUntilInput: true,
      unit: '小时',
      name: 'individualCaseScopeBegin',
      name1: 'individualCaseScopeEnd',
    },
    {
      label: '小讲课',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      numberUntilInput: true,
      unit: '小时',
      name: 'lectureScopeBegin',
      name1: 'lectureScopeEnd',
    },
    {
      label: '带教',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      numberUntilInput: true,
      unit: '小时',
      name: 'teachingScopeBegin',
      name1: 'teachingScopeEnd',
    },
    {
      label: '证明人',
      type: 'input',
      name: 'witness'
    },
    {
      label: '年度',
      type: 'yearRangePicker',
      name: 'yearRangePicker1',
      nameList: ['yearStartDate', 'yearEndDate']
    },
  ],
  tableList: [
    {
      title: "年度",
      dataIndex: "year",
      width: 100,
      align: "center"
    },
    {
      title: "夜班",
      dataIndex: "nightShift",
      width: 100,
      align: "center"
    },
    {
      title: "查房",
      dataIndex: "checkOut",
      width: 150,
      align: "center"
    },
    {
      title: "护理会诊",
      dataIndex: "nursingConsultation",
      width: 150,
      align: "center"
    },

    {
      title: '病例讨论',
      dataIndex: 'caseDiscussion',
      width: 150,
      align: 'center'
    },
    {
      title: '个案',
      dataIndex: 'individualCase',
      width: 150,
      align: 'center'
    },
    {
      title: '小讲课',
      dataIndex: 'lecture',
      width: 150,
      align: 'center'
    },
    {
      title: '带教',
      dataIndex: 'teaching',
      width: 150,
      align: 'center'
    },
    {
      title: '证明人',
      dataIndex: 'witness',
      width: 100,
      align: 'center'
    },
    // {
    //   title: '附件',
    //   dataIndex: 'fj',
    //   key: '7',
    //   width: 100,
    //   align: 'center',
    //   render: (text: any, row: any, index: any) => {
    //     return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
    //   }
    // }
  ]
}
