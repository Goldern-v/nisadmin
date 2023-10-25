import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import YearPicker from 'src/components/YearPicker'
import moment from 'moment'
import { arrangeService } from '../../../services/ArrangeService'
import { dateDiff } from 'src/utils/date/dateDiff'
const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any
  oldData?: any
}

/** 设置规则 */
const rules: Rules = {
  year: (val) => !!val || '请选择年份',
  name: (val) => !!val || '请填写节假日名称',
  startDate: (val) => !!val || '请填写开始日期',
  endDate: (val) => !!val || '请填写结束日期'
}
export const HOLIDAY_LIST = ['元旦', '春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节']
export default function HolidaysModal(props: Props) {
  const [title, setTitle] = useState('假期设置')

  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    /** 保存接口 */
    let data: any = { ...value }
    data.year = value.year ? value.year.format('YYYY') : ''
    data.startDate = value.startDate ? value.startDate.format('YYYY-MM-DD') : ''
    data.endDate = value.endDate ? value.endDate.format('YYYY-MM-DD') : ''
    arrangeService.schHolidaysWHSaveOrUpdate(data).then((res: any) => {
      message.success('保存成功')
      props.onOkCallBack && props.onOkCallBack()
      onCancel()
    })
  }

  const onFormChange = (name: string, value: any, form: Form<any>) => {
    if (name == 'startDate' || name == 'endDate') {
      if (form.getField('startDate') && form.getField('endDate')) {
        let s = form.getField('startDate').format('YYYY-MM-DD')
        let e = form.getField('endDate').format('YYYY-MM-DD')
        let days = dateDiff(s, e) + 1
        form.setField('days', days)
      }
    }
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (refForm.current && visible) {
      if (props.oldData) {
      } else {
        /** 表单数据初始化 */
        refForm!.current!.setFields({
          year: moment(),
          name: '',
          startDate: null,
          endDate: null,
          remark: ''
        })
      }
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFormChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`年份`} name='year' required>
              <YearPicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`节假日名称`} name='name' required>
              <Select
            style={{ width: '100%' }}
            placeholder='选择节日'
          >
            {HOLIDAY_LIST.map((item: string) => (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`开始时间`} name='startDate' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`结束时间`} name='endDate' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`天数`} name='days'>
              <Input readOnly={true} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`备注`} name='remark'>
              <Input />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
