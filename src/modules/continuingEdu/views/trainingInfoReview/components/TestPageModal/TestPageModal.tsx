import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Spin } from 'antd'
import { ModalComponentProps } from "src/libs/createModal";
import { observer } from 'mobx-react-lite'
import QuestionList from './QuestionList'
import AwnserInfo from './AwnserInfo'
import { trainingInfoReviewService } from './../../api/TrainingInfoReviewService'
export interface Props extends ModalComponentProps {
  id?: number | string, //教学计划ceptId
  teachingMethodName?: string, //教学类型名称
  title?: string, //教学计划名称
  startTime?: string, //考试类型开始时间
  endTime?: string, //考试类型借宿时间
  examDuration?: string, //考试时间
  passScores?: string  //及格分数
  obj?: any //修改添加弹窗入参
  questionIdList?: any //考试题库上传预览
  hideAnwserInfo?: boolean //是否隐藏侧边栏
  videoQuestionList?: any[] //视频插题
  questionParams?: any // 视频插题预览
  pertId?: number | string, //多套试卷添加记录 试卷pertId
  paperId?: number | string, //多套试卷查看信息 试卷pertId
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
    passScores,
    obj,
    questionIdList,
    hideAnwserInfo,
    videoQuestionList,
    questionParams,
    pertId,
    paperId
  } = props

  const [questionInfo, setQuestionInfo] = useState({} as any)

  const getInfo = () => {
    setLoading(true)
    if (obj && obj.taskCode) {
      trainingInfoReviewService
        .getPreviewPaper(obj.taskCode, obj.teachingMethod || null, obj.cetpId || null)
        .then(res => {
          setLoading(false)
          if (res.data) setQuestionInfo(res.data)
        }, () => setLoading(false))
    } else if (questionIdList) {
      let obj = {
        questionIdList
      }
      trainingInfoReviewService
        .KKTKpreviewPaper(obj || {})
        .then(res => {
          setLoading(false)
          if (res.data) setQuestionInfo(res.data)
        }, () => setLoading(false))
    } else if (pertId) {
      trainingInfoReviewService
        .HjPreviewPaperByPertId(pertId || '')
        .then(res => {
          setLoading(false)
          if (res.data) setQuestionInfo(res.data)
        }, () => setLoading(false))
    } else if (paperId) {
      trainingInfoReviewService
        .HjPreviewPaperByPertIdCheck(paperId || '')
        .then(res => {
          setLoading(false)
          if (res.data) setQuestionInfo(res.data)
        }, () => setLoading(false))
    } else if (questionParams) {
      trainingInfoReviewService
        .getAllQuestionList(questionParams || {})
        .then(res => {
          setLoading(false)
          if (res.data)
            setQuestionInfo({
              questionList: (res.data || []).map((item: any, index: number) => {
                return {
                  ...item,
                  sort: index + 1,
                  answer: {
                    rightAnswer: item.answerContent || '',
                    suggestedAnswer: item.answerContent || '',
                  },
                  answersList: (item.choiceQuestionAnswerList || [])
                }
              })
            })
        }, () => setLoading(false))
    } else {
      //根据学习计划id获取试卷信息
      trainingInfoReviewService
        .previewPaper(id ?.toString() || '')
        .then(res => {
          setLoading(false)
          if (res.data) setQuestionInfo(res.data)
        }, () => setLoading(false))
    }
  }

  useLayoutEffect(() => {
    if (visible) {
      if (videoQuestionList) {
        setQuestionInfo({
          questionList: videoQuestionList.concat()
        })
      } else {
        getInfo()
      }
    }
  }, [visible])

  return <Modal
    width={hideAnwserInfo ? 900 : 1200}
    visible={visible}
    onCancel={onCancel}
    footer={null}
    bodyStyle={{ padding: 0 }}
    title={`${teachingMethodName} ${title}`}
    confirmLoading={loading}>
    <Wrapper>
      <div
        className="left"
        style={{
          width: 900,
          overflowY: loading ? 'hidden' : 'auto'
        }}>
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
      {!hideAnwserInfo &&
        <div className="right">
          <AwnserInfo
            info={{
              ...questionInfo,
              title,
              teachingMethodName
            }} />
        </div>}
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