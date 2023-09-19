import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import moment from 'moment'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'

import EditToNewPostModal from '../modal/EditToNewPostModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf,editFlag } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function PersonWinning() {
  const editToNewPostModal = createModal(EditToNewPostModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHTransferPost', appStore.queryObj.empNo).then((res) => {
      appStore.HOSPITAL_ID === "dghm" && res.data.sort((prev:any,next:any)=>moment(prev.transferDate).diff(moment(next.transferDate), 'months'))
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editToNewPostModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '序号',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    ...!['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID) ? [{
      title: '原工作科室',
      dataIndex: 'oldDeptName',
      key: 'oldDeptName',
      width: 130,
      align: 'center'
    }] : [{
      title: '原工作科室',
      dataIndex: 'oldDeptCode',
      key: 'oldDeptCode',
      width: 130,
      align: 'center'
    }],
    {
      title: '现工作科室',
      dataIndex: 'newDeptName',
      key: 'newDeptName',
      width: 130,
      align: 'center'
    },
    ...!['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID) ? [{
      title: '现科室隶属部门',
      dataIndex: 'deptBeDepartment',
      key: 'deptBeDepartment',
      width: 130,
      align: 'center'
    }] : [],
    ...['zhzxy'].includes(appStore.HOSPITAL_ID) ? [{
      title: '职务',
      dataIndex: 'post',
      key: 'post',
      width: 130,
      align: 'center'
    }] : [],
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
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: 'auditedStatusName',
      width: 120,
      align: 'center'
    },
    Do('nurseWHTransferPost', editToNewPostModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])
  const title = ['zhzxy'].includes(appStore.HOSPITAL_ID) ? '院内转科工作经历' : '岗位变动'
  return (
    <BaseLayout title={title} btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editToNewPostModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
