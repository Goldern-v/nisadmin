import { Form, Input, Modal } from 'antd'
import { Select } from 'antd/es'
import { FormComponentProps } from 'antd/es/form'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Obj } from 'src/libs/types'
import { authStore } from 'src/stores'
import styled from 'styled-components'
import { handbookModel as model } from '../model'

const { Option } = Select
export interface IProps extends FormComponentProps {
  data?: Obj,
  onOk: (e: any) => void
}
/**创建确认 */
export default Form.create()(observer(function (props: IProps) {
  let deptName = '全院'
  const { data, onOk, form: { getFieldDecorator, validateFields, setFieldsValue, resetFields } } = props
  const onSave = () => {
    validateFields((err, value) => {
      if (err) return
      value.deptName = deptName
      onOk && onOk(value)
    })
  }
  const selectDept = (val: any, option: Obj) => {
    deptName = option?.props?.children
    setFieldsValue({
      handbookName: deptName + '规培手册',
    })
  }

  useEffect(() => {
    if (model.addConfirmVisible) {
      resetFields()
      if (!data) return
      deptName = authStore.deptList.find(v => data.deptCode === v.code)?.name || '全院'
      setFieldsValue({
        deptCode: data.deptCode,
        handbookName: deptName +data.hierarchy + '规培手册',
      })
    }
  }, [model.addConfirmVisible])

  return (
    <Wrapper>
      <Modal
        visible={model.addConfirmVisible}
        title={'创建确认'}
        onOk={onSave}
        onCancel={() => model.addConfirmVisible = false}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        >
          <Form.Item label="科室">
            {
              getFieldDecorator('deptCode', {
                initialValue: '全院',
                rules: [
                  { required: true, message: '科室不能为空' }
                ]
              })(
                <Select onChange={selectDept}>
                  <Option value={'全院'}>全院</Option>
                  {authStore.deptList.map(v =>
                    <Option value={v.code} key={v.code}>{v.name}</Option>)}
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="手册名称">
            {
              getFieldDecorator('handbookName', {
                initialValue: '',
                rules: [
                  { required: true, message: '手册名称不能为空' }
                ]
              })(
                <Input />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  )
}))

const Wrapper = styled.div`

`