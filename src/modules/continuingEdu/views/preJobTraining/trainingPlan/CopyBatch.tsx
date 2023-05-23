import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, InputNumber , DatePicker, Select, message,Icon,Upload, } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { observer } from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import { preJobTrainingPlanData } from './PreJobTrainingPlanData'
import { preJobApi } from '../PreJobApi'
export interface Props extends FormComponentProps {
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
}
const formItemLayout = {
  labelCol: {
    sm: { span: 9 }
  },
  wrapperCol: {
    sm: { span: 15 }
  }
}


function CopyBatch(props: Props) {
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields, resetFields }
  } = props

  const onSave = (e: any) => {
    validateFields((err, value) => {
      if (err) {
        return
      }
      let list = preJobTrainingPlanData.tableList.filter((ii:any)=>(ii.id+'').indexOf('save')<0)
      let planList = list.map((it:any)=>{return it.id})
      if (value.year) value.year = value.year.format('YYYY')
      let paramter = {
        ...value,
        planList
      }
     
      preJobApi.copyPlan(paramter).then((res) => {
        message.success('操作成功')
        preJobTrainingPlanData.year = moment(value.year)
        preJobTrainingPlanData.selectBatch = value.batch
        
        preJobTrainingPlanData.getTableList()
        preJobTrainingPlanData.getBatchListCopy()
        handleOk()
      }).then(err=>{
        
      })
    })
  }


  useEffect(() => {
    if (visible) {
      resetFields()
    }
  }, [visible])

  
  return (
    <Modal title='复制计划' visible={visible} 
      onOk={onSave} 
      onCancel={handleCancel} 
      // okText='录入' 
      centered maskClosable={false}
      width={360}
      >
      <Form>

        <Form.Item {...formItemLayout} label='年份'>
          {getFieldDecorator('year', {initialValue:moment(preJobTrainingPlanData.copyBatch.year) || moment(),
            rules: [{ required: true, message: '年份不能为空' }]
          })
          (<YearPicker style={{ width: '100%' }}  />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='复制到新批次'>
          {getFieldDecorator('batch', {initialValue:preJobTrainingPlanData.copyBatch.batch || '',
            rules: [{ required: true, message: '批次不能为空' }]
          })(
            <Select 
              style={{ width: '100%' }} >
              {preJobTrainingPlanData.batchList.map((item: any, idx: any) =>
                <Select.Option
                  key={idx}
                  value={item.batch}>
                  {item.batch}
            </Select.Option>)}
            </Select>
          )}
        </Form.Item>

      </Form>
    </Modal>
  )
}
export default Form.create()(observer(CopyBatch)) as any
