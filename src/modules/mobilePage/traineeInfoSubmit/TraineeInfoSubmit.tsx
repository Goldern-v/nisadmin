import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Modal } from 'antd'
import Qrcode from 'qrcode.react'
export interface Props { }

export default function TraineeInfoSubmit() {
  const handleTest = () => {
    Modal.confirm({
      title: 'are you ok?',
      content: 'nope',
      centered: true,
    })
  }

  return <Wrapper>
    <Qrcode value="http://facebook.github.io/react/" id="goToSubmit" />
    <Button onClick={handleTest}>测试按钮</Button>
  </Wrapper>
}
const Wrapper = styled.div``