import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, Icon } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'

import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'

import loginViewModel from 'src/modules/login/LoginViewModel'
// 加附件
import ImageUploader from 'src/components/ImageUploader'
import emitter from 'src/libs/ev'

import service from 'src/services/api'
import {
  TITLE_LIST,
  POST_LIST,
  CURRENTLEVEL_LIST
} from 'src/modules/nurseFiles/view/nurseFiles-hj/views/nurseFilesList/modal/AddNursingModal'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  getTableData?: () => void
}
const uploadCard = () => Promise.resolve('123')
const rules: Rules = {
  empName: (val) => !!val || '请选择姓名'
}
export default function AddScheduleNursingModal(props: Props) {
  let { visible, onCancel, onOk, getTableData } = props
  const [title, setTitle] = useState('')
  let refForm = React.createRef<Form>()

  const onFieldChange = () => {}

  const onSave = async () => {
    if (!refForm.current) return

    let [err, value] = await to(refForm.current.validateFields())

    if (err) return
    value.deptName = authStore.selectedDeptName
    value.deptCode = authStore.selectedDeptCode
    service.scheduleUserApiService.saveOrUpdate(value).then((res) => {
      message.success('保存成功')
      getTableData && getTableData()
    })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (refForm.current && visible) {
      refForm!.current!.setFields({
        empName: '',
        sex: '1',
        newTitle: '',
        nurseHierarchy: '',
        job: ''
      })
      // refForm.current.setField('unit', 123)
    }
    setTitle('添加排班人员')
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender width={480}>
      <Form ref={refForm} labelWidth={60} onChange={onFieldChange} rules={rules}>
        <Row>
          <Col span={24}>
            <Form.Field label={`姓名`} name='empName' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`姓别`} name='sex'>
              <Select>
                <Select.Option value='0' key={0}>
                  男
                </Select.Option>
                <Select.Option value='1' key={1}>
                  女
                </Select.Option>
              </Select>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`职称`} name='newTitle'>
              <Select>
                {TITLE_LIST.map((item: string) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`层级`} name='nurseHierarchy'>
              <Select
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: '100%' }}
                placeholder='选择层级'
              >
                {CURRENTLEVEL_LIST.map((item: string) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`职务`} name='job'>
              <Select>
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
      <Aside>
        <Icon type='info-circle' style={{ color: '#fa8c16', marginRight: '5px' }} />
        注：只能添加没有工号的进修人员，有工号的正式人员请联系管理员进行添加
      </Aside>
    </Modal>
  )
}
const Aside = styled.div`
  font-size: 12px;
  color: #666;
`
