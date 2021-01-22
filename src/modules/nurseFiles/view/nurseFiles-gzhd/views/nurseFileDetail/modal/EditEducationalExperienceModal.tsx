import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'

// import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
// import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
// import loginViewModel from 'src/modules/login/LoginViewModel'
// import ImageUploader from 'src/components/ImageUploader'
import { appStore, authStore } from 'src/stores'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import { nurseFilesService } from '../../../services/NurseFilesService'
// const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: number
  data?: any
  signShow: string
  getTableData?: () => {}
}
const rules: Rules = {
  readTime: (val) => !!val || '请填写就读时间',
  graduationTime: (val) => !!val || '请填写毕业时间',
  graduationSchool: (val) => !!val || '请填写毕业学校',
  readProfessional: (val) => !!val || '请填写专业',
  education: (val) => !!val || '请填写学历'

  // urlImageTwo: (val) => !!val || '毕业证',
  // urlImageOne: (val) => !!val || '学位证'
}
export default function EditWorkHistoryModal(props: Props) {
  const [title, setTitle] = useState('')
  let { visible, onCancel, onOk, data, signShow } = props

  const uploadOption = {
    empNo: appStore.queryObj.empNo,
    auditedStatus:
      (authStore.user && authStore.user.post) === '护长'
        ? 'waitAuditedNurse'
        : (authStore.user && authStore.user.post) === '护理部'
          ? 'waitAuditedDepartment'
          : ''
  }

  let refForm = React.createRef<Form>()

  const onFieldChange = () => { }

  const onSave = async (sign: boolean) => {
    let obj = { ...uploadOption }

    if (!sign) obj.auditedStatus = 'noSubmit'

    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }

    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    value.readTime && (value.readTime = value.readTime.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    value.graduationTime && (value.graduationTime = value.graduationTime.format('YYYY-MM-DD'))

    nurseFilesService.userEducatAdd({ ...value, ...obj, sign }).then((res: any) => {
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
        readTime: moment(data.readTime),
        graduationTime: moment(data.graduationTime),
        graduationSchool: data.graduationSchool,
        readProfessional: data.readProfessional,
        education: data.education,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })

      // refForm.current.setField('unit', 123)
    }
    if (signShow === '修改') {
      setTitle('修改教育经历')
    } else if (signShow === '添加') {
      setTitle('添加教育经历')
    }
  }, [visible])

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key='back' onClick={onCancel}>
          关闭
      </Button>,
        <Button key='save' type='primary' onClick={() => onSave(false)}>
          保存
      </Button>,
        <Button key='submit' type='primary' onClick={() => onSave(true)}>
          提交审核
      </Button>
      ]}
      forceRender>
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFieldChange}>
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
            <Form.Field label={`附件`} name='urlImageOne'>
              <MultipleImageUploader text='添加图片' uploadOption={uploadOption} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
