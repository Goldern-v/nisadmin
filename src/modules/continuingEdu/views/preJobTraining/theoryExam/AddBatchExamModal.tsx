import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, InputNumber , DatePicker, Select, message,Icon,Upload, } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import { theoryExamData } from './TheoryExamData'
import { preJobApi } from '../PreJobApi'
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


function AddBatchExamModal(props: Props) {
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
  } = props


  const onSave = (e: any) => {
    // console.log(e)
    validateFields((err, value) => {
      if (err) {
        return
     }
      if(value.deptItem.key==''){
        message.warning('请先选择科室')
        return false
      }
	  let paramter = {
		...value,
		year:value.year?.format('YYYY'),
		examDate:value.examDate?.format('YYYY-MM-DD'),
		examDept:value.deptItem.label,
		examDeptCode:value.deptItem.key,
    type:theoryExamData.preType,
	  } as any

    if(theoryExamData.addExam.id){
      // 修改
      paramter.id = theoryExamData.addExam.id
      preJobApi.theoryUpdate(paramter).then((res) => {
        message.success('操作成功')
        theoryExamData.getTableList()
        handleOk()
      })
      return
    }

    // 新增
    preJobApi.theorySave(paramter).then((res) => {
      message.success('操作成功')
      theoryExamData.getTableList()
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
    <Modal title={theoryExamData.modalTitle} visible={visible} 
      onOk={onSave} 
      onCancel={handleCancel} 
      // okText='录入' 
      centered maskClosable={false}
      // width={360}
      >
      <Form>

        <Form.Item {...formItemLayout} label='考核年份'>
          {getFieldDecorator('year', {initialValue:moment(theoryExamData.addExam.year) || moment(),
            rules: [{ required: true, message: '年份不能为空' }]
          })
          (<YearPicker style={{ width: '100%' }}  />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='考核批次'>
          {getFieldDecorator('batch', {initialValue:theoryExamData.addExam.batch || '',
            rules: [{ required: true, message: '批次不能为空' }]
          })(
            <Select 
              style={{ width: '100%' }} >
              {theoryExamData.batchList.map((item: any, idx: any) =>
                <Select.Option
                  key={idx}
                  value={item.batch}>
                  {item.batch}
            </Select.Option>)}
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='考核日期'>
          {getFieldDecorator('examDate', {initialValue:moment(theoryExamData.addExam.examDate) || moment(),
            rules: [{ required: true, message: '考核日期不能为空' }]
          })(
            <DatePicker format='YYYY-MM-DD' style={{ width: '100%' }}></DatePicker>
          )}
        </Form.Item>

        <Form.Item 
        {...formItemLayout} 
        // labelCol={{style:{width:'80px',whiteSpace:'normal'}}}
        // wrapperCol={{sm: { span: 20 },style:{float:'right'}}}
         label={'考核内容'}>
          {getFieldDecorator('examContent', {initialValue:theoryExamData.addExam.examContent || '',
            rules: [{ required: true, message: '考核内容不能为空' }]
          })(<Input.TextArea autosize={{minRows: 3}} style={{ width: '100%' }} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='主考科室'>
          {getFieldDecorator('deptItem', {initialValue:{key:theoryExamData.addExam.examDeptCode,label:theoryExamData.addExam.examDept},
            rules: [{ required: true, message: '主考科室不能为空' }]
          })(
            <Select 
              style={{ width: '100%' }}
              labelInValue 
            >
              {theoryExamData.deptList.map((item: any, idx: any) =>
                <Select.Option
                  key={idx}
                  value={item.code}>
                  {item.name}
            </Select.Option>)}
            </Select>
          )}
        </Form.Item>
              
        <Form.Item {...formItemLayout} label='合格成绩'>
          {getFieldDecorator('passScore', {initialValue:theoryExamData.addExam.passScore || null,
            rules: [{ required: true, message: '合格成绩不能为空' }]
          })(<InputNumber step={1} min={1} style={{ width: '100%' }} />)}
        </Form.Item>

		<Form.Item {...formItemLayout} label='批注说明'>
          {getFieldDecorator('batchRemark', {initialValue:theoryExamData.addExam.batchRemark || '',
            
          })(
			<Select 
			style={{ width: '100%' }} 
		  >
			{theoryExamData.remarkList.map((item: any, idx: any) =>
			  <Select.Option
				key={idx}
				value={item}>
				{item}
		  </Select.Option>)}
		  </Select>)}
        </Form.Item>

      </Form>
    </Modal>
  )
}
export default Form.create()(observer(AddBatchExamModal)) as any
// const Wrapper = styled.div``
