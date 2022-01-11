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
import EditInnaiQualificationModal from '../modal/EditInnaiQualificationModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
import { isSelf } from './BaseInfo'

import Do from '../components/Do'
export interface Props extends RouteComponentProps { }

export default observer(function InnaiQualification() {
  const editOnEducationModal = createModal(EditInnaiQualificationModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHQualificationIn', appStore.queryObj.empNo).then((res) => {
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
      title: '授权类别',
      dataIndex: 'grantType',
      key: 'grantType',
      width: 120,
      align: 'center'
    },
    {
      title: '授权名称',
      dataIndex: 'grantName',
      key: 'grantName',
      width: 120,
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
      title: '有效期',
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
    Do('nurseWHQualificationIn', editOnEducationModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='外出进修' btnList={isSelf() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editOnEducationModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
