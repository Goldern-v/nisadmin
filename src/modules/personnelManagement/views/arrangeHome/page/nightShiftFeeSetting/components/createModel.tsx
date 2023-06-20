import { InputNumber, Modal, Row, Select } from 'antd'
import { ModalProps } from 'antd/es/modal'
import { observer } from 'mobx-react'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import Form from "src/components/Form";
import { CLASSES } from '../enums'
import TextArea from 'antd/es/input/TextArea'
import { authStore } from 'src/stores'
import { Rules } from 'src/components/Form/interfaces'

export interface Props extends ModalProps {

}
export default observer(function CreateModal(props: Props) {
  const { visible, onOk, onCancel } = props
  const formRef = useRef<any>()
  const rules: Rules = {
    // deptCode: '',
    timeType: val => !!val || '班次类别不能为空',
    standard: val => val !== null || '费用不能为空',
    // remark: '',
  }
  const handleOk = () => {
    let current = formRef.current
    if (current) {
      current.validateFields()
      .then(() => {
        let params = formRef.current.getFields()
        onOk && onOk(params)
      }).catch(() => {

      })
    }
  }
  useLayoutEffect(() => {
    setTimeout(() => {
      if (visible && formRef.current) {
        formRef.current.setFields({
          deptCode: '0',
          timeType: 'P班',
          standard: 0,
          remark: '',
        })
      } 
    }, 100)
  }, [visible])
  return (
    <Modal
      title="创建"
      width={500}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}>

      <Wrapper>
        <Form ref={formRef} labelWidth={80} rules={rules}>
          <Form.Field label="适用科室" name='deptCode'>
            <Select>
              <Select.Option value='0'>全院</Select.Option>
              {
                authStore.deptList.map(v =>
                  <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>)
              }
            </Select>
          </Form.Field>
          <Form.Field label="班次类别" name='timeType'>
            <Select>
              {
                CLASSES.map(v =>
                  <Select.Option value={v.value} key={v.value}>{v.label}</Select.Option>)
              }
            </Select>
          </Form.Field>
          <Form.Field label="费用" name='standard'>
            <InputNumber />
          </Form.Field>
          <Form.Field label="备注" name='remark'>
            <TextArea autosize={{ minRows: 4 }} />
          </Form.Field>
        </Form>
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`

`