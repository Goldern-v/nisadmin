import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, InputNumber, DatePicker, Select, message, Icon, Upload, } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { observer } from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import { qcMonthCheckData } from './qcMonthCheckData'
import { appStore, authStore } from 'src/stores';
import { qcZzwyApi } from '../qcZzwyApi';
const { Option } = Select
import styled from 'styled-components'

// import { preJobManageApi } from "../PreJobManageApi";
export interface Props extends FormComponentProps {
  visible: boolean,
  handleOk: any,
  handleCancel: () => void,
}
const formItemLayout = {
  labelCol: {
    sm: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 20 }
  }
}


function SelectReport(props: Props) {
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
  } = props

  const [fileName, setFileName] = useState('');
  const [codeList, setCodeList] = useState([]);//二级项目list
  // 由于选择数据之后，之前的simpleName会丢失，记录旧数据用于对比,{}
  const [sourceCodeList, setSourceCodeList] = useState({});

  const onSave = (e: any) => {
    validateFields((err, value) => {
      if (err) {
        return
      }
      let tempArray:any = []
      value.itemCode.map((it:any)=>{
        it.simpleName = value[it.key]
        tempArray.push(it)
      })
      qcMonthCheckData.templateData.qcCode = value.qcCode
      qcMonthCheckData.templateData.itemCodeObj = tempArray || []
      delete value.itemCode;
      delete value.qcCode
      let keys = Object.keys(value)
      qcMonthCheckData.templateData.itemCodeList = keys
      qcMonthCheckData.getRatioByItemCode()
      // console.log(keys,tempArray)
      handleOk(value)
      // console.log('创建的内容',value)
   
    })
  }

  useEffect(() => {
    if (visible) {
      resetFields()
      setCodeList(qcMonthCheckData.templateData.itemCodeObj || [])
      let newObj = {}
      for (const item of qcMonthCheckData.templateData.itemCodeObj || []) {
        newObj[item.key] = item;
      }
      setSourceCodeList(newObj || {})
      qcMonthCheckData.getTemplateList()
    }
  }, [visible])
  

  return (
    <Modal title={'改进项目'} visible={visible}
      onOk={onSave}
      onCancel={handleCancel}
      centered maskClosable={false}
    >
      <Wrapper>
      <Form>
        <Form.Item {...formItemLayout} label='表模板'>
          {getFieldDecorator('qcCode', {
              initialValue: qcMonthCheckData.templateData.qcCode || '',
              rules: [{ required: true, message: '表模板不能为空' }]
            })(
              <Select
                style={{ width: '100%' }}
                onChange={(val:any)=>{
                  qcMonthCheckData.getReportTwoItem(val)
                }} >
                {qcMonthCheckData.templateList.map((v:any) =>
                      <Option value={v.qcCode} key={v.qcCode}>{v.qcName}</Option>)}
              </Select>
            )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='二级项目'>
          {getFieldDecorator('itemCode', {
              initialValue: qcMonthCheckData.templateData.itemCodeObj || [],
              rules: [{ required: true, message: '二级项目不能为空' }]
            })(
              <Select showSearch mode='multiple' labelInValue
                style={{ width: '100%' }}
                filterOption={(input:any, option:any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val:any)=>{
                  // console.log(sourceCodeList)
                  val.map((it:any)=>{
                    it.simpleName=sourceCodeList[it.key]?.simpleName || undefined
                  })
                  setCodeList(val)

                }} 
               > 
                {qcMonthCheckData.reportTwoItem.map((v:any) =>
                      <Option value={v.qcItemCode} key={v.qcItemCode}>{v.qcItemName}</Option>)}
              </Select>
            )}
        </Form.Item>
        {codeList.map((it:any)=> <Form.Item {...formItemLayout} label='项目简称'
        extra={'二级项目：'+it.label}>
              {getFieldDecorator(it.key+'', {
                initialValue: it.simpleName || '',
                rules: [{ required: true, message: '项目简称不能为空' }]
              })(<Input key={it.key} style={{ width: '100%' }} />)}
            </Form.Item>
        )}

      </Form>
      </Wrapper>
    </Modal>
  )
}
const Wrapper = styled.div`
.two-name{
  line-height: 1;
  margin: 0;
  color: #999;
  font-size: 12px;
}
`
export default Form.create()(observer(SelectReport)) as any
