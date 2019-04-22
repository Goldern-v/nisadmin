import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id: string
}

export default function EditWorkHistoryModal (props: Props) {
  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()
  const onFieldChange = () => {}
  return (
    <Modal title='修改职称及层级变动' visible={visible} onCancel={onCancel} okText='保存'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Row gutter={10}>
            <Col span={15}>
              <Form.Field label={`时间`} name='orgName' required suffix='到'>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={9}>
              <Form.Field name='orgName'>
                <DatePicker />
              </Form.Field>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Field label={`聘用时间`} name='' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`工作单位`} name='' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`科室`} name='' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`职称`} name='222' required>
              <Select>
                <Option value='1'>1</Option>
                <Option value='2'>2</Option>
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`职任`} name='111' required>
              <Select>
                <Option value='1'>1</Option>
                <Option value='2'>2</Option>
              </Select>
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
