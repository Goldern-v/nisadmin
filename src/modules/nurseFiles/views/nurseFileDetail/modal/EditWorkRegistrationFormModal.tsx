import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, InputNumber } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import ImageUploader from 'src/components/ImageUploader'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id: string
}

export default function EditWritingsModal (props: Props) {
  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()
  const onFieldChange = () => {}
  const uploadCard = () => Promise.resolve('123')
  return (
    <Modal title='修改工作情况登记表' visible={visible} onCancel={onCancel} okText='保存'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Row>
            <Col span={24}>
              <Form.Field label={`年度`} name='orgName'>
                <DatePicker />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`夜班`} name='' required>
                <InputNumber />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`查房`} name='' required>
                <InputNumber />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`护理会诊`} name='' required>
                <InputNumber />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`病例讨论`} name='' required>
                <InputNumber />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`个案`} name='' required>
                <InputNumber />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`小讲课`} name='' required>
                <InputNumber />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`带教`} name='' required>
                <InputNumber />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`证明人`} name='' required>
                <Input />
              </Form.Field>
            </Col>
          </Row>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
