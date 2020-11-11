import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
}

export default function editModal(props: Props) {
  const { visible, onOk, onCancel } = props

  const handleOk = () => {

  }

  return <Modal
    title="修改分组"
    centered
    onOk={() => handleOk()}
    onCancel={() => onCancel()}>
    <Wrapper></Wrapper>
  </Modal>
}
const Wrapper = styled.div``