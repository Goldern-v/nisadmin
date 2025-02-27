import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'

import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
// import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
// import loginViewModel from 'src/modules/login/LoginViewModel'
// 加附件
// import ImageUploader from 'src/components/ImageUploader'
import { authStore, appStore } from 'src/stores'
// import service from 'src/services/api'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import { nurseFilesService } from '../../../services/NurseFilesService'
// const Option = Select.Option

export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}

const rules: Rules = {
  time: (val) => !!val || '请填写获奖时间',
  awardWinningName: (val) => !!val || '请填写奖项名称',
  rank: (val) => !!val || '请填写本人排名',
  awardlevel: (val) => !!val || '请填写奖项级别',
  approvalAuthority: (val) => !!val || '请填写授奖机构'
}

export default function EditWorkHistoryModal(props: Props) {
  let { visible, onCancel, onOk, data, signShow } = props

  const [title, setTitle] = useState('')


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

    value.time && (value.startTime = value.time.format('YYYY-MM-DD'))

    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))

    nurseFilesService.nurseAwardWinningAdd({ ...obj, ...value }).then((res: any) => {
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
        time: moment(data.time),
        awardWinningName: data.awardWinningName,
        rank: data.rank,
        awardlevel: data.awardlevel,
        approvalAuthority: data.approvalAuthority,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }

    if (signShow === '修改') {
      setTitle('修改所获奖励')
    } else if (signShow === '添加') {
      setTitle('添加所获奖励')
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onOk={onSave} onCancel={onCancel} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`获奖时间`} name='time'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`奖项名称`} name='awardWinningName' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`本人排名`} name='rank' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`奖项级别`} name='awardlevel' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`授奖机构`} name='approvalAuthority' required>
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
