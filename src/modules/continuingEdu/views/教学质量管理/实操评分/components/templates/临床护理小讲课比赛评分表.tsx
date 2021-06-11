import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'

export interface Props {
  questionList: any[],
  isTemplate?: boolean,
  baseInfo: any,
  [p: string]: any
}


export default function 临床护理小讲课比赛评分表(props: Props) {
  const { baseInfo, questionList, isTemplate } = props

  const formatQuestionList = (originList: any[]) => {
    let groupObj = {} as any
    let scoreQuestionList = originList.filter((item: any) => item.questionType === 5)

    for (let i = 0; i < scoreQuestionList.length; i++) {
      let item = scoreQuestionList[i]

      let selectedAnswer = item.answerList[0] || {}
      let currentScore = Number(selectedAnswer?.answerContent)
      if (isNaN(currentScore)) currentScore = 0
      let questionScore = selectedAnswer?.answerScore || 0

      item = {
        ...item,
        questionScore,
        currentScore
      }

      if (!groupObj[item.subjectTypeName]) {
        groupObj[item.subjectTypeName] = {
          scoreGeted: currentScore,
          subjectTypeName: item.subjectTypeName,
          children: [item]
        }
      } else {
        groupObj[item.subjectTypeName].scoreGeted += currentScore
        groupObj[item.subjectTypeName].children.push(item)
      }
    }

    return Object.keys(groupObj).map((subjectTypeName) => groupObj[subjectTypeName])
  }

  const tableGroups = formatQuestionList(questionList)

  const totalScore = [0, ...tableGroups]
    .reduce((pre: number, next: any) => {
      return pre + next.scoreGeted || 0
    })

  return <Wrapper>
    <div className="main-title">{baseInfo.tableName}</div>
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
      <colgroup></colgroup>
      <tbody>
        <tr>
          <td className="align-center bold">项目名称</td>
          <td className="align-center bold">具体细则</td>
          <td className="align-center bold">分值</td>
          <td className="align-center bold">得分</td>
        </tr>
        {tableGroups.map((groupItem: any, idx: number) => (
          <React.Fragment key={`group-${idx}`}>
            {groupItem.children.map((questionItem: any, idx1: number) => (
              <tr key={`question-${idx}-${idx1}`}>
                {idx1 === 0 && <td className="align-center" rowSpan={groupItem.children.length}>{groupItem.subjectTypeName}</td>}
                <td>{questionItem.questionContent}</td>
                <td className="align-center">{questionItem.questionScore}</td>
                <td className="align-center">{isTemplate ? '' : questionItem.currentScore}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
        <tr>
          <td colSpan={3} className="align-center bold">合计</td>
          <td className="align-center">{isTemplate ? '' : totalScore}</td>
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
  td{
    line-height: 32px;
  }
`