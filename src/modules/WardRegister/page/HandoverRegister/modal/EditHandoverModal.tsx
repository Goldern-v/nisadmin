import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { Checkbox } from 'src/vendors/antd'
import { authStore } from 'src/stores'
import service from 'src/services/api'
import { DictItem } from 'src/services/api/CommonApiService'
import { arrangeService } from 'src/modules/personnelManagement/views/arrangeHome/services/ArrangeService'
import emitter from 'src/libs/ev'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
  oldData?: any
}

/** 设置规则 */
const rules: Rules = {
  itemCode: (val) => !!val || '请填写班次名称'
}

export default function EditHandoverModal(props: Props) {
  const [title, setTitle] = useState('添加交接班次')
  const [shiftList, setShiftList] = useState([])
  const [arrangeList, setArrangeList] = useState([])
  const [selectedArrangeList, setSelectedArrangeList] = useState([])
  const [oldData, setOldData] = useState([])
  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    let data: any = {}
    data.wardCode = authStore.selectedDeptCode
    data.recordCode = 'qc_register_handover'
    data.itemCode = value.itemCode
    data.vsRange = value.vsRange.join(';')
    // console.log(data, 'da')
    if (props.oldData) {
      Object.assign(props.oldData, data)
      emitter.emit('saveRemind')
    } else {
      emitter.emit('saveRemind', data)
    }
    message.success('保存成功')
    onCancel()
    /** 保存接口 */
    // service(value).then((res: any) => {
    //   message.success('保存成功')
    //   props.onOkCallBack && props.onOkCallBack()
    //   onCancel()
    // })
  }

  const initData = () => {
    return Promise.all([
      service.commonApiService.multiDictInfo(['sch_range_shift_type']).then((res) => {
        setShiftList(res.data.sch_range_shift_type)
      }),
      arrangeService.getArrangeMenu().then((res) => {
        setArrangeList(res.data)
      })
    ])
  }

  const onFormChange = (name: string, value: string, form: Form<any>) => {
    if (name == 'itemCode') {
      let list: any = arrangeList.filter((item: any) => item.shiftType == value)
      setSelectedArrangeList(list)
      form!.setField('vsRange', [])
    }
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (refForm.current && visible) {
      let form = refForm.current
      initData().then((res) => {
        if (props.oldData) {
          /** 表单数据初始化 */
          form.setFields({
            wardName: authStore.selectedDeptName,
            itemCode: props.oldData.itemCode,
            vsRange: props.oldData.vsRange ? props.oldData.vsRange.split(';') : []
          })
        } else {
          /** 表单数据初始化 */
          form.setFields({
            wardName: authStore.selectedDeptName,
            itemCode: '',
            vsRange: []
          })
        }
      })
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFormChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`科室`} name='wardName' required>
              <Input readOnly />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`班次名称`} name='itemCode' required>
              <Select placeholder='请选择班次'>
                {shiftList.map((item: DictItem) =>
                  item.name !== '休假' ? (
                    <Select.Option value={item.code} key={item.code}>
                      {item.name}
                    </Select.Option>
                  ) : null
                )}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`任务提醒`} name='vsRange'>
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  {selectedArrangeList.map((item: any) => (
                    <Col span={6} key={item.name}>
                      <Checkbox value={item.name}>{item.name}</Checkbox>
                    </Col>
                  ))}
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
