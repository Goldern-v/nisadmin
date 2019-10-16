import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { authStore } from 'src/stores'
import { Modal, Spin, Row, Col, Input, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import emitter from 'src/libs/ev'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import Form from 'src/components/Form'
export interface Props extends ModalComponentProps {
  title?: string
  onCallBack?: (empNo: string, password: string) => {}
}

export default function SignModal(props: Props) {
  let { visible, onCancel } = props
  /** 表格数据 */
  let [title, setTitle] = useState('')
  let refForm = React.createRef<any>()

  const rules: Rules = {
    empNo: (val) => !!val || '请填写账号',
    password: (val) => !!val || '请填写密码'
  }
  useEffect(() => {
    if (visible && refForm!.current) {
      setTitle(props.title || '请输入账号密码')
      refForm!.current!.setFields({
        empNo: authStore!.user!.empNo || '',
        password: ''
      })
    }
  }, [visible])

  const onOk = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    props.onCallBack && props.onCallBack(value.empNo, value.password)
    onCancel()
  }
  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel} forceRender width={400} centered>
      <Form ref={refForm} rules={rules} labelWidth={40}>
        <Row>
          <Col span={24}>
            <Form.Field label={`账号`} name='empNo'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`密码`} name='password'>
              <Input type={'password'} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

const Wrapper = styled.div`
  font-size: 13px;
  color: #999;
`
const MainPart = styled.div``
