import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Select, Input, InputNumber } from 'antd'
import Form from 'src/components/Form/Form'
import { Rules } from 'src/components/Form/interfaces'
import { empManageService } from './../views/empDetail/api/EmpManageService'

const Option = Select.Option;
const TextArea = Input.TextArea;

export interface Props {
  visible: boolean,
  empNo: string | number,
  onOk: any,
  onCancel: any
}

export default function SorceAppendModal(props: Props) {
  const { visible, onCancel, onOk, empNo } = props;
  const formRef = React.createRef<Form>();
  const [loading, setLoading] = useState(false)
  const [creditTypeList, setCreditTypeList] = useState([] as any[])

  useEffect(() => {
    let timer = null as any | null;
    if (visible) {
      timer = setTimeout(() => {
        let current = formRef.current;

        if (current) current.clear(() => {
          let current = formRef.current;
          if (current) current.setField('creditType', '1');
        })
      }, 500);
    }
    return () => {
      clearTimeout(timer)
    }
  }, [visible])

  useEffect(() => {
    empManageService.getAllCreditTypes()
      .then(res => {
        if (res.data) {
          setCreditTypeList(res.data)
        }
      })
  }, [])

  const handleOk = () => {
    setLoading(true)
    // console.log(formRef.current && formRef.current.getFields())
    // setTimeout(() => {
    //   setLoading(false)
    //   onOk && onOk()
    // }, 1000)

    let params = formRef.current && formRef.current.getFields()
    params = { ...params }
    params.credit = params.credit || 0
    params.credit = -params.credit
    params.empNo = empNo

    empManageService
      .addCredit(params)
      .then(res => {
        setLoading(false)
        onOk && onOk()
      }, err => setLoading(false))
  }

  return <Modal
    visible={visible}
    title="学分维护"
    confirmLoading={loading}
    onOk={handleOk}
    centered
    onCancel={onCancel}>
    <Wrapper>
      <Form ref={formRef}>
        <Row>
          <Col span={4} className="label">学分类型:</Col>
          <Col span={14}>
            <Form.Field name="creditType">
              <Select>
                {/* <Option value="1">院级学分</Option>
                <Option value="2">片区学分</Option>
                <Option value="3">病区学分</Option> */}
                {creditTypeList.map((item: any, idx: number) =>
                  <Option
                    value={item.code.toString()}
                    key={idx}>
                    {item.name}
                  </Option>)}
              </Select>
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={4} className="label">学分:</Col>
          <Col span={14}>
            <Form.Field name="credit">
              <InputNumber min={0} />
            </Form.Field>
          </Col>
          <Col span={6}>
            <span className="notice">*分数为减学分</span>
          </Col>
        </Row>
        <Row>
          <Col span={4} className="label">原因:</Col>
          <Col span={14}>
            <Form.Field name="remark">
              <TextArea rows={3} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  .ant-col{
    line-height: 32px;
    &.label{
      text-align: right;
      padding-right: 6px;
    }
    .notice{
      color: red;
      margin-left: 10px;
    }
  }
`