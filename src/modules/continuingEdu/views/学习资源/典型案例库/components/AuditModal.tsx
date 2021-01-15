import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Spin, Radio, Input, DatePicker, message } from 'antd'
import { ModalComponentProps } from "src/libs/createModal";
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { localityService } from './../api/LocalityService'
import moment from 'moment'

export interface Props extends ModalComponentProps {
  taskId: string
}

export default observer(function AuditModal(props: Props) {
  const { visible, onCancel, taskId, onOk } = props

  const [loading, setLoading] = useState(false)
  const [auditResult, setAuditResult] = useState(1 as 1 | -1)
  const [auditRemark, setAuditRemark] = useState('')

  let userName = authStore.user ? authStore.user.empName : ''

  const handleOk = () => {
    setLoading(true)
    localityService.auditForm({
      taskId,
      auditResult,
      auditRemark
    })
      .then(res => {
        setLoading(false)
        message.success('审核操作成功')
        onOk && onOk(null)
      }, () => setLoading(false))
  }

  useLayoutEffect(() => {
    if (visible) {
      setAuditResult(1)
      setAuditRemark('')
    }
  }, [visible])

  return <Modal
    centered
    confirmLoading={loading}
    visible={visible}
    onOk={() => handleOk()}
    onCancel={() => onCancel}
    title="审核">
    <Wrapper>
      <div className="row">
        <span className="label w-60">审核结果:</span>
        <span className="content">
          <Radio.Group
            value={auditResult}
            onChange={(e: any) => setAuditResult(e.target.value)}>
            <Radio value={1}>通过</Radio>
            <Radio value={-1}>退回</Radio>
          </Radio.Group>
        </span>
      </div>
      <div className="row">
        <div className="label w-60">审核意见:</div>
        <div className="content">
          <Input.TextArea
            autosize={{
              minRows: 4
            }}
            disabled={loading}
            value={auditRemark}
            onChange={(e: any) => setAuditRemark(e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="label w-60" style={{ position: 'relative', top: '2px' }}>审 核 人:</div>
        <div className="content">
          <Input
            size="small"
            value={userName}
            disabled={true}
            style={{ width: '80px', textAlign: 'center' }} />
          <span style={{ margin: '0 5px 0 10px' }}>审核时间:</span>
          <DatePicker
            size="small"
            showTime
            value={moment()}
            disabled={true}
            format="YYYY-MM-DD HH:mm"
            style={{ width: '150px', minWidth: '150px!important' }} />
        </div>
      </div>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
.row{
    margin-bottom: 10px;
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    .label{
      float: left;
      text-align: right;
      margin-right:15px;
      &.w-60{
        width: 80px;
      }
    }
    .content{
      overflow: hidden;
      padding-right: 50px;
    }
  }
`

