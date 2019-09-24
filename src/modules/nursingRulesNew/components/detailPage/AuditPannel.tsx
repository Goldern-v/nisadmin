import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import GroupAuditModal from './../GroupAuditModal'
export interface Props { }

export default function AuditPannel() {
  const [auditCfg, setAuditCfg] = useState({
    visible: false,
    params: {
      audit: true,
    }
  })
  const handleAuditOk = () => {
    handleAuditCancel();
  }

  const handleAuditCancel = () => {
    setAuditCfg({ ...auditCfg, visible: false })
  }

  const handleAudit = (audit: boolean) => {
    setAuditCfg({ ...auditCfg, params: { audit: audit }, visible: true })
  }

  return <Wrapper>
    <Row>
      <Col span={24}><div className="h1">待审核</div></Col>
    </Row>
    <Row className="split">
      <Col span={8}>
        <div className="h2">副标题</div>
      </Col>
      <Col span={8}>
        <div className="h2">副标题</div>
      </Col>
      <Col span={8}>
        <div className="h2">副标题</div>
      </Col>
    </Row>
    <div className="audit-btn-group">
      <Button onClick={() => handleAudit(true)} type="primary" ghost>全部通过</Button>
      <Button onClick={() => handleAudit(false)} type="danger" ghost>全部拒绝</Button>
    </div>
    <GroupAuditModal visible={auditCfg.visible} defaultParams={auditCfg.params} onOk={handleAuditOk} onCancel={handleAuditCancel} />
  </Wrapper>
}
const Wrapper = styled.div`
  padding: 10px;
  min-height:100%;
  .h1{
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
  .h2{
    padding-right: 8px;
    line-height: 30px;
  }
  .ant-row{
    margin-bottom: 8px;
    &.split{
      border-bottom: 1px solid #ddd;
    }
  }
  .audit-btn-group{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #ddd;
    padding: 5px 10px;
    background: #fff;
    button{
      margin-right: 10px;
    }
  }
`