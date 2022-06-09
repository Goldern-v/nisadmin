import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
import loginViewModel from 'src/modules/login/LoginViewModel'
// 加附件
import ImageUploader from 'src/components/ImageUploader'
import { authStore, appStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  info: any
  callback?: () => void
}
const rules: Rules = {
  empName: (val) => !!val || '请填写变动人员',
  leaveDate: (val) => !!val || '请填写变动日期',
  status: (val) => !!val || '请选择变动状态'
}
export default function LeaveModal(props: Props) {
  const [title, setTitle] = useState('人员变动')

  let { visible, onCancel, onOk, info } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.leaveDate && (value.leaveDate = value.leaveDate.format('YYYY-MM-DD'))
    nurseFilesService.updateNurseLeave({ ...value }).then((res: any) => {
      message.success('操作成功')
      appStore.history.push('/nurseFile/onTheJob')
      // props.callback && props.callback()
      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (info && refForm.current && visible) {
      refForm!.current!.setFields({
        empNo: info.empNo,
        empName: info.empName,
        leaveDate: null,
        status: null,
        remark: ''
      })
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onOk={onSave} onCancel={onCancel} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`人员`} name='empName' required>
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`日期`} name='leaveDate' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`状态`} name='status' required>
              <Radio.Group>
                <Radio value={'离职'}>离职</Radio>
                <Radio value={'退休'}>退休</Radio>
                <Radio value={'调离'}>调离</Radio>
              </Radio.Group>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`备注`} name='remark'>
              <Input.TextArea rows={4} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
