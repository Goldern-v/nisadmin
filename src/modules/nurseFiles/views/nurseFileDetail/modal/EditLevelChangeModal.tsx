import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST, CURRENTLEVEL_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
import { appStore, authStore } from 'src/stores'
import ImageUploader from 'src/components/ImageUploader'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  // empName: (val) => !!val || '请填写姓名',
  appointmentTime: (val) => !!val || '请填写职称聘用时间',
  titleQualification: (val) => !!val || '请填写职称资格',
  hierarchy: (val) => !!val || '请选择层级'
}
export default function EditWorkHistoryModal (props: Props) {
  const [title, setTitle] = useState('')
  const uploadCard = async (file: any) => {
    let obj: any = {
      file,
      empNo: appStore.queryObj.empNo,
      type: '4',
      auditedStatus: ''
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
      let pathImg = `${res.data.path}`
      setAttachmentId(res.data.id + ',')
      return pathImg
    }
  }
  let { visible, onCancel, onOk, data, signShow } = props
  const [attachmentId, setAttachmentId] = useState('')
  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}

  const onSave = async () => {
    console.log('444444444444444')
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      attachmentId: attachmentId,
      auditedStatus: ''
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
    value.appointmentTime && (value.appointmentTime = value.appointmentTime.format('YYYY-MM-DD'))
    nurseFilesService.nurseProfessionalAndLevelChangeAdd({ ...obj, ...value }).then((res: any) => {
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
        appointmentTime: moment(data.appointmentTime),
        empName: data.empName,
        titleQualification: data.titleQualification,
        hierarchy: data.hierarchy,
        urlImageOne: data.urlImageOne
      })
      // refForm.current.setField('unit', 123)
    }
    if (signShow === '修改') {
      setTitle('修改职称及层级变动')
    } else if (signShow === '添加') {
      setTitle('添加职称及层级变动')
    }
  }, [visible])
  // const testClick = () => {
  //   console.log('refForm44444444444445555555555', refForm!.current!.validateFields())
  // }
  return (
    <div>
      {/* <Button onClick={testClick}>test</Button> */}
      <Modal title={title} visible={visible} onOk={onSave} onCancel={onCancel} okText='保存' forceRender>
        <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFieldChange}>
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
              <Form.Field label={`聘用时间`} name='appointmentTime' required>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`职称`} name='titleQualification' required>
                <Select showSearch style={{ width: '100%' }} placeholder='选择所属科室'>
                  {TITLE_LIST.map((item: string) => (
                    <Select.Option value={item} key={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
                {/* <Input /> */}
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`层级`} name='hierarchy' required>
                {/* <Input /> */}
                <Select showSearch style={{ width: '100%' }} placeholder='选择层级'>
                  {CURRENTLEVEL_LIST.map((item: string) => (
                    <Select.Option value={item} key={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={``} name='urlImageOne'>
                <ImageUploader upload={uploadCard} text='添加附件' />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}
const Wrapper = styled.div``
