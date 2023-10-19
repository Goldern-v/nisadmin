import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, InputNumber, DatePicker, Select, message, Icon, Upload, } from 'antd'
import {appStore} from "src/stores";
import { FormComponentProps } from 'antd/lib/form/Form'
import { observer } from 'mobx-react-lite'
import FormCreateModal from './CreateForm'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import { qcMonthCheckData } from './qcMonthCheckData'
import { authStore } from 'src/stores';
const { Option } = Select

// import { preJobManageApi } from "../PreJobManageApi";
export interface Props extends FormComponentProps {
  visible: boolean,
  handleOk: () => void,
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


function CreateMonthCheckReport(props: Props) {
  const {queryObj} = appStore
  const qcLevel = queryObj.qcLevel || '1'
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
  } = props

  const [defaultName, setDefaultName] = useState(moment().year()+'年'+authStore.defaultDeptCodeName+(moment().month()+1)+'月护理质量检查总结');
  const [formCreateVisible, setFormCreateVisible] = useState(false);
  const [summaryForm, setSummaryForm] = useState({} as any)

  // const defaultName = moment().year()+'年'+authStore.defaultDeptCodeName+(moment().month()+1)+'月护理质量检查总结'

  const onSave = (e: any) => {
    validateFields((err, value) => {
      if (err) {
        return
      }
      // console.log('创建的内容',value)
      qcMonthCheckData.createModalData = value
      qcMonthCheckData.createModalData.month = moment(value.month).format('YYYY-MM')
      qcMonthCheckData.createModalData.summaryFormCode = summaryForm.qcCode
      handleOk()
    })
  }

  useEffect(() => {
    if (visible) {
      resetFields()
      // console.log(moment().year()+'年'+authStore.defaultDeptCodeName+(moment().month()+1)+'月护理质量检查总结')
      // setDefaultName(moment().year()+'年'+authStore.defaultDeptCodeName+(moment().month()+1)+'月护理质量检查总结')
    }
  }, [visible])

  return (
    <Modal title={qcMonthCheckData.modalTitle} visible={visible}
      onOk={onSave}
      onCancel={handleCancel}
      centered maskClosable={false}
    >
      <Form>

        <Form.Item {...formItemLayout} label='质控月份'>
          {getFieldDecorator('month', {
            initialValue: moment(qcMonthCheckData.currentItem.startDate) || moment(),
            rules: [{ required: true, message: '质控月份不能为空' }]
          })
            (<DatePicker.MonthPicker disabled={qcMonthCheckData.currentItem.id?true:false} 
            style={{ width: '100%' }}
            onChange={(date:any)=>{
              qcMonthCheckData.currentItem.startDate = date
              setDefaultName(moment(date).year()+'年'
              +qcMonthCheckData.currentItem.wardName+(moment(date).month()+1)+'月护理质量检查总结')
            }}
             />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='质控科室'>
          {getFieldDecorator('deptCode', {
            initialValue: {key:qcMonthCheckData.currentItem.wardCode,label:qcMonthCheckData.currentItem.wardName} || {key:authStore.defaultDeptCode,label:authStore.defaultDeptCodeName},
            rules: [{ required: true, message: '质控科室不能为空' }]
          })(
            <Select labelInValue showSearch disabled={qcMonthCheckData.currentItem.id?true:false}
            filterOption={(input:any, option:any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
              style={{ width: '100%' }} 
              onChange={(val:any)=>{
                qcMonthCheckData.currentItem.wardCode = val.key
                qcMonthCheckData.currentItem.wardName = val.label
                setDefaultName(moment(qcMonthCheckData.currentItem.startDate).year()+'年'
              +val.label+(moment(qcMonthCheckData.currentItem.startDate).month()+1)+'月护理质量检查总结')
              }}>
              {authStore.deptList.map(v =>
                    <Option value={v.code} key={v.code}>{v.name}</Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='报告名称'>
          {getFieldDecorator('name', {
            initialValue: qcMonthCheckData.currentItem.reportName || defaultName,
            rules: [{ required: true, message: '报告名称不能为空' }]
          })(<Input style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label='质控表单' {...formItemLayout} >
          {getFieldDecorator('summaryFormName', {
              initialValue: qcMonthCheckData.currentItem?.summaryFormName || '',
              rules: [{required: true, message: '质控表单不能为空'}]
          })(<Input
              disabled={qcMonthCheckData.currentItem?.id || false}
              suffix={
                  <div onClick={() => setFormCreateVisible(true)}>
                      ...
                  </div>
              }/>)}
        </Form.Item>
      </Form>
      <FormCreateModal
          onCancel={() => setFormCreateVisible(false)}
          onOk={(qcCodeObj: any) => {
              setFieldsValue({summaryFormName: qcCodeObj?.qcName})
              setSummaryForm(qcCodeObj)
              setFormCreateVisible(false)
          }}
          visible={formCreateVisible}
          level={qcLevel}
      />
    </Modal>
  )
}
export default Form.create()(observer(CreateMonthCheckReport)) as any
