import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Input, Button, DatePicker } from 'antd'
import moment from 'moment'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  orginData?: any
}

const getDefualtParams = () => {
  return {
    id: '',
    empNo: '',
    empName: '',
    startDate: '',
    endDate: '',
    juniorCollege: '',
    organizer: '',
  }
}

export default function AdvancedManageEditModal(props: Props) {
  const { visible, onOk, onCancel, orginData } = props

  const [params, setParams] = useState(getDefualtParams())

  const handleSave = () => {
    console.log('save', params)
  }

  useEffect(() => {
    if (visible) {
      if (Object.keys(orginData).length > 0) {
        const { id, empNo, empName, startDate, endDate, juniorCollege, organizer } = orginData
        setParams({ id, empNo, empName, startDate, endDate, juniorCollege, organizer })
      } else {
        setParams(getDefualtParams())
      }
    }
  }, [visible])

  return (
    <Modal
      title={`${params.id ? '' : ''}进修临床实践`}
      visible={visible}
      onCancel={() => onCancel()}
      onOk={() => handleSave()}>
      <Wrapper>
        <Row gutter={15}>
          <Col span={5}>
            姓名：
          </Col>
          <Col span={5}>
            <Input readOnly />
          </Col>
          <Col span={2}>
            <Button size="small" style={{ marginTop: 4 }}>添加</Button>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={5}>
            开始时间：
          </Col>
          <Col span={16}>
            <DatePicker
              allowClear={false}
              value={params.startDate ? moment(params.startDate) : undefined}
              onChange={(_moment?) =>
                setParams({ ...params, startDate: _moment.format('YYYY-MM-DD') })} />
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={5}>
            结束时间：
          </Col>
          <Col span={16}>
            <DatePicker
              allowClear={false}
              value={params.endDate ? moment(params.endDate) : undefined}
              onChange={(_moment?) =>
                setParams({ ...params, endDate: _moment.format('YYYY-MM-DD') })} />
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={5}>进修专科：</Col>
          <Col span={16}>
            <Input value={params.juniorCollege} />
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={5}>进修单位：</Col>
          <Col span={16}>
            <Input value={params.organizer} />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  .ant-row{
    margin-bottom: 15px;
    &:last-of-type{
      margin-bottom: 0;
    }
    .ant-col{
      &:first-of-type{
        text-align: right;
        line-height: 30px;
        font-size: 14px;
      }
    }
  }
`