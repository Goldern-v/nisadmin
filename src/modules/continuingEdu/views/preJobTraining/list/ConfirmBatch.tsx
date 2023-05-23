import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, InputNumber , DatePicker, Select, message,Icon,Upload, } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { observer } from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import { preJobListData } from './PreJobListData'
import { preJobApi } from '../PreJobApi'
export interface Props extends FormComponentProps {
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
}
const formItemLayout = {
  labelCol: {
    sm: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 20 }
  }
}


function ConfirmBatch(props: Props) {
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
      // console.log(value)
      // true为提交，false为保存
      let paramter:any = []
      preJobListData.selectedKey.map((it:string)=>{
        paramter.push({
          empNo:it,
          batch:value.batch+'',
          year:moment(value.year).format('YYYY')
        })
      })
      // console.log(paramter)
      preJobApi.saveEmployee(paramter).then((res) => {
        message.success('操作成功')
        // 新增之后，获取新增年份的批次、数据
        preJobListData.year = value.year
        preJobListData.selectBatch = ''
        preJobListData.keyWord = ''
        preJobListData.getTableList()
        preJobListData.getBatchList()
        handleOk()
      })
    })
  }

 
 
  useEffect(() => {
    if (visible) {
      resetFields()
    }
  }, [visible])

 
  

  return (
    <Modal title='录入批次确认' visible={visible} 
      onOk={onSave} 
      onCancel={handleCancel} 
      okText='录入' 
      centered maskClosable={false}
      width={360}
      >
      <Form>

        <Form.Item {...formItemLayout} label='年份'>
          {getFieldDecorator('year', {initialValue:moment(preJobListData.confirmBatch.year) || moment(),
            rules: [{ required: true, message: '年份不能为空' }]
          })
          (<YearPicker style={{ width: '100%' }}  />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='批次'>
          {getFieldDecorator('batch', {initialValue:preJobListData.confirmBatch.batch || '',
            rules: [{ required: true, message: '批次不能为空' }]
          })(<InputNumber step={1} min={1} style={{ width: '100%' }} />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default Form.create()(observer(ConfirmBatch)) as any
// const Wrapper = styled.div``
