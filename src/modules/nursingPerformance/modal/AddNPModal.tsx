import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import ImageUploader from 'src/components/ImageUploader'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id: string
}

export default function AddNPModal (props: Props) {
  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()
  const onFieldChange = () => {}
  const onOk = () => {
    onCancel()
  }
  const uploadCard = () => Promise.resolve('123')
  return (
    <Modal title='创建新的绩效' visible={visible} onCancel={onCancel} onOk={onOk} okText='保存'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`年份`} name='' required>
              <Select>{/* <Option value={物流}/> */}</Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`月份`} name='' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`奖金总额`} name='' required>
              <Input />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
