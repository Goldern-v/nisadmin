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
import service from 'src/services/api'
const uploadCard = () => Promise.resolve('123')
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
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
  const [attachmentId, setAttachmentId] = useState('')
  const uploadCard = async (file: any) => {
    let obj: any = {
      file,
      empNo: appStore.queryObj.empNo,
      type: '0'
    }
    if (authStore!.user!.post === '护长') {
      obj.auditedStatus = 'waitAuditedNurse'
    } else if (authStore!.user!.post === '护理部') {
      obj.auditedStatus = 'waitAuditedDepartment'
    }

    const [err, res] = await to(service.commonApiService.uploadFile(obj))
    if (err) {
      message.error(err.message)
      return res || ''
    }
    if (res.data) {
      let pathImg = `/asset/nurseAttachment${res.data.path}`
      setAttachmentId(res.data.id + ',')
      return pathImg
    }
  }
  // const [topTitle, setTopTitle] = useState('修改著作译文论文')
  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

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
      attachmentId: attachmentId,
      urlImageOne: ''
    }
    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    // value.startTime && (value.startTime = value.startTime.format('YYYY-MM-DD'))
    // value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))
    nurseFilesService.nursePaperExperienceAdd({ ...obj, ...value }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      console.log(refForm.current, visible, data)
      setAttachmentId(data.attachmentId)
      refForm!.current!.setFields({
        publicDate: moment(data.publicDate),
        title: data.title,
        rank: data.rank,
        publication: data.publication,
        professional: data.professional,
        urlImageOne: data.urlImageOne
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal title='添加附件' visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`内容`} name='title' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`文件数`} name='rank' required>
              <Input />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
