import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, AutoComplete } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'

import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { nurseFilesService } from '../../../services/NurseFilesService'
import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import emitter from 'src/libs/ev'

const { TextArea } = Input;

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
export default function EditSpecializNurseModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, onOk, data, signShow } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = (val: any) => {
    console.log(val)
  }

  const onSave = async (sign: boolean) => {
    console.log(refForm.current?.state.values, 999)
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
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
    // value.startTime && (value.startTime = value.startTime.format('YYYY-MM-DD'))
    // value.endTime && (value.endTime = value.endTime.format('YYYY-MM-DD'))

    nurseFilesService.commonSaveOrUpdate('nurseWHPersonStatus', { ...obj, ...value, sign }).then((res: any) => {
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
        status: data.status,
        reason: data.reason
      })
      // refForm.current.setField('unit', 123)
    }
    if (signShow === '修改') {
      setTitle('修改人员状态')
    } else if (signShow === '添加') {
      setTitle('添加人员状态')
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
        // <Button key='save' type='primary' onClick={() => onSave(false)}>
        //   保存
        // </Button>,
        <Button key='submit' type='primary' onClick={() => onSave(true)}>
          提交审核
        </Button>
      ]}
    >
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`在岗状态`} name='status'>
              <Select>
                <Select.Option value='在岗'>在岗</Select.Option>
                <Select.Option value='不在岗'>不在岗</Select.Option>
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`状态原因`} name='reason'>
              <TextArea rows={6} maxLength={2500} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
