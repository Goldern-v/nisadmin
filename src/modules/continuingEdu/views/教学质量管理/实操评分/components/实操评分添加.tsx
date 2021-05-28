import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, Row, Select, } from 'antd'
import { Modal } from 'src/vendors/antd'
import { ModalComponentProps } from 'src/libs/createModal'
import moment from 'src/vendors/moment'

const Option = Select.Option

export interface Props extends ModalComponentProps {

}

const rules = {
  title: {
    require: true,
    rule: [
      (val: string) => !!val || '标题不能为空'
    ]
  },
}

export default function 实操评分添加(props: Props) {
  const { onOk, onCancel, visible } = props

  const defaultParams = () => {
    return {
      title: '',
      beginTime: moment().format('YYYY-MM-DD HH:mm'),
      endTime: moment().set('D', moment().get('D') + 1).format('YYYY-MM-DD HH:mm'),
      evalType: '1',
      formCode: 'czjspfb'
    }
  }

  const [editParams, setEditParams] = useState(defaultParams())

  const handleSave = () => {
    onOk && onOk(null)
  }

  return <Modal
    title="添加"
    width={600}
    centered
    onCancel={() => onCancel()}
    onOk={() => handleSave()}
    visible={visible}>
    <Wrapper>
      <Row>
        <Col span={5} className="title">实操名称</Col>
        <Col span={19} className="content">
          <Input
            value={editParams.title}
            onChange={(e) =>
              setEditParams({ ...editParams, title: e.target.value })} />
        </Col>
      </Row>
      <Row>
        <Col span={5} className="title">开始时间</Col>
        <Col span={19} className="content">
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            value={moment(editParams.beginTime)}
            allowClear={false}
            onChange={(_moment: any) => setEditParams({ ...editParams, beginTime: _moment.format('YYYY-MM-DD HH:mm') })} />
        </Col>
      </Row>
      <Row>
        <Col span={5} className="title">结束时间</Col>
        <Col span={19} className="content">
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            value={moment(editParams.endTime)}
            allowClear={false}
            onChange={(_moment: any) => setEditParams({ ...editParams, endTime: _moment.format('YYYY-MM-DD HH:mm') })} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  .ant-row{
    margin-bottom: 15px;
    .ant-col.title{
      line-height: 32px;
      font-size: 14px;
      text-align: right;
      padding-right: 15px;
    }
  }
`