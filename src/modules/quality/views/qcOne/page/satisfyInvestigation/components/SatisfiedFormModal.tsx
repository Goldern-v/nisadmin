import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Divider, Input, Modal, Spin } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { authStore } from 'src/stores';
import { questionListDefault } from './../data/questionListDefault'
import { satisfyInvestigationServices } from './../services/SatisfyInvestigationServices'
import { message } from 'src/vendors/antd';

const correctImg = <img src={require('./../assets/question-correct.png')} />

export interface Props extends ModalComponentProps {
  id?: string | number,
  isEdit: boolean,
  questionListOrigin?: any[],
  wardName?: string
}

export default function SatisfiedFormModal(props: Props) {
  const bodyStyle = {
    padding: 0
  };

  const { visible, onOk, onCancel, id, wardName, isEdit, questionListOrigin } = props
  const [questionList, setQuestionList] = useState([] as any[])
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    const errMsgList = [] as string[]

    questionList
      .filter((item: any) => item.questionType === 1)
      .forEach((item: any) => {
        let chooseAnswerItem = item.answer.find((answerItem: any) => answerItem.isChoose)

        if (!chooseAnswerItem)
          errMsgList.push(`${item.sort + 1}.${item.question}`)
      })

    if (errMsgList.length > 0) {
      Modal.warn({
        title: '以下题目未选择',
        content: <div>
          {errMsgList.map((str: string) => <div style={{ fontSize: 12, marginBottom: 2 }}>{str}</div>)}
        </div>
      })
    } else {
      setLoading(true)

      satisfyInvestigationServices.submitForm({
        detailId: id || '',
        content: JSON.stringify(questionList),
        score: currentScore()
      })
        .then(res => {
          setLoading(false)
          message.success('提交成功')
          onOk && onOk(null)
        }, () => setLoading(false))
    }
  }

  /**当前评价总分 */
  const currentScore = () => {
    return [0, ...questionList].reduce((score, item) => {
      return score + item.totalScore
    })
  }

  /**调查表总分 */
  const totalScore = () => {
    return [0, ...questionList].reduce((score, item) => {
      return score + item.questionScore
    })
  }

  const initQuestionList = () => {
    setQuestionList(questionListDefault())
  }

  const handleQustionChange = (item: any, idx: number) => {
    let newList = [...questionList]

    newList[idx] = item

    setQuestionList(newList)
  }

  const choiceContent = (questionItem: any, idx: number) => {
    const { answer, question } = questionItem
    return <div className="question-item" key={idx || 0}>
      <span className="question-result"></span>
      <span className="question-content">
        <div>
          <span className="index">{questionItem.sort + 1}、</span>
          <span className="question-type"></span>
          <span className="question-desc">{question}</span>
        </div>
        <div style={{ paddingLeft: '5px' }}>
          {answer.map((awnserItem: any, awnserIdx: number) => (
            <div
              className={['choice-item', isEdit ? 'selectable' : ''].join(' ')}
              key={`${idx}-${awnserIdx}`}
              onClick={() => {
                if (!isEdit) return

                let totalScore = 0
                let newAnswer = answer.map((orginItem: any, orginIdx: number) => {
                  let isCurrentAwnser = orginIdx === awnserIdx
                  if (isCurrentAwnser) totalScore = orginItem.score
                  return {
                    ...orginItem,
                    isChoose: isCurrentAwnser
                  }
                })

                let newQuestionItem = { ...questionItem, answer: newAnswer, totalScore }

                handleQustionChange(newQuestionItem, idx)
              }}>
              {!!awnserItem.isChoose &&
                <span className="correct-choice">{correctImg}</span>}
              <span className="choice-desc">
                {`${String.fromCharCode(awnserItem.sort + 64)}、${awnserItem.content}`}
              </span>
            </div>
          ))}
        </div>
      </span>
    </div>
  }

  const wendaContent = (questionItem: any, idx: number) => {
    const { answer, question } = questionItem

    const answerObj = answer[0] || { content: '' }

    return <div className="question-item" key={idx || 0}>
      <span className="question-result"></span>
      <span className="question-content">
        <div>
          <span className="index">{questionItem.sort + 1}、</span>
          <span className="question-type"></span>
          <span className="question-desc">{question}</span>
        </div>
        <div style={{ paddingLeft: '5px' }}>
          <Input.TextArea
            readOnly={!isEdit}
            value={answerObj.content}
            autosize={{ minRows: 2 }}
            onChange={(e) => {
              let newAnswerObj = {
                ...answerObj,
                content: e.target.value
              }
              let newQuestionItem = { ...questionItem, answer: [newAnswerObj] }

              handleQustionChange(newQuestionItem, idx)
            }} />
        </div>
      </span>
    </div>
  }

  useEffect(() => {
    if (visible) {
      if (!isEdit) {
        if (questionListOrigin)
          setQuestionList([...questionListOrigin])
        else
          initQuestionList()
      } else {
        initQuestionList()
      }
    }
  }, [visible])

  return <Modal
    visible={visible}
    width={900}
    centered
    bodyStyle={bodyStyle}
    title={`护士满意度调查表${isEdit ? '填写' : '查看'}`}
    confirmLoading={loading}
    onCancel={() => onCancel && onCancel()}
    footer={<FooterCon>
      <div className="desc">
        <span>当前分数：</span>
        <span>{currentScore()}分</span>
        <span style={{ marginLeft: 15 }}>总分：</span>
        <span>{totalScore()}分</span>
      </div>
      {isEdit && <Button type="primary" onClick={() => handleSave()} loading={loading}>提交</Button>}
    </FooterCon>}>
    <Wrapper>
      <div
        className="left"
        style={{
          overflowY: loading ? "hidden" : "auto",
          width: 900
        }}>
        <Spin spinning={loading}>
          <PageCon>
            <div className="main-title">《护士满意度调查表》</div>
            <div className="question-item">
              <span className="question-result"></span>
              <span className="question-content">
                <div>
                  <span className="index">1、</span>
                  <span className="question-desc">您目前所在科室？</span>
                </div>
                <div style={{ paddingLeft: '5px' }}>
                  <span style={{ textDecoration: 'underline' }}>{!isEdit ? wardName : authStore.defaultDeptName}</span>
                </div>
              </span>
            </div>
            {questionList.map((item: any, idx: number) => {
              switch (item.questionType) {
                case 1:
                  return choiceContent(item, idx)
                case 4:
                  return wendaContent(item, idx)
                default:
                  return <span key={idx}></span>
              }
            })}
          </PageCon>
        </Spin>
      </div>
    </Wrapper>
  </Modal>
}

const pageWidth = 750
const pagePadding = 25
const pageBorder = 1
const contentWidth = pageWidth - pagePadding * 2 - pageBorder * 2

const Wrapper = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  & > div {
    height: 100%;
    overflow-y: auto;
    float: left;
    &.left {
      background: #eee;
    }
    &.right {
      width: 280px;
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
`;

const PageCon = styled.div`
  width: ${pageWidth}px;
  margin: 15px auto;
  background: #fff;
  padding: ${pagePadding}px;
  min-height: 800px;
  border: ${pageBorder}px solid #e8e8e8;
  .main-title{
    font-size: 20px;
    color: #000;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
  .question-item{
    &>span{
      display: inline-block;
      vertical-align: top;
    }
    .question-result{
      width: 20px;
      min-height: 20px;
      float: left;
      span{
        font-size: 13px;
        color:#000;
      }
      img{
        width: 15px;
        position: relative;
        left: 1px;
      }
    }
    .fill-underline{
      display: inline-block;
      width: 40px;
      border-bottom: 1px solid #333;
    }
    .question-content{
      width: ${contentWidth - 20}px;
      padding-left: 10px;
      font-size: 13px;
      margin-bottom: 15px;
      .question-type{
        color: #F59A23;
      }
      .emp-choices{
        color: #00f;
        display: inline-block;
      }
      .choice-item{
        position: relative;
        margin-right: 15px;
        transition: color,background-color .3s;

        .correct-choice{
          position: absolute;
          top: -2px;
          left: -2px;
          img{
            width: 14px;
          }
        }
        &.selectable{
          cursor: pointer;
          &:hover{
            color: #00A680;
            background-color: #ddd;
          }
        }
      }

      .refer{
        margin-right:15px;
        cursor: pointer;
        color:#027DB4;
        display: inline-block;
        text-decoration: underline;
      }

      .de-score{
        .de-score-ipt{
          margin: 0 2px;
          width: 60px;
          .ant-input-number-input{
            color: red;
          }
          .ant-input-number-handler-wrap{
            display:none;
          }
        }
      }
      pre{
        white-space: pre-wrap;
        word-break: break-all;
        &.answer{
          color: #00f;
        }
      }
    }
  }
`

const FooterCon = styled.div`
  width:100%;
  display: flex;
  .desc{
    flex: 1;
    color: #000;
    line-height: 30px;
    text-align: left;
  }
`