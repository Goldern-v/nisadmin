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

export default function EditExaminationResultsModal (props: Props) {
  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()
  const onFieldChange = () => {}
  const uploadCard = () => Promise.resolve('123')
  return (
    <Modal title='修改年度履职考核结果' visible={visible} onCancel={onCancel} okText='保存'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`年度 `} name='orgName'>
              <DatePicker />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`考核结果`} name='' required>
              <Radio.Group defaultValue='b' buttonStyle='solid'>
                <Radio.Button value='a'>优秀</Radio.Button>
                <Radio.Button value='b'>称职</Radio.Button>
                <Radio.Button value='c'>基本称职</Radio.Button>
                <Radio.Button value='d'>不称职</Radio.Button>
              </Radio.Group>
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
