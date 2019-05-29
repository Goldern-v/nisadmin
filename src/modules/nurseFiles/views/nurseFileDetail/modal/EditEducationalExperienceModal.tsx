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
import { appStore, authStore } from 'src/stores'
import emitter from 'src/libs/ev';
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: number
  data?: any
  signShow: string
  getTableData?: () => {}
}
const rules: Rules = {
  readTime: (val) => !!val || '就读时间',
  graduationTime: (val) => !!val || '毕业时间',
  graduationSchool: (val) => !!val || '毕业学校',
  readProfessional: (val) => !!val || '专业',
  education: (val) => !!val || '学历'

  // urlImageTwo: (val) => !!val || '毕业证',
  // urlImageOne: (val) => !!val || '学位证'
}
export default function EditWorkHistoryModal (props: Props) {
  let { visible, onCancel, onOk, data, signShow } = props
  const [pathImgGraduate, setPathImgGraduate] = useState('')
  const [pathImgDegree, setPathImgDegree] = useState('')
  const [attachmentId1, setAttachmentId1] = useState('')
  const [attachmentId2, setAttachmentId2] = useState('')
  const uploadCardGraduate = async (file: any) => {
    const [err, res] = await to(nurseFilesService.uploadFileUserEducat(file))
    if (err) {
      message.error(err.message)
      return res || ''
    }
    if (res.data) {
      let pathImg = `${res.data.path}`
      if (!data) {
        data = {}
      }
      data.urlImageTwo = pathImg
      console.log(pathImg)
      setPathImgGraduate(pathImg)
      setAttachmentId1(res.data.id)
      return pathImg
    }
  }

  const uploadCardDegree = async (file: any) => {
    const [err, res] = await to(nurseFilesService.uploadFileUserEducat(file))
    if (err) {
      message.error(err.message)
      return res || ''
    }
    if (res.data) {
      let pathImg = `${res.data.path}`
      if (!data) {
        data = {}
      }
      data.urlImageOne = pathImg
      console.log(pathImg)
      setPathImgDegree(pathImg)
      setAttachmentId2(res.data.id)
      return pathImg
    }
  }
  let refForm = React.createRef<Form>()
  console.log('this is refForm')
  console.log(refForm)
  const onFieldChange = () => {}

  const onSave = async () => {
    // let getPostData = loginViewModel.post
    // let auditedStatusShow = 'waitAuditedDepartment'
    // if (getPostData === '护士长') {
    //   auditedStatusShow = 'waitAuditedNurse'
    // } else if (getPostData === '护理部') {
    //   auditedStatusShow = 'waitAuditedDepartment'
    // }
    const obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: '',
      urlImageOne: pathImgDegree,
      urlImageTwo: pathImgGraduate,
      // 每个附件对应的id
      fileIdz: '',
      attachmentId: attachmentId1 + ',' + attachmentId2 + ','
    }
    if (authStore!.user!.post == '护长') {
      obj.auditedStatus = 'waitAuditedNurse'
    } else if (authStore!.user!.post == '护理部') {
      obj.auditedStatus = 'waitAuditedDepartment'
    }
    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }

    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    value.readTime && (value.readTime = value.readTime.format('YYYY-MM-DD'))
    value.graduationTime && (value.graduationTime = value.graduationTime.format('YYYY-MM-DD'))

    nurseFilesService.userEducatAdd({ ...value, ...obj }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }
  setTimeout(() => console.log('update', refForm.current), 1000)

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      setAttachmentId1((data.attachmentId && data.attachmentId.split(',')[0]) || '')
      setAttachmentId2((data.attachmentId && data.attachmentId.split(',')[1]) || '')
      console.log(refForm.current, visible, data)
      refForm!.current!.setFields({
        readTime: moment(data.readTime),
        graduationTime: moment(data.graduationTime),
        graduationSchool: data.graduationSchool,
        readProfessional: data.readProfessional,
        education: data.education,
        urlImageTwo: data.urlImageTwo,
        urlImageOne: data.urlImageOne
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal title='修改教育经历' visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Row gutter={10}>
            <Col span={15}>
              <Form.Field label={`时间`} name='readTime' required suffix='到'>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={9}>
              <Form.Field name='graduationTime'>
                <DatePicker />
              </Form.Field>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Field label={`毕业学校`} name='graduationSchool' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`专业`} name='readProfessional' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`学历`} name='education' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`毕业证`} name='urlImageTwo'>
              <ImageUploader upload={uploadCardGraduate} text='添加毕业证' />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`学位证`} name='urlImageOne'>
              <ImageUploader upload={uploadCardDegree} text='添加学位证' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
