import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

export const pageObj: PageObj = {
  title: '文章',
  type: 'nurseWHArticle',
  detailPath: '',
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
      label: '杂志名称',
      type: 'input',
      name: 'magazineName'
    },
    {
      label: '文章名称',
      type: 'input',
      name: 'articleName'
    },
    {
      label: '作者',
      type: 'input',
      name: 'articleAuthor'
    },
    {
      label: '期刊年月',
      type: 'yearMonthRangePicker',
      name: 'yearMonthRangePicker',
      nameList: ['journalStartIndex', 'journalEndIndex']
    },
    {
      label: '卷期号',
      type: 'input',
      name: 'volumeNumber'
    },
    {
      label: '文章类别',
      type: 'multiplesSelect',
      name: 'articleType',
      dataSource: statisticsViewModal.getDict('文章类别')
    },
    {
      label: '论文收录网站',
      type: 'multiplesSelect',
      name: 'influencingFactors',
      dataSource: statisticsViewModal.getDict('论文收录网站')
    },
  ],
  tableList: [
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
      title: '期刊年月',
      dataIndex: 'journal',
      key: 'journal',
      width: 120,
      align: 'center'
    },
    {
      title: '卷期号',
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
      title: '封面扫描件',
      dataIndex: '封面扫描件',
      key: '封面扫描件',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '目录扫描件',
      dataIndex: '目录扫描件',
      key: '目录扫描件',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageThree ? <Zimage text='查看' list={row.urlImageThree.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '正文扫描件',
      dataIndex: '正文扫描件',
      key: '正文扫描件',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageFour ? <Zimage text='查看' list={row.urlImageFour.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '封底扫描件',
      dataIndex: '封底扫描件',
      key: '封底扫描件',
      width: 80,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageFive ? <Zimage text='查看' list={row.urlImageFive.split(',')} /> : ''}</DoCon>
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
