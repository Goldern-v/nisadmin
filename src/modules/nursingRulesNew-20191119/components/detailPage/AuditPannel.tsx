import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import { observer } from 'mobx-react-lite'
import { appStore } from 'src/stores'
import { detailPageModel } from './../../models/detailPageModel'
import GroupAuditModal from './../GroupAuditModal'
import qs from 'qs'
export interface Props { }

export default observer(function AuditPannel() {
  const [auditCfg, setAuditCfg] = useState({
    visible: false,
    params: {
      audit: true,
    }
  })
  const { history } = appStore
  const { auditList, baseInfo } = detailPageModel

  let formatList = () => {
    let list = [] as any;

    for (let i = 0; i < auditList.length; i++) {
      if (i % 3 == 0) {
        list.push([auditList[i]])
      } else {
        list[list.length - 1].push(auditList[i])
      }
    }

    return list
  }

  const handleAuditOk = () => {
    handleAuditCancel();
    detailPageModel.getAuditList()
    detailPageModel.getIndexAudited()
    detailPageModel.getBaseInfo()
  }

  const handleAuditCancel = () => {
    setAuditCfg({ ...auditCfg, visible: false })
  }

  const handleAudit = (audit: boolean) => {
    setAuditCfg({ ...auditCfg, params: { audit: audit }, visible: true })
  }

  const handleItemClick = (item: any) => {
    history.push(`nursingRulesPagePreview?${qs.stringify({
      bookId: baseInfo.bookId,
      nodeNum: item.nodeNum,
      bookName: baseInfo.bookName,
      viewType: 'audit'
    })}`)
  }

  return <Wrapper>
    <Row>
      <Col span={24}><div className="h1">待审核</div></Col>
    </Row>
    {formatList().map((item: any, idx: number) =>
      <Row className="split" key={idx}>
        {item.map((item1: any, idx1: number) =>
          <Col span={8} key={`${idx} ${idx1}`} onClick={() => handleItemClick(item1)}>
            <div className="h2">{`${item1.name}`}</div>
          </Col>)}
      </Row>)}
    <div className="audit-btn-group">
      <Button onClick={() => handleAudit(true)} type="primary" ghost disabled={auditList.length <= 0}>全部通过</Button>
      <Button onClick={() => handleAudit(false)} type="danger" ghost disabled={auditList.length <= 0}>全部拒绝</Button>
    </div>
    <GroupAuditModal
      visible={auditCfg.visible}
      defaultParams={auditCfg.params}
      onOk={handleAuditOk}
      bookId={baseInfo.bookId}
      nodeNums={auditList.map((item: any) => item.nodeNum)}
      onCancel={handleAuditCancel} />
    <div className="nope">{auditList.length <= 0 ? '暂无待审核章节' : ''}</div>
  </Wrapper>
})
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
    cursor: pointer;
    :hover{
      color: #00A680;
    }
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