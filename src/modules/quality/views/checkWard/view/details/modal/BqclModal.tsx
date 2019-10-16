import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { checkWardService } from '../../../services/CheckWardService'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
  nodeCode: any
  id: any
}

/** 设置规则 */
const rules: Rules = {
  expand: (val) => !!val || '请填写原因分析',
  handleContent: (val) => !!val || '请填写整改措施'
}

export default function BqclModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    checkWardService
      .handleNode({
        id: props.id,
        nodeCode: props.nodeCode,
        handleContent: value.handleContent,
        expand: value.expand
      })
      .then((res) => {
        message.success('操作成功')
        props.onOkCallBack && props.onOkCallBack()
      })

    /** 保存接口 */
    // service(value).then((res: any) => {
    //   message.success('保存成功')
    //   props.onOkCallBack && props.onOkCallBack()
    //   onCancel()
    // })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
  }, [visible])

  return (
    <Modal title={'病区处理'} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} labelWidth={80} rules={rules}>
        <Row>
          <Col span={24}>
            <Form.Field label={`原因分析`} name='expand' required>
              <Input.TextArea />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`整改措施`} name='handleContent' required>
              <Input.TextArea />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
