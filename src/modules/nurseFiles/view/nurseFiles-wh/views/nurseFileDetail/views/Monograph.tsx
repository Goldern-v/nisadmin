import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import moment from 'moment'
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
import EditMonographModal from '../modal/EditMonographModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
import { isSelf,editFlag } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function Monograph() {
  const editMonographModal = createModal(EditMonographModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHMonograph', appStore.queryObj.empNo).then((res) => {
      appStore.HOSPITAL_ID === "dghm" && res.data.sort((prev:any,next:any)=>moment(prev.pressDate).diff(moment(next.pressDate), 'days'))
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editMonographModal.show({ signShow: '添加' })
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
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      width: 120,
      align: 'center'
    },
    {
      title: '专著名称',
      dataIndex: 'monographName',
      key: 'monographName',
      width: 200,
      align: 'center'
    },
    {
      title: '出版社名称',
      dataIndex: 'pressName',
      key: 'pressName',
      width: 200,
      align: 'center'
    },
    {
      title: '出版号',
      dataIndex: 'pressNumber',
      key: 'pressNumber',
      width: 180,
      align: 'center'
    },
    {
      title: '出版日期',
      dataIndex: 'pressDate',
      key: 'pressDate',
      width: 120,
      align: 'center'
    },
    {
      title: '著者',
      dataIndex: 'participation',
      key: 'participation',
      width: 90,
      align: 'center'
    },
    ...['zhzxy'].includes(appStore.HOSPITAL_ID) ? [
      {
      title: '起止页码',
      dataIndex: 'pageNumber',
      key: 'pageNumber',
      width: 90,
      align: 'center'
    
    }]: [],
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
    Do('nurseWHMonograph', editMonographModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='专著' btnList={isSelf() || editFlag() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editMonographModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
