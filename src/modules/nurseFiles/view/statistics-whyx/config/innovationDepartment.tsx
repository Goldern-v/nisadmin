import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '科室创新',
  type: 'nurseWHInnovationDept',
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
      label: '申报人',
      type: 'input',
      name: 'declarant'
    },
    {
      label: '申报科室',
      type: 'multiplesSelect',
      name: 'declarantDeptName',
      dataSource: [...statisticsViewModal.getDict('全部科室')],
    },
    {
      label: '登记单位',
      type: 'input',
      name: 'registerUnit'
    },
    {
      label: '申报时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['declarantDateBeginIndex', 'declarantDateEndIndex']
    },
    {
      label: '登记号',
      type: 'input',
      name: 'registerNo'
    },
    {
      label: '参与成员',
      type: 'input',
      name: 'participants'
    },
    {
      label: '创新类别', 
      type: 'multiplesSelect',
      name: 'innovationType',
      dataSource: statisticsViewModal.getDict('创新类别')
    },
    {
      label: '创新级别', 
      type: 'multiplesSelect',
      name: 'innovationGrade',
      dataSource: statisticsViewModal.getDict('创新级别')
    },
    {
      label: '推广区域', 
      type: 'multiplesSelect',
      name: 'promotionArea',
      dataSource: statisticsViewModal.getDict('推广区域')
    },

  ],
  tableList: [ 
    {
      title: '申报人',
      dataIndex: 'declarant',
      width: 150,
      align: 'center'
    },
    {
      title: '申报科室',
      dataIndex: 'declarantDeptName',
      width: 100,
      align: 'center'
    },
    {
      title: '申报时间',
      dataIndex: 'declarantDate',
      width: 150,
      align: 'center'
    },
    {
      title: '登记单位',
      dataIndex: 'registerUnit',
      width: 100,
      align: 'center'
    },
    {
      title: '登记号',
      dataIndex: 'registerNo',
      width: 100,
      align: 'center'
    },
    {
      title: '参与成员',
      dataIndex: 'participants',
      width: 150,
      align: 'center'
    },
    {
      title: '创新类别',
      dataIndex: 'innovationType',
      width: 100,
      align: 'center'
    },
    {
      title: '创新级别',
      dataIndex: 'innovationGrade',
      width: 100,
      align: 'center'
    },
    {
      title: '推广区域',
      dataIndex: 'promotionArea',
      width: 100,
      align: 'center'
    }
  ]
}
