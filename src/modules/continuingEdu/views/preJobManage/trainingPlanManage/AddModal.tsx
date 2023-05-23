

import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Radio, DatePicker, Select, message,Icon,Upload, } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import { trainingPlanManageData } from './TrainingPlanManageData'
import {preJobManageApi} from "../PreJobManageApi";
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


function AddModal(props: Props) {
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
  } = props


  
  // 保存
  const onSave = (e: any) => {
    validateFields((err, value) => {
      if (err) {
        return
      }
      console.log(value)
      if(!trainingPlanManageData.uploadFileItem.id){
        message.warning('先上传附件')
        return
      }

      // handleOk()
      let postData = {
        attachmentId:trainingPlanManageData.uploadFileItem.id,
        year:value.year?.format('YYYY')
        // fileName:trainingPlanManageData.uploadFileItem.name
      } as any
      // 编辑修改
      if(trainingPlanManageData.currentItem.id){
        postData.id = trainingPlanManageData.currentItem.id
        preJobManageApi.fileUpdate(postData).then((res) => {
          message.success('操作成功')
          trainingPlanManageData.getTableList()
          handleOk()
        })
        return false
      }
      
      preJobManageApi.fileSave(postData).then((res) => {
          message.success('操作成功')
          trainingPlanManageData.getTableList()
          handleOk()
        })
    })
  }

  useEffect(() => {
    if (visible) {
      resetFields()
    }
  }, [visible])

  const normFile = (e:any)=>{
  
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      // debugger
      return e;
    }
    // debugger
    return e && e.fileList;
  }

  // 导入模板
  const handleUpload = async (info: any) => {
    // console.log(info)
    let uploadFileData = {
      file:info.file
    }
    preJobManageApi.trainingPlanUploadFile(uploadFileData).then(res=>{
      // trainingPlanManageData.uploadFileItem=info.file
      trainingPlanManageData.uploadFileItem = res.data

    }).catch(err=>{

    })
    
  }

  return (
    <Modal title={'导入培训计划'} visible={visible} onOk={onSave} onCancel={handleCancel} okText='保存' centered>
      <Form>
      <Form.Item {...formItemLayout} label='年份'>
          {getFieldDecorator('year', {initialValue:moment(trainingPlanManageData.currentItem.year) || moment(),
            rules: [{ required: true, message: '年份不能为空' }]
          })
          (<YearPicker disabled={trainingPlanManageData.currentItem.id} style={{ width: '100%' }}  />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="附件">
          {getFieldDecorator('fileId', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          })(<>
            <Upload.Dragger accept=".doc,.docx,.xls,.xlsx,.ppt,.pdf,.mp4,.jpg,.jpeg,.png" showUploadList={false} customRequest={handleUpload} style={{ width: '100%' }}>
             
              <p className="ant-upload-text">上传</p>
              <p className="ant-upload-hint">支持格式：图片、pdf、doc、docx、ppt、pptx、xls、xlsx、mp4</p>
            </Upload.Dragger>
            <span>{trainingPlanManageData.uploadFileItem.name || ''}</span>
            </>
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default Form.create()(observer(AddModal)) as any