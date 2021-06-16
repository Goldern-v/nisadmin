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

export default function 护士床边综合能力考核表(props: Props) {

  const { questionList, baseInfo, isTemplate } = props

  const formatQuestionList = (originList: any[]) => {
    let groupObj = {} as any
    let choiceQuestionList = originList.filter((item: any) => item.questionType === 1)

    for (let i = 0; i < choiceQuestionList.length; i++) {
      let item = choiceQuestionList[i]

      if (item.questionType === 1) {

        let selectedAnswer = item.answerList.find((answer: any) => answer.isSelected)
        let currentScore = selectedAnswer?.answerScore || 0

        if (!groupObj[item.subjectTypeName]) {
          groupObj[item.subjectTypeName] = {
            scoreTotal: 4,
            scoreGeted: currentScore,
            subjectTypeName: item.subjectTypeName,
            kouFenReason: '',
            remarkGroup: {},
            children: [item]
          }
        } else {
          groupObj[item.subjectTypeName].scoreTotal += 4
          groupObj[item.subjectTypeName].scoreGeted += currentScore
          groupObj[item.subjectTypeName].children.push(item)
        }
      } else if (item.questionType === 4) {
        let target = groupObj[item.subjectTypeName]
        if (target) target.remarkGroup[item.questionContent] = item.answerList[0]?.answerContent || ''
      }
    }

    return Object.keys(groupObj).map((subjectTypeName) => groupObj[subjectTypeName])
  }

  const tableGroups = formatQuestionList(questionList)

  const totalScore = [0, ...tableGroups]
    .reduce((pre: number, next: any) => {
      return pre + next.scoreGeted || 0
    })

  const totalLevel = ((totalScore: number) => {
    if (totalScore >= 90)
      return 'A'
    else if (totalScore < 90 && totalScore >= 80)
      return 'B'
    else if (totalScore < 80 && totalScore >= 70)
      return 'C'
    else
      return 'D'
  })(totalScore)

  console.log(tableGroups)

  return <Wrapper>
    <div className="main-title">{appStore.HOSPITAL_Name + baseInfo.tableName}</div>
    <div className="sub">
      <span>被评价人：</span>
      <span className="sub-content">{baseInfo.empName}</span>
      <span>科室：</span>
      <span className="sub-content">{baseInfo.deptName}</span>
      <span>评价人：</span>
      <span className="sub-content">{baseInfo.practicaler?.empName}</span>
      <span>得分：</span>
      <span className="sub-content">{totalScore}</span>
    </div>
    <table>
      <colgroup>
        <col width="45" />
        <col width="45" />
        <col width="250" />
        <col width="24" />
        <col width="24" />
        <col width="24" />
        <col width="24" />
        <col width="45" />
        <col width="90" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td rowSpan={2} className="align-center">项目</td>
          <td rowSpan={2} className="align-center">项目总分</td>
          <td rowSpan={2} className="align-center">细则</td>
          <td colSpan={4} className="align-center">评分等级</td>
          <td rowSpan={2} className="align-center">实际得分</td>
          <td rowSpan={2} className="align-center">扣分原因</td>
          <td rowSpan={2} className="align-center">备注</td>
        </tr>
        <tr>
          <td className="align-center">A</td>
          <td className="align-center">B</td>
          <td className="align-center">C</td>
          <td className="align-center">D</td>
        </tr>
        {tableGroups.map((groupItem: any, idx: number) => {
          return <React.Fragment key={`group-${idx}`}>
            {groupItem.children.map((questionItem: any, idx1: number) => (
              <tr key={`question-${idx}-${idx1}`}>
                {idx1 === 0 && (
                  <React.Fragment>
                    <td
                      className="align-center"
                      rowSpan={groupItem.children.length}>
                      {groupItem.subjectTypeName}
                    </td>
                    <td
                      className="align-center"
                      rowSpan={groupItem.children.length}>
                      {groupItem.scoreTotal}
                    </td>
                  </React.Fragment>
                )}
                <td>{questionItem.questionContent}</td>
                {[0, 1, 2, 3].map((idx2: number) => (
                  <td
                    className={[
                      'align-center',
                      questionItem.answerList[idx2]?.isSelected ? 'selected' : ''
                    ].join(' ')}
                    key={`answer-${idx}-${idx1}-${idx2}`}>
                    {questionItem.answerList[idx2]?.answerScore || ''}
                  </td>
                ))}
                {idx1 === 0 && (
                  <React.Fragment>
                    <td
                      rowSpan={groupItem.children.length}
                      className="align-center">
                      {isTemplate ? '' : groupItem.scoreGeted}
                    </td>
                    <td rowSpan={groupItem.children.length}>{groupItem.remarkGroup['扣分原因']}</td>
                    {((subjectTypeName: string) => {

                      switch (subjectTypeName) {
                        case '护理评估':
                          return <td
                            rowSpan={groupItem.children.length}
                            style={{ verticalAlign: 'top' }}>
                            <div>医疗诊断名称</div>
                            {groupItem.remarkGroup['医疗诊断名称']}
                          </td>
                        case '护理问题关键点':
                          return <td
                            rowSpan={groupItem.children.length}
                            style={{ verticalAlign: 'top' }}>
                            <div>护理问题/关键点</div>
                            {groupItem.remarkGroup['护理问题/关键点']}
                          </td>
                        case '护理操作':
                          return <td
                            rowSpan={groupItem.children.length}
                            style={{ verticalAlign: 'top' }}>
                            <div>操作项目:</div>
                            <div style={{ marginBottom: 10 }}>{groupItem.remarkGroup['操作项目']}</div>
                            <div>提问内容:</div>
                            <div>{groupItem.remarkGroup['提问内容']}</div>
                          </td>
                        default:
                          return <td
                            rowSpan={groupItem.children.length}
                            style={{ verticalAlign: 'top' }}>
                            {groupItem.remarkGroup['备注']}
                          </td>
                      }
                    })(groupItem.subjectTypeName)}
                  </React.Fragment>
                )}
              </tr>
            ))}
          </React.Fragment>
        })}
      </tbody>
    </table>
    <div>
      注：整体综合考核等级：A.很好   B.较好   C.一般    D.较差
    </div>
    <div>
      根据实习生评价表给学生评分总分为：    {isTemplate ? '' : totalScore}分       等级为：{isTemplate ? '' : totalLevel}
    </div>
    <div>
      注：A.90分以上    B.80-89     C.70-79    D.70以下
    </div>
    <div>监考者签名：</div>
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