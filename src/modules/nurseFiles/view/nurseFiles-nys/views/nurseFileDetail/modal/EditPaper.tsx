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
  types: (val) => !!val || '请填写论文类别',
  name: (val) => !!val || '请填写论文名称',
  publicDate: (val) => !!val || '请填写发表日期',
  owner: (val) => !!val || '请填写作者',
  range: (val) => !!val || '请填写本人排名',
  publishMaterial: (val) => !!val || '请填写出版或刊登物'
}

export default function EditPaper(props: Props) {
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
    value.publicDate && (value.publicDate = value.publicDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    nurseFilesService.nursePaperAdd({ ...obj, ...value }).then((res: any) => {
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
        name: data.name,
        range: data.range,
        types: data.types,
        owner: data.owner,
        publishMaterial: data.publishMaterial,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
      // refForm.current.setField('unit', 123)
    }
    if (signShow === '修改') {
      setTitle('修改论文')
    } else if (signShow === '添加') {
      setTitle('添加论文')
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={100} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`论文类别`} name='types' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`论文名称`} name='name' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`发表日期`} name='publicDate' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`作者`} name='owner' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`本人排名`} name='range' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`出版或刊登物`} name='publishMaterial' required>
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
