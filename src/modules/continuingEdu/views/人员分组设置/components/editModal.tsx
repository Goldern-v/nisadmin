import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row } from 'antd'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
}

export default function editModal(props: Props) {
  const { visible, onOk, onCancel } = props

  const handleOk = () => {

  }

  return <Modal
    title="修改分组"
    centered
    visible={visible}
    onOk={() => handleOk()}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Row>
        <Col span={6} className="label">分组名称：</Col>
        <Col span={15}>
          <Input />
        </Col>
      </Row>
      <Row>
        <Col span={6} className="label">排序：</Col>
        <Col span={15}>
          <InputNumber min={0} precision={0} step={1} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  line-height: 30px;
  &>*{
    margin-bottom: 10px;
  }
  .label{
    padding-right: 15px;
    text-align: right;
  }
`