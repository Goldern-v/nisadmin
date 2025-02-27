import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '参与科研课题',
  type: 'nurseWHGoScienceCourse',
  detailPath: 'joinScientific',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '课题名称',
      type: 'input',
      name: 'goName'
    },
    {
      label: '主持人姓名',
      type: 'input',
      name: 'hostName'
    },
    {
      label: '主持人工号',
      type: 'input',
      name: 'hostNo'
    },
    {
      label: '课题来源',
      type: 'input',
      name: 'courseSource'
    },
    {
      label: '课题级别',
      type: 'select',
      name: 'courseLevel',
      dataSource: statisticsViewModal.getDict('级别')
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
      label: '参与排名',
      type: 'input',
      name: 'goRank'
    },
    {
      label: '完成情况',
      type: 'select',
      name: 'courseCompletion',
      dataSource: statisticsViewModal.getDict('完成情况')
    }
  ],
  tableList: [
    {
      title: '参与课题名称',
      dataIndex: 'goName',
      key: 'goName',
      width: 200,
      align: 'center'
    },
    {
      title: '课题主持人姓名',
      dataIndex: 'hostName',
      key: 'hostName',
      width: 120,
      align: 'center'
    },
    {
      title: '课题主持人工号',
      dataIndex: 'hostNo',
      key: 'hostNo',
      width: 120,
      align: 'center'
    },
    {
      title: '参与排名',
      dataIndex: 'goRank',
      key: 'goRank',
      width: 90,
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
      title: '承担单位',
      dataIndex: 'unit',
      key: 'unit',
      width: 150,
      align: 'center'
    },
    {
      title: '课题批文号',
      dataIndex: 'approvalNumber',
      key: 'approvalNumber',
      width: 150,
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
      width: 120,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
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
    }
  ]
}
