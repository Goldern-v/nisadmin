import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
// import { authStore } from 'src/stores'
import { Modal, Form, Input, Button, Radio, DatePicker, Select, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { observer } from 'mobx-react-lite'
import SelectHoliday1 from 'src/modules/setting/view/common/SelectHoliday1'
import SelectHoliday2 from 'src/modules/setting/view/common/SelectHoliday2'
import SelectHoliday3 from 'src/modules/setting/view/common/SelectHoliday3'
import SettingViewModel from 'src/modules/setting/SettingViewModel'

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

/** 职务列表 */

export const HOLIDAY_LIST = ['元旦', '春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节']
function ModalAdd(props: Props) {
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
    })
  }
  const onSave = (e: any) => {}

  function HolidayChange(value: any) {
    // SettingViewModel.holidayName = value
  }

  return (
    <Modal
      title='添加节目'
      visible={visible}
      onOk={onSave}
      onCancel={handleCancel}
      okText='保存'
      footer={[
        <Button key='back' onClick={handleCancel}>
          取消
        </Button>,
        <Button key='submit' type='primary' onClick={handleOk}>
          添加
        </Button>
      ]}
    >
      <Form.Item {...formItemLayout} label='节日'>
        {getFieldDecorator('selectHoliday', {
          rules: [{ required: true, message: '节日不能为空' }]
        })(
          <Select
            style={{ width: '100%' }}
            placeholder='选择节日'
            onChange={(value: any) => {
              SettingViewModel.holidayName = value
            }}
          >
            {HOLIDAY_LIST.map((item: string) => (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label='日期1'>
        {getFieldDecorator('selectDate1', {
          rules: [{ required: true, message: '日期不能为空' }]
        })(<SelectHoliday1 />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label='日期2'>
        {getFieldDecorator('selectDate2', {
          rules: [{ required: true, message: '日期不能为空' }]
        })(<SelectHoliday2 />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label='日期3'>
        {getFieldDecorator('selectDate3', {
          rules: [{ required: true, message: '日期不能为空' }]
        })(<SelectHoliday3 />)}
      </Form.Item>
    </Modal>
  )
}
export default Form.create()(observer(ModalAdd)) as any
// const Wrapper = styled.div``

const SelecDate = styled.div``
