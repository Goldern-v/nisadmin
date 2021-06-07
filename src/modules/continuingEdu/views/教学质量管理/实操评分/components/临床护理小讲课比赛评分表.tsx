import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'

export interface Props {
  questionList: any[],
  baseInfo: any,
  [p: string]: any
}


export default function 临床护理小讲课比赛评分表(props: Props) {
  const baseInfo = {
    formName: '临床护理小讲课比赛评分表',
    empName: 'abc',
    pinfenEmpName: 'def',
    submitTime: '2021-5-13',
    wardName: '测试科室',
  }

  const questionList = [
    {
      label: '教学性',
      desc: '准备充分，教案完整',
      currentScore: 1,
      questionScore: 5,
      sort: 1,
      questionType: 5,
      answers: []
    },
    {
      label: '教学性',
      desc: '教学内容安排合理',
      currentScore: 3,
      questionScore: 5,
      sort: 2,
      questionType: 5,
      answers: []
    },
    {
      label: '教学性',
      desc: '联系实际，重视临床效果',
      currentScore: 5,
      questionScore: 5,
      sort: 3,
      questionType: 5,
      answers: []
    },
    {
      label: '科学性',
      desc: '教学目的明确',
      currentScore: 1,
      questionScore: 5,
      sort: 4,
      questionType: 5,
      answers: []
    },
    {
      label: '科学性',
      desc: '观点正确，概念准确，步骤有序',
      currentScore: 3,
      questionScore: 10,
      sort: 5,
      questionType: 5,
      answers: []
    },
    {
      label: '科学性',
      desc: '紧扣专业、指导性强',
      currentScore: 5,
      questionScore: 10,
      sort: 6,
      questionType: 5,
      answers: []
    },
    {
      label: '科学性',
      desc: '善于处理教材，能突出重点，讲清难点',
      currentScore: 8,
      questionScore: 10,
      sort: 7,
      questionType: 5,
      answers: []
    },
    {
      label: '创造性',
      desc: '信息丰富，能反映该学科发展的新成果',
      currentScore: 1,
      questionScore: 5,
      sort: 8,
      questionType: 5,
      answers: []
    },
    {
      label: '创造性',
      desc: '讲课过程中有讲述，有分析，有自己的观点',
      currentScore: 3,
      questionScore: 5,
      sort: 9,
      questionType: 5,
      answers: []
    },
    {
      label: '创造性',
      desc: '教学方法灵活，富于启发性',
      currentScore: 5,
      questionScore: 5,
      sort: 10,
      questionType: 5,
      answers: []
    },
    {
      label: '艺术性',
      desc: '普通话标准、口齿清楚、表述生动形象',
      currentScore: 5,
      questionScore: 5,
      sort: 11,
      questionType: 5,
      answers: []
    },
    {
      label: '艺术性',
      desc: '普态度认真、仪表端庄',
      currentScore: 1,
      questionScore: 5,
      sort: 12,
      questionType: 5,
      answers: []
    },
    {
      label: '教育技术',
      desc: '合理运用现代教育技术手段',
      currentScore: 3,
      questionScore: 5,
      sort: 13,
      questionType: 5,
      answers: []
    },
    {
      label: '教学效果',
      desc: '师生互动性好，气氛活跃',
      currentScore: 5,
      questionScore: 5,
      sort: 14,
      questionType: 5,
      answers: []
    },
    {
      label: '教学效果',
      desc: '对知识点的讲解深入浅出，讲解透彻，思路清晰、逻辑性强',
      currentScore: 5,
      questionScore: 10,
      sort: 15,
      questionType: 5,
      answers: []
    },
    {
      label: '时间控制',
      desc: '时间少于9分钟及超过1分钟扣2分',
      currentScore: 3,
      questionScore: 10,
      sort: 16,
      questionType: 5,
      answers: []
    },
  ]

  const formatQuestionList = (originList: any[]) => {
    let groupObj = {} as any
    let scoreQuestionList = originList.filter((item: any) => item.questionType === 5)

    for (let i = 0; i < scoreQuestionList.length; i++) {
      let item = scoreQuestionList[i]
      if (!groupObj[item.label]) {
        groupObj[item.label] = {
          scoreGeted: item.currentScore,
          label: item.label,
          children: [item]
        }
      } else {
        groupObj[item.label].scoreGeted += item.currentScore
        groupObj[item.label].children.push(item)
      }
    }

    return Object.keys(groupObj).map((label) => groupObj[label])
  }

  const tableGroups = formatQuestionList(questionList)

  const totalScore = [0, ...tableGroups]
    .reduce((pre: number, next: any) => {
      return pre + next.scoreGeted || 0
    })

  return <Wrapper>
    <div className="main-title">临床护理小讲课比赛评分表</div>
    <div className="sub">
      <span>评价时间：</span>
      <span className="sub-content">{baseInfo.submitTime}</span>
      <span>被评价人：</span>
      <span className="sub-content">{baseInfo.empName}</span>
      <span>科室：</span>
      <span className="sub-content">{baseInfo.wardName}</span>
      <span>评价人：</span>
      <span className="sub-content">{baseInfo.pinfenEmpName}</span>
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
                {idx1 === 0 && <td className="align-center" rowSpan={groupItem.children.length}>{groupItem.label}</td>}
                <td>{questionItem.desc}</td>
                <td className="align-center">{questionItem.questionScore}</td>
                <td className="align-center">{questionItem.currentScore}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
        <tr>
          <td colSpan={3} className="align-center bold">合计</td>
          <td className="align-center">{totalScore}</td>
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