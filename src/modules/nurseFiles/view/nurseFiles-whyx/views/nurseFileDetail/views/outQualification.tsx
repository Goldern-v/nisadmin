import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'

import { globalModal } from 'src/global/globalModal'
import { authStore } from 'src/stores'
import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import EditOutQualificationModal from '../modal/EditOutQualificationModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
import { isSelf } from './BaseInfo'

import Do from '../components/Do'
export interface Props extends RouteComponentProps { }

export default observer(function InnaiQualification() {
  const editOnEducationModal = createModal(EditOutQualificationModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHQualificationOut', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editOnEducationModal.show({ signShow: '添加' })
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
      title: '证书名称',
      dataIndex: 'certificateName',
      key: 'certificateName',
      width: 120,
      align: 'center'
    },
    {
      title: '级别',
      dataIndex: 'grade',
      key: 'grade',
      width: 120,
      align: 'center'
    },
    {
      title: '发证单位',
      dataIndex: 'issueUnit',
      key: 'issueUnit',
      width: 110,
      align: 'center'
    },
    {
      title: '发证时间',
      dataIndex: 'issueDate',
      key: 'issueDate',
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
      title: '证书有效期',
      dataIndex: 'validityDate',
      key: 'validityDate',
      width: 100,
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
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 80,
      align: 'center'
    },
    Do('nurseWHQualificationOut', editOnEducationModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='资质管理' btnList={isSelf() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editOnEducationModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
