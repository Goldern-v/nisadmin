import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Form, Input, Button, Radio, DatePicker, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
export interface Props extends FormComponentProps {
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
}
const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
}
function AddNursingModal (props: Props) {
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields }
  } = props
  const handleSubmit = (e: any) => {
    validateFields((err, value) => {
      if (err) {
        return
      }
      console.log(value, 'valuevaluevalue')
    })
  }
  return (
    <Modal title='Basic Modal' visible={visible} onOk={handleOk} onCancel={handleCancel} okText='保存'>
      <Form onSubmit={handleSubmit}>
        <Form.Item {...formItemLayout} label='姓名'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '姓名不能为空' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='性别'>
          {getFieldDecorator('sex', { initialValue: '0' })(
            <Radio.Group buttonStyle='solid'>
              <Radio.Button value='0'>男</Radio.Button>
              <Radio.Button value='1'>女</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='身份证号'>
          {getFieldDecorator('sfzh', {
            rules: [{ required: true, message: '姓名不能为空' }]
          })(<Input />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='出生年月'>
          {getFieldDecorator('csny')(<DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='所属科室'>
          {getFieldDecorator('sske')(
            <Select showSearch style={{ width: '100%' }} placeholder='选择所属科室'>
              <Select.Option value='jack'>Jack</Select.Option>
              <Select.Option value='lucy'>Lucy</Select.Option>
              <Select.Option value='tom'>Tom</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='工号'>
          {getFieldDecorator('gh', {
            rules: [{ required: true, message: '工号不能为空' }]
          })(<Input />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='职称'>
          {getFieldDecorator('sske')(
            <Select showSearch style={{ width: '100%' }} placeholder='选择所属科室'>
              <Select.Option value='jack'>Jack</Select.Option>
              <Select.Option value='lucy'>Lucy</Select.Option>
              <Select.Option value='tom'>Tom</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='职务'>
          {getFieldDecorator('sske')(
            <Select showSearch style={{ width: '100%' }} placeholder='选择所属科室'>
              <Select.Option value='jack'>Jack</Select.Option>
              <Select.Option value='lucy'>Lucy</Select.Option>
              <Select.Option value='tom'>Tom</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='能级'>
          {getFieldDecorator('sske')(
            <Select showSearch style={{ width: '100%' }} placeholder='选择所属科室'>
              <Select.Option value='jack'>Jack</Select.Option>
              <Select.Option value='lucy'>Lucy</Select.Option>
              <Select.Option value='tom'>Tom</Select.Option>
            </Select>
          )}
        </Form.Item>
        {/*
        <Form.Item {...formItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item> */}
      </Form>
    </Modal>
  )
}
export default Form.create()(AddNursingModal)
const Wrapper = styled.div``
