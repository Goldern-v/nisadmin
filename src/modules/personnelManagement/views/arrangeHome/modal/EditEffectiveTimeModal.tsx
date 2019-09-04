import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { InputNumber } from 'src/vendors/antd'
import { ArrangeItem } from '../types/Sheet'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: (value?: any) => {}
  data: ArrangeItem
}

/** 设置规则 */
const rules: Rules = {
  effectiveTime: (val) => !!val || '请填写工时'
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
        effectiveTime: data.effectiveTime,
        detail: data.detail
      })
    }
  }, [visible])

  return (
    <Modal title={'修改工时'} width={350} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`总工时`} name='effectiveTime' required labelWidth={50}>
              <InputNumber />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`备注`} name='detail' labelWidth={50}>
              <Input.TextArea />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
