import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '专利',
  type: 'nurseWHPatent',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'select',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '专利名称',
      type: 'input',
      name: 'patentName'
    },
    {
      label: '专利号',
      type: 'input',
      name: 'patentNumber'
    },
    {
      label: '发证单位',
      type: 'input',
      name: 'cardUnit'
    },
    {
      label: '发证开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['startDateStart', 'startDateEnd']
    },
    {
      label: '发证结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker2',
      nameList: ['endDateStart', 'endDateEnd']
    },
    {
      label: '专利类型',
      type: 'select',
      name: 'patentType',
      dataSource: statisticsViewModal.getDict('专利类型')
    }
  ],
  tableList: [
    {
      title: '专利名称',
      dataIndex: 'patentName',
      key: 'patentName',
      width: 120,
      align: 'center'
    },
    {
      title: '专利排名',
      dataIndex: 'patentLevel',
      key: 'patentLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '专利号',
      dataIndex: 'patentNumber',
      key: 'patentNumber',
      width: 90,
      align: 'center'
    },
    {
      title: '发证单位',
      dataIndex: 'cardUnit',
      key: 'cardUnit',
      width: 120,
      align: 'center'
    },
    {
      title: '发证时间',
      dataIndex: 'cardDate',
      key: 'cardDate',
      width: 120,
      align: 'center'
    },
    {
      title: '专利类型',
      dataIndex: 'patentType',
      key: 'patentType',
      width: 90,
      align: 'center'
    },
    {
      title: '是否成果转化',
      dataIndex: 'isResultTransfor',
      key: 'isResultTransfor',
      width: 110,
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
