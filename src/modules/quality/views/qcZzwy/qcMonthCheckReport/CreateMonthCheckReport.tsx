import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, InputNumber, DatePicker, Select, message, Icon, Upload, } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { observer } from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import { qcMonthCheckData } from './qcMonthCheckData'
import { authStore } from 'src/stores';
const { Option } = Select

// import { preJobManageApi } from "../PreJobManageApi";
export interface Props extends FormComponentProps {
  visible: boolean,
  handleOk: () => void,
  handleCancel: () => void,
}
const formItemLayout = {
  labelCol: {
    sm: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 20 }
  }
}


function CreateMonthCheckReport(props: Props) {
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
  } = props

  const [fileName, setFileName] = useState('');

  const onSave = (e: any) => {
    validateFields((err, value) => {
      if (err) {
        return
      }
      console.log('创建的内容',value)
   
    })
  }

  useEffect(() => {
    if (visible) {
      resetFields()
    }
  }, [visible])

  return (
    <Modal title={qcMonthCheckData.modalTitle} visible={visible}
      onOk={onSave}
      onCancel={handleCancel}
      centered maskClosable={false}
    >
      <Form>

        <Form.Item {...formItemLayout} label='质控月份'>
          {getFieldDecorator('month', {
            initialValue: moment(qcMonthCheckData.currentItem.month) || moment(),
            rules: [{ required: true, message: '质控月份不能为空' }]
          })
            (<DatePicker.MonthPicker style={{ width: '100%' }} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='质控科室'>
          {getFieldDecorator('deptCode', {
            initialValue: qcMonthCheckData.currentItem.deptCode || '',
            rules: [{ required: true, message: '质控科室不能为空' }]
          })(
            <Select
              style={{ width: '100%' }} >
              {authStore.deptList.map(v =>
                    <Option value={v.code} key={v.code}>{v.name}</Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='报告名称'>
          {getFieldDecorator('name', {
            initialValue: qcMonthCheckData.currentItem.name || null,
            rules: [{ required: true, message: '报告名称不能为空' }]
          })(<Input style={{ width: '100%' }} />)}
        </Form.Item>


      </Form>
    </Modal>
  )
}
export default Form.create()(observer(CreateMonthCheckReport)) as any
