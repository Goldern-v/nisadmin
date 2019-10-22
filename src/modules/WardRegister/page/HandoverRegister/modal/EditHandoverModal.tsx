import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { Checkbox } from 'src/vendors/antd'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
}

/** 设置规则 */
const rules: Rules = {
  publicDate: (val) => !!val || '请填写发表日期'
}

export default function EditHandoverModal(props: Props) {
  const [title, setTitle] = useState('')

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
            <Form.Field label={`科室`} name='publicDate' required>
              <Input />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`班次名称`} name='title'>
              <Input placeholder='请输入班次名称' />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`任务提醒`} name='title'>
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={4}>
                    <Checkbox value='A'>A</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value='B'>B</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value='C'>C</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value='D'>D</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value='E'>E</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value='C'>C</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value='D'>D</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value='E'>E</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value='D'>D</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value='E'>E</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
