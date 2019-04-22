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

export default function EditWritingsModal (props: Props) {
  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()
  const onFieldChange = () => {}
  const uploadCard = () => Promise.resolve('123')
  return (
    <Modal title='修改著作译文论文' visible={visible} onCancel={onCancel} okText='保存'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`发表日期`} name='orgName'>
              <DatePicker />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`题目`} name='' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`专业`} name='' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`本人排名`} name='' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`出版或刊登物`} name='' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={``} name=''>
              <ImageUploader upload={uploadCard} text='添加附件' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
