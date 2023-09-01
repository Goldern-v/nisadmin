import { Radio, Form, message } from 'antd'
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
import { tableListData as model } from '../tableListData'
import { quarterAndYear1 } from 'src/enums/date';
import { api } from '../api';
import { Object } from 'lodash'

const Option = Select.Option;

export interface IProps extends FormComponentProps {
  rowEdit: any
}
let quarter = {
  '全年': 0,
  '第一季度': 1,
  '第二季度': 2,
  '第三季度': 3,
  '第四季度': 4,
}
export interface Props {
}
export default Form.create()(observer(function (props: IProps) {
  const { rowEdit, form: { getFieldDecorator, validateFields, setFieldsValue, resetFields } } = props

  const [yearPickShow, setYearPickShow] = useState(false);

  const [_disabled, setDisabled] = useState(false)

  const onSave = () => {
    validateFields(async(err, value) => {
      if (err) return
      if (rowEdit?.id) {
        let data  = await api.updateQcReport({
          id: rowEdit.id,
          reportName: value?.reportName || ''
        })
        if (data.code === '200') {
          message.success('修改成功')
          model.getTableList()
        } else {
          message.error(data.desc || '修改失败')
        }
        onCancel()
        console.log(data)
      } else {
        model.tableAddOk(value)
      }
      
    })
  }

  const onCancel = () => {
    model.tableAddonCancel()
    resetFields()
  }
    

  useEffect(() => {
    if (rowEdit?.id) {
      model.add_Quarter = quarter[rowEdit.reportQuarter]
      model.add_deptCode = rowEdit.wardCode
      setFieldsValue({
        reportYear: moment(rowEdit.reportYear),
        reportQuarter: quarter[rowEdit.reportQuarter],
        wardCode: rowEdit.wardCode,
        reportName: rowEdit.reportName
      })
      setDisabled(true)
    }
    else setDisabled(false)
    
  }, [rowEdit])
  
  return (
    <Modal
      title="创建"
      visible={model.tableAddVisible}
      onOk={onSave}
      onCancel={onCancel}
      okText='确定'
      centered
    >
      <Wrapper>
        <Form 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}>
          <Form.Item label="质控年度">
            {
              getFieldDecorator('reportYear', {
                initialValue: model.reportYear,
                rules: [
                  { required: true, message: '年份不能为空' }
                ]
              })
            (
              <DatePicker
                style={{ width: '100%' }}
                open={yearPickShow}
                onOpenChange={status => {
                  setYearPickShow(status)
                }}
                onPanelChange={(value, mode) => {
                  model.reportYear = value
                  model.cahngeReportName()
                  setYearPickShow(false)
                }}
                mode="year"
                value={ model.reportYear}
                allowClear={true}
                placeholder='选择年份'
                format="YYYY"
                disabled={_disabled}
              />
            )}
          </Form.Item>
          <Form.Item label="质控季度">
            {
              getFieldDecorator('reportQuarter', {
                initialValue: model.add_Quarter,
                rules: [
                  { required: true, message: '质控季度不能为空' }
                ]
              })
            (
              <Select
                disabled={_disabled}
                // defaultValue={moment().quarter()}
                onChange={(val: any) => {
                  model.add_Quarter = val
                  model.cahngeReportName()
                }}
              >
                {
                  quarterAndYear1.map((v: any, i: number) => (
                    <Option key={i} value={i}>{v}</Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label="质控科室">
            {
              getFieldDecorator('wardCode', {
                initialValue: '全院',
                rules: [
                  { required: true, message: '质控科室不能为空' }
                ]
              })
            (
              <Select
                disabled={_disabled}
                onChange={(val: any) => {
                  let obj = model.deptList.find((item: any) => item.code === val)
                  model.add_deptName = obj?.name
                  model.cahngeReportName()
                }}
              >
                <Option value='全院'>全院</Option>
                {model.deptList.map((item: any) => {
                  return <Option value={item.code} key={item.code}>{item.name}</Option>
                })} 
              </Select>
            )}
          </Form.Item>
          <Form.Item label="报告名称">
            {
              getFieldDecorator('reportName', {
                initialValue: model.reportName,
                rules: [
                  { required: true, message: '报告名称不能为空' }
                ]
              })
            (
              <Input />
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