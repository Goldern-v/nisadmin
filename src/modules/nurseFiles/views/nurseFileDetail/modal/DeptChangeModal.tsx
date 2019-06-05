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
import { authStore, appStore } from 'src/stores'
import service from 'src/services/api'
import emitter from 'src/libs/ev'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  info: any
  getTableData?: () => {}
}
const rules: Rules = {
  time: (val) => !!val || '请填写时间',
  awardWinningName: (val) => !!val || '请填写获奖/推广创新项目名称',
  rank: (val) => !!val || '请填写本人排名',
  awardlevel: (val) => !!val || '请填写授奖级别',
  approvalAuthority: (val) => !!val || '请填写批准机关'
}
export default function DeptChangeModal (props: Props) {
  const [title, setTitle] = useState('科室调动')

  let { visible, onCancel, onOk, info } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.time && (value.startTime = value.time.format('YYYY-MM-DD'))
    nurseFilesService.nurseAwardWinningAdd({ ...value }).then((res: any) => {
      message.success('保存成功')
      props.getTableData && props.getTableData()

      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (info && refForm.current && visible) {
      refForm!.current!.setFields({
        date: moment(),
        oldDept: info.deptName,
        newDept: '',
        job: info.job
        // time: moment(data.time),
        // awardWinningName: data.awardWinningName,
        // rank: data.rank,
        // awardlevel: data.awardlevel,
        // approvalAuthority: data.approvalAuthority,
        // urlImageOne: data.urlImageOne
      })
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onOk={onSave} onCancel={onCancel} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`调动时间`} name='date'>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`原科室`} name='oldDept' required>
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`新科室`} name='newDept' required>
              <Select showSearch style={{ width: '100%' }} placeholder='选择新科室'>
                {authStore.deptList.map((item: any) => {
                  return (
                    <Select.Option value={item.code} key={item}>
                      {item.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`职务`} name='job' required>
              <Select showSearch style={{ width: '100%' }} placeholder='选择职务'>
                {POST_LIST.map((item: string) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
