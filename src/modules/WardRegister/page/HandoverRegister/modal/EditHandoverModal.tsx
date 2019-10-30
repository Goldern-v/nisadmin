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

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
}

/** 设置规则 */
const rules: Rules = {
  itemCode: (val) => !!val || '请填写班次名称'
}

export default function EditHandoverModal(props: Props) {
  const [title, setTitle] = useState('添加交接班次')
  const [shiftList, setShiftList] = useState([])
  const [arrangeList, setArrangeList] = useState([])
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

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (refForm.current && visible) {
      let form = refForm.current
      initData().then((res) => {
        /** 表单数据初始化 */
        form.setFields({
          wardName: authStore.selectedDeptName,
          title: ''
        })
      })
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} rules={rules} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`科室`} name='wardName' required>
              <Input readOnly />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`班次名称`} name='itemCode'>
              <Select>
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
                  {arrangeList.map((item: any) => (
                    <Col span={4} key={item.name}>
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
