import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '院内工作经历',
  type: 'nurseWHWorkExperienceIn',
  detailPath: 'workHistory',
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
      name: 'empNo'
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
    },
    {
      label: '单位',
      type: 'input',
      name: 'unit'
    },
  ],
  tableList: [ 
    {
      title: "工作地点",
      dataIndex: "insideOutsideState",
      width: 100,
      align: "center",
      render(text: any, record: any) {
        return text == 1 ? "院内" : text == 2 ? "院外" : text;
      }
    },
    {
      title: '开始年月',
      dataIndex: 'startTime',
      key: '2',
      width: 120,
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
      title: '单位',
      dataIndex: 'unit',
      key: '4',
      width: 250,
      align: 'center'
    },
    {
      title: '院外工作科室',
      dataIndex: 'department',
      key: '5',
      width: 250,
      align: 'center'
    }
  ]
}
