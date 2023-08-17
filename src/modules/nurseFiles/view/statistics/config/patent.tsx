import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj, filterItem } from './getPageObj'
import { appStore } from 'src/stores'
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
      type: 'multiplesSelect',
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
      label: '发证时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['cardStartDate', 'cardEndDate']
    },

    {
      label: '专利类型',
      type: 'select',
      name: 'patentType',
      dataSource: statisticsViewModal.getDict('专利类型')
    },
    ...(appStore.HOSPITAL_ID=='wh' ? [{
      label: '专利排名',
      type: 'input',
      name: 'patentLevel'
    }]as filterItem[] : []),
  ],
  tableList: [
    {
      title: '专利名称',
      dataIndex: 'patentName',
      key: 'patentName',
      width: 200,
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
      width: 150,
      align: 'center'
    },
    {
      title: '发证单位',
      dataIndex: 'cardUnit',
      key: 'cardUnit',
      width: 200,
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
      width: 120,
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
