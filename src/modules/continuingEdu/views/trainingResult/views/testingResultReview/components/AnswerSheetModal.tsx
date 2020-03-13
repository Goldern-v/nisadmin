import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Radio, Input, Spin, Button } from 'antd'
import { ModalComponentProps } from "src/libs/createModal";
import { observer } from 'mobx-react-lite'
import AnwserSheetPage from './AnwserSheetPage'
import AnwserResultPannel from './AnwserResultPannel'
import { trainingResultService } from './../../../api/TrainingResultService'
import { message } from 'antd/es';
export interface Props extends ModalComponentProps {
  onOkCallBack?: Function,
  title?: string,
  type?: 'view' | 'edit',
  cetpId?: string | number,
  empNo?: string | number,
  visible: boolean
}
export default observer(function AnswerSheetModal(props: Props) {
  const bodyStyle = {
    padding: 0
  }
  const { visible, onOkCallBack, onCancel, type, title, cetpId, empNo } = props
  const viewType = type || 'edit'
  const [baseInfo, setBaseInfo] = useState({} as any)
  const [questionList, setQuestionList] = useState([] as any[])
  const [loading, setLoading] = useState(false)

  const wendaQuestionList = questionList
    .filter((question: any) => question.questionType == 4)

  const handleOK = () => {
    if (loading) return
    setLoading(true)
    let params = {
      cetpId,
      empNo,
      questionScoreList:
        wendaQuestionList
          .map((question: any) => {
            return {
              questionId: question.id,
              deduction: question.deduction,
            }
          })
    } as any

    trainingResultService
      .saveScores(params)
      .then(res => {
        setLoading(false)

        message.success('成绩保存成功')
        onOkCallBack && onOkCallBack()
        onCancel && onCancel()
      }, () => setLoading(false))
  }

  const getAnswerInfo = () => {
    setLoading(true)
    trainingResultService
      // .reviewExamPaper(170, 6859)
      .reviewExamPaper(cetpId || '', empNo || '')
      .then((res) => {
        if (res.data) {
          setLoading(false)
          setBaseInfo(res.data.summaryInfo)
          setQuestionList(res.data.questionList
            .map((item: any) => {
              if (item.questionType == 4)
                return {
                  ...item,
                  deduction: 0,
                }

              return item
            }))
        }
      }, () => setLoading(false))
  }

  useLayoutEffect(() => {
    if (visible) {
      getAnswerInfo()
    }
  }, [visible])

  return <Modal
    width={1200}
    confirmLoading={loading}
    footer={<div>
      <Button onClick={onCancel}>取消</Button>
      {viewType == 'edit' && wendaQuestionList.length > 0 && <Button
        loading={loading}
        onClick={handleOK}
        type="primary">
        保存成绩
      </Button>}
    </div>}
    onCancel={onCancel}
    bodyStyle={bodyStyle}
    visible={visible}
    // onOk={handleOK}
    // onCancel={onCancel}
    centered
    title="查看试卷">
    <Wrapper>
      <div
        className="left"
        style={{
          overflowY: loading ? 'hidden' : 'auto'
        }}>
        <Spin spinning={loading}>
          <AnwserSheetPage
            type={viewType}
            title={title}
            data={questionList}
            onDataChange={(newList: any[]) =>
              setQuestionList(newList)} />
        </Spin>
      </div>
      <div className="right">
        <AnwserResultPannel
          baseInfo={baseInfo}
          questionList={questionList} />
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