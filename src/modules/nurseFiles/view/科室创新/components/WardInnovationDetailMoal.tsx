import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, Row } from 'antd'
import Modal, { ModalProps } from 'antd/lib/modal'

export interface Props extends ModalProps {
  detailData: any
}

export default function WardInnovationDetailMoal(props: Props) {
  const { visible, detailData, onCancel } = props

  return <Modal
    title="科室创新登记信息"
    visible={visible}
    footer={null}
    onCancel={onCancel}>
    <Wrapper>
      <Row>
        <Col span={4} className="title">
          项目名称
        </Col>
        <Col span={20}>
          <Input value={detailData.projectName} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4} className="title">
          创新科室
        </Col>
        <Col span={20}>
          <Input value={detailData.innovationDeptName} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4} className="title">
          创新时间
        </Col>
        <Col span={20}>
          <Input value={detailData.innovationTime} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4} className="title">
          登记单位
        </Col>
        <Col span={20}>
          <Input value={detailData.regUnit} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4} className="title">
          登记号
        </Col>
        <Col span={20}>
          <Input value={detailData.regNum} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4} className="title">
          参与成员
        </Col>
        <Col span={20}>
          <Input value={detailData.innovationMember} readOnly />
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