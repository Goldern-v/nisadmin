import React, { useState, useLayoutEffect } from 'react'
import { Modal, Input, Radio, Select, Row, Col, message } from 'antd'
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
  title: string
}

/** 设置规则 */
const rules: Rules = {
  publicDate: (val) => !!val || '请填写发表日期'
}

export default function HlbModal(props: Props) {
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
        noPass: value.noPass
      })
      .then((res) => {
        message.success('操作成功')
        props.onOkCallBack && props.onOkCallBack()
      })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    refForm.current &&
      refForm!.current!.setFields({
        noPass: false
      })
  }, [visible])

  return (
    <Modal title={props.title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`审核结果`} name='noPass'>
              <Radio.Group buttonStyle='solid'>
                <Radio.Button value={false}>通过</Radio.Button>
                <Radio.Button value={true}>退回</Radio.Button>
              </Radio.Group>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`审核意见`} name='handleContent'>
              <Input.TextArea />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
