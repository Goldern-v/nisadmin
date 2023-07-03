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
import EditPatentModal from '../modal/EditPatentModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf,editFlag } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function Patent() {
  const editPatentModal = createModal(EditPatentModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHPatent', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editPatentModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
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
    ...(
      'dghm' === appStore.HOSPITAL_ID
      ? [{
        title: '授权公告日',
        dataIndex: 'grantNoticeDate',
        key: 'grantNoticeDate',
        width: 90,
        align: 'center'
      }]
      : []
    ),
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
    Do('nurseWHPatent', editPatentModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='专利' btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editPatentModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
