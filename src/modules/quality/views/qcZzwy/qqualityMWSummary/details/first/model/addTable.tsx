import { Radio, Form } from 'antd'
import { Modal, Input } from 'antd/es'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment';
import {
	ColumnProps,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
import { FormComponentProps } from 'antd/es/form'
import { firstData as model } from '../firstData';


const Option = Select.Option;

export interface IProps extends FormComponentProps {
}

export interface Props {
}
export default Form.create()(observer(function (props: IProps) {
  const { form: { getFieldDecorator, validateFields, setFieldsValue, resetFields } } = props

  const [yearPickShow, setYearPickShow] = useState(false);
  const [value, setValue] = useState<number>(1)

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }


  const onSave = () => {
    validateFields((err, value) => {
      if (err) return
      model.tableAddOk(value)
    })
  }
  // useEffect(() => {
  //   if (model.nodeVisible)
  //     setValue(model.editContentData[model.index].rollBackType)
  //   else
  //     setValue(1)
  // }, [model.nodeVisible])
  
  return (
    <Modal
      title="添加表"
      visible={model.firstModalAdd}
      onOk={onSave}
      onCancel={(() => model.tableAddonCancel())}
      okText='确定'
      centered
    >
      <Wrapper>
        <Form 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}>
          <Form.Item label="类型">
            {
              getFieldDecorator('type', {
                initialValue: model.edit_type,
                rules: [
                  { required: true, message: '类型不能为空' }
                ]
              })
            (
              <Select
              >
                <Option value="nurse">护理部目标值</Option>
                <Option value="deptName">科室目标值</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="名称">
            {
              getFieldDecorator('name', {
                initialValue: model.edit_name,
                rules: [
                  { required: true, message: '名称不能为空' }
                ]
              })
            (
              <Input placeholder='如：表2  202x年第x季度临床护理质量检查过程指标情况' />
            )}
          </Form.Item>
        </Form>
      </Wrapper>
    </Modal>
  )
}))

const Wrapper = styled.div`
padding: 10px 0;
`