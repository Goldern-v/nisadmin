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
import EditScientificResearchModal from '../modal/EditScientificResearchModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
import { isSelf } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function scientificResearch() {
  const editScientificResearchModal = createModal(EditScientificResearchModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHScienceResult', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editScientificResearchModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    {
      title: '获奖类别(主持/参与排名)',
      dataIndex: 'resultType',
      key: 'resultType',
      width: 90,
      align: 'center'
    },
    {
      title: '项目名称',
      dataIndex: 'resultName',
      key: 'resultName',
      width: 90,
      align: 'center'
    },
    {
      title: '授予单位',
      dataIndex: 'grantUnit',
      key: 'grantUnit',
      width: 90,
      align: 'center'
    },
    {
      title: '授予时间',
      dataIndex: 'grantDate',
      key: 'grantDate',
      width: 90,
      align: 'center'
    },
    {
      title: '奖励级别',
      dataIndex: 'winningLevel',
      key: 'winningLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '奖励名称、等级',
      dataIndex: 'winningName',
      key: 'winningName',
      width: 90,
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
    Do('nurseWHScienceResult', editScientificResearchModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='科研课题获奖' btnList={isSelf() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editScientificResearchModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
