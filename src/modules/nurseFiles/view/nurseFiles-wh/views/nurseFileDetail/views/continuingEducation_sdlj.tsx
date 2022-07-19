import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import Zimage from 'src/components/Zimage'
import continuingEducationModal_sdlj from '../modal/continuingEducationModal_sdlj'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf,editFlag } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function PersonWinning() {
  const continuingEducationModal = createModal(continuingEducationModal_sdlj)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHEduSanki', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => continuingEducationModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = [
    // {
    //   title: '序号',
    //   dataIndex: '',
    //   key: '序号',
    //   render: (text: any, record: any, index: number) => index + 1,
    //   align: 'center',
    //   width: 55
    // },
    {
      title: '年度',
      dataIndex: 'year',
      key: 'year',
      width: 100,
      align: 'center'
    },
    {
      title: '继续教育达标情况',
      children: [
        {
          title: '达标情况',
          dataIndex: 'standardInfo',
          key: 'standardInfo',
          width: 100,
          align: 'center'
        },
        {
          title: '附件',
          dataIndex: 'fj',
          key: 'fj',
          width: 100,
          align: 'center',
          render: (text: any, row: any, index: any) => {
            return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
          }
        },
      ]
    },
    {
      title: '三基考核情况',
      children: [
        {
          title: '理论',
          children: [
            {
              title: '合格',
              dataIndex: 'theoryAssess',
              key: 'theoryAssess',
              width: 100,
              align: 'center'
            },
            {
              title: '补考合格',
              dataIndex: 'theoryAssessMakeup',
              key: 'theoryAssessMakeup',
              width: 100,
              align: 'center',
              render: (text: any, row: any, index: any) => {
                console.log(text, row, index, 7777777)
                return <span>{row.id ? (text ? text : '-') : ''}</span>
              }
            },
          ]
        },
        {
          title: '操作',
          children: [
            {
              title: '合格',
              dataIndex: 'operateAssess',
              key: 'operateAssess',
              width: 100,
              align: 'center',
            },
            {
              title: '补考合格',
              dataIndex: 'operateAssessMakeup',
              key: 'operateAssessMakeup',
              width: 100,
              align: 'center',
              render: (text: any, row: any, index: any) => {
                return <span>{row.id ? (text ? text : '-') : ''}</span>
              }
            }
          ]
        },
      ]
    },
    Do('nurseWHEduSanki', continuingEducationModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='继续教育学分统计及三基考试情况' btnList={isSelf() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <continuingEducationModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
