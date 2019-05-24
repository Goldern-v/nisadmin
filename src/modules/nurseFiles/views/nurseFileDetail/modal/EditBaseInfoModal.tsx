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
import { appStore } from 'src/stores'
import service from 'src/services/api'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: number
  data?: any
  getTableData?: () => {}
}
const uploadCard = () => Promise.resolve('123')
const rules: Rules = {
  empName: (val) => !!val || '',
  empNo: (val) => !!val || '',
  sex: (val) => !!val || '',
  nation: (val) => !!val || '',
  birthday: (val) => !!val || '',
  entryDate: (val) => !!val || '',
  nativePlace: (val) => !!val || '',
  post: (val) => !!val || '',
  goWorkTime: (val) => !!val || '',
  highestEducation: (val) => !!val || '最高学历',
  zyzsNumber: (val) => !!val || '',
  cardNumber: (val) => !!val || '',
  socialGroup: (val) => !!val || '社会团体职务',
  phone: (val) => !!val || '',
  address: (val) => !!val || ''
}
export default function EditWorkHistoryModal (props: Props) {
  let { visible, onCancel, onOk, data, id } = props
  let refForm = React.createRef<Form>()
  console.log('this is refForm')
  console.log(refForm)
  const onFieldChange = () => {}

  const uploadCard = async (file: any) => {
    let obj: any = {
      file,
      empNo: appStore.queryObj.empNo,
      type: '0'
    }

    const [err, res] = await to(service.commonApiService.uploadFile(obj))
    if (err) {
      return ''
    }
    if (res.data) {
      let pathImg = `/asset/nurseAttachment${res.data.path}`
      return pathImg
    }
  }

  const onSave = async () => {
    let getPostData = loginViewModel.post
    let auditedStatusShow = 'waitAuditedDepartment'
    // if (getPostData === '护士长') {
    //   auditedStatusShow = 'waitAuditedNurse'
    // } else if (getPostData === '护理部') {
    //   auditedStatusShow = 'waitAuditedDepartment'
    // }
    let obj = {
      id: id
    }

    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    // value.birthday && (value.birthday = value.birthday.format('YYYY-MM-DD'))
    // value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))
    nurseFilesService.saveOrUpdate({ ...value, ...obj }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      onCancel()
    })
  }
  setTimeout(() => console.log('update', refForm.current), 1000)

  useLayoutEffect(() => {
    console.log(visible, 'visible', refForm.current, 'refForm.current')
    console.log(data, 'data')
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      console.log(refForm.current, visible, data)
      console.log('moment(data.startTime)', moment(data.startTime))

      refForm!.current!.setFields({
        empName: data.empName,
        empNo: data.empNo,
        sex: data.sex,
        post: data.post,
        nation: data.nation,
        entryDate: data.entryDate,
        nativePlace: data.nativePlace,
        highestEducation: data.highestEducation,
        zyzsNumber: data.zyzsNumber,
        cardNumber: data.cardNumber,
        socialGroup: data.socialGroup,
        phone: data.phone,
        address: data.address
      })
      // refForm.current.setField('unit', 123)
    }
  }, [visible])

  return (
    <Modal
      title='修改基本信息'
      width={1200}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      forceRender
    >
      <Form ref={refForm} labelWidth={100} onChange={onFieldChange} rules={{}}>
        <Row>
          <Col span={12}>
            <Form.Field label={`姓名`} name='empName' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`工号`} name='empNo' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`性别`} name='sex' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`民族`} name='nation' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`出身年月`} name='birthday' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`年龄`} name='entryDate' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`籍贯`} name='nativePlace' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`职务`} name='post' required>
              <Input />
            </Form.Field>
          </Col>{' '}
          <Col span={12}>
            <Form.Field label={`参加工作时间`} name='goWorkTime' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`最高学历`} name='highestEducation' required>
              <Select>
                <Option value='中专'>中专</Option>
                <Option value='大专'>大专</Option>
                <Option value='本科'>本科</Option>
                <Option value='硕士'>硕士</Option>
                <Option value='博士'>博士</Option>
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`技术职称`} name='title' required>
              <Select>
                <Option value='护士'>护士</Option>
                <Option value='护师'>护师</Option>
                <Option value='主管护师'>主管护师</Option>
                <Option value='副主任护师'>副主任护师</Option>
                <Option value='主任护师'>主任护师</Option>
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`护士执业证书编号`} name='zyzsNumber' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`身份证号`} name='cardNumber' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`社会团体职务`} name='socialGroup' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`联系电话`} name='phone' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`家庭住址`} name='address' required>
              <Input />
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Field label={`添加个人头像`} name='nearImageUrl'>
              <ImageUploader upload={uploadCard} text='添加个人头像' />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`添加职业证书`} name='zyzsUrl'>
              <ImageUploader upload={uploadCard} text='添加职业证书' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
