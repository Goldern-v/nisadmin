import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row } from 'antd'

const TextArea = Input.TextArea

export interface Props {
  visible: boolean
  onOk?: Function
  onCancel?: Function
  originParams?: any
}

export default function EditModal(props: Props) {
  const { visible, onOk, onCancel, originParams } = props
  const [editParams, setEditParams] = useState({
    name: '',
    link: '',
    sort: 1,
    remark: ''
  } as any)

  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    console.log('saving data...')
  }

  useEffect(() => {
    if (visible) {
      if (Object.keys(originParams).length > 0) {
        setEditParams(originParams)
      }
    } else {
      setEditParams({
        name: '',
        link: '',
        sort: 1,
        remark: ''
      })
    }
  }, [visible])

  return <Modal
    centered
    onOk={handleOk}
    onCancel={() => onCancel && onCancel()}
    title={'编辑'}
    visible={visible}
    confirmLoading={loading}>
    <Wrapper>
      <Row className="edit-row">
        <Col span={4}>名称：</Col>
        <Col span={20}>
          <Input
            value={editParams.name}
            onChange={(e) =>
              setEditParams({ ...editParams, name: e.target.value })} />
        </Col>
      </Row>
      <Row className="edit-row">
        <Col span={4}>网址：</Col>
        <Col span={20}>
          <Input
            value={editParams.link}
            onChange={(e) =>
              setEditParams({ ...editParams, link: e.target.value })} />
        </Col>
      </Row>
      <Row className="edit-row">
        <Col span={4}>排序：</Col>
        <Col span={20}>
          <InputNumber
            value={editParams.sort}
            onChange={(val) =>
              setEditParams({ ...editParams, sort: val })} />
        </Col>
      </Row>
      <Row className="edit-row">
        <Col span={4}>简介：</Col>
        <Col span={20}>
          <TextArea
            value={editParams.remark}
            onChange={(e) =>
              setEditParams({ ...editParams, remark: e.target.value })} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  .edit-row{
    margin-bottom: 10px;
    &:last-of-type{
      margin-bottom: 0;
    }
  }
`