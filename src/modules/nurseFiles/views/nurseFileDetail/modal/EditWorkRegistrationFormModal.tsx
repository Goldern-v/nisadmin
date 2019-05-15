import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, InputNumber } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
import loginViewModel from 'src/modules/login/LoginViewModel'
// 加附件
import ImageUploader from 'src/components/ImageUploader'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const uploadCard = () => Promise.resolve('123')
const rules: Rules = {
  year: (val) => !!val || '年度',
  nightShift: (val) => !!val || '夜班',
  checkOut: (val) => !!val || '查房',
  nursingConsultation: (val) => !!val || '护理会诊',
  caseDiscussion: (val) => !!val || '病区讨论',
  individualCase: (val) => !!val || '个案',
  lecture: (val) => !!val || '小讲课',
  teaching: (val) => !!val || '带教',
  witness: (val) => !!val || '证明人'
}
export default function EditWorkHistoryModal (props: Props) {
  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()
  console.log('this is refForm')
  console.log(refForm)
  if (signShow === '添加') {
    data = {}
  }
  const onFieldChange = () => {}
  const onSave = async () => {
    let getPostData = loginViewModel.post
    let auditedStatusShow = 'waitAuditedDepartment'
    if (getPostData === '护士长') {
      auditedStatusShow = 'waitAuditedNurse'
    } else if (getPostData === '护理部') {
      auditedStatusShow = 'waitAuditedDepartment'
    }
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: auditedStatusShow,
      attachmentId: '',
      urlImageOne: ''
    }
    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.year && (value.year = value.year.format('YYYY'))
    nurseFilesService.nurseRegistrationWorkAdd({ ...obj, ...value }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      onCancel()
    })
  }
  setTimeout(() => console.log('update', refForm.current), 1000)

  useLayoutEffect(() => {
    console.log(visible, 'visible', refForm.current, 'refForm.current')
    /** 如果是修改 */
    //
    if (data && refForm.current && visible) {
      console.log(refForm.current, visible, data)
      refForm!.current!.setFields({
        // year: data.year,
        nightShift: data.nightShift,
        checkOut: data.checkOut,
        professional: data.professional,
        nursingConsultation: data.nursingConsultation,
        caseDiscussion: data.caseDiscussion,
        individualCase: data.individualCase,
        lecture: data.lecture,
        teaching: data.teaching,
        witness: data.witness
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal title='修改工作情况登记表' visible={visible} onOk={onSave} onCancel={onCancel} okText='保存'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Row>
            <Col span={24}>
              <Form.Field label={`年度`} name='year'>
                <DatePicker />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`夜班`} name='nightShift' required>
                <InputNumber />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`查房`} name='checkOut' required>
                <InputNumber />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`护理会诊`} name='nursingConsultation' required>
                <InputNumber />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`病例讨论`} name='caseDiscussion' required>
                <InputNumber />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`个案`} name='individualCase' required>
                <InputNumber />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`小讲课`} name='lecture' required>
                <InputNumber />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`带教`} name='teaching' required>
                <InputNumber />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`证明人`} name='witness' required>
                <Input />
              </Form.Field>
            </Col>
          </Row>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
