import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col } from 'antd'
import { ModalComponentProps } from "src/libs/createModal"
import SelectPeopleModal from './selectNurseModal/SelectPeopleModal'
import createModal from 'src/libs/createModal'

export interface Props extends ModalComponentProps {
  viewType: 'edit' | 'view',
  data: any,
  onOkCallback: Function
}

export default function NurseGroupEditModal(props: Props) {
  const { visible, onCancel, viewType, data, onOkCallback } = props
  const [editData, setEditData] = useState({} as any)
  const [loading, setLoading] = useState(false)

  let selectPeopleModal = createModal(SelectPeopleModal)

  const title = () => {
    if (!data) return ''

    if (viewType == 'view') return '查看小组'
    else if (Object.keys(data).length > 0) return '编辑小组'
    else return '新建小组'
  }

  const handleSave = () => {
    console.log('save')
    onOkCallback && onOkCallback()
  }
  return <React.Fragment>
    <Modal
      title={title()}
      confirmLoading={loading}
      centered
      footer={
        viewType == 'edit' ?
          <Button
            type="primary"
            loading={loading}
            onClick={handleSave}>
            保存
        </Button> :
          null
      }
      onCancel={onCancel}
      visible={visible}>
      <Wrapper>
        <Row>
          <Col span={4}></Col>
          <Col span={16}></Col>
        </Row>
      </Wrapper>
    </Modal>
    <selectPeopleModal.Component />
  </React.Fragment>
}
const Wrapper = styled.div``