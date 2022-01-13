import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '岗位变动',
  type: 'nurseWHTransferPost',
  detailPath: 'toNewPost',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '原工作科室',
      type: 'select',
      name: 'oldDeptName',
      dataSource: statisticsViewModal.getDict('全部科室').filter((item) => item.name != '全院')
    },
    {
      label: '新工作科室',
      type: 'select',
      name: 'newDeptName',
      dataSource: statisticsViewModal.getDict('完整科室')
    },
    {
      label: '现科室隶属部门',
      type: 'select',
      name: 'deptBeDepartment',
      dataSource: statisticsViewModal.getDict('现科室隶属部门')
    },
    {
      label: '转岗时间',
      type: 'dateRangePicker',
      name: 'transferDate',
      nameList: ['transferStartDate', 'transferEndDate']
    }
  ],
  tableList: [
    {
      title: '原工作科室',
      dataIndex: 'oldDeptName',
      key: 'oldDeptName',
      width: 130,
      align: 'center'
    },
    {
      title: '现工作科室',
      dataIndex: 'newDeptName',
      key: 'newDeptName',
      width: 130,
      align: 'center'
    },
    {
      title: '现科室隶属部门',
      dataIndex: 'deptBeDepartment',
      key: 'deptBeDepartment',
      width: 130,
      align: 'center'
    },
    {
      title: '转岗时间',
      dataIndex: 'transferDate',
      key: 'transferDate',
      width: 110,
      align: 'center'
    }
    // {
    //   title: '附件',
    //   dataIndex: 'fj',
    //   key: 'fj',
    //   width: 80,
    //   align: 'center',
    //   render: (text: any, row: any, index: any) => {
    //     return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
    //   }
    // }
  ]
}
