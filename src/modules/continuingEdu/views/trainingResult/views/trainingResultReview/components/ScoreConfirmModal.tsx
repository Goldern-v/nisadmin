import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Radio, Input } from 'antd'
import { ModalComponentProps } from "src/libs/createModal";
export interface Props extends ModalComponentProps {
  empNoList?: string[] | number[],
  onOkCallBack?: Function,
  visible: boolean
}
export default function ScoreConfirmModal(props: Props) {
  const { visible, onOkCallBack, onCancel, empNoList } = props
  const [loading, setLoading] = useState(false)

  const [params, setParams] = useState({
    available: '1',
    reason: ''
  })

  const handleOK = () => {
    onOkCallBack && onOkCallBack()
  }

  useLayoutEffect(() => {
    if (visible)
      setParams({
        available: '1',
        reason: ''
      })
  }, [visible])

  return <Modal
    confirmLoading={loading}
    visible={visible}
    onOk={handleOK}
    onCancel={onCancel}
    centered
    title="修改成绩有效">
    <Wrapper>
      <div>你需要修改选中人员（共{empNoList && empNoList.length}人）的成绩为有效或无效吗？</div>
      <div>
        <Radio.Group
          value={params.available}
          onChange={(val) => console.log(val)}>
          <Radio value="1">有效</Radio>
          <Radio value="0">无效</Radio>
        </Radio.Group>
      </div>
      <div>
        <Input.TextArea
          autosize={{ minRows: 2 }}
          placeholder="请填写修改原因"
          value={params.reason}
          onChange={(e: any) =>
            setParams({ ...params, reason: e.target.value })} />
      </div>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  font-size: 14px;
`