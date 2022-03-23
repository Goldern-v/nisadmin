import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row, Select, Icon } from 'antd'
import FormCreateModal from './FormCreateModal'
import DiseaseManageServices from '../diseaseManage/services/DiseaseManageServices'
import { message } from 'antd/es'
import FormPageBody from '../components/FormPageBody'

import { appStore, authStore } from 'src/stores'
const api = new DiseaseManageServices();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
}
export default function editModal(props: Props) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp } = props
  const [loading, setLoading] = useState(false)
  const [formCreateVisible, setFormCreateVisible] = useState(false)
  const [formList, setFormList] = useState([] as any)
  const [editVisible, setEditVisible] = useState(false)
  const [formCodeChange, setFormCodeChange] = useState("")
  const [editParmas, setEditPrams] = useState({
    periodsList: [],
    diseaseTypeName: '',
    diseaseTypeId: '',
    formCodeList: [],
  } as any)
  const { Option } = Select;
  const periodList = [];
  for (let i = 1; i <= 12; i++) {
    periodList.push(<Option key={i} value={i}>{i}个月</Option>);
  }
  const handleCreate = () => {
    setFormCreateVisible(true)
  }
  const afterClose = () => {
    setFormList([])
  }
  const handleOk = () => {
    onOk && onOk(editParmas.diseaseTypeName)
  }
  const setDetailModal = (formCode: any) => {
    setEditVisible(true)
    setFormCodeChange(formCode)
  }
  return (<Modal
    title={"提示"}
    confirmLoading={loading}
    width={400}
    centered
    visible={visible}
    afterClose={() => afterClose()}
    onOk={() => {
      handleOk()
    }}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Row>
        <Col className="label">是否要结束随访？</Col>
      </Row>
      <Row>
        <Col span={6} className="label">结束原因：</Col>
        <Col span={15}>
          <Input
            value={editParmas.diseaseTypeName}
            onChange={(e: any) =>
              setEditPrams({ ...editParmas, diseaseTypeName: e.target.value })} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>)
}
const Wrapper = styled.div`
  .label{
    line-height:32px;
    font-size: 14px;
  }
  .ant-row{
    margin-bottom:10px;
    &:first-child{
      text-align:center;
    }
  }
`