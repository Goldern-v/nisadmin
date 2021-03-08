import React, { useState, useLayoutEffect } from 'react'
import { Modal, Input, Radio, Select, Row, Col, message, Button } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { checkWardService } from '../../../services/CheckWardService'
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
  nodeCode: any
  id: any
  title: string
}

export default function TjModal(props: Props) {

  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    checkWardService
      .handleNode({
        id: props.id,
        nodeCode: props.nodeCode,
        noPass: false
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
    <Modal
      title={props.title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      forceRender
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" onClick={onSave}>
            保存
          </Button>
        </div>
      }
    >
      <div style={{ fontSize: '14px', color: 'red' }}>是否提交？提交后不能修改</div>
    </Modal>
  )
}
