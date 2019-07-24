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
// 加附件
import ImageUploader from 'src/components/ImageUploader'
import { appStore, authStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import { AutoComplete } from 'src/vendors/antd'
import { formatIdCord, formatAge } from 'src/utils/idCard/idCard'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  id?: number
  data?: any
  getTableData?: () => {}
}
const uploadCard = () => Promise.resolve('123')
const rules: Rules = {
  cardNumber: (val: any) => {
    if (val && val.length != 18) {
      return '身份证格式不正确'
    } else {
      return true
    }
  }
}
export default function EditWorkHistoryModal(props: Props) {
  let { visible, onCancel, onOk, data, id } = props
  let refForm = React.createRef<Form>()

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
      let pathImg = `${res.data.path}`
      return pathImg
    }
  }

  const onSave = async () => {
    let obj = {
      id: id,
      auditedStatus: ''
    }
    if (authStore!.user!.post == '护长') {
      obj.auditedStatus = 'waitAuditedNurse'
    } else if (authStore!.user!.post == '护理部') {
      obj.auditedStatus = 'waitAuditedDepartment'
    }

    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.birthday && (value.birthday = value.birthday.format('YYYY-MM-DD'))
    value.zyzsDate && (value.zyzsDate = value.zyzsDate.format('YYYY-MM-DD'))
    value.zyzsNursingPostDate && (value.zyzsNursingPostDate = value.zyzsNursingPostDate.format('YYYY-MM-DD'))
    value.takeWorkTime && (value.takeWorkTime = value.takeWorkTime.format('YYYY-MM-DD'))
    value.goHospitalWorkDate && (value.goHospitalWorkDate = value.goHospitalWorkDate.format('YYYY-MM-DD'))
    value.jobStartDate && (value.jobStartDate = value.jobStartDate.format('YYYY-MM-DD'))
    value.highestEducationDate && (value.highestEducationDate = value.highestEducationDate.format('YYYY-MM-DD'))
    value.zyzsEffectiveUpDate && (value.zyzsEffectiveUpDate = value.zyzsEffectiveUpDate.format('YYYY-MM-DD'))
    value.zyzsUrl && (value.zyzsUrl = value.zyzsUrl.join(','))
    nurseFilesService.saveOrUpdate({ ...value, ...obj }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }

  /** 解析身份证赋值给出生日期，年龄 */
  const computedIdCard = () => {
    if (refForm.current) {
      let cardNumber = refForm.current.getField('cardNumber')

      if (cardNumber) {
        let cardObj = formatIdCord(cardNumber)
        if (cardObj.legal) {
          let age = cardObj.age
          let birthday = cardObj.birthday
          if (age && age > -1) {
            refForm.current.setField('age', age)
          }
          refForm.current.setField('birthday', moment(birthday))
        }
      }
    }
  }
  /** 时间关联年数 */
  const computedDateToYear = (dateKey: string, yearKey: string) => {
    if (refForm.current) {
      let date = refForm.current.getField(dateKey)
      if (date) {
        let year = formatAge(date.format('YYYY-MM-DD'))
        if (year > -1) {
          refForm.current.setField(yearKey, year)
        }
      }
    }
  }
  /** 修改科室 */
  const changeDept = () => {
    if (refForm.current) {
      let name = refForm.current.getField('deptName')
      if (name) {
        let dept = authStore.deptList.find((item) => item.name == name)
        if (dept) {
          refForm.current.setField('deptCode', dept.code)
        }
      }
    }
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        ...data,
        ...{
          birthday: data.birthday ? moment(data.birthday) : null,
          zyzsDate: data.zyzsDate ? moment(data.zyzsDate) : null,
          zyzsNursingPostDate: data.zyzsNursingPostDate ? moment(data.zyzsNursingPostDate) : null,
          takeWorkTime: data.takeWorkTime ? moment(data.takeWorkTime) : null,
          goHospitalWorkDate: data.goHospitalWorkDate ? moment(data.goHospitalWorkDate) : null,
          jobStartDate: data.jobStartDate ? moment(data.jobStartDate) : null,
          highestEducationDate: data.highestEducationDate ? moment(data.highestEducationDate) : null,
          zyzsEffectiveUpDate: data.zyzsEffectiveUpDate ? moment(data.zyzsEffectiveUpDate) : null,
          zyzsUrl: data.zyzsUrl ? data.zyzsUrl.split(',') : []
        }
      })
    }
  }, [visible])

  return (
    <Modal
      title='修改基本信息'
      width={1000}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      forceRender
      centered
    >
      <Form ref={refForm} labelWidth={200} onChange={onFieldChange} rules={rules}>
        <Row>
          <Col span={12}>
            <Form.Field label={`姓名`} name='empName'>
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`性别`} name='sex'>
              <Select>
                {nurseFileDetailViewModal.getDict('性别').map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`民族`} name='nation'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`籍贯`} name='nativePlace'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`工号`} name='empNo'>
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`身份证号`} name='cardNumber' onValueChange={computedIdCard}>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`政治面貌`} name='politicsLook'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`出生年月`} name='birthday'>
              <DatePicker />
            </Form.Field>
          </Col>{' '}
          <Col span={12}>
            <Form.Field label={`年龄`} name='age'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`联系电话`} name='phone'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`参加工作时间`} name='takeWorkTime'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`来院工作时间`} name='goHospitalWorkDate'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`护士执业资格证书编号`} name='zyzsNumber'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`取得执业资格证书时间`} name='zyzsDate'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`取得执业资格证书并开始从事护理岗位时间`} name='zyzsNursingPostDate'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`护士执业资格证书有效截止日期`} name='zyzsEffectiveUpDate'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`初始学历`} name='initialEducation'>
              <Select>
                {nurseFileDetailViewModal.getDict('初始学历').map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`最高学历`} name='highestEducation'>
              <Select>
                {nurseFileDetailViewModal.getDict('最高学历类型').map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`取得最高学历时间`} name='highestEducationDate'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`最高学历学位`} name='highestEducationDegree'>
              <AutoComplete dataSource={nurseFileDetailViewModal.getDict('学位').map((item) => item.name)} />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`职务`} name='job'>
              <AutoComplete dataSource={nurseFileDetailViewModal.getDict('职务').map((item) => item.name)} />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`现职务任职起始时间`} name='jobStartDate'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`院内工作地点`} name='workAddress'>
              <AutoComplete dataSource={nurseFileDetailViewModal.getDict('院内工作地点').map((item) => item.name)} />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`工作护理单元`} name='deptName' onValueChange={changeDept}>
              <Select>
                {authStore.deptList.map((item) => (
                  <Select.Option value={item.name} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`鞋码大小`} name='shoeSize'>
              <Input />
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Field label={`添加个人头像`} name='nearImageUrl'>
              <ImageUploader upload={uploadCard} text='添加个人头像' tip={'上传近照一寸彩色照片'} />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`添加执业证书图片`} name='zyzsUrl'>
              {/* <ImageUploader upload={uploadCard} text='添加执业证书图片' /> */}
              <MultipleImageUploader
                text='添加图片'
                tip={'1.上传执业资格证书图片，从第一个卫生部盖章页至最末次延续注册盖章页; '}
              />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
