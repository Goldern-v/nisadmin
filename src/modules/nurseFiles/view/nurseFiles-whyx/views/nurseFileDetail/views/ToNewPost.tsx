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
import EditToNewPostModal from '../modal/EditToNewPostModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
import { isSelf } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function PersonWinning() {
  const editToNewPostModal = createModal(EditToNewPostModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHTransferPost', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  // const btnList = [
  //   {
  //     label: '添加',
  //     onClick: () => editToNewPostModal.show({ signShow: '添加' })
  //   }
  // ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '序号',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    {
      title: '原工作科室',
      dataIndex: 'oldDeptName',
      key: 'oldDeptName',
      width: 130,
      align: 'center'
    },
    {
      title: '现工作科室',
      dataIndex: 'newDeptName',
      key: 'newDeptName',
      width: 130,
      align: 'center'
    },
    {
      title: '现科室隶属部门',
      dataIndex: 'deptBeDepartment',
      key: 'deptBeDepartment',
      width: 130,
      align: 'center'
    },
    {
      title: '转岗时间',
      dataIndex: 'transferDate',
      key: 'transferDate',
      width: 110,
      align: 'center'
    },
    // {
    //   title: '附件',
    //   dataIndex: 'fj',
    //   key: 'fj',
    //   width: 80,
    //   align: 'center',
    //   render: (text: any, row: any, index: any) => {
    //     return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
    //   }
    // },
    // {
    //   title: '状态',
    //   dataIndex: 'auditedStatusName',
    //   key: 'auditedStatusName',
    //   width: 120,
    //   align: 'center'
    // },
    // Do('nurseWHTransferPost', editToNewPostModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='岗位变动'>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editToNewPostModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
