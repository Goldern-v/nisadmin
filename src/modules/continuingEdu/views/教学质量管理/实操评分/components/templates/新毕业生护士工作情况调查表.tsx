import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'

export interface Props {
  questionList: any[],
  baseInfo: any,
  isTemplate?: boolean,
  [p: string]: any
}

export default function 新毕业生护士工作情况调查表(props: Props) {
  const { baseInfo, questionList, isTemplate } = props

  const totalScore = [0, ...questionList]
    .reduce((pre: number, next: any) => {
      let selectedAnswer = next.answerList.find((answer: any) => answer.isSelected)
      let currentScore = selectedAnswer?.answerScore || 0

      return pre + currentScore
    })

  return <Wrapper>
    <div className="main-title">{appStore.HOSPITAL_Name + baseInfo.tableName}</div>
    <div className="sub">
      <span>评价时间：</span>
      <span className="sub-content">{baseInfo.comitDate}</span>
      <span>被评价人：</span>
      <span className="sub-content">{baseInfo.empName}</span>
      <span>科室：</span>
      <span className="sub-content">{baseInfo.deptName}</span>
      <span>评价人：</span>
      <span className="sub-content">{baseInfo.practicaler}</span>
    </div>
    <table>
      <colgroup>
        <col width="50px" />
        <col width="390px" />
      </colgroup>
      <tbody>
        <tr>
          <td className="align-center bold" rowSpan={2}>序号</td>
          <td className="align-center bold" rowSpan={2}>评价标准</td>
          <td className="align-center bold" colSpan={6}>评分结果</td>
        </tr>
        <tr>
          <td className="align-center">5分</td>
          <td className="align-center">4分</td>
          <td className="align-center">3分</td>
          <td className="align-center">2分</td>
          <td className="align-center">1分</td>
          <td className="align-center">0分</td>
        </tr>
        {questionList.map((questionItem: any, idx1: number) => (
          <tr key={`question-${idx1}`}>
            <td className="align-center bold">{questionItem.sort}</td>
            <td>{questionItem.questionContent}</td>
            {[0, 1, 2, 3, 4, 5].map((idx2: number) => (
              <td
                key={`answer-${idx1}-${idx2}`}
                className={questionItem.answerList[idx2]?.isSelected ? 'selected' : ''}></td>
            ))}
          </tr>
        ))}
        <tr>
          <td colSpan={2} className="align-center">最后得分</td>
          <td className="align-center" colSpan={6}>{isTemplate ? '' : totalScore}</td>
        </tr>
      </tbody>
    </table>
  </Wrapper>
}

const Wrapper = styled.div`
  .sub{
    vertical-align: middle;
    .sub-content{
      display: inline-block;
      min-width: 80px;
      margin-right: 15px;
    }
  }
`