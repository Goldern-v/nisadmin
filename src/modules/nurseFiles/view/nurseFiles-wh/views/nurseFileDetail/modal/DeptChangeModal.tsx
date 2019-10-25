import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'

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
import { nurseFilesService } from '../../../services/NurseFilesService'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  info: any
  title?: string
  callback?: () => void
}
const rules: Rules = {
  date: (val) => !!val || '请填写调动时间',
  deptCodeNew: (val) => !!val || '请选择新科室'
}
export default function DeptChangeModal(props: Props) {
  const [deptList, setDeptList]: any = useState([])

  let { visible, onCancel, onOk, info, title } = props
  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    value.date && (value.date = value.date.format('YYYY-MM-DD'))
    nurseFilesService.updateDeptCode({ ...value }).then((res: any) => {
      message.success('保存成功')
      props.callback && props.callback()
      onCancel()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (info && refForm.current && visible) {
      service.commonApiService.deptInbigDeptListSelf().then((res) => {
        setDeptList(res.data)
      })
      refForm!.current!.setFields({
        date: moment(),
        deptCodeOld: info.deptCode,
        deptCodeNameOld: info.deptName,
        deptCodeNew: '',
        job: info.job,
        empNo: info.empNo
      })
    }
  }, [visible])

  return (
    <Modal
      title={title || '科室调动'}
      visible={visible}
      onOk={onSave}
      onCancel={onCancel}
      okText='保存'
      forceRender
      centered
    >
      <Form ref={refForm} rules={rules} labelWidth={120} onChange={onFieldChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`调动时间`} name='date' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`原科室`} name='deptCodeNameOld'>
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`新科室`} name='deptCodeNew' required>
              <Select
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: '100%' }}
                placeholder='选择新科室'
              >
                {deptList.map((item: any) => {
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
            <Form.Field label={`职务`} name='job'>
              <Select
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: '100%' }}
                placeholder='选择职务'
              >
                {POST_LIST.map((item: string) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`备注`} name='remark'>
              <Input.TextArea />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
