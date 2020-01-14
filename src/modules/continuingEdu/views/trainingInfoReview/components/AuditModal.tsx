import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Spin, Radio, Input, DatePicker } from 'antd'
import { ModalComponentProps } from "src/libs/createModal";
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

export interface Props extends ModalComponentProps {
  onOkCallBack: Function
}

export default observer(function AuditModal(props: Props) {
  const { visible, onCancel } = props

  const [loading, setLoading] = useState(false)

  let userName = authStore.user ? authStore.user.empName : ''

  return <Modal
    centered
    confirmLoading={loading}
    visible={visible}
    onCancel={onCancel}
    title="审核">
    <Wrapper>
      <div className="row">
        <span className="label w-60">审核结果:</span>
        <span className="content">
          <Radio.Group>
            <Radio value="1">通过</Radio>
            <Radio value="0">退回</Radio>
          </Radio.Group>
        </span>
      </div>
      <div className="row">
        <div className="label w-60">审核意见:</div>
        <div className="content">
          <Input.TextArea disabled={loading} />
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

