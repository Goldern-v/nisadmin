import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { observer } from 'mobx-react'
import { Modal, Input, Button, Select,Form } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'

const Option = Select.Option
export interface Props extends ModalComponentProps {
}

const defaultList = [
  {code:0,name:"聘用人员请（休）假审批报告表"},
  {code:1,name:"军队人员请休假（外出）审批报告表"},
]

export default Form.create()(observer(function (props:any) {

  const [formList, setFormList] = useState<any>(defaultList);
  let { visible, onCancel, onOk,form } = props
  let {getFieldDecorator} = form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    form.validateFields((err:any, values:any) => {
      if (err) return 
      console.log(values,'values');
      let params = {
        recordType:values.recordType
      }
      onOk(params)
    });
  };

  useLayoutEffect(() => {
    if (visible) {
      console.log('useLayoutEffect')
    }
  }, [visible]);

  return (
    <Modal
      title="添加"
      visible={visible}
      onCancel={onCancel}
      forceRender
      centered
      footer={[
        <Button key='back' onClick={onCancel}>
          取消
        </Button>,
        <Button key='save' type='primary' onClick={handleSubmit}>
          确定
        </Button>,
      ]}
    >
      <Form {...formItemLayout}>
        <Form.Item label="请假申请表">
          {getFieldDecorator('recordType', {
            rules: [{required: true,message: '请选择一个表'}],
          })(
            <Select>
              {formList.map((item: any) => (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
      
    </Modal>
  )
}))
const Wrapper = styled.div``
