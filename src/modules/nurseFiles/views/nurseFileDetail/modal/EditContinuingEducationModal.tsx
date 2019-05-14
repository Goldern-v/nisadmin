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
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id: string
  data?: any
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
  let { visible, onCancel, onOk, data } = props
  let refForm = React.createRef<Form>()
  console.log('this is refForm')
  console.log(refForm)
  const uploadCard = () => Promise.resolve('123')
  const onFieldChange = () => {}
  const onSave = async () => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: 'waitAuditedNurse',
      attachmentId: '56,57'
    }
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.startTime && (value.startTime = value.startTime.format('YYYY-MM-DD'))
    value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))
    nurseFilesService.nurseContinuingEducationAdd({ ...obj, ...value }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      onCancel()
    })
  }
  setTimeout(() => console.log('update', refForm.current), 1000)

  useLayoutEffect(() => {
    console.log(visible, 'visible', refForm.current, 'refForm.current')
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      console.log(refForm.current, visible, data)
      refForm!.current!.setFields({
        startTime: moment(data.startTime),
        endTime: moment(data.endTime),
        trainingUnit: data.trainingUnit,
        trainingContent: data.trainingContent,
        hours: data.hours
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal title='修改继续教育' visible={visible} onCancel={onCancel} onOk={onSave} okText='保存'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
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
            <Form.Field label={``} name=''>
              <ImageUploader upload={uploadCard} text='添加毕业证' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
