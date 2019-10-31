import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { getFileType } from '../file'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  path: string
  title: string
}

/** 设置规则 */
const rules: Rules = {
  publicDate: (val) => !!val || '请填写发表日期'
}

export default function PreviewModal(props: Props) {
  let { visible, onCancel, path, title } = props
  let refVideo = React.createRef<HTMLVideoElement>()

  const onSave = async () => {
    onCancel()
  }

  useLayoutEffect(() => {
    console.log(visible, 'visible')
    if (refVideo.current && path) {
      if (visible) {
        refVideo.current.play()
      } else {
        refVideo.current.pause()
      }
    }
  }, [visible])

  return (
    <Modal
      width={900}
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='确定'
      forceRender
      centered
    >
      <Wrapper>
        {getFileType(path) == 'video' ? (
          <div className='video-con'>{visible && <video src={path} ref={refVideo} controls />}</div>
        ) : (
          ''
        )}
      </Wrapper>
    </Modal>
  )
}
const Wrapper = styled.div`
  video {
    width: 100%;
  }
`
