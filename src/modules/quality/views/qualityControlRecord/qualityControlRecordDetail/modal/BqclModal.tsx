import styled from 'styled-components'
import React, { useLayoutEffect } from 'react'
import { Modal, Input, Button, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { qualityControlRecordApi } from '../../api/QualityControlRecordApi'
import { appStore } from 'src/stores'

const QC_STORAGE = 'qcStorage'
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {},
  nodeCode: any,
  id: any,
  title?: string
}

/** 设置规则 */
const rules: Rules = {
  expand: (val) => !!val || '请填写原因分析',
  handleContent: (val) => !!val || '请填写整改措施'
}

export default function BqclModal(props: Props) {

  let { visible, onCancel, title } = props
  let refForm = React.createRef<Form>()

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    qualityControlRecordApi
      .handleNode({
        id: props.id,
        // empNo: '',
        // password: '',
        nodeCode: props.nodeCode,
        handleContent: value.handleContent,
        expand: value.expand
      })
      .then((res) => {
        message.success('操作成功')
        localStorage.removeItem(QC_STORAGE)
        props.onOkCallBack && props.onOkCallBack()
      })

    /** 保存接口 */
    // service(value).then((res: any) => {
    //   message.success('保存成功')
    //   props.onOkCallBack && props.onOkCallBack()
    //   onCancel()
    // })
  }
  /**暂存，保存到本地 */
  const onStorage = () => {
    const expand = refForm?.current?.getField('expand')
    const handleContent = refForm?.current?.getField('handleContent')
    localStorage.setItem(QC_STORAGE, JSON.stringify({ [props.id]: { handleContent, expand } }))
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) {
      refForm.current.clean();
      const qcStorage = JSON.parse(localStorage.getItem(QC_STORAGE) || "{}")
      if (qcStorage[props.id]) {
        const { handleContent = '', expand = '' } = qcStorage[props.id]
        refForm.current.setField('handleContent', handleContent)
        refForm.current.setField('expand', expand)
      }
    }
    /** 如果是修改 */
  }, [visible])

  return (
    <Modal
      title={title || '病区处理'}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      forceRender>
      <Form ref={refForm} labelWidth={80} rules={rules}>
        {
          'zzwy' === appStore.HOSPITAL_ID &&
          <Button className='' style={{ position: 'absolute', top: '12px', right: '56px' }} onClick={onStorage}>暂存</Button>
        }
        <Row>
          <Col span={24}>
            <Form.Field label={`原因分析`} name='expand' required>
              <Input.TextArea />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={['whyx', 'whhk'].includes(appStore.HOSPITAL_ID) ? '改进措施及整改结果' : `整改措施`} name='handleContent' required>
              <Input.TextArea />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
