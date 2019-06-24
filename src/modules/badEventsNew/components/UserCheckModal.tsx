import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Input, message as Message, Row, Col } from 'antd'
import badEventsNewService from './../api/badEventsNewService'

const api = new badEventsNewService();

export interface Props {
  visible: boolean
  onOk?: any,
  onCancel?: any
}

export default function UserCheckModal(props: Props) {
  const { onOk, onCancel, visible } = props;
  const [userAudit, setUserAudit] = useState({
    empNo: '',
    password: ''
  });

  const audit = () => {
    if (!userAudit.empNo) return Message.error('未填写用户名');
    if (!userAudit.password) return Message.error('未填写密码');

    api.checkUser({ empNo: userAudit.empNo, password: userAudit.password })
      .then(res => {
        if (res.data !== null) onOk(userAudit);
      });
  }

  return <Modal
    title="用户身份验证"
    onOk={audit}
    onCancel={onCancel}
    visible={visible}
    className="badevent-user-check-modal">
    <Wrapper>
      <Row>
        <Col span={6} className="label-col">用户名：</Col>
        <Col span={18}>
          <Input
            className="input-item"
            value={userAudit.empNo}
            onChange={e => setUserAudit({ ...userAudit, empNo: e.target.value })} />
        </Col>
      </Row>
      <Row>
        <Col span={6} className="label-col">密码：</Col>
        <Col span={18}>
          <Input
            className="input-item"
            type="password"
            value={userAudit.password}
            onChange={e => setUserAudit({ ...userAudit, password: e.target.value })} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
.ant-row{
  margin-bottom: 10px;
}
.input-item{
  width: 240px;
  line-height: 32px;
  vertical-align: middle;
}
.label-col{
  text-align: right;
}
`