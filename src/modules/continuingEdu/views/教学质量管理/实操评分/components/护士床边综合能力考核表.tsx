import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'

export interface Props {
  questionList: any[],
  baseInfo: any,
  [p: string]: any
}

export default function 护士床边综合能力考核表(props: Props) {
  const baseInfo = {
    formName: appStore.HOSPITAL_ID + '护士床边综合能力考核表',
    empName: 'abc',
    pinfenEmpName: 'def',
    wardName: '测试科室',
  }

  const questionList = [
    {
      label: '护理评估',
      desc: '1.病史采集全面（包括主诉，现病史，医疗诊断，治疗，辅助检查）',
      currentScore: 4,
      sort: 1,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: true },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理评估',
      desc: '2.系统的有针对性的收集相关的资料(包括学习需求）',
      currentScore: 3,
      sort: 2,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: true },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理评估',
      desc: '3.良好的交流技巧',
      currentScore: 2,
      sort: 3,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: true },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理评估',
      desc: '4.敏锐的观察力',
      currentScore: 1,
      sort: 4,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: true },
      ]
    },
    {
      label: '护理评估',
      desc: '5.护理体检方法恰当，熟练',
      currentScore: 4,
      sort: 5,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: true },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理评估',
      desc: '6.资料，组织层次分明，重点突出',
      currentScore: 3,
      sort: 6,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: true },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理评估',
      desc: '7.汇报病史语言使用恰当，有针对性',
      currentScore: 2,
      sort: 7,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: true },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理问题关键点',
      desc: '8.护理问题/关键点符合病情',
      currentScore: 1,
      sort: 8,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: true },
      ]
    },
    {
      label: '护理问题关键点',
      desc: '9.护理问题相关因素明确',
      currentScore: 4,
      sort: 9,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: true },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理问题关键点',
      desc: '10.护理问题排序合理',
      currentScore: 3,
      sort: 10,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: true },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理问题关键点',
      desc: '11.体现个体差异，动态性和阶段性',
      currentScore: 2,
      sort: 11,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: true },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理计划措施',
      desc: '12.按病人问题的轻重缓解排列护理措施的要点',
      currentScore: 1,
      sort: 12,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: true },
      ]
    },
    {
      label: '护理计划措施',
      desc: '13.措施有针对，可操作性',
      currentScore: 4,
      sort: 13,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: true },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理计划措施',
      desc: '14.病人教育符合病人需要',
      currentScore: 3,
      sort: 14,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: true },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理计划措施',
      desc: '15.病人教育恰当有效',
      currentScore: 2,
      sort: 15,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: true },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理评价',
      desc: '16.护理措施有效（包括平时）',
      currentScore: 1,
      sort: 16,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: true },
      ]
    },
    {
      label: '护理评价',
      desc: '17.评价目标有针对性',
      currentScore: 4,
      sort: 17,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: true },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理操作',
      desc: '18.准备工作充分（用物及自身）',
      currentScore: 3,
      sort: 18,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: true },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理操作',
      desc: '19.操作规范不违反原则和无菌操作',
      currentScore: 2,
      sort: 19,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: true },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理操作',
      desc: '20.操作熟练有效',
      currentScore: 1,
      sort: 20,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: true },
      ]
    },
    {
      label: '护理操作',
      desc: '21.态度认真，关心爱护病人，用物处理正确',
      currentScore: 4,
      sort: 21,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: true },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '护理操作',
      desc: '22.熟悉相关理论知识',
      currentScore: 3,
      sort: 22,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: true },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '理论知识',
      desc: '23.病人突发变化的处理（实际存在或假设）',
      currentScore: 2,
      sort: 23,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: true },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
    {
      label: '理论知识',
      desc: '24.生理病理分析病历',
      currentScore: 1,
      sort: 24,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: false },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: true },
      ]
    },
    {
      label: '理论知识',
      desc: '25.药物药理学知识与使用注意事项',
      currentScore: 4,
      sort: 25,
      questionType: 1, answers: [
        { content: '4', score: 4, sort: 1, isSelected: true },
        { content: '3', score: 3, sort: 2, isSelected: false },
        { content: '2', score: 2, sort: 3, isSelected: false },
        { content: '1', score: 1, sort: 4, isSelected: false },
      ]
    },
  ]

  const formatQuestionList = (originList: any[]) => {
    let groupObj = {} as any
    let choiceQuestionList = originList.filter((item: any) => item.questionType === 1)

    for (let i = 0; i < choiceQuestionList.length; i++) {
      let item = choiceQuestionList[i]
      if (!groupObj[item.label]) {
        groupObj[item.label] = {
          scoreTotal: 4,
          scoreGeted: item.currentScore,
          label: item.label,
          kouFenReason: '',
          remark: '',
          children: [item]
        }
      } else {
        groupObj[item.label].scoreTotal += 4
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
    <div className="main-title">{baseInfo.formName}</div>
    <div className="sub">
      <span>被评价人：</span>
      <span className="sub-content">{baseInfo.empName}</span>
      <span>科室：</span>
      <span className="sub-content">{baseInfo.wardName}</span>
      <span>评价人：</span>
      <span className="sub-content">{baseInfo.pinfenEmpName}</span>
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
          return <React.Fragment>
            {groupItem.children.map((questionItem: any, idx1: number) => (
              <tr key={`question-${idx}-${idx1}`}>
                {idx1 === 0 && (
                  <React.Fragment>
                    <td
                      className="align-center"
                      rowSpan={groupItem.children.length}>
                      {groupItem.label}
                    </td>
                    <td
                      className="align-center"
                      rowSpan={groupItem.children.length}>
                      {groupItem.scoreTotal}
                    </td>
                  </React.Fragment>
                )}
                <td>{questionItem.desc}</td>
                {[0, 1, 2, 3].map((idx2: number) => (
                  <td
                    className={[
                      'align-center',
                      questionItem.answers[idx2]?.isSelected ? 'selected' : ''
                    ].join(' ')}>
                    {questionItem.answers[idx2]?.content || ''}
                  </td>
                ))}
                {idx1 === 0 && (
                  <React.Fragment>
                    <td rowSpan={groupItem.children.length}>{groupItem.scroreGeted}</td>
                    <td rowSpan={groupItem.children.length}>{groupItem.kouFenReason}</td>
                    <td rowSpan={groupItem.children.length}>{groupItem.remark}</td>
                  </React.Fragment>
                )}
              </tr>
            ))}
          </React.Fragment>
        })}
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