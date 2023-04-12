import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, InputNumber } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { TITLE_LIST, POST_LIST } from '../../nurseFilesList/modal/AddNursingModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import loginViewModel from 'src/modules/login/LoginViewModel'
// 加附件
import ImageUploader from 'src/components/ImageUploader'
import emitter from 'src/libs/ev'
import YearPicker from 'src/components/YearPicker'
import {numberToArray} from "src/utils/array/array";
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const uploadCard = () => Promise.resolve('123')
const rules: Rules = {
  year: (val) => !!val || '年度',
  // month: (val) => !!val || '月份',
  // nightShift: (val) => val >= 0 || '夜班',
  // checkOut: (val) => val >= 0 || '查房',
  // nursingConsultation: (val) => val >= 0 || '护理会诊',
  // caseDiscussion: (val) => val >= 0 || '病区讨论',
  // individualCase: (val) => val >= 0 || '个案',
  // lecture: (val) => val >= 0 || '小讲课',
  // teaching: (val) => val >= 0 || '带教',
  witness: (val) => !!val || '证明人'
}
export default function EditWorkHistoryModal(props: Props) {
  let { visible, onCancel, onOk, data, signShow } = props
  const [title, setTitle] = useState('')

  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}
  const onSave = async (sign: boolean) => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: '',
      attachmentId: '',
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
    value.year && (value.year = value.year.format('YYYY'))
    nurseFilesService.commonSaveOrUpdate('nurseWHRegistrationWork', { ...obj, ...value, sign }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    //
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        year: data.year ? moment(data.year) : null,
        nightShift: data.nightShift,
        checkOut: data.checkOut,
        professional: data.professional,
        nursingConsultation: data.nursingConsultation,
        caseDiscussion: data.caseDiscussion,
        individualCase: data.individualCase,
        lecture: data.lecture,
        teaching: data.teaching,
        witness: data.witness
      })
      // refForm.current.setField('unit', 123)
    } else if (refForm.current && visible) {
      refForm!.current!.setFields({
        year: null,
        nightShift: 0,
        checkOut: 0,
        professional: 0,
        nursingConsultation: 0,
        caseDiscussion: 0,
        individualCase: 0,
        lecture: 0,
        teaching: 0,
        witness: null
      })
    }
    if (signShow === '修改') {
      setTitle('修改工作情况登记表')
    } else if (signShow === '添加') {
      setTitle('添加工作情况登记表')
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
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Row>
            <Col span={24}>
              <Form.Field label={`年度`} name='year' required>
                <YearPicker />
              </Form.Field>
            </Col>
          </Row>
          {/* <Row>
            <Col span={24}>
              <Form.Field label={`月份`} name='month' required>
                <Select>
                  {numberToArray(12).map((item) => (
                      <Select.Option value={item + 1} key={item}>
                        {item + 1}月
                      </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row> */}
          <Row>
            <Col span={12}>
              <Form.Field label={`夜班`} name='nightShift'>
                <InputNumber/>
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`查房`} name='checkOut'>
                <InputNumber/>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`护理会诊`} name='nursingConsultation'>
                <InputNumber/>
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`病例讨论`} name='caseDiscussion'>
                <InputNumber/>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`个案`} name='individualCase'>
                <InputNumber/>
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`小讲课`} name='lecture'>
                <InputNumber/>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Field label={`带教`} name='teaching'>
                <InputNumber/>
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field label={`证明人`} name='witness' required>
                <Input />
              </Form.Field>
            </Col>
          </Row>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
