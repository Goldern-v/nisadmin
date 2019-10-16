import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, Spin } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { Checkbox } from 'src/vendors/antd'
import service from 'src/services/api'
import { authStore } from 'src/stores'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
}

/** 设置规则 */
const rules: Rules = {
  publicDate: (val) => !!val || '请填写发表日期'
}

export default function PersonelSecondModal(props: Props) {
  const [title, setTitle] = useState('人员借出')
  const [deptList, setDeptList] = useState([])
  const [nurseList, setNurseList] = useState([])
  const [modalLoading, setModalLoading] = useState(false)

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
      setModalLoading(true)
      Promise.all([service.commonApiService.getNursingUnitAll(), service.commonApiService.defaultDeptUser()]).then(
        (res) => {
          setModalLoading(false)
          setDeptList(res[0].data.deptList)
          setNurseList(res[1].data.userList)
        }
      )
      /** 表单数据初始化 */
      refForm!.current!.setFields({
        publicDate: '',
        title: ''
      })
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Spin spinning={modalLoading}>
        <Form ref={refForm} rules={rules} labelWidth={80}>
          <Row>
            <Col span={24}>
              <Form.Field label={`借出科室`} name='publicDate' required>
                <Select>
                  {deptList.map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>

            <Col span={24}>
              <Form.Field label={`借出护士`} name='title' required>
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row>
                    {nurseList.map((item: any, index: number) => (
                      <Col span={8}>
                        <Checkbox value={item.empNo}>{item.empName}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`借出日期`} name='title' required>
                <DatePicker />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`借出说明`} name='title' required>
                <Input.TextArea />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  )
}
const Wrapper = styled.div``
