import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Form, Input, Button, Radio, DatePicker, Select, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'
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

/** 职务列表 */
export const EDUCATION_LIST = ['中专', '大专', '本科', '研究生', '博士']
export const TITLE_LIST = ['护士', '护师', '主管护师', '副主任护师', '主任护师']
export const CURRENTLEVEL_LIST = ['全部', 'N0', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6']
export const POST_LIST = [
  '全部',
  '无',
  '教学小组组长',
  '教学秘书',
  '护理组长',
  '副护士长',
  '护士长',
  '科护士长',
  '护理部副主任',
  '护理部主任'
]
function AddNursingModal (props: Props) {
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields }
  } = props
  const handleSubmit = (e: any) => {
    validateFields((err, value) => {
      if (err) {
        return
      }
    })
  }
  const onSave = (e: any) => {
    validateFields((err, value) => {
      if (err) {
        return
      }
      if (value.birthday) value.birthday = value.birthday.format('YYYY-MM-DD')
      nurseFilesService.saveOrUpdate(value).then((res) => {
        message.success('操作成功')
        nurseFilesListViewModel.loadNursingList()
        handleOk()
      })
    })
  }
  return (
    <Modal title='Basic Modal' visible={visible} onOk={onSave} onCancel={handleCancel} okText='保存'>
      <Form>
        <Form.Item {...formItemLayout} label='姓名'>
          {getFieldDecorator('empName', {
            rules: [{ required: true, message: '姓名不能为空' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='性别'>
          {getFieldDecorator('sex', { initialValue: '1', rules: [{ required: true, message: '身份证号不能为空' }] })(
            <Radio.Group buttonStyle='solid'>
              <Radio.Button value='0'>男</Radio.Button>
              <Radio.Button value='1'>女</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='身份证号'>
          {getFieldDecorator('cardNumber', {
            rules: [{ required: true, message: '身份证号不能为空' }]
          })(<Input />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='出生年月'>
          {getFieldDecorator('birthday')(<DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='所属科室'>
          {getFieldDecorator('deptCode', {
            initialValue: authStore.selectedDeptCode,
            rules: [{ required: true, message: '所属科室不能为空' }]
          })(
            <Select showSearch style={{ width: '100%' }} placeholder='选择所属科室'>
              {authStore.deptList.map((item: any) => {
                return (
                  <Select.Option value={item.code} key={item}>
                    {item.name}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='工号'>
          {getFieldDecorator('gh', {
            rules: [{ required: true, message: '工号不能为空' }]
          })(<Input />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='学历'>
          {getFieldDecorator('education', {
            rules: [{ required: true, message: '学历不能为空' }]
          })(
            <Select showSearch style={{ width: '100%' }} placeholder='选择学历'>
              {EDUCATION_LIST.map((item: string) => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='职称'>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '职称不能为空' }]
          })(
            <Select showSearch style={{ width: '100%' }} placeholder='选择所属科室'>
              {TITLE_LIST.map((item: string) => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='层级'>
          {getFieldDecorator('currentLevel', {
            rules: [{ required: true, message: '层级不能为空' }]
          })(
            <Select showSearch style={{ width: '100%' }} placeholder='选择所属科室'>
              {CURRENTLEVEL_LIST.map((item: string) => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='职务'>
          {getFieldDecorator('post', {
            rules: [{ required: true, message: '职务不能为空' }]
          })(
            <Select showSearch style={{ width: '100%' }} placeholder='选择职务'>
              {POST_LIST.map((item: string) => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        {/*
        <Form.Item {...formItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item> */}
      </Form>
    </Modal>
  )
}
export default Form.create()(observer(AddNursingModal))
// const Wrapper = styled.div``
