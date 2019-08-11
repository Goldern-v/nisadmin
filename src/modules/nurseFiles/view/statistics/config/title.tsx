import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '职称变动',
  type: 'nurseWHTitle',
  detailPath: 'PositionChange',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '原职称名称',
      type: 'select',
      name: 'titleOld',
      dataSource: statisticsViewModal.getDict('技术职称')
    },
    {
      label: '新职称名称',
      type: 'select',
      name: 'titleNew',
      dataSource: statisticsViewModal.getDict('技术职称')
    },
    {
      label: '考取专业技术资格证时间',
      type: 'dateRangePicker',
      name: 'winNewTiTleDate',
      nameList: ['winNewTiTleStartDate', 'winNewTiTleEndDate']
    },
    {
      label: '聘用专业技术资格证时间',
      type: 'dateRangePicker',
      name: 'employNewTiTleDate',
      nameList: ['employNewTiTleStartDate', 'employNewTiTleEndDate']
    }
  ],
  tableList: [
    {
      title: '原职称名称',
      dataIndex: 'titleOld',
      key: 'titleOld',
      width: 100,
      align: 'center'
    },
    {
      title: '现职称名称',
      dataIndex: 'titleNew',
      key: 'titleNew',
      width: 100,
      align: 'center'
    },
    {
      title: '考取专业技术资格证书时间',
      dataIndex: 'winNewTiTleDate',
      key: 'winNewTiTleDate',
      width: 140,
      align: 'center'
    },
    {
      title: '聘用专业技术资格时间',
      dataIndex: 'employNewTiTleDate',
      key: 'employNewTiTleDate',
      width: 140,
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
