import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import createModal from 'src/libs/createModal'
import EditStatePersonnelModal from '../modal/EditStatePersonnelModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { Row, Col, Input } from 'antd'
import { isSelf } from './BaseInfo'

import { openAuditModal } from '../config/auditModalConfig'
export interface Props extends RouteComponentProps { }
const { TextArea } = Input;


export default observer(function SpecializNurse() {
  const editSpecializNurseModal = createModal(EditStatePersonnelModal)
  const [tableData, setTableData] = useState({status: '', reason: ''})
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHPersonStatus', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: tableData.reason && tableData.status ? '修改' : '添加',
      onClick: () =>{
        editSpecializNurseModal.show({ signShow: tableData.reason && tableData.status ? '修改' : '添加', data: tableData })
      },
    },
    {
      label: '查看',
      onClick: () => {
        // console.log(openAuditModal('人员状态', appStore.queryObj.empNo, getTableData))
        openAuditModal('人员状态', tableData, getTableData)
      }
    }
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='人员状态' btnList={isSelf() ? btnList : []}>
      <Wrapper>
        <Row>
          <Col span={4}>
            <span>岗位状态</span>
          </Col>
          <Col span={6}>
            <Input disabled placeholder="" value={tableData?.status} />
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={4}>
            <span>状态原因</span>
          </Col>
          <Col span={16}>
            <TextArea disabled rows={6} placeholder="" value={tableData?.reason} />
          </Col>
        </Row>
      </Wrapper>
      <editSpecializNurseModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 15px 15px;
  box-sizing: content-box;
  height: calc(100vh - 220px)
`
