import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row, Select, Icon } from 'antd'
import FormPage from '../../components/formPage/FormPage'
import DiseaseManageServices from '../diseaseManage/services/DiseaseManageServices'
import { message } from 'antd/es'
import { appStore, authStore } from 'src/stores'
const api = new DiseaseManageServices();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
  formCode?: string,
}
export default function editModal(props: Props) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp, formCode } = props
  const [loading, setLoading] = useState(false)
  const handleOk = () => {}
  const bdstyle: React.CSSProperties = {maxHeight: "90vh"}
  const afterClose = () => {

  }
  return <Modal
    title={"随访问卷预览"}
    width={1000}
    bodyStyle={bdstyle}
    afterClose={afterClose}
    confirmLoading={loading}
    centered
    visible={visible}
    footer={null}
    onOk={() => {
      handleOk()
    }}
    onCancel={() => onCancel()}>
    <Wrapper>
      <FormPage formCode={formCode} />
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`

`
