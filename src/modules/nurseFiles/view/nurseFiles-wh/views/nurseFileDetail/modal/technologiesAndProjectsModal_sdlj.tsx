import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Tooltip, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  data?: any
  signShow?: string
  getTableData?: () => {}
}
const rules: Rules = {
  projectName: (val) => !!val || '请填写开展项目名称',
  technologyLevel: (val) => !!val || '请填写技术等级',
  startDate: (val) => (val && !!val[0]) || '请选择起止时间',
  projectBenefit: (val) => !!val || '请填写项目效益',
  numberCase: (val) => {
    if (val) {
      if (/[\d]/g.test(val))
        return true
      return '请输入数字'
    } else {
      return '请填写开展例数'
    }
  }
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
      endDate: null
      // auditedStatus: '',
      // urlImageOne: ''
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
    obj = {...obj, endDate: value.startDate[1].format('YYYY-MM-DD') || '' }
    value.startDate && (value.startDate = value.startDate[0].format('YYYY-MM-DD')||'')
    nurseFilesService.commonSaveOrUpdate('nurseWHCarryOut', { ...value,  ...obj,sign }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()
      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        projectName: data.projectName,
        technologyLevel: data.technologyLevel,
        projectBenefit: data.projectBenefit,
        startDate: data.startDate ? [moment(data.startDate), moment(data.endDate)] : [null, null],
        numberCase: data.numberCase,
      })
    }
    if (signShow === '修改') {
      setTitle('修改')
    } else if (signShow === '添加') {
      setTitle('添加')
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
            <Form.Field label={`开展项目名称`} name='projectName' required>
              <Input maxLength={50} placeholder="请输入" />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`技术等级`} name='technologyLevel' required>
              <Input placeholder="请输入" />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`起止时间`} name='startDate' required>
              <DatePicker.RangePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`开展例数`} name='numberCase' required>
            <Input
                placeholder="请输入"
                suffix={
                  <Tooltip title="Extra information">
                    <span>例</span>
                  </Tooltip>
                }
              />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`项目效益`} name='projectBenefit'  required>
              <Input placeholder="请输入" maxLength={50} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
