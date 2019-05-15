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
// 加附件
import ImageUploader from 'src/components/ImageUploader'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: number
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const uploadCard = () => Promise.resolve('123')
const rules: Rules = {
  startTime: (val) => !!val || '请选择开始时间',
  endTime: (val) => !!val || '请选择结束时间',
  unit: (val) => !!val || '请填写工作单位',
  professionalWork: (val) => !!val || '请填写专业技术工作',
  professional: (val) => !!val || '请选择技术职称',
  post: (val) => !!val || '请选择职务'
}
export default function EditWorkHistoryModal (props: Props) {
  let { visible, onCancel, onOk, data, signShow } = props
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
      auditedStatus: auditedStatusShow,
      attachmentId: '',
      urlImageOne: ''
    }
    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }
    if (signShow === '添加') {
      onCancel()
    }

    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.startTime && (value.startTime = value.startTime.format('YYYY-MM-DD'))
    value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))
    nurseFilesService.nurseWorkExperienceAdd({ ...obj, ...value }).then((res: any) => {
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
        unit: data.unit,
        professionalWork: data.professionalWork,
        professional: data.professional,
        post: data.post
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal title='修改资格证书' visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} labelWidth={100} onChange={onFieldChange} rules={rules}>
        <Row>
          <Row gutter={12}>
            <Col span={15}>
              <Form.Field label={`时间`} name='startTime' required suffix='到'>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={9}>
              <Form.Field name='endTime' required>
                <DatePicker />
              </Form.Field>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Field label={`工作单位`} name='unit' required>
              <Input />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`专业技术工作`} name='professionalWork' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`技术职称`} name='professional' required>
              <Select>
                {TITLE_LIST.map((item: string) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`职务`} name='post' required>
              <Select>
                {POST_LIST.map((item: string) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
