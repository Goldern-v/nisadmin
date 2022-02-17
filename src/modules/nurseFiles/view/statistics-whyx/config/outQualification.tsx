import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '资质管理（院外）',
  type: 'nurseWHQualificationOut',
  detailPath: 'onEducation',
  filterList: [
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode',
      multiple: true
    },
    {
      label: '工号或姓名',
      type: 'input',
      name: 'empNo',
      limit: 25
    },
    {
      label: '证书名称',
      type: 'multiplesSelect',
      name: 'certificateName',
      dataSource: statisticsViewModal.getDict('证书名称')
    },
    {
      label: '级别',
      type: 'multiplesSelect',
      name: 'grade',
      dataSource: statisticsViewModal.getDict('级别')
    },
    {
      label: '发证单位',
      type: 'input',
      name: 'issueUnit'
    },
    {
      label: '发证时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['issueDateBeginIndex', 'issueDateEndIndex']
    },
    {
      label: '证书编号',
      type: 'input',
      name: 'certificateNo'
    }
  ],
  tableList: [
    {
      title: '证书名称',
      dataIndex: 'certificateName',
      key: 'certificateName',
      width: 200,
      align: 'center'
    },
    {
      title: '级别',
      dataIndex: 'grade',
      key: 'grade',
      width: 210,
      align: 'center'
    },
    {
      title: '发证单位',
      dataIndex: 'issueUnit',
      key: 'issueUnit',
      width: 110,
      align: 'center'
    },
    {
      title: '发证时间',
      dataIndex: 'issueDate',
      key: 'issueDate',
      width: 100,
      align: 'center'
    },
    {
      title: '证书编号',
      dataIndex: 'certificateNo',
      key: 'certificateNo',
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
