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
import EditContinuingEducationModal from '../modal/EditContinuingEducationModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { openAuditModal } from '../config/auditModalConfig'
import { isSelf } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function PersonWinning() {
  const editContinuingEducationModal = createModal(EditContinuingEducationModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHContinueStudy', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editContinuingEducationModal.show({ signShow: '添加' })
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
      width: 90,
      align: 'center'
    },

    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 210,
      align: 'center'
    },

    {
      title: '课时数',
      dataIndex: 'courseHour',
      key: 'courseHour',
      width: 90,
      align: 'center'
    },
    {
      title: '学员总数',
      dataIndex: 'personTotal',
      key: 'personTotal',
      width: 90,
      align: 'center'
    },
    {
      title: '学员分布区域',
      dataIndex: 'schoolArea',
      key: 'schoolArea',
      width: 210,
      align: 'center'
    },
    {
      title: '学员职称分布',
      dataIndex: 'personTitleArea',
      key: 'personTitleArea',
      width: 210,
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
    Do('nurseWHContinueStudy', editContinuingEducationModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='举办继续教育培训班' btnList={isSelf() ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editContinuingEducationModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
