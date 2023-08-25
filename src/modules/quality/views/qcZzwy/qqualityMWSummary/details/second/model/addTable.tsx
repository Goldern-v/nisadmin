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
import { secondData as model } from '../secondData';


const Option = Select.Option;

export interface IProps extends FormComponentProps {
}

export interface Props {
}
export default Form.create()(observer(function (props: IProps) {
  const { form: { getFieldDecorator, validateFields, setFieldsValue, resetFields } } = props

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
    // model.formArr = value
  }


  // useEffect(() => {
  //   if (model.nodeVisible)
  //     setValue(model.editContentData[model.index].rollBackType)
  //   else
  //     setValue(1)
  // }, [model.nodeVisible])
  
  return (
    <Modal
      title="添加"
      visible={model.secondtModalAdd}
      onOk={() => model.tableAddOk()}
      onCancel={(() => model.tableAddonCancel())}
      okText='确定'
      centered
    >
      <Wrapper>
        <Form 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}>
          <Form.Item label="表单选择">
            {getFieldDecorator('select-multiple', {
              rules: [
                { required: true, message: '表单不能为空', type: 'array' },
              ],
            })(
              <Select onChange={handleChange} mode="multiple" placeholder="请选择表单">
                {
                  model.formList.map((item: any) => {
                    return <Option value={item.code} key={item.code}>{item.name}</Option>
                  })
                }
              </Select>
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