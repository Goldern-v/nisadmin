import { Col, Input, Modal, Row, Select } from 'antd'
import { observer } from 'mobx-react'
import React, { useLayoutEffect } from 'react'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Obj } from 'src/libs/types'
import { areaControlModel } from '../model'

export interface Props extends Obj {

}
export default observer(function (props: Props) {

  let refForm = React.createRef<Form>()

  console.log('test-', areaControlModel.modalVis)
  useLayoutEffect(() => {
    if (refForm.current && areaControlModel.modalVis) refForm!.current!.clean()
    /** 如果是修改 */
    refForm.current &&
      refForm!.current!.setFields({
        ...areaControlModel.curItem
      })
      
  }, [areaControlModel.modalVis])

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    areaControlModel.onSave(value)
  }

  return (
    <Modal
      title={areaControlModel.modalTitle}
      visible={areaControlModel.modalVis}
      onOk={onSave}
      onCancel={() => areaControlModel.modalVis = false}
    >
      <Form ref={refForm} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label='科室名称' name='name'>
              <Input />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label='科室属性' name='type'>
              <Select disabled={areaControlModel.modalTitle == '编辑'}>{
                areaControlModel.deptTypes.map(v => <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>)
              }</Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label='科室编码' name='code'>
              <Input disabled={areaControlModel.modalTitle == '编辑'} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})
