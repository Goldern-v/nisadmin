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
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id: string
  data?: any
  getTableData?: () => {}
}
const rules: Rules = {
  empName: (val) => !!val || '姓名',
  appointmentTime: (val) => !!val || '请填写职称聘用时间',
  titleQualification: (val) => !!val || '职称资格',
  hierarchy: (val) => !!val || '请选择层级'
}
export default function EditWorkHistoryModal (props: Props) {
  let { visible, onCancel, onOk, data } = props
  let refForm = React.createRef<Form>()
  console.log('this is refForm')
  console.log(refForm)
  const onFieldChange = () => {}
  const onSave = async () => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: 'waitAuditedNurse',
      attachmentId: '',
      urlImageOne: ''
    }
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.appointmentTime && (value.appointmentTime = value.appointmentTime.format('YYYY-MM-DD'))
    nurseFilesService.nurseProfessionalAndLevelChangeAdd({ ...obj, ...value }).then((res: any) => {
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
        empName: data.empName,
        appointmentTime: data.appointmentTime.format('YYYY-MM-DD'),
        titleQualification: data.titleQualification,
        hierarchy: data.hierarchy
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal title='修改职称及层级变动' visible={visible} onOk={onSave} onCancel={onCancel} okText='保存'>
      <Form ref={refForm} rules={{}} labelWidth={80} onChange={onFieldChange}>
        <Row>
          {/* <Row gutter={10}>
            <Col span={15}>
              <Form.Field label={`聘用时间`} name='orgName' required>
                <DatePicker />
              </Form.Field>
            </Col>
          </Row> */}
          {/* <Col span={24}>
            <Form.Field label={`工作单位`} name='' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`科室`} name='' required>
              <Input />
            </Form.Field>
          </Col> */}
          <Col span={24}>
            <Form.Field label={`姓名`} name='empName' required>
              <Input />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`聘用时间`} name='appointmentTime' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`职称`} name='titleQualification' required>
              {/* <Select>
                <Option value='1'>1</Option>
                <Option value='2'>2</Option>
              </Select> */}
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`层级`} name='hierarchy' required>
              {/* <Select>
                <Option value='1'>1</Option>
                <Option value='2'>2</Option>
              </Select> */}
              <Input />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
