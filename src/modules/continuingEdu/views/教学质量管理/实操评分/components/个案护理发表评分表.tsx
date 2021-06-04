import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'

export interface Props {
  questionList: any[],
  baseInfo: any,
  [p: string]: any
}

export default function 个案护理发表评分表(props: Props) {
  const baseInfo = {
    formName: appStore.HOSPITAL_ID + '个案护理发布评分表',
    title: '这是一个题目',
    empName: '朱*丽',
    timeUsed: '10分30秒',
    pingFenDate: '2021-5-13'
  }

  const questionList = [
    {
      questionContent: '介绍选题的目的及意义；基本概念(疾病知识,生理解剖等)讲解准确，重点突出，难点讲解清楚',
      currentScore: 15,
      sort: 1,
      questionType: 1,
      answers: [
        { content: '15', score: 15, isSelected: true },
        { content: '13', score: 13, isSelected: false },
        { content: '10', score: 10, isSelected: false },
        { content: '8', score: 8, isSelected: false },
      ]
    },
    {
      questionContent: '讲解内容熟悉、充实，讲解层次清晰，逻辑性强',
      currentScore: 13,
      sort: 2,
      questionType: 1,
      answers: [
        { content: '15', score: 15, isSelected: false },
        { content: '13', score: 13, isSelected: true },
        { content: '10', score: 10, isSelected: false },
        { content: '8', score: 8, isSelected: false },
      ]
    },
    {
      questionContent: '讲解通俗易懂，有吸引力,护理计划清晰，评估恰当，措施可行有效',
      currentScore: 10,
      sort: 3,
      questionType: 1,
      answers: [
        { content: '15', score: 15, isSelected: false },
        { content: '13', score: 13, isSelected: false },
        { content: '10', score: 10, isSelected: true },
        { content: '8', score: 8, isSelected: false },
      ]
    },
    {
      questionContent: '讨论个案进行的特别情况，可能遇到的困难及限制或对个人、病房及病人的影响，有新观念及新进展介绍',
      currentScore: 8,
      sort: 4,
      questionType: 1,
      answers: [
        { content: '15', score: 15, isSelected: false },
        { content: '13', score: 13, isSelected: false },
        { content: '10', score: 10, isSelected: false },
        { content: '8', score: 8, isSelected: true },
      ]
    },
    {
      questionContent: '合理运用多媒体讲解，多媒体制作层次清楚、美观、实用，效果好',
      currentScore: 12,
      sort: 5,
      questionType: 1,
      answers: [
        { content: '12', score: 12, isSelected: true },
        { content: '10', score: 10, isSelected: false },
        { content: '8', score: 8, isSelected: false },
        { content: '6', score: 6, isSelected: false },
      ]
    },
    {
      questionContent: '合仪表端庄大方，普通话准确，语言流畅',
      currentScore: 10,
      sort: 6,
      questionType: 1,
      answers: [
        { content: '12', score: 12, isSelected: false },
        { content: '10', score: 10, isSelected: true },
        { content: '8', score: 8, isSelected: false },
        { content: '6', score: 6, isSelected: false },
      ]
    },
    {
      questionContent: '仪表端庄大方，普通话准确，语言流畅',
      currentScore: 8,
      sort: 7,
      questionType: 1,
      answers: [
        { content: '12', score: 12, isSelected: false },
        { content: '10', score: 10, isSelected: false },
        { content: '8', score: 8, isSelected: true },
        { content: '6', score: 6, isSelected: false },
      ]
    },
    {
      questionContent: '时间掌握得当，能按计划完成发表任务，按时接受提问',
      currentScore: 1,
      sort: 8,
      questionType: 1,
      answers: [
        { content: '4', score: 4, isSelected: false },
        { content: '3', score: 2, isSelected: false },
        { content: '2', score: 3, isSelected: false },
        { content: '1', score: 1, isSelected: true },
      ]
    },
    {
      questionContent: '时间掌握得当，能按计划完成发表任务，按时接受提问',
      currentScore: 0,
      sort: 9,
      questionType: 4,
      answers: [
        { content: '这是我的文字说明' },
      ]
    },
  ] as any[]

  const tableRows = questionList.filter((item: any) => item.questionType === 1)

  const remarkCol = questionList.find((item: any) => item.questionType === 4)

  const totalScore = [0, ...tableRows]
    .reduce((prev: number, next: any) => {
      return prev + next.currentScore || 0
    })

  return <Wrapper>
    <table>
      <colgroup>
      </colgroup>
      <tbody>
        <tr>
          <td colSpan={7} className="main-title align-center">{baseInfo.title}</td>
        </tr>
        <tr>
          <td colSpan={7}>发布用时：{baseInfo.timeUsed}</td>
        </tr>
        <tr>
          <td colSpan={7}>
            <div style={{ height: 22, width: 22 }}></div>
          </td>
        </tr>
        <tr>
          <td rowSpan={2} className="align-center">序号</td>
          <td rowSpan={2} className="align-center">项目</td>
          <td colSpan={4} className="align-center">评价</td>
          <td rowSpan={2} className="align-center">其他意见或建议（文字说明）</td>
        </tr>
        <tr>
          <td className="align-center">优</td>
          <td className="align-center">良</td>
          <td className="align-center">可</td>
          <td className="align-center">差</td>
        </tr>
        {tableRows.map((item: any, idx: number) => (
          <tr key={`question-${idx}`}>
            <td className="align-center">{idx + 1}</td>
            <td>{item.questionContent}</td>
            {[0, 1, 2, 3].map((idx1: number) => (
              <td
                key={`answer-${idx}-${idx1}`}
                className={item.answers[idx1].isSelected ? 'selected' : ''}>
                {item.answers[idx1].content}
              </td>
            ))}
            {idx === 0 && (
              <td
                style={{ verticalAlign: 'top' }}
                rowSpan={tableRows.length}>
                <pre>{remarkCol && remarkCol.answers[0].content}</pre>
              </td>
            )}
          </tr>
        ))}
        <tr>
          <td colSpan={2} style={{ borderRightColor: '#fff' }}></td>
          <td colSpan={5} >总评分：{totalScore}</td>
        </tr>
        <tr>
          <td colSpan={7}>说明：各项得分请在相应评价栏内打“√”</td>
        </tr>
        <tr>
          <td colSpan={7}>评价人签名：{baseInfo.empName}</td>
        </tr>
        <tr>
          <td colSpan={7}>日&nbsp;&nbsp;&nbsp;期：{baseInfo.pingFenDate}</td>
        </tr>
      </tbody>
    </table>
  </Wrapper>
}
const Wrapper = styled.div`
  td{
    line-height: 32px;
    pre{
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
`