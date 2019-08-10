import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '专科护士',
  type: 'nurseWHSpecializNurse',
  detailPath: '',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },

    {
      label: '专科护士名称',
      type: 'input',
      name: 'nurseName'
    },
    {
      label: '发证单位',
      type: 'input',
      name: 'cardUnit'
    },
    {
      label: '证书编号',
      type: 'input',
      name: 'cardNumber'
    },
    {
      label: '级别',
      type: 'select',
      name: 'nurseLevel',
      dataSource: statisticsViewModal.getDict('级别')
    },
    {
      label: '发证时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['cardNumberStartDate', 'cardNumberEndDate']
    }
  ],
  tableList: [
    {
      title: '专科护士名称',
      dataIndex: 'nurseName',
      key: 'nurseName',
      width: 90,
      align: 'center'
    },
    {
      title: '发证单位',
      dataIndex: 'cardUnit',
      key: 'cardUnit',
      width: 90,
      align: 'center'
    },
    {
      title: '证书编号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      width: 90,
      align: 'center'
    },
    {
      title: '级别',
      dataIndex: 'nurseLevel',
      key: 'nurseLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '发证时间',
      dataIndex: 'cardNumberDate',
      key: 'cardNumberDate',
      width: 90,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'urlImageOne',
      key: 'urlImageOne',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    }
  ]
}
