import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import YearPicker from 'src/components/YearPicker'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
}

/** 设置规则 */
const rules: Rules = {
  publicDate: (val) => !!val || '请填写发表日期'
}

export default function HolidaysModal(props: Props) {
  const [title, setTitle] = useState('假期设置')

  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

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
    if (refForm.current && visible) {
      /** 表单数据初始化 */
      refForm!.current!.setFields({
        publicDate: '',
        title: ''
      })
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`年份`} name='publicDate' required>
              <YearPicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`假期名称`} name='publicDate' required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`开始时间`} name='publicDate' required>
              <DatePicker format={'MM-DD'} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`结束时间`} name='publicDate' required>
              <DatePicker format={'MM-DD'} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`备注`} name='publicDate'>
              <Input />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
