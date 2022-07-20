import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import MajorErrorsModal_sdlj from '../modal/MajorErrorsModal_sdlj'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf,editFlag } from './BaseInfo'
import Do from '../components/Do'
export interface Props extends RouteComponentProps {}
export default observer(function PersonWinning() {
  const editMajorErrorsModal = createModal(MajorErrorsModal_sdlj)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHPunishment', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => editMajorErrorsModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 70
    },
    {
      title: '时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      align: 'center'
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 220,
      // align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 220,
      // align: 'center'
    },
    Do('nurseWHPunishment', editMajorErrorsModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='重大差错事故及惩罚' btnList={isSelf() || editFlag()? btnList : []}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <editMajorErrorsModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
