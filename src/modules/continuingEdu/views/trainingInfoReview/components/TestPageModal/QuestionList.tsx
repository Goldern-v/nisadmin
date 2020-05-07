import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {
  info?: any,
}

export default function QuestionList(props: Props) {
  const { info } = props
  const questionList = (info && info.questionList) || []
  const correctImg = <img src={require('./../../assets/question-correct.png')} />

  const typeName = (type: number) => {
    switch (type) {
      case 1: return '单选题'
      case 2: return '多选题'
      case 3: return '填空题'
      case 4: return '问答题'
      default: return ''
    }
  }

  const answerCon = (item: any, qsIdx: number) => {
    switch (item.questionType) {
      case 1:
      case 2:
        return <div
          className="answer-content">
          {item
            .answerList
            .map((answer: any, asIdx: number) =>
              <React.Fragment>
                <span
                  className="choice-item"
                  key={`${qsIdx}-${asIdx}`}>
                  {!!answer.isRight && <span
                    className="correct-choice">
                    {correctImg}
                  </span>}
                  <span
                    className="choice-desc">
                    {answer.optionLabel}、{answer.optionContent}
                  </span>
                </span>
                <br />
              </React.Fragment>
            )}
        </div>
      case 3:
        return <div
          className="answer-content">
          答案: {item.answer && item.answer.rightAnswer}
        </div>
      case 4:
        return item.answer?.suggestedAnswer &&
          <div
            className="answer-content">
            参考答案: {item.answer.suggestedAnswer}
          </div>
      default:
        return <span></span>
    }
  }

  return <Wrapper>
    <div className="main-title">{info.title && `《${info.title}》`}</div>
    {info.teachingMethod == 3 && <div className="test-info">
      <div className="test-info-item">
        开始时间: {info.startTime}
      </div>
      <div className="test-info-item">
        结束时间: {info.endTime}
      </div>
      <div className="test-info-item">
        考试时间: {info.examDuration}分钟
      </div>
      <div className="test-info-item">
        及格分数线: {info.passScores}
      </div>
      <div className="test-info-item">
        题目数量: {info.questionCount}题
      </div>
    </div>}
    <div className="question-list">
      {(questionList || []).map((item: any, qsIdx: number) =>
        <div className="question-item" key={qsIdx}>
          <div className="question-content">
            <span className="index">{qsIdx + 1}、</span>
            <span className="question-type">[{typeName(item.questionType)}]</span>
            <span
              className="question-desc"
              dangerouslySetInnerHTML={{
                __html: item.questionContent
                  .replace(/##/g, '<span class="fill">____</span>')
              }}>
            </span>
          </div>
          {answerCon(item, qsIdx)}
        </div>)}
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  width: 750px;
  margin: 15px auto;
  background: #fff;
  padding: 25px;
  min-height: 800px;
  border: 1px solid #e8e8e8;
  .test-info{
    background: #eee;
    padding: 15px 0;
    overflow: hidden;
    .test-info-item{
      width: 50%;
      padding-left: 15px;
      padding-right: 15px;
      display: inline-block;
    }
  }
  .main-title{
    font-size: 20px;
    color: #000;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
  .question-desc{
    .fill{
      letter-spacing: -1px;
    }
    .white-space{
      display: inline-block;
      width: 60px;
      border-bottom:1px solid #000;
      vertical-align: middle;
      height: 20px;
    }
  }
  .question-item{
    padding-left: 10px;
    font-size: 13px;
    margin-top: 15px;
    .question-type{
      color: #F59A23;
    }
    .answer-content{
      padding: 0 5px;
    }
    .choice-item{
      position: relative;
      margin-right: 15px;
      .correct-choice{
        position: absolute;
        top: -2px;
        left: -2px;
        img{
          width: 14px;
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
`