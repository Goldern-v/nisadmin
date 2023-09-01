import { Radio, Form } from 'antd'
import { Modal, Input, Button } from 'antd/es'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { FormComponentProps } from 'antd/es/form'
import { fourData as model } from '../fourData';

export interface IProps extends FormComponentProps {
}

export interface Props {
}
export default Form.create()(observer(function (props: IProps) {
  const { form: { getFieldDecorator, validateFields, setFieldsValue, resetFields } } = props

  const onCancel = () => {
    resetFields()
    model.Addtable = false
  }

  const onSave = () => {
    validateFields((err, value) => {
      if (err) return
      model.tableAddOk(value)
      resetFields()
    })
  }

  const handleDelete = () => {
    model.nameTS = ''
    model.tableList = []
    onCancel()
  }

  const onButtons = () => {
    let buttons = []
    let btns = [
      <Button key="cancel" onClick={onCancel}>取消</Button>,
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

  useEffect(() => {
    if (!model.Addtable){
      model.del = false
    }
  }, [model.Addtable])
  
  return (
    <Modal
      title="添加表"
      visible={model.Addtable}
      onOk={onSave}
      onCancel={onCancel}
      okText='确定'
      centered
      footer={onButtons()}
    >
      <Wrapper>
        <Form 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}>
          <Form.Item label="名称">
            {
              getFieldDecorator('name', {
                initialValue: model.nameTS,
                rules: [
                  { required: true, message: '名称不能为空' }
                ]
              })
            (
              <Input placeholder='表7 急诊科室护理质量检查完成情况' />
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