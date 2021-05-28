import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, Row } from 'antd'
import Modal, { ModalProps } from 'antd/lib/modal'

export interface Props extends ModalProps {
  detailData: any
}

export default function 科室创新DetailMoal(props: Props) {
  const { visible, detailData, onCancel } = props

  return <Modal
    title="科室创新登记信息"
    visible={visible}
    okButtonDisabled
    onCancel={onCancel}>
    <Wrapper>
      <Row>
        <Col span={4}>
          项目名称
        </Col>
        <Col span={20}>
          <Input value={detailData.projectName} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          创新科室
        </Col>
        <Col span={20}>
          <Input value={detailData.wardName} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          创新时间
        </Col>
        <Col span={20}>
          <Input value={detailData.createTime} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          登记单位
        </Col>
        <Col span={20}>
          <Input value={detailData.signUnit} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          登记号
        </Col>
        <Col span={20}>
          <Input value={detailData.signNum} readOnly />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          参与成员
        </Col>
        <Col span={20}>
          <Input value={detailData.members} readOnly />
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