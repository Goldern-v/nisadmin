import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '学术活动',
  type: 'nurseWHAcademic',
  detailPath: 'onEducation',
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
      name: 'empNo',
      limit: 25,
    },
    {
      label: '开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['startTimeBeginIndex', 'startTimeEndIndex']
    },
    {
      label: '举办地点',
      type: 'input',
      name: 'hostAddress'
    },
    {
      label: '结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['endTimeBeginIndex', 'endTimeEndIndex']
    },
    {
      label: '学术活动名称',
      type: 'input',
      name: 'academicName'
    },
    {
      label: '举办地域',
      type: 'multiplesSelect',
      name: 'hostArea',
      dataSource: statisticsViewModal.getDict('举办地域')
    },
    {
      label: '举办单位',
      type: 'input',
      name: 'hostUnit'
    },
    {
      label: '以何种资格获得邀请',
      type: 'input',
      name: 'qualification'
    },
  ],
  tableList: [
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 100,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 100,
      align: 'center'
    },
    {
      title: '学术活动名称',
      dataIndex: 'academicName',
      key: 'academicName',
      width: 80,
      align: 'center'
    },
    {
      title: '举办地域',
      dataIndex: 'hostArea',
      key: 'hostArea',
      width: 200,
      align: 'center'
    },
    {
      title: '举办单位',
      dataIndex: 'hostUnit',
      key: 'hostUnit',
      width: 210,
      align: 'center'
    },
    {
      title: '举办地点',
      dataIndex: 'hostAddress',
      key: 'hostAddress',
      width: 110,
      align: 'center'
    },
    {
      title: '以何种资格获得邀请',
      dataIndex: 'qualification',
      key: 'qualification',
      width: 100,
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
