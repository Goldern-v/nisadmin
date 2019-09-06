import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'

import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import loginViewModel from 'src/modules/login/LoginViewModel'
// 加附件
import ImageUploader from 'src/components/ImageUploader'
import { nurseFilesService } from '../../../services/NurseFilesService'
const Option = Select.Option
const { TextArea } = Input
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const uploadCard = () => Promise.resolve('123')
const rules: Rules = {
  time: (val) => !!val || '时间',
  reason: (val) => !!val || '事件原因',
  result: (val) => !!val || '处理结论'
}
export default function EditWorkHistoryModal(props: Props) {
  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}
  const onSave = async () => {
    let getPostData = loginViewModel.post

    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      attachmentId: '',
      urlImageOne: '',
      auditedStatus: ''
    }
    if ((authStore.user && authStore.user.post) == '护长') {
      obj.auditedStatus = 'waitAuditedNurse'
    } else if ((authStore.user && authStore.user.post) == '护理部') {
      obj.auditedStatus = 'waitAuditedDepartment'
    }
    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.time && (value.time = value.time.format('YYYY-MM-DD'))
    nurseFilesService.nurseBehaviorRecordAdd({ ...obj, ...value }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        // time: moment(data.time),
        reason: data.reason,
        result: data.result
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal title='修改不良行为' visible={visible} onOk={onSave} onCancel={onCancel} okText='保存' forceRender>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`时间`} name='time'>
              <DatePicker />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`事件原因`} name='reason' required>
              <TextArea rows={4} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`处理结论`} name='result' required>
              <TextArea rows={4} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={``} name=''>
              <ImageUploader upload={uploadCard} text='添加附件' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
