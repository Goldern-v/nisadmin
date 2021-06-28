import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Modal, Row } from 'antd'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function
}

export default function 护长日查房反馈表新建(props: Props) {
  const { visible, onOk, onCancel } = props
  const [loading, setLoading] = useState(false)

  const [params, setParams] = useState({
    title: '',
    checkDate: ''
  })

  useEffect(() => {
    if (visible) {

    }
  }, [visible])

  return <Modal
    visible={visible}>
    <Wrapper>
      <Row className="edit-row">
        <Col></Col>
        <Col></Col>
      </Row>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  .edit-row{
    margin-bottom: 15px;
  }
`