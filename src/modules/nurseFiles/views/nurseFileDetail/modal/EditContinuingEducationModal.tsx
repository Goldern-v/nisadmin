import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
import ImageUploader from 'src/components/ImageUploader'
import { appStore, authStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
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
  trainingContent: (val) => !!val || '请填写培训内容',
  hours: (val) => !!val || '请填写学时/分'
}
export default function EditWorkHistoryModal (props: Props) {
  const [attachmentId, setAttachmentId] = useState('')
  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const uploadCard = async (file: any) => {
    let obj: any = {
      file,
      empNo: appStore.queryObj.empNo,
      type: '2',
      auditedStatus: ''
    }
    if (authStore!.user!.post == '护长') {
      obj.auditedStatus = 'waitAuditedNurse'
    } else if (authStore!.user!.post == '护理部') {
      obj.auditedStatus = 'waitAuditedDepartment'
    }
    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }
    const [err, res] = await to(service.commonApiService.uploadFile(obj))
    if (err) {
      message.error(err.message)
      return res || ''
    }
    if (res.data) {
      let pathImg = `${res.data.path}`
      setAttachmentId(res.data.id + ',')
      return pathImg
    }
  }

  const onFieldChange = () => {}
  const onSave = async () => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: 'waitAuditedNurse',
      attachmentId: attachmentId,
      urlImageOne: ''
    }
    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.startTime && (value.startTime = value.startTime.format('YYYY-MM-DD'))
    value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))
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
     
      setAttachmentId(data.attachmentId)
      refForm!.current!.setFields({
        startTime: moment(data.startTime),
        endTime: moment(data.endTime),
        trainingUnit: data.trainingUnit,
        trainingContent: data.trainingContent,
        hours: data.hours,
        urlImageOne: data.urlImageOne
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal title='修改继续教育' visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
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
            <Form.Field label={`学时`} name='hours' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={``} name='urlImageOne'>
              <ImageUploader upload={uploadCard} text='添加附件' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
