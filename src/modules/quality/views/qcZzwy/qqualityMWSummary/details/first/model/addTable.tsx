import { Radio, Form } from 'antd'
import { Modal, Input } from 'antd/es'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment';
import {
	Select,
	message,
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
  const handleDelete = () => {
    if (model.edit_type === 'nurse') {
      model.name_nurse = ''
      model.firstTableList_UD = []
    } else {
      model.name_deptName = ''
      model.firstTableList_DE = []
    }
    message.success('删除成功')
    model.tableAddonCancel()
  }
  useEffect(() => {
    if (!model.firstModalAdd){
      model.del = false
    }
      
  }, [model.firstModalAdd])

  const onButtons = () => {
    let buttons = []
    let btns = [
      <Button key="cancel" onClick={(() => model.tableAddonCancel())}>取消</Button>,
      <Button key="ok" type="primary" onClick={onSave}>确定</Button>
    ]
    let btn = <Button key="delete" onClick={handleDelete}>删除</Button>

    if (model.del) {
      buttons = [btn, ...btns]
    } else {
      buttons = [...btns]
    }
    return buttons
  }
  
  return (
    <Modal
      title="添加表"
      visible={model.firstModalAdd}
      onOk={onSave}
      onCancel={(() => model.tableAddonCancel())}
      centered
      footer={onButtons()}
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
                disabled={model.del}
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