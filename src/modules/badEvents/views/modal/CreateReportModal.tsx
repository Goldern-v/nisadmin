import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, AutoComplete, Row, Col } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import moment from 'moment'
import { to } from 'src/libs/fns'
// import ImageUploader from 'src/components/ImageUploader'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id: string
}

export default function CreateReportModal (props: Props) {
  let { visible, onCancel, onClose } = props
  let refForm = React.createRef<Form>()
  const onFieldChange = (value: any) => {
    console.log('onFieldChange', value)
  }
  const onCreate = async () => {
    visible = false
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    console.log('onOk:value', value, refForm)
    if (err) return
    onClose()
  }
  const uploadCard = () => Promise.resolve('123')
  return (
    <Modal title='选择季度' visible={visible} onOk={onCreate} onCancel={onCancel} okText='创建'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`年 度 `} name='yearReport' required>
              <AutoComplete
                dataSource={['2018', '2019']}
                style={{ width: '80% ' }}
                onSelect={() => {
                  ''
                }}
                onSearch={(value: any) => {
                  console.log('value', value)
                }}
                placeholder='年 度'
              />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`季 度 `} name='seasonReport' required>
              <Radio.Group defaultValue='第一季度' buttonStyle='solid'>
                <Radio.Button value='第一季度'>第一季度</Radio.Button>
                <Radio.Button value='第二季度'>第二季度</Radio.Button>
                <Radio.Button value='第三季度'>第三季度</Radio.Button>
                <Radio.Button value='第四季度'>第四季度</Radio.Button>
              </Radio.Group>
            </Form.Field>
          </Col>
          {/* <Col span={24}>
            <Form.Field label={``} name=''>
              <ImageUploader upload={uploadCard} text='添加附件' />
            </Form.Field>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div`
  > .ant-radio-group .ant-radio-group-solid {
    display: inline-flex;
    line-height: unset;
    width: 100%;
    justify-content: space-around;
  }
`
