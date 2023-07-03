import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'

import Zimage from 'src/components/Zimage'
import EditArticleModal from '../modal/EditArticleModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf, editFlag } from './BaseInfo'
import Do from '../components/Do'

export interface Props extends RouteComponentProps { }
const isDghm = 'dghm' === appStore.HOSPITAL_ID

export default observer(function Awards() {
  const editArticleModal = createModal(EditArticleModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHArticle', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editArticleModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = ['zhzxy'].includes(appStore.HOSPITAL_ID) ? [
    {
      title: '序号',
      dataIndex: '',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    {
      title: '作者',
      dataIndex: 'articleAuthor',
      key: 'articleAuthor',
      width: 80,
      align: 'center',
    },
    {
      title: '文章名称',
      dataIndex: 'articleName',
      key: 'articleName',
      width: 200,
      align: 'center'
    },
    {
      title: '出版时间',
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
      title: '卷号',
      dataIndex: 'volumeNumber',
      key: 'volumeNumber',
      width: 200,
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
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 120,
      align: 'center'
    },
    Do('nurseWHArticle', editArticleModal, getTableData)
  ] : [
    {
      title: '序号',
      dataIndex: '',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    }, {
      title: isDghm ? 'publicYear' : '出版时间',
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
    ...appStore.hisMatch({
      map: {
        zzwy: [],
        dghm: [
          {
            title: '期刊年月',
            dataIndex: 'journal',
            key: 'journal',
            width: 80,
            align: 'center',
          },
          {
            title: '作者',
            dataIndex: 'articleAuthor',
            key: 'articleAuthor',
            width: 80,
            align: 'center',
          },
        ],
        other: [
          {
            title: '作者',
            dataIndex: 'articleAuthor',
            key: 'articleAuthor',
            width: 80,
            align: 'center',
          },
        ]
      }
    }),
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
    },
    ...(isDghm
      ? [
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
          title: '封底描件',
          dataIndex: '封底描件',
          key: '封底描件',
          width: 80,
          align: 'center',
          render: (text: any, row: any, index: any) => {
            return <DoCon>{row.urlImageFive ? <Zimage text='查看' list={row.urlImageFive.split(',')} /> : ''}</DoCon>
          }
        },] : []),
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 120,
      align: 'center'
    },
    Do('nurseWHArticle', editArticleModal, getTableData)
  ]

  useEffect(() => {
    console.log('good work')
    getTableData()
  }, [])

  return (
    <BaseLayout title='文章' btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={260} surplusWidth={250} type={['spaceRow']} />
      <editArticleModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
