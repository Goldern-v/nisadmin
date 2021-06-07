import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'

export interface Props {
  questionList: any[],
  baseInfo: any,
  [p: string]: any
}

export default function 新毕业生护士工作情况调查表(props: Props) {
  const baseInfo = {
    formName: appStore.HOSPITAL_Name + '新毕业生护士工作情况调查表',
    empName: 'abc',
    pinfenEmpName: 'def',
    submitTime: '2021-5-13',
    wardName: '测试科室',
  }

  const questionList = [
    {
      label: '',
      desc: '对病人、家属、同事经常面带微笑。主动向患者及患者家属介绍自己，在进入病人房间时先敲门，对病人有问候。',
      currentScore: 5,
      sort: 1,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: true },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '在移动病人或接触病人时，动作轻柔，尊重患者主述。在进行各项护理操作前，向患者解释清楚该操作的目的，及患者需要配合的事项。',
      currentScore: 4,
      sort: 2,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: true },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '在护理操作过程中注意保护患者隐私，在与患者沟通过程中用语适当，并能选择恰当的词语和语调来体现你的尊重。',
      currentScore: 3,
      sort: 3,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: true },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '对待同事谦恭，有团结合作意识。',
      currentScore: 2,
      sort: 4,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: true },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '在接听电话时使用文明礼貌用语，用愉悦的声音，耐心倾听对方的诉说，带着帮助的口吻。',
      currentScore: 1,
      sort: 5,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: true },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '在仪表和着装上体现职业形象。',
      currentScore: 5,
      sort: 6,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: true },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '在所有护理操作中都体现出“三轻”。',
      currentScore: 4,
      sort: 7,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: true },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '积极参加科室及实习生小讲课、技能培训、教学查房和病例讨论。',
      currentScore: 3,
      sort: 8,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: true },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '学习态度端正，充分利用业余时间学习业务知识，提高业务水平。',
      currentScore: 2,
      sort: 9,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: true },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '能够将理论知识运用于护理工作中，遇到不懂问题能虚心请教上级护士',
      currentScore: 1,
      sort: 10,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: true },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '虚心接受护士长和同事的指导和建议，认真改进，有改进效果。',
      currentScore: 5,
      sort: 11,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: true },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '工作认真，不迟到、不早退，谦恭、合作、帮助同事',
      currentScore: 4,
      sort: 12,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: true },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '对病人或同事需求能迅速做出反应，帮助解决非你工作职责范围内的问题，或帮他们找到能解决问题的人',
      currentScore: 3,
      sort: 13,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: true },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '服从医院、护理部及科室的各种安排。',
      currentScore: 2,
      sort: 14,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: true },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '有着积极生活态度和工作态度，团队协作精神强，有良好工作习惯。',
      currentScore: 1,
      sort: 15,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: true },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '与人和谐相处，善于与人沟通，形成良好人际关系。',
      currentScore: 5,
      sort: 16,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: true },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '具有良好的个人习惯，能将五常法管理运用于实际工作中，做事前准备充分，事后及时清理补充',
      currentScore: 4,
      sort: 17,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: true },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '工作计划性强，有较高工作效率，工作效果较好。',
      currentScore: 3,
      sort: 18,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: true },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '能够正确评价自己，学会做事。',
      currentScore: 2,
      sort: 19,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: true },
        { content: '1', score: 1, sort: 5, isSelected: false },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '',
      desc: '能自我调节压力，控制情绪',
      currentScore: 1,
      sort: 20,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: true },
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
  ] as any[]

  const totalScore = [0, ...questionList]
    .reduce((pre: number, next: any) => {
      return pre + next.currentScore || 0
    })

  return <Wrapper>
    <div className="main-title">{baseInfo.formName}</div>
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
            <td>{questionItem.desc}</td>
            {[0, 1, 2, 3, 4, 5].map((idx2: number) => (
              <td
                key={`answer-${idx1}-${idx2}`}
                className={questionItem.answers[idx2]?.isSelected ? 'selected' : ''}></td>
            ))}
          </tr>
        ))}
        <tr>
          <td colSpan={2} className="align-center">最后得分</td>
          <td className="align-center" colSpan={6}>{totalScore}</td>
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