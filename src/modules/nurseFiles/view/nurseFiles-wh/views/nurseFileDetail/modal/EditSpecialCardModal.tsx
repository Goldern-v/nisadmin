import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, Alert } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
import loginViewModel from 'src/modules/login/LoginViewModel'
import ImageUploader from 'src/components/ImageUploader'
import { appStore, authStore } from 'src/stores'
import service from 'src/services/api'
import { observer } from 'mobx-react-lite'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: number
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  time: (val) => !!val || '获得时间',
  specialQualificationName: (val) => !!val || '资格名称',
  specialQualificationNo: (val) => !!val || '资格证编号'
}
export default observer(function EditWorkHistoryModal(props: Props) {
  const [title, setTitle] = useState('')
  const uploadOption = {
    empNo: appStore.queryObj.empNo,
    type: '4',
    auditedStatus:
      (authStore.user && authStore.user.post) === '护长'
        ? 'waitAuditedNurse'
        : (authStore.user && authStore.user.post) === '护理部'
        ? 'waitAuditedDepartment'
        : ''
  }

  let { visible, onCancel, onOk, data, signShow } = props

  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}
  const onSave = async () => {
    let obj = { ...uploadOption }

    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }

    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.time && (value.time = value.time.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    nurseFilesService.nurseSpecialQualificationAdd({ ...obj, ...value }).then((res: any) => {
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
        specialQualificationName: data.specialQualificationName,
        specialQualificationNo: data.specialQualificationNo,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改特殊资格证')
    } else if (signShow === '添加') {
      setTitle('添加特殊资格证')
    }
  }, [visible])
  // }
  return (
    <div>
      <Modal title={title} visible={visible} onOk={onSave} onCancel={onCancel} okText='保存' forceRender>
        <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFieldChange}>
          <Row>
            <Col span={24}>
              <Form.Field label={`获得时间`} name='time' required>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`资格名称`} name='specialQualificationName' required>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`资格证编号`} name='specialQualificationNo' required>
                <Input />
              </Form.Field>
            </Col>

            <Col span={24}>
              <Form.Field label={`附件`} name='urlImageOne'>
                <MultipleImageUploader text='添加图片' uploadOption={uploadOption} />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`备注`} name='remarks'>
                <Input />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
})
const Wrapper = styled.div``
