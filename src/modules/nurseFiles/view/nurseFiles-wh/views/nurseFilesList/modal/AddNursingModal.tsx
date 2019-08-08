import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Form, Input, Button, Radio, DatePicker, Select, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { statisticsViewModal } from 'src/modules/nurseFiles/view/statistics/StatisticsViewModal'
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
export const CURRENTLEVEL_LIST = ['N0', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6']
export const POST_LIST = [
  // '全部',
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
function AddNursingModal(props: Props) {
  let {
    visible,
    handleOk,
    handleCancel,
    form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
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
      if (value.deptCode) value.deptName = authStore.deptList.find((item) => item.code == value.deptCode)!.name
      nurseFilesService.saveOrUpdate(value).then((res) => {
        message.success('操作成功')
        nurseFilesListViewModel.loadNursingList()
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
    <Modal title='添加护士' visible={visible} onOk={onSave} onCancel={handleCancel} okText='保存' centered>
      <Form>
        <Form.Item {...formItemLayout} label='姓名'>
          {getFieldDecorator('empName', {
            rules: [{ required: true, message: '姓名不能为空' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='性别'>
          {getFieldDecorator('sex', { initialValue: '女', rules: [{ required: true, message: '性别不能为空' }] })(
            <Radio.Group buttonStyle='solid'>
              <Radio.Button value='男'>男</Radio.Button>
              <Radio.Button value='女'>女</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='是否护士'>
          {getFieldDecorator('isNurse', { initialValue: true })(
            <Radio.Group buttonStyle='solid'>
              <Radio.Button value={true}>是</Radio.Button>
              <Radio.Button value={false}>否</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='身份证号'>
          {getFieldDecorator('cardNumber')(<Input />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='出生年月'>
          {getFieldDecorator('birthday')(<DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='所属科室'>
          {getFieldDecorator('deptCode', {
            initialValue: authStore.selectedDeptCode
          })(
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder='选择所属科室'
              filterOption={(input: any, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {authStore.deptList.map((item: any) => {
                return (
                  <Select.Option value={item.code} key={item.name}>
                    {item.name}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='工号'>
          {getFieldDecorator('empNo', {
            rules: [{ required: true, message: '工号不能为空' }]
          })(<Input />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='学历'>
          {getFieldDecorator('highestEducation')(
            <Select showSearch style={{ width: '100%' }} placeholder='选择学历'>
              {statisticsViewModal.getDict('学历').map((item: any) => (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label='职称'>
          {getFieldDecorator('newTitle')(
            <Select showSearch style={{ width: '100%' }} placeholder='选择所属科室'>
              {statisticsViewModal.getDict('技术职称').map((item: any) => (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='层级'>
          {getFieldDecorator('nurseHierarchy')(
            <Select showSearch style={{ width: '100%' }} placeholder='选择层级'>
              {statisticsViewModal.getDict('层级').map((item: any) => (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='职务'>
          {getFieldDecorator('job')(
            <Select showSearch style={{ width: '100%' }} placeholder='选择职务'>
              {statisticsViewModal.getDict('职务').map((item: any) => (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
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
export default Form.create()(observer(AddNursingModal)) as any
// const Wrapper = styled.div``
