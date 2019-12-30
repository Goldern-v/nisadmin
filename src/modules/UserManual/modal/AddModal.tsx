import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
// import { checkWardService } from '../../../services/CheckWardService'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  // onOkCallBack?: () => {}
  // nodeCode: any
  // id: any
  title: string
}

/** 设置规则 */
// const rules: Rules = {
//   expand: (val) => !!val.replace(/\s+/g,"").length || '请填写原因分析',
//   handleContent: (val) => !!val.replace(/\s+/g,"").length || '请填写整改措施'
// }

export default function AddModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    // checkWardService
    //   .handleNode({
    //     id: props.id,
    //     nodeCode: props.nodeCode,
    //     handleContent: value.handleContent,
    //     expand: value.expand
    //   })
    //   .then((res) => {
    //     message.success('操作成功')
    //     props.onOkCallBack && props.onOkCallBack()
      // })

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
  }, [visible])

  return (
    <Modal title={props.title} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} labelWidth={80} >
        <Row>
          <Col span={22}>
            <Form.Field label={`文件名称：`} name='expand'>
              <Input />
            </Form.Field>
          </Col>

          <Col span={19}>
            <Form.Field label={`文件上传：`} name='handleContent'>
              <Input  placeholder='请上传文件'/>
            </Form.Field>
            
          </Col>
          <Button style={{marginLeft:"14px"}} onClick={() => {}}>...</Button>

        </Row>
      </Form>
    </Modal>
  )
}
