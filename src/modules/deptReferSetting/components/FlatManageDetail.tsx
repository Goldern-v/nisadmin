import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, Row, Col, Spin } from 'antd';
import { authStore } from 'src/stores'
import { managementSummaryService } from './../api/ManagementSummaryService'

export interface Props {
  visible: boolean,
  onOk?: any,
  onCancel?: any,
  viewType?: string,
  data?: any
}

export default function NewNursingRulesAddModal(props: Props) {
  const { visible, onOk, onCancel, viewType, data } = props

  const { checkDate, inspectorName, problem, responsibleEmpName, deduction, causeAnalysis, measures, id } = data;

  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (visible) getDetail()
  // }, [visible])

  // const getDetail = () => {
  //   console.log(data)
  // }

  const handleAudit = () => {
    if (!id) return

    setLoading(true)
    managementSummaryService.audit(id).then(res => {
      setLoading(false)
      Message.success('审核成功');
      onOk && onOk();
    }, err => {
      setLoading(false)
    })
  }

  const ModalContent = () => {
    const labelSpan = 5
    const contentSpan = 19

    let MainContent = <div>
      <Row>
        <Col span={labelSpan}>检查日期:</Col>
        <Col span={contentSpan}>{checkDate || ''}</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>检查者:</Col>
        <Col span={contentSpan}>{inspectorName || ''}</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>存在问题:</Col>
        <Col span={contentSpan}>{problem || ''}</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>责任人:</Col>
        <Col span={contentSpan}>{responsibleEmpName || ''}</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>扣分:</Col>
        <Col span={contentSpan}>{deduction ? `-${deduction}` : ''}</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>原因分析:</Col>
        <Col span={contentSpan}>{causeAnalysis || ''}</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>整改措施:</Col>
        <Col span={contentSpan}>{measures || ''}</Col>
      </Row>
    </div>

    if (loading) {
      return <Spin>{MainContent}</Spin>
    } else {
      return MainContent
    }
  }

  const ModalFooter = () => {
    if (viewType == 'audit') {
      return <div>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={handleAudit} type="primary" disabled={loading}>审核通过</Button>
      </div>
    }
    return null
  }

  return <Modal
    className="new-nursing-rules-add-modal"
    title={viewType == 'audit' ? '审核' : '问题详情'}
    centered
    confirmLoading={loading}
    onCancel={onCancel}
    footer={ModalFooter()}
    visible={visible}>
    <ModalWrapper>
      {ModalContent()}
    </ModalWrapper>
  </Modal>
}

const ModalWrapper = styled.div`
  .ant-row{
    margin-bottom: 5px;
  }
`