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
      type: 'multiplesSelect',
      multiple: true,
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '工号或姓名',
      type: 'input',
      name: 'empNo'
    },
    {
      label: '专利名称',
      type: 'input',
      name: 'patentName'
    },
    {
      label: '专利个人排名',
      type: 'multiplesSelect',
      name: 'patentLevel',
      dataSource: [{ name: '第一人', code: '第一人' }, { name: '第二人', code: '第二人' }, { name: '第三人', code: '第三人' }, { name: '其他', code: '其他' }]
    },
    {
      label: '专利号',
      type: 'input',
      name: 'patentNumber'
    },
    {
      label: '发证时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['cardStartDate', 'cardEndDate']
    },
    {
      label: '发证单位',
      type: 'input',
      name: 'cardUnit'
    },
    {
      label: '专利类型',
      type: 'multiplesSelect',
      name: 'patentType',
      dataSource: [{ name: '全部', code: '' }, ...statisticsViewModal.getDict('专利类型')]
    },
    {
      label: '是否成果转化',
      type: 'multiplesSelect',
      name: 'isResultTransfor',
      dataSource: [{ name: '是', code: '是' }, { name: '否', code: '否' }]
    },
    {
      label: '授权公告日',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['grantNoticeDateBeginIndex', 'grantNoticeDateEndIndex']
    }
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
      title: '授权公告日',
      dataIndex: 'grantNoticeDate',
      key: 'grantNoticeDate',
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
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 120,
      align: 'center'
    },
  ]
}
