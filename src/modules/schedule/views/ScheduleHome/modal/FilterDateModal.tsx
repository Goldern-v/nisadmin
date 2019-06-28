import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import moment from 'moment'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker
const Option = Select.Option
export interface Props extends ModalComponentProps {
  startDate: string
  endDate: string
  onOkCallBack: (monthStart: string, defaultEndTime: string) => void
}

/** 设置规则 */
const rules: Rules = {
  date: (val) => !!val || '请填写发表日期'
}

export default function FilterDateModal(props: Props) {
  const [title, setTitle] = useState('请选择日期')
  let { visible, onCancel, startDate, endDate } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    try {
      let start = value.date[0].format('YYYY-MM-DD')
      let end = value.date[1].format('YYYY-MM-DD')
      onCancel()
      props.onOkCallBack && props.onOkCallBack(start, end)
    } catch (error) {
      console.log(error)
    }

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
        date: [moment(startDate), moment(endDate)]
      })
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`日期`} name='date' required>
              <RangePicker />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
