import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Input, message as Message, Row, Col } from 'antd'
import {PromotionApplicationApi} from '../../api/PromotionApplicationApi'


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
  const [confirmLoading, setConfirmLoading] = useState(false);

  const audit = () => {
    if (!userAudit.empNo) return Message.error('未填写用户名');
    if (!userAudit.password) return Message.error('未填写密码');
    setConfirmLoading(true)
    PromotionApplicationApi.checkUser({ empNo: userAudit.empNo, password: userAudit.password })
      .then(res => {
        setConfirmLoading(false)
        if (res.data !== null) {
          onOk(userAudit, res.data);
        } else {
          if (res.desc) Message.error(res.desc);
        }
      })
      .catch(() => {
        setConfirmLoading(false)
        Message.error('验证请求发送失败');
      });
  }

  useEffect(() => {
    if (!visible) setUserAudit({ empNo: '', password: '' })
  }, [visible])

  return <Modal
    title="用户身份验证"
    onOk={audit}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    visible={visible}
    maskClosable={false}
    className="badevent-user-check-modal">
    <Wrapper>
      <Row>
        <Col span={6} className="label-col">用户名：</Col>
        <Col span={18}>
          <Input
            autoComplete="off"
            className="input-item"
            value={userAudit.empNo}
            onChange={e => setUserAudit({ ...userAudit, empNo: e.target.value })} />
        </Col>
      </Row>
      <Row>
        <Col span={6} className="label-col">密码：</Col>
        <Col span={18}>
          <Input
            autoComplete="new-password"
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
.label-col{
  line-height: 32px;
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