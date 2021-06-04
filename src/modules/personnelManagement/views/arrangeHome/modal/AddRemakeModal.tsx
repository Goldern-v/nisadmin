import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { InputNumber } from 'src/vendors/antd'
import { ArrangeItem } from '../types/Sheet'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: (value?: any) => {}
  data: ArrangeItem
}


export default function EditEffectiveTimeModal(props: Props) {
  let { visible, onCancel, onOkCallBack, data } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    onOkCallBack && onOkCallBack(value)

    onCancel()
  }
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (refForm.current && visible) {
      /** 表单数据初始化 */
      refForm!.current!.setFields({
        detail: data.schRemarks && data.schRemarks.remark
      })
    }
  }, [visible])

  return (
    <Modal
      title={'添加备注'}
      width={400}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      centered
      forceRender
    >
      <Form ref={refForm} labelWidth={70}>
        <Row>
          <Col span={24}>
            <Form.Field label={`备注`} name='detail'>
              <Input.TextArea />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
