import moment from 'moment'
import Form from 'src/components/Form'
import styled from 'styled-components'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Col, Modal, Row, Select } from 'antd'
import { Rules } from 'src/components/Form/interfaces'

import { Obj } from 'src/libs/types'
import YearPicker from 'src/components/YearPicker'
import { ModalComponentProps } from 'src/libs/createModal'
import { authStore } from 'src/stores'
import { monthList } from 'src/enums/date'
const { Option } = Select
export interface Props extends ModalComponentProps {
  onOkCb: Function
  options?: Obj
  addQuery: Obj
  deptList?: Obj[]
}

const ALL_RULE: Rules = {
  year: (val) => !!val || '请选择年份',
  deptCode: (val) => !!val || '请选择科室',
  month: (val) => !!val || '请选择月份',
}
export default function (props: Props) {
  const refForm = useRef<any>()
  const { deptList } = authStore
  const { visible, onCancel, onOkCb, addQuery = {} } = props
  const [rules, setRules] = useState<Obj>({})
  useEffect(() => {
    if (visible) {
      if (addQuery) {
        setRules(Object.keys(addQuery).reduce((prev, cur) => {
          if (ALL_RULE[cur]) {
            prev[cur] = ALL_RULE[cur]
          }
          return prev
        }, {}))
      }
      setTimeout(() => {
        if (refForm.current) {
          refForm.current.setFields(
            addQuery
          )
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
          let { year, deptCode } = formData
          const deptName = deptList.find(v => v.code === deptCode)?.name || ''

          let params: Obj = {
            ...formData,
            year: year ? year.format('YYYY') : '',
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
      title='创建'
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      centered>
      <Wrapper>
        <Form ref={refForm} onChange={handleFormChange} rules={rules}>
          {
            addQuery?.year !== undefined &&
            <Row>
              <Col span={8} className='label'>
                年份：
              </Col>
              <Col span={16}>
                <Form.Field name='year'>
                  <YearPicker />
                </Form.Field>
              </Col>
            </Row>}
          {
            addQuery?.month !== undefined &&
            <Row>
              <Col span={8} className='label'>
                月份：
              </Col>
              <Col span={16}>
                <Form.Field name='month'>
                  <Select>
                    {
                      monthList.map((v: string, i: number) => (
                        <Option key={i} value={`${i + 1}`}>{v}</Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>
            </Row>}

          <Row>
            <Col span={8} className='label'>
              科室：
            </Col>
            <Col span={16}>
              <Form.Field name='deptCode'>
                <Select>
                  {
                    deptList.map(v => (
                      <Option key={v.code} value={v.code}>{v.name}</Option>
                    ))
                  }
                </Select>
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
