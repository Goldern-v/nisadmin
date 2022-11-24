import moment from 'moment'
import Form from 'src/components/Form'
import styled from 'styled-components'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Col, Input, Modal, Row } from 'antd'
import { Rules } from 'src/components/Form/interfaces'


export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  allowClear?: boolean
  loading?: boolean
}

export default function CreateAnalysisModal(props: Props) {
  const refForm = useRef<any>()
  const rules: Rules = {
    deptName: (val) => !!val || '请填写科室名称',
  }

  const { visible, onCancel, onOk, allowClear, loading } = props

  useLayoutEffect(() => {
    if (visible && allowClear) {
      setTimeout(_ => {
        if (refForm.current) {
          refForm.current.setFields({
            deptName: '',
          })
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
          onOk && onOk({...formData, deptCode: formData.deptName})
        })
        .catch((e: any) => { })
    }
  }

  const handleFormChange = (key: any, val: any) => {
    
  }

  return (
    <Modal title='添加分数' visible={visible} onCancel={onCancel} onOk={handleOk} confirmLoading={loading || false} centered>
      <Wrapper>
        <Form ref={refForm} onChange={handleFormChange} rules={rules}>
          <Row>
            <Col span={8} className='label'>科室名称：</Col>
            <Col span={16}>
              <Form.Field name='deptName'>
                <Input />
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
    .ant-radio-group {
      float: left;
    }
    .ant-select {
      width: 100%;
    }
  }
`
