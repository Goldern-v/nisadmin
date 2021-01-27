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
import { appStore, authStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}

const rules: Rules = {
  year: (val) => !!val || '请填写年度',
  theoryScore: (val) => !!val || '请填写理论考核成绩',
  technologyScore: (val) => !!val || '请填写操作考核成绩'
}
export default function EditWorkHistoryModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const yearList = (() => {
    let startYear = 2010
    let lastYear = Number(moment().format('YYYY'))
    let currentYear = startYear
    let list = []

    while (currentYear <= lastYear) {
      list.push(currentYear.toString())
      currentYear++
    }

    return list.reverse()
  })()

  const onFieldChange = () => { }

  const onSave = async (sign?: boolean) => {
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
      auditedStatus: auditedStatusShow
    }
    if (!sign) obj.auditedStatus = 'noSubmit'

    if (signShow === '修改') {
      Object.assign(obj, { id: data.id })
    }

    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(','))
    if (err) return
    nurseFilesService.nurseHospitalsThreeBaseAdd({ ...obj, ...value }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }
  // console.log('signShow111111111111111111', signShow)
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        year: data.year,
        theoryScore: data.theoryScore,
        technologyScore: data.technologyScore,
        post: data.post,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      })
      // refForm.current.setField('unit', 123)
    }
    if (signShow === '修改') {
      setTitle('修改医院三基考核')
    } else if (signShow === '添加') {
      setTitle('添加医院三基考核')
    }
  }, [visible])

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
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
      forceRender>
      <Form
        ref={refForm}
        rules={rules}
        labelWidth={120}
        onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`年度`} name='year'>
              <Select>
                {yearList.map((year: string) => (
                  <Option value={year} key={year}>{year}</Option>
                ))}
              </Select>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`理论考核成绩`} name='theoryScore' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`操作考核成绩`} name='technologyScore' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`附件`} name='urlImageOne'>
              <MultipleImageUploader text='添加图片' />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
