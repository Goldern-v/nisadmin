import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Radio, Input } from 'antd'
import { ModalComponentProps } from "src/libs/createModal"
import { trainingResultService } from './../api/TrainingResultService'
import Title from 'antd/lib/skeleton/Title'
export interface Props extends ModalComponentProps {
  cetpId?: string,
  desc?: string,
  empNoList?: string[] | number[],
  onOkCallBack?: Function,
  isValidResult?: string,
  visible: boolean
}
export default function ScoreConfirmModal(props: Props) {
  const { visible, onOkCallBack, onCancel, empNoList, cetpId, isValidResult, desc } = props
  const [loading, setLoading] = useState(false)

  const [params, setParams] = useState({
    isValidResult: '1',
    resultModifyReason: ''
  })

  const handleOK = () => {
    setLoading(true)
    trainingResultService.updateGradesValid({
      ...params,
      empNoList,
      cetpId
    }).then(res => {
      setLoading(false)
      onCancel()
      onOkCallBack && onOkCallBack()
    }, () => setLoading(false))
    // onCancel()
    // onOkCallBack && onOkCallBack()
  }

  useLayoutEffect(() => {
    if (visible)
      setParams({
        isValidResult: isValidResult || '1',
        resultModifyReason: ''
      })
  }, [visible])

  return <Modal
    confirmLoading={loading}
    visible={visible}
    onOk={handleOK}
    onCancel={onCancel}
    centered
    width={400}
    title="修改成绩有效">
    <Wrapper>
      <div>{desc || `你需要修改选中人员（共${empNoList && empNoList.length}人）的成绩为有效或无效吗？`}</div>
      <div>
        <Radio.Group
          style={{ width: '100%' }}
          value={params.isValidResult}
          onChange={(e) =>
            setParams({ ...params, isValidResult: e.target.value })}>
          <span style={{ width: '50%', display: 'inline-block', textAlign: 'center' }}>
            <Radio value="1">有效</Radio>
          </span>
          <span style={{ width: '50%', display: 'inline-block', textAlign: 'center' }}>
            <Radio value="0" style={{ marginLeft: '-70px' }}>无效</Radio>
          </span>
        </Radio.Group>
      </div>
      <div>
        <Input.TextArea
          autosize={{ minRows: 2 }}
          placeholder="请填写修改原因"
          value={params.resultModifyReason}
          onChange={(e: any) =>
            setParams({ ...params, resultModifyReason: e.target.value })} />
      </div>
      <div>注：无效成绩将不作为今后的结果统计</div>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  font-size: 14px;
  &>div{
    margin-bottom: 10px;
  }
`