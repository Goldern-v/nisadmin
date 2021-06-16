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

export default function 个案护理发表评分表(props: Props) {
  const { baseInfo, questionList, isTemplate } = props

  const tableRows = questionList.filter((item: any) => item.questionType === 1)

  const remarkCol = questionList.find((item: any) => item.questionType === 4)

  const totalScore = [0, ...tableRows]
    .reduce((prev: number, next: any) => {
      let selectedAnswer = next.answerList.find((answer: any) => answer.isSelected)
      let currentScore = selectedAnswer?.answerScore || 0
      return prev + currentScore
    })

  return <Wrapper>
    <table>
      <colgroup>
      </colgroup>
      <tbody>
        <tr>
          <td colSpan={7} className="main-title align-center">{appStore.HOSPITAL_Name + baseInfo.tableName}</td>
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
                className={item.answerList[idx1].isSelected ? 'selected' : ''}>
                {item.answerList[idx1].answerScore}
              </td>
            ))}
            {idx === 0 && (
              <td
                style={{ verticalAlign: 'top' }}
                rowSpan={tableRows.length}>
                <pre>{remarkCol && remarkCol.answerList[0].answerContent}</pre>
              </td>
            )}
          </tr>
        ))}
        <tr>
          <td colSpan={2} style={{ borderRightColor: '#fff' }}></td>
          <td colSpan={5} >总评分：{isTemplate ? '' : totalScore}</td>
        </tr>
        <tr>
          <td colSpan={7}>说明：各项得分请在相应评价栏内打“√”</td>
        </tr>
        <tr>
          <td colSpan={7}>评价人签名：{baseInfo.practicaler?.empName}</td>
        </tr>
        <tr>
          <td colSpan={7}>日&nbsp;&nbsp;&nbsp;期：{baseInfo.comitDate}</td>
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