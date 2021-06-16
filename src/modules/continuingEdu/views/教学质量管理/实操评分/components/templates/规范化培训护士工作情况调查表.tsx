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

export default function 规范化培训护士工作情况调查表(props: Props) {
  const { baseInfo, questionList, isTemplate } = props

  const formatQuestionList = (originList: any[]) => {
    let groupObj = {} as any
    let scoreQuestionList = originList.filter((item: any) => item.questionType === 1)

    for (let i = 0; i < scoreQuestionList.length; i++) {
      let item = scoreQuestionList[i]

      let selectedAnswer = item.answerList.find((answer: any) => answer.isSelected)
      let currentScore = selectedAnswer?.answerScore || 0

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
    <div className="main-title">{appStore.HOSPITAL_Name + baseInfo.tableName}</div>
    <div className="sub">
      <span>评价时间：</span>
      <span className="sub-content">{baseInfo.comitDate}</span>
      <span>被评价人：</span>
      <span className="sub-content">{baseInfo.empName}</span>
      <span>科室：</span>
      <span className="sub-content">{baseInfo.deptName}</span>
      <span>评价人：</span>
      <span className="sub-content">{baseInfo.practicaler?.empName}</span>
    </div>
    <table>
      <colgroup>
        <col width="55px" />
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
        {tableGroups.map((groupItem: any, idx: number) => (
          <React.Fragment key={`group-${idx}`}>
            {groupItem.children.map((questionItem: any, idx1: number) => (
              <tr key={`question-${idx}-${idx1}`}>
                {idx1 === 0 && <td className="align-center bold" rowSpan={groupItem.children.length}>{groupItem.subjectTypeName}</td>}
                <td>{questionItem.questionContent}</td>
                {[0, 1, 2, 3, 4, 5].map((idx2: number) => (
                  <td
                    key={`answer-${idx}-${idx1}-${idx2}`}
                    className={questionItem.answerList[idx2]?.isSelected ? 'selected' : ''}></td>
                ))}
              </tr>
            ))}
          </React.Fragment>
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