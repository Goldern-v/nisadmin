import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from 'src/modules/nurseFiles-wh/services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
import loginViewModel from 'src/modules/login/LoginViewModel'
// 加附件
import ImageUploader from 'src/components/ImageUploader'
import { authStore, appStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import YearPicker from 'src/components/YearPicker'
import { AutoComplete } from 'src/vendors/antd'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  // time: (val) => !!val || '请填写时间',
  // awardWinningName: (val) => !!val || '请填写获奖/推广创新项目名称',
  // rank: (val) => !!val || '请填写本人排名',
  // awardlevel: (val) => !!val || '请填写授奖级别',
  // approvalAuthority: (val) => !!val || '请填写批准机关'
}
export default function EditPersonWinningModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}

  const onSave = async () => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: '',
      urlImageOne: ''
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
    if (!Object.keys(value).length) {
      return message.warning('数据不能为空')
    }
    value.year && (value.year = value.year.format('YYYY'))
    // value.winningYear && (value.winningYear = value.winningYear.format('YYYY'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    nurseFilesService.nurseWHContinueStudySaveOrUpdate({ ...obj, ...value }).then((res: any) => {
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
        // publicYear: moment(data.publicYear),
        year: moment(data.year),
        projectPerson: data.projectPerson,
        projectNumber: data.projectNumber,
        personTotal: data.personTotal,
        projectName: data.projectName,
        projectLevel: data.projectLevel,
        courseHour:data.courseHour,
        schoolArea: data.schoolArea,
        personTitleArea: data.personTitleArea,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改继续教育')
    } else if (signShow === '添加') {
      setTitle('添加继续教育')
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onOk={onSave} onCancel={onCancel} okText='保存' forceRender centered>
      <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`年份`} name='year'>
              <YearPicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`继续教育项目负责人`} name='projectPerson'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`项目名称`} name='projectName'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`项目号`} name='projectNumber'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`项目级别`} name='projectLevel'>
              <AutoComplete dataSource={['国家级', '省级', '市级', '院级', '其他']} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`课时数`} name='courseHour'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`学员总数`} name='personTotal'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`学院分布区域`} name='schoolArea'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`学院职称分布`} name='personTitleArea'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`附件`} name='urlImageOne'>
              <MultipleImageUploader text='添加图片' tip={'审批报告盖章签字后的扫描件'} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
