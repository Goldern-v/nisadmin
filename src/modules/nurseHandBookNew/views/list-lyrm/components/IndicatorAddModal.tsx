import Form from 'src/components/Form'
import styled from 'styled-components'
import React, { useLayoutEffect, useRef, useState } from 'react'
import {Col,  Input, Modal, Row, Select} from 'antd'
import { Rules } from 'src/components/Form/interfaces'
import { Obj } from 'src/libs/types'
import { ModalComponentProps } from 'src/libs/createModal'
import {authStore} from 'src/stores'
const { Option } = Select
export interface Props extends ModalComponentProps {
  onOkCb: Function
  addQuery?: Obj
}
const ALL_RULE: Rules = {
  monitorContent: (val) => !!val || '请输入监测内容',
  calculationMethod: (val) => !!val || '请输入计算方法',
  qualified: (val) => !!val || '请输入合格指标',
  deptCode: (val) => !!val || '请选择科室',
}

export default function (props: Props) {
  const refForm = useRef<any>()
  const { visible, onCancel, onOkCb ,addQuery} = props
  const { deptList } = authStore
  const [rules, setRules] = useState<Obj>({})

  useLayoutEffect(() => {
    if (visible) {
      setTimeout(() => {
        if (refForm.current) {
          refForm.current.setFields({
            deptCode:authStore.defaultDeptCode,
            ...addQuery
          } )
        }
      }, 300)
    }
  }, [visible])
  const handleOk = () => {
    let current = refForm.current
    if (current) {
      let formData = current.getFields()
      current
        .validateFields()
        .then((res: any) => {
          let { deptCode} = formData
          const deptName = deptList.find(v => v.code === deptCode)?.name || ''

          let params: Obj = {
            ...formData,
            deptName
          }
          onOkCb && onOkCb(params)
        })
        .catch((e: any) => { })
    }
  }

  const handleFormChange = (key: any, val: any) => {

  }

  return (
    <Modal
      title='创建监测指标维护'
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      forceRender
      destroyOnClose
      centered>
      <Wrapper>
        <Form ref={refForm} onChange={handleFormChange} rules={ALL_RULE}>
          <Row>
            <Col span={8} className='label'>
              科室：
            </Col>
            <Col span={16}>
              <Form.Field name='deptCode'>
                <Select>
                  <Option key={''} value={'common'}>通用</Option>
                  {
                    deptList.map(v => (
                        <Option key={v.code} value={v.code}>{v.name}</Option>
                    ))
                  }
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={8} className='label'>
              监测内容：
            </Col>
            <Col span={16}>
              <Form.Field name='monitorContent'>
                <Input/>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={8} className='label'>
              计算方法：
            </Col>
            <Col span={16}>
              <Form.Field name='calculationMethod'>
                <Input/>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={8} className='label'>
              合格指标：
            </Col>
            <Col span={16}>
              <Form.Field name='qualified'>
                <Input/>
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  .ant-col {
    line-height: 32px;
    text-align: right;
    padding-right: 5px;
    margin-bottom: 10px;
    > span {
      width: 100%;
    }
    .ant-select {
      width: 100%;
    }
  }
`
