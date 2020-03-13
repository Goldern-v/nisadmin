import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import moment from 'moment'

export interface Props {
  baseInfo: any,
  questionList: any[]
}

export default function AnwserResultPannel(props: Props) {
  const { baseInfo, questionList } = props

  // let timeForAnswer = baseInfo.timeForAnswer / (1000 * 60)
  // let timeForAnswerStr = ''
  // if (timeForAnswer / 60 >= 1) timeForAnswerStr += `${Math.ceil(timeForAnswer / 60)}小时`
  // if (timeForAnswer % 60 > 0) timeForAnswerStr += `${Math.ceil(timeForAnswer % 60)}分钟`

  let rightRate = 0
  if (
    baseInfo.answerRightCount &&
    baseInfo.totalQuestionsCount &&
    baseInfo.shortQuestionsCount
  ) {
    rightRate = Math.ceil(
      baseInfo.answerRightCount /
      (baseInfo.totalQuestionsCount - baseInfo.shortQuestionsCount)
      * 10000
    ) / 100
  }

  const awnserTypeName = (type: number) => {
    switch (type) {
      case 1:
        return '单选题'
      case 2:
        return '多选题'
      case 3:
        return '填空题'
      case 4:
        return '问答题'
      default:
        return ''
    }
  }

  let filterQuestionList =
    questionList.filter((item: any) => {
      if (item.questionType == 4) return false
      if (item.answerRight) return false
      return true
    })

  let wendaQuestionList = questionList
    .filter((item: any) => item.questionType == 4)

  let rightQuestionList = questionList
    .filter((item: any) => {
      if (item.questionType == 4) return false
      if (item.answerRight) return true
      return false
    })
  //计算总得分
  let totalGainScores = 0

  for (let i = 0; i < rightQuestionList.length; i++) {
    let rightItem = rightQuestionList[i]
    if (rightItem.scores) totalGainScores += rightItem.scores
  }

  for (let i = 0; i < wendaQuestionList.length; i++) {
    let wendati = wendaQuestionList[i]
    let score = wendati.scores - wendati.deduction
    totalGainScores += score
  }

  const selectedAnwser = (item: any) => {
    let answerStr = ''
    if (item.questionType == 1 || item.questionType == 2) {
      answerStr = item.answersList
        .filter((answer: any) => answer.isSelected)
        .map((answer: any) => answer.optionLabel).join(',')
    } else if (item.questionType == 3) {
      let answer = (item.answersList && item.answersList[0]) || {}
      answerStr = answer.answerContent
    }

    return answerStr
  }

  const rightAnwser = (item: any) => {
    let answerStr = ''
    if (item.questionType == 1 || item.questionType == 2) {
      answerStr = item.answersList
        .filter((answer: any) => answer.isRight)
        .map((answer: any) => answer.optionLabel).join(',')
    } else if (item.questionType == 3) {
      let answer = (item.answersList && item.answersList[0]) || {}
      answerStr = answer.rightAnswer
    }

    return answerStr
  }

  return <Wrapper>
    <div className="emp-info">
      {baseInfo.deptName}/{baseInfo.empName}
    </div>
    <div className="title">试卷详情</div>
    <div className="base-info">
      <div className="row">得分：{totalGainScores || 0}分</div>
      <div className="row">及格分数线：{baseInfo.passScores || 0}分</div>
      <div className="row">答题用时：
        {/* {timeForAnswerStr} */}
        {baseInfo.timeForAnswerDesc}
      </div>
      <div className="row">开始时间：{baseInfo.answerBeginTime}</div>
      <div className="row">结束时间：{baseInfo.answerEndTime}</div>
      <div className="row">
        答题情况：{baseInfo.answerRightCount}/{baseInfo.totalQuestionsCount}
        <span style={{ color: '#aaa' }}>（正确题数/答题数）</span>
      </div>
      <div className="row">题目数量：{baseInfo.totalQuestionsCount}</div>
      <div className="row">正确率：{rightRate}%</div>
    </div>
    <div className="title">❌错题:</div>
    <div className="wrong-awnser-list">
      {filterQuestionList.map((item: any) =>
        <div className="wrong-awnser-item" key={item.sort}>
          <div className="question">
            <span className="index">{item.sort}、</span>
            <span className="type">[{awnserTypeName(item.questionType)}]</span>
            <span className="desc">
              <span
                dangerouslySetInnerHTML={{
                  __html: item.questionContent
                    .replace(/##/g, '<span class="fill-underline"></span>')
                }}></span>
              <span> ({item.scores}分)</span>
            </span>
          </div>
          <div className="awnser">
            <div className="left">
              学员选【{selectedAnwser(item)}】
            </div>
            <div className="right">
              正确答案：【{rightAnwser(item)}】
            </div>
          </div>
        </div>)}
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  padding: 15px 10px;
  .emp-info{
    font-size: 22px;
    color:#000;
    font-weight: bold;
  }
  .title{
    margin-top: 18px;
    margin-bottom: 10px;
    font-size: 16px;
    color:#000;
    font-weight: bold;
  }
  .base-info{
    padding-left: 6px;
    margin-bottom: 30px;
    &>div{
      font-size: 13px;
    }
  }
  .wrong-awnser-list{
    padding: 0 5px;
  }
  .wrong-awnser-item{
    border-bottom: 1px solid #b4bbc5;
    padding-bottom: 20px;
    padding-top: 10px;
    &:first-of-type{
      padding-top: 0;
    }
    &:last-of-type{
      border-bottom: none;
    }
    .question{
      .type{
        color: #F59A23;
      }
    }
    .awnser{
      overflow: hidden;
      .left{
        float: left;
      }
      .right{
        float: right;
      }
    }
  }
  .fill-underline{
    display: inline-block;
    width: 40px;
    border-bottom: 1px solid #333;
  }
`