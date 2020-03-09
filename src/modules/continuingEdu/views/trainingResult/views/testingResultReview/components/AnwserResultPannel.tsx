import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import moment from 'moment'

export interface Props {
  data?: any
}

export default function AnwserResultPannel(props: Props) {
  const { data } = props
  const baseInfo = {
    deptName: '妇科',
    empName: '张新',
    score: 94,
    passScore: 60,
    spendTime: '2分30秒',
    startTime: '2019/03/20 10:00',
    endTime: '2019/03/20  11:00',
    totalQuestion: 20,
    totalAnswer: 20,
    rightAnswer: 10
  }

  let rightRate = 0
  if (baseInfo.rightAnswer && baseInfo.totalAnswer) {
    rightRate = parseInt((baseInfo.rightAnswer / baseInfo.totalAnswer * 10000).toString()) / 100
  }

  const answerList = [
    {
      sort: 1,
      type: 2,
      score: 4,
      content: '关于戴手套描述错误的是',
      empAnswers: 'A,B,C',
      rightAnswer: 'D',
    },
    {
      sort: 2,
      type: 1,
      score: 2,
      content: '关于戴手套描述错误的是',
      empAnswers: 'A',
      rightAnswer: 'B',
    }
  ]

  const awnserTypeName = (type: number) => {
    switch (type) {
      case 1: return '单选题'
      case 2: return '多选题'
      case 3: return '填空题'
      case 4: return '问答题'
      default: return ''
    }
  }

  return <Wrapper>
    <div className="emp-info">
      {baseInfo.deptName}/{baseInfo.empName}
    </div>
    <div className="title">试卷详情</div>
    <div className="base-info">
      <div className="row">得分：{baseInfo.score || 0}分</div>
      <div className="row">及格分数线：{baseInfo.passScore || 0}分</div>
      <div className="row">答题用时：{baseInfo.spendTime || 0}</div>
      <div className="row">开始时间：{baseInfo.startTime}</div>
      <div className="row">结束时间：{baseInfo.endTime}</div>
      <div className="row">
        答题情况：{baseInfo.rightAnswer}/{baseInfo.totalAnswer}
        <span style={{ color: '#aaa' }}>（正确题数/答题数）</span>
      </div>
      <div className="row">题目数量：{baseInfo.totalQuestion}</div>
      <div className="row">正确率：{rightRate}%</div>
    </div>
    <div className="title">❌错题:</div>
    <div className="wrong-awnser-list">
      {answerList.map((item: any) =>
        <div className="wrong-awnser-item" key={item.sort}>
          <div className="question">
            <span className="index">{item.sort}、</span>
            <span className="type">[{awnserTypeName(item.type)}]</span>
            <span className="desc">{item.content} ({item.score}分)</span>
          </div>
          <div className="awnser">
            <div className="left">学员选【{item.empAnswers}】</div>
            <div className="right">正确答案：【{item.rightAnswer}】</div>
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
`