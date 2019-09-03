import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, Row, Col, Spin } from 'antd';
import { authStore } from 'src/stores'
import { flatManageProblemService } from './../api/FlatManageProblemService'

export interface Props {
  visible: boolean,
  onOk?: any,
  onCancel?: any,
  viewType?: string,
  data?: any
}

export default function NewNursingRulesAddModal(props: Props) {
  const { visible, onOk, onCancel, viewType, data } = props

  const { checkDate, inspectorName, problem, responsibleEmpName, deduction, causeAnalysis, measures, id, remark, status } = data;

  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (visible) getDetail()
  // }, [visible])

  // const getDetail = () => {
  //   console.log(data)
  // }

  const handleAudit = () => {
    if (!id) return

    let remark = ''

    let auditContent = <div>
      <div>您确认要审核通过吗？通过后数据将不能再修改。</div>
      <br />
      <div>
        <span>备注：</span>
        <Input
          style={{ width: '260px' }}
          defaultValue={remark}
          onChange={(e: any) => remark = e.target.value} />
      </div>
    </div>

    Modal.confirm({
      content: auditContent,
      title: '审核确认',
      centered: true,
      onOk: () => {
        setLoading(true)
        flatManageProblemService.audit(id, remark).then(res => {
          setLoading(false)
          Message.success('审核成功');
          onOk && onOk();
        }, err => {
          setLoading(false)
        })
      }
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
      <Row style={{ display: remark ? 'block' : 'none' }}>
        <Col span={labelSpan}>备注:</Col>
        <Col span={contentSpan} >{remark || ''}</Col>
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