import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id: string
}
const rules: Rules = {
  stratTime: (val) => !!val || '请选择开始时间',
  endTime: (val) => !!val || '请选择结束时间',
  unit: (val) => !!val || '请填写工作单位',
  professionalWork: (val) => !!val || '请填写专业技术工作',
  professional: (val) => !!val || '请选择技术职称',
  post: (val) => !!val || '请选择职务'
}
export default function EditWorkHistoryModal (props: Props) {
  let { visible, onCancel, onOk } = props
  let refForm = React.createRef<Form>()
  const onFieldChange = () => {}
  const onSave = async () => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName
    }
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.startTime && (value.startTime = value.startTime.format('YYYY-MM-DD'))
    value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))
    nurseFilesService.nurseWorkExperienceSaveOrUpdatePC({ ...obj, ...value }).then((res: any) => {})
  }
  return (
    <Modal title='修改工作经历' visible={visible} onCancel={onCancel} onOk={onSave} okText='保存'>
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
