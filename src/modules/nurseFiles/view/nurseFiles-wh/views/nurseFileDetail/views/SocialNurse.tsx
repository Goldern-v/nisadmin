import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'

// import { globalModal } from 'src/global/globalModal'
// import { authStore } from 'src/stores'
// import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'
// import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
// import EditLearnJobModal from '../modal/EditLearnJobModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
// import { openAuditModal } from '../config/auditModalConfig'
import { isSelf,editFlag } from './BaseInfo'
import Do from '../components/Do'
import EditSocialNurseModal from '../modal/EditSocialNurseModal'
export interface Props extends RouteComponentProps {}
export default observer(function SocialNurse() {
  const editSocialNurseModal = createModal(EditSocialNurseModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    // console.log('获取数据')
    // return false
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHSocialJob', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editSocialNurseModal.show({ signShow: '添加' })
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
      title: '起始时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
      align: 'center'
    },
    {
      title: '社会兼职名称',
      dataIndex: 'socialJobName',
      key: 'socialJobName',
      width: 200,
      align: 'center'
    },
    {
      title: '兼职级别',
      dataIndex: 'socialLevel',
      key: 'socialLevel',
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
    Do('nurseWHSocialJob', editSocialNurseModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='社会兼职' btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editSocialNurseModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
