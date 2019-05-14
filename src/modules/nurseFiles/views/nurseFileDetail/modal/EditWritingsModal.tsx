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
import loginViewModel from 'src/modules/login/LoginViewModel'
import ImageUploader from 'src/components/ImageUploader'
const uploadCard = () => Promise.resolve('123')
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: string
  data?: any
  getTableData?: () => {}
}
const rules: Rules = {
  publicDate: (val) => !!val || '发表日期',
  title: (val) => !!val || '题目',
  rank: (val) => !!val || '本人排名',
  publication: (val) => !!val || '出版或刊登物',
  professional: (val) => !!val || '请选择技术职称'
}
export default function EditWorkHistoryModal (props: Props) {
  let { visible, onCancel, onOk, data } = props
  let refForm = React.createRef<Form>()
  console.log('this is refForm')
  console.log(refForm)
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
      auditedStatus: auditedStatusShow
    }
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    // value.startTime && (value.startTime = value.startTime.format('YYYY-MM-DD'))
    // value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))
    nurseFilesService.nurseWorkExperienceSaveOrUpdatePC({ ...obj, ...value }).then((res: any) => {
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
        publicDate: data.publicDate.moment(),
        title: data.title,
        rank: data.rank,
        publication: data.publication,
        professional: data.professional
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal title='修改著作译文论文' visible={visible} onCancel={onCancel} onOk={onSave} okText='保存'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`发表日期`} name='publicDate'>
              <DatePicker />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`题目`} name='title' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`本人排名`} name='rank' required>
              <Input />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`出版或刊登物`} name='publication' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={``} name='attachmentId'>
              <ImageUploader upload={uploadCard} text='添加附件' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
