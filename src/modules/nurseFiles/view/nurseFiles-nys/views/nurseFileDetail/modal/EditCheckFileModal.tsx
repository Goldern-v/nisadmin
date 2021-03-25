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
import ImageUploader from 'src/components/ImageUploader'
import { appStore, authStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  startTime: (val) => !!val || '请填写开始时间',
  endTime: (val) => !!val || '请填写结束时间',
  checkContent: (val) => !!val || '请填写考核内容',
  checkScore: (val) => !!val || '请填写考核成绩',
}

export default function EditCheckFileModal(props: Props) {
  const [title, setTitle] = useState('')

  // const [topTitle, setTopTitle] = useState('修改著作译文论文')
  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => { }

  const onSave = async () => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: ''
    }
    if ((authStore.user && authStore.user.post) === '护长') {
      obj.auditedStatus = 'waitAuditedNurse'
    } else if ((authStore.user && authStore.user.post) === '护理部') {
      obj.auditedStatus = 'waitAuditedDepartment'
    }
    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }

    if (!refForm.current) return

    let [err, value] = await to(refForm.current.validateFields())

    if (err) return

    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))

    nurseFilesService.nurseCheckFileAdd({ ...obj, ...value }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        publicDate: moment(data.publicDate),
        startTime: data.startTime,
        endTime: data.endTime,
        checkContent: data.checkContent,
        checkScore: data.checkScore,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
      // refForm.current.setField('unit', 123)
    }
    if (signShow === '修改') {
      setTitle('修改考核')
    } else if (signShow === '添加') {
      setTitle('添加考核')
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={100} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`开始时间`} name='startTime' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`结束时间`} name='endTime' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`考核内容`} name='checkContent' required>
              <Input.TextArea autosize={{ minRows: 2 }} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`考核成绩`} name='checkScore' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`附件`} name='urlImageOne'>
              <MultipleImageUploader text='添加图片' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
