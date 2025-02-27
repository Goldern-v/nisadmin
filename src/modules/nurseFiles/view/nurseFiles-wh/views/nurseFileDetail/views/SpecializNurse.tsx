import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import moment from 'moment'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'

import { globalModal } from 'src/global/globalModal'
import { authStore } from 'src/stores'
import limitUtils from '../utils/limit'
import Zimage from 'src/components/Zimage'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import EditSpecializNurseModal from '../modal/EditSpecializNurseModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
import { isSelf,editFlag } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function SpecializNurse() {
  const editSpecializNurseModal = createModal(EditSpecializNurseModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHSpecializNurse', appStore.queryObj.empNo).then((res) => {
      appStore.HOSPITAL_ID === "dghm" && res.data.sort((prev:any,next:any)=>moment(prev.cardNumberDate).diff(moment(next.cardNumberDate), 'days'))
      setTableData(res.data)
      // console.log(res.data,'000000000000')
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editSpecializNurseModal.show({ signShow: '添加' })
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
      title: '发证单位',
      dataIndex: 'cardUnit',
      key: 'cardUnit',
      width: 180,
      align: 'center'
    },

    {
      title: '专科护士名称',
      dataIndex: 'nurseName',
      key: 'nurseName',
      width: 170,
      align: 'center'
    },
    {
      title: '证书编号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      width: 150,
      align: 'center'
    },
    {
      title: '级别',
      dataIndex: 'nurseLevel',
      key: 'nurseLevel',
      width: 90,
      align: 'center'
    },
    {
      title: '发证时间',
      dataIndex: 'cardNumberDate',
      key: 'cardNumberDate',
      width: 90,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'urlImageOne',
      key: 'urlImageOne',
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
    Do('nurseWHSpecializNurse', editSpecializNurseModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='专科护士' btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editSpecializNurseModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
