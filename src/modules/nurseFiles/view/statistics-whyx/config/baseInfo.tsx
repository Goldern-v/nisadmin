import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

let list: any= ['全部']
for (let i = 0; i < 100; i++) {
  list.push(i)
}

export const pageObj: PageObj = {
  title: '基本信息',
  type: 'nurseWHArticle',
  detailPath: '',
  filterList: [
    {
      label: '姓名或工号',
      type: 'input',
      name: 'keyWord'
    },
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode',
      multiple: true
    },
    {
      label: '年龄',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      dataSource: list,
      unit: '岁',
      name: 'ageStart',
      name1: 'ageEnd',
    },
    {
      label: '政治面貌',
      type: 'select',
      name: 'politics',
      dataSource: statisticsViewModal.getDict('文章类别')
    },
    {
      label: '最高学历',
      type: 'select',
      name: 'politics',
      dataSource: statisticsViewModal.getDict('文章类别')
    },
    {
      label: '职务',
      type: 'select',
      name: 'politics',
      dataSource: statisticsViewModal.getDict('文章类别')
    },
    {
      label: '年龄',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      dataSource: list,
      unit: '年',
      name: 'ageStart',
      name1: 'ageEnd',
    },
    {
      label: '院内工作区域',
      type: 'select',
      name: 'politics',
      dataSource: statisticsViewModal.getDict('文章类别')
    },
    {
      label: '最高职称',
      type: 'select',
      name: 'politics',
      dataSource: statisticsViewModal.getDict('文章类别')
    },
    {
      label: '层级护理',
      type: 'select',
      name: 'politics',
      dataSource: statisticsViewModal.getDict('文章类别')
    },
    {
      label: '执业证书有效期',
      type: 'numberUntilSelect',
      dataSource: list,
      unit: '月',
      name: 'ageStart',
      name1: 'ageEnd',
      numberUntilSelect: true,
    },
    {
      label: '参加工作时间',
      type: 'numberUntilSelect',
      dataSource: list,
      unit: '年',
      numberUntilSelect: true,
      name: 'ageStart',
      name1: 'ageEnd',
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
      width: 200,
      align: 'center'
    },
    {
      title: '文章名称',
      dataIndex: 'articleName',
      key: 'articleName',
      width: 200,
      align: 'center'
    },
    {
      title: '作者',
      dataIndex: 'articleAuthor',
      key: 'articleAuthor',
      width: 120,
      align: 'center'
    },
    {
      title: '期刊号',
      dataIndex: 'periodicalNumber',
      key: 'periodicalNumber',
      width: 210,
      align: 'center'
    },
    {
      title: '卷号',
      dataIndex: 'volumeNumber',
      key: 'volumeNumber',
      width: 200,
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
        return <DoCon>{row.urlImageTwo ? <Zimage text='查看' list={row.urlImageTwo.split(',')} /> : ''}</DoCon>
      }
    }
  ]
}
