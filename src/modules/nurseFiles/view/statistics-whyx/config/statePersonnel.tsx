import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
// import { DoCon } from 'src/components/BaseTable'
// import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '人员状态',
  type: 'nurseWHArticle',
  detailPath: '',
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
      limit: 25
    },
    {
      label: '岗位状态', 
      type: 'multiplesSelect',
      name: 'postState',
      dataSource: [{name: '全部', code: ''}, {name: '在岗', code: '1'}, {name: '不在岗', code: '2'}]
    },
    {
      label: '状态原因',
      type: 'input',
      name: 'articleName1',
      placeholder: '请输入状态原因'
    },
  ],
  tableList: [
    {
      title: '岗位状态',
      dataIndex: 'influencingFactors',
      key: 'influencingFactors',
      width: 120,
      align: 'center'
    },
    {
      title: '状态原因',
      dataIndex: 'volumeNumber',
      key: 'volumeNumber',
      width: 200,
      align: 'center'
    },
  ]
}
