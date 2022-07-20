import styled from 'styled-components'
import React, { useState, useLayoutEffect } from 'react'
import { Modal, Input, Button, DatePicker, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'

const { TextArea }  = Input
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  content: (val) => !!val || '请填写内容',
  startDate: (val) => !!val || '请选择时间',
}
export default function EditPersonWinningModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}

  const onSave = async (sign: boolean) => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      // auditedStatus: '',
    }
    // if ((authStore.user && authStore.user.post) == '护长') {
    //   obj.auditedStatus = 'waitAuditedNurse'
    // } else if ((authStore.user && authStore.user.post) == '护理部') {
    //   obj.auditedStatus = 'waitAuditedDepartment'
    // }
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
    nurseFilesService.commonSaveOrUpdate('nurseWHPunishment', { ...obj, ...value, sign }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      // emitter.emit('refreshNurseFileDeatilLeftMenu')
      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        content: data.content,
        remark: data.remark,
        startDate: data.startDate ? moment(data.startDate) : null,
      })
    }
    if (signShow === '修改') {
      setTitle('修改')
    } else if (signShow === '添加') {
      setTitle('添加')
      refForm!.current!.setFields({
        startDate: moment(),
      })
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
      <Form ref={refForm} rules={rules} labelWidth={50} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`时间`} name='startDate' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`内容`} name='content' required>
              <TextArea rows={6} maxLength={500} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`备注`} name='remark'>
              <TextArea rows={4} maxLength={500} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
