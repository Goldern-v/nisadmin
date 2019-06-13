// import styled from 'styled-components'
import React from 'react'
import { Modal, Button } from 'antd'

import { ModalComponentProps } from 'src/libs/createModal'

export interface Props extends ModalComponentProps {
  name?: string,
  type?: string,
  url?: string
}

export default function PreviewModal(props: Props) {
  let { visible, url, type, name, onClose } = props;

  const Content = function () {
    switch (type) {
      case 'jpg':
      case 'gif':
      case 'jpeg':
        return <img src={url} width="100%" />
      case 'pdf':
        return <object type="application/pdf" width="100%" style={{ height: '400px' }} data={url} />
      default:
        return <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>该文件格式不支持预览</div>
    }
  }
  return <Modal
    visible={visible}
    title={name}
    width={'900px'}
    onCancel={onClose}
    footer={null}
    onOk={onClose}>
    {Content()}
  </Modal>
}