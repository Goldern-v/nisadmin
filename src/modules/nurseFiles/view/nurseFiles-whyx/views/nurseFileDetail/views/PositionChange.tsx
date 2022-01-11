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
import EditPositionChangeModal from '../modal/EditPositionChangeModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
import { isSelf } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function PersonWinning() {
  const editPositionChangeModal = createModal(EditPositionChangeModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHTitle', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  // const btnList = [
  //   {
  //     label: '添加',
  //     onClick: () => editPositionChangeModal.show({ signShow: '添加' })
  //   }
  // ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    // {
    //   title: '开始时间',
    //   dataIndex: 'startDate',
    //   key: 'startDate',
    //   width: 120,
    //   align: 'center'
    // },
    // {
    //   title: '结束时间',
    //   dataIndex: 'endDate',
    //   key: 'endDate',
    //   width: 120,
    //   align: 'center'
    // },
    {
      title: '原职称名称',
      dataIndex: 'titleOld',
      key: 'titleOld',
      width: 100,
      align: 'center'
    },
    {
      title: '现职称名称',
      dataIndex: 'titleNew',
      key: 'titleNew',
      width: 100,
      align: 'center'
    },
    {
      title: '考取专业技术资格证书时间',
      dataIndex: 'winNewTiTleDate',
      key: 'winNewTiTleDate',
      width: 140,
      align: 'center'
    },
    {
      title: '聘用专业技术资格时间',
      dataIndex: 'employNewTiTleDate',
      key: 'employNewTiTleDate',
      width: 140,
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
    // {
    //   title: '状态',
    //   dataIndex: 'auditedStatusName',
    //   key: 'auditedStatusName',
    //   width: 120,
    //   align: 'center'
    // },
    // Do('nurseWHTitle', editPositionChangeModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='职称变动'>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editPositionChangeModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
