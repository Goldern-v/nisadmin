import { Form, Modal, Upload } from 'antd'
import { Select } from 'antd/es'
import { FormComponentProps } from 'antd/es/form'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import MultiFileUploader from 'src/components/MultiFileUploader'
import { HIERARCHY } from 'src/enums/global'
import { Obj } from 'src/libs/types'
import { authStore } from 'src/stores'
import styled from 'styled-components'

const { Option } = Select
export interface IProps extends FormComponentProps {
  visible: boolean,
  data?: Obj,
  onOkCb: Function,
  onCancel: (e: any) => void
}
let deptName = '全院'
export default Form.create()(observer(function (props: IProps) {
  const { visible, data, onOkCb, onCancel, form: { getFieldDecorator, validateFields, setFieldsValue, resetFields } } = props
  const onOk = () => {
    validateFields((err, value) => {
      if (err) return
      const { list: [item], ...params } = value
      if (data) params.id = data.id
      params.attachmentName = item.fileName || item.name
      params.tableName = item.fileName || item.name
      params.attachmentId = item.id
      params.deptName = deptName
      onOkCb(params)
    })
  }
  const selectDept = (val: any, option: Obj) => {
    deptName = option?.props?.children
  }
  const selectHierarchy = (val: any) => {
    if (val === '全部') {
      setFieldsValue({
        deptCode: '全院'
      })
    }
  }

  useEffect(() => {
    resetFields()
    if (data) {
      const { deptCode, deptName: dName, tableName, attachmentId, hierarchy } = data
      deptName = dName
      setFieldsValue({
        deptCode,
        hierarchy,
        list: [{
          id: attachmentId,
          fileName: tableName,
          name: tableName,
        }]
      })
    }
  }, [data, visible])

  return (
    <Wrapper>
      <Modal
        visible={visible}
        title={data ? '修改' : '新建'}
        onOk={onOk}
        onCancel={onCancel}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
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
          <Form.Item label="层级">
            {
              getFieldDecorator('hierarchy', {
                initialValue: '全部',
                rules: [
                  { required: true, message: '层级不能为空' }
                ]
              })(
                <Select onChange={(e) => selectHierarchy(e)}>
                  {HIERARCHY.map((v) => <Option value={v} key={v}>{v}</Option>)}
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="附件">
            {
              getFieldDecorator('list', {
                initialValue: [],
                rules: [
                  { required: true, message: '附件不能为空' }
                ],
                valuePropName: 'data'
              })(
                <MultiFileUploader isFormModel type='handbookAttachment' typeList={['pdf']} size={1} maxSize={5 * 1024 * 1024} />
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