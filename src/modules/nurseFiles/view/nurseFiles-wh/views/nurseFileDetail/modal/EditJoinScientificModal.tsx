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
export default function EditJoinScientificModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}

  const onSave = async (sign: boolean) => {
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
    if (!Object.keys(value).length) {
      return message.warning('数据不能为空')
    }
    value.startDate && (value.startDate = value.startDate.format('YYYY-MM-DD'))
    value.endDate && (value.endDate = value.endDate.format('YYYY-MM-DD'))
    value.completionDate && (value.completionDate = value.completionDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    nurseFilesService.commonSaveOrUpdate('nurseWHGoScienceCourse', { ...obj, ...value, sign }).then((res: any) => {
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
        goName: data.goName,
        hostName: data.hostName,
        hostNo: data.hostNo,
        goRank: data.goRank,
        unit: data.unit,
        grantUnit: data.grantUnit,
        courseSource: data.courseSource,
        courseLevel: data.courseLevel,
        approvalNumber: data.approvalNumber,
        registerNumber: data.registerNumber,
        startDate: data.startDate ? moment(data.startDate) : null,
        endDate: data.endDate ? moment(data.endDate) : null,
        courseCompletion: data.courseCompletion,
        completionDate: data.completionDate ? moment(data.completionDate) : null,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
    }
    if (signShow === '修改') {
      setTitle('修改参与科研课题')
    } else if (signShow === '添加') {
      setTitle('添加参与科研课题')
    }
  }, [visible])

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      forceRender
      centered
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
    >
      <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`参于课题名称`} name='goName'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`课题主持人姓名`} name='hostName'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`课题主持人工号`} name='hostNo'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`参与排名`} name='goRank'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`课题来源`} name='courseSource'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`课题级别`} name='courseLevel'>
              <AutoComplete dataSource={nurseFileDetailViewModal.getDict('级别').map((item) => item.name)} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`承担单位`} name='unit'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`课题批文号`} name='approvalNumber'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`项目编号`} name='registerNumber'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`开始时间`} name='startDate'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`截止时间`} name='endDate'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`完成情况`} name='courseCompletion'>
              <AutoComplete dataSource={nurseFileDetailViewModal.getDict('完成情况').map((item) => item.name)} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`时间`} name='completionDate'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`附件`} name='urlImageOne'>
              <MultipleImageUploader text='添加图片' tip={'上传课题批文扫描件'} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
