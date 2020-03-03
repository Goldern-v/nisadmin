import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Spin } from 'antd'
import { ModalComponentProps } from "src/libs/createModal";
import { observer } from 'mobx-react-lite'
import QuestionList from './QuestionList'
import AwnserInfo from './AwnserInfo'
import { trainingInfoReviewService } from './../../api/TrainingInfoReviewService'
export interface Props extends ModalComponentProps {
  id?: number | string,
  teachingMethodName?: string,
  title?: string,
  startTime?: string,
  endTime?: string,
  examDuration?: string,
  passScores?: string
}

export default observer(function TestPageModal(props: Props) {
  const [loading, setLoading] = useState(false)
  const {
    visible,
    onCancel,
    id,
    title,
    teachingMethodName,
    startTime,
    endTime,
    examDuration,
    passScores
  } = props

  const [questionInfo, setQuestionInfo] = useState([] as any)

  const getInfo = () => {
    setLoading(true)
    trainingInfoReviewService
      .previewPaper(id?.toString() || '')
      .then(res => {
        setLoading(false)
        if (res.data) setQuestionInfo(res.data)
      }, () => setLoading(false))
  }

  useLayoutEffect(() => {
    if (visible) {
      getInfo()
    }
  }, [visible])

  return <Modal
    width={1200}
    visible={visible}
    onCancel={onCancel}
    footer={null}
    bodyStyle={{ padding: 0 }}
    title={`${teachingMethodName} ${title}`}
    confirmLoading={loading}>
    <Wrapper>
      <div className="left" style={{ overflowY: loading ? 'hidden' : 'auto' }}>
        <Spin spinning={loading}>
          <QuestionList
            info={{
              ...questionInfo,
              title,
              startTime,
              endTime,
              examDuration,
              passScores
            }} />
        </Spin>
      </div>
      <div className="right">
        <AwnserInfo
          info={{
            ...questionInfo,
            title,
            teachingMethodName
          }} />
      </div>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  &>div{
    height: 100%;
    overflow-y: auto;
    float: left;
    &.left{
      width: 900px;
      background: #eee;
    }
    &.right{
      width: 300px;
      border-left: 1px solid #e8e8e8;
    }
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #eaeaea;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background-color: #c2c2c2;
    }
    ::-webkit-scrollbar-track {
        border-radius: 50px;
        background-color: #eaeaea;
    }
  }
`