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
import moment from 'moment'
import ImageUploader from 'src/components/ImageUploader'
import { appStore, authStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import { nurseFilesService } from '../../../services/NurseFilesService'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}

const rules: Rules = {
  startTime: (val) => !!val || '请选择开始时间',
  endTime: (val) => !!val || '请选择结束时间',
  trainingUnit: (val) => !!val || '请填写培训单位',
  trainingContent: (val) => !!val || '请填写培训内容'
  // hours: (val) => !!val || '请填写学时/分'
}

export default function EditWorkHistoryModal(props: Props) {
  const [title, setTitle] = useState('')
  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => { }
  const onSave = async () => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: '',
      urlImageOne: ''
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
    value.startTime && (value.startTime = value.startTime.format('YYYY-MM-DD'))
    value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    nurseFilesService.nurseContinuingEducationAdd({ ...obj, ...value }).then((res: any) => {
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
        startTime: moment(data.startTime),
        endTime: moment(data.endTime),
        trainingUnit: data.trainingUnit,
        trainingContent: data.trainingContent,
        hours: data.hours,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
      // refForm.current.setField('unit', 123)
    }
    if (signShow === '修改') {
      setTitle('修改继续教育')
    } else if (signShow === '添加') {
      setTitle('添加继续教育')
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Row gutter={10}>
            <Col span={15}>
              <Form.Field label={`时间`} name='startTime' required suffix='到'>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={9}>
              <Form.Field name='endTime'>
                <DatePicker />
              </Form.Field>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Field label={`培训单位`} name='trainingUnit' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`培训内容`} name='trainingContent' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`学习类型`} name='studyType'>
              <Select>
                <Option value="专科护士">专科护士</Option>
                <Option value="进修">进修</Option>
                <Option value="短期学习">短期学习</Option>
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`学分`} name='credit'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`学时`} name='hours'>
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
