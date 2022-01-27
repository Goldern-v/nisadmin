import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '资质管理（院外）',
  type: 'nurseWHQualificationIn',
  detailPath: 'onEducation',
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
      label: '授权类别',
      type: 'multiplesSelect',
      // name: 'unitLocal',
      name: 'grantType',
      dataSource: statisticsViewModal.sortList,
    },
    {
      label: '授权名称',
      type: 'multiplesSelecteSpecially',
      // name: 'unitLocal1',
      name: 'grantName',
      // dataSource: statisticsViewModal.getDict('进修单位')
    },
    {
      label: '证书编号',
      type: 'input',
      name: 'certificateNo'
    },
    {
      label: '认证部门',
      type: 'input',
      name: 'certificateUnit'
    },
    {
      label: '有效期至',
      type: 'dateRangePicker',
      name: 'dateRangePicker',
      nameList: ['certificateDateBeginIndex', 'certificateDateEndIndex']
    },
    {
      label: '认证时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['validityDateBeginIndex', 'validityDateEndIndex']
    }
  ],
  tableList: [
    {
      title: '授权类别',
      dataIndex: 'grantType',
      key: 'grantType',
      width: 150,
      align: 'center'
    },
    {
      title: '授权名称',
      dataIndex: 'grantName',
      key: 'grantName',
      width: 210,
      align: 'center'
    },
    {
      title: '认证部门',
      dataIndex: 'certificateUnit',
      key: 'certificateUnit',
      width: 110,
      align: 'center'
    },
    {
      title: '认证时间',
      dataIndex: 'certificateDate',
      key: 'certificateDate',
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
      title: '有效期至',
      dataIndex: 'validityDate',
      key: 'validityDate',
      width: 80,
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
