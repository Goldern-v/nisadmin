import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import Zimage from 'src/components/Zimage'
import EditAcademicActivityModal from '../modal/EditAcademicActivityModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf } from './BaseInfo'
import Do from '../components/Do'
import { authStore } from 'src/stores'
export interface Props extends RouteComponentProps { }
export default observer(function PersonWinning() {
  const editOnEducationModal = createModal(EditAcademicActivityModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHAcademic', appStore.queryObj.empNo).then((res) => {
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
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 120,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 120,
      align: 'center'
    },
    {
      title: '学术活动名称',
      dataIndex: 'academicName',
      key: 'academicName',
      width: 110,
      align: 'center'
    },
    {
      title: '举办地域',
      dataIndex: 'hostArea',
      key: 'hostArea',
      width: 120,
      align: 'center'
    },
    {
      title: '举办单位',
      dataIndex: 'hostUnit',
      key: 'hostUnit',
      width: 120,
      align: 'center'
    },
    {
      title: '举办地点',
      dataIndex: 'hostAddress',
      key: 'hostAddress',
      width: 120,
      align: 'center'
    },
    {
      title: '以何种资格获得邀请',
      dataIndex: 'qualification',
      key: 'qualification',
      width: 120,
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
    // {
    //   title: '状态',
    //   dataIndex: 'auditedStatusName',
    //   key: 'auditedStatusName',
    //   width: 120,
    //   align: 'center'
    // },
    (authStore.isDepartment) && Do('nurseWHAcademic', editOnEducationModal, getTableData)
  ].filter(item => item)

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='学术活动' btnList={authStore.isDepartment ? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editOnEducationModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``