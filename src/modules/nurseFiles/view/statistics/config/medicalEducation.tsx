import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '医学学历教育',
  type: 'nurseWHMedicalEducation',
  detailPath: 'educationalExperience',
  filterList: [
    {
      label: '科室',
      type: 'select',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode'
    },
    {
      label: '毕业学校',
      type: 'input',
      name: 'graduationSchool'
    },
    {
      label: '就读专业',
      type: 'input',
      name: 'readProfessional'
    },
    {
      label: '学历',
      type: 'select',
      name: 'education',
      dataSource: statisticsViewModal.getDict('学历')
    },
    {
      label: '学位',
      type: 'select',
      name: 'degree',
      dataSource: statisticsViewModal.getDict('学位')
    },
    {
      label: '开始时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker1',
      nameList: ['startDateStart', 'startDateEnd']
    },
    {
      label: '结束时间',
      type: 'dateRangePicker',
      name: 'dateRangePicker2',
      nameList: ['endDateStart', 'endDateEnd']
    },

    {
      label: '文章名称',
      type: 'input',
      name: 'articleName'
    },
    {
      label: '期刊号',
      type: 'input',
      name: 'periodicalNumber'
    },
    {
      label: '文章类别',
      type: 'select',
      name: 'articleType',
      dataSource: statisticsViewModal.getDict('文章类别')
    }
  ],
  tableList: [
    {
      title: '发表年份',
      dataIndex: 'publicYear',
      key: 'publicYear',
      width: 120,
      align: 'center'
    },
    {
      title: '杂志名称',
      dataIndex: 'magazineName',
      key: 'magazineName',
      width: 90,
      align: 'center'
    },
    {
      title: '文章名称',
      dataIndex: 'articleName',
      key: 'articleName',
      width: 90,
      align: 'center'
    },
    {
      title: '期刊号',
      dataIndex: 'periodicalNumber',
      key: 'periodicalNumber',
      width: 90,
      align: 'center'
    },
    {
      title: '卷号',
      dataIndex: 'volumeNumber',
      key: 'volumeNumber',
      width: 90,
      align: 'center'
    },
    {
      title: '起止页码',
      dataIndex: 'pageNumber',
      key: 'pageNumber',
      width: 90,
      align: 'center'
    },
    {
      title: '文章类别',
      dataIndex: 'articleType',
      key: 'articleType',
      width: 90,
      align: 'center'
    },
    {
      title: '论文收录网站',
      dataIndex: 'influencingFactors',
      key: 'influencingFactors',
      width: 120,
      align: 'center'
    },
    {
      title: '文章扫描件',
      dataIndex: '文章扫描件',
      key: '文章扫描件',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '网络下载件',
      dataIndex: '网络下载件',
      key: '网络下载件',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageTwo ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    }
  ]
}
