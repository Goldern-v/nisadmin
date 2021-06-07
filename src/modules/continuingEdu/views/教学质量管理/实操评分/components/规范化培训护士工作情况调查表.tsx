import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'

export interface Props {
  questionList: any[],
  baseInfo: any,
  [p: string]: any
}

export default function 规范化培训护士工作情况调查表(props: Props) {
  const baseInfo = {
    formName: appStore.HOSPITAL_Name + '规范化培训护士工作情况调查表',
    empName: 'abc',
    pinfenEmpName: 'def',
    submitTime: '2021-5-13',
    wardName: '测试科室',
  }

  const questionList = [
    {
      label: '工作态度合作精神',
      desc: '1.工作认真，态度谦虚，能正确评价自己，学会做事做人，能体谅同事，同事之间搭班工作愉快，在同事中有较好的口碑，有良好的人际关系',
      currentScore: 5,
      sort: 1,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: true },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '工作态度合作精神',
      desc: '2.主动帮助同事或科室完成本职工作以外的配合工作，参与科室质量管理',
      currentScore: 4,
      sort: 2,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: true },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '工作态度合作精神',
      desc: '3.有自我管理的意识，能控制情绪，自我调节压力，不把情绪带到工作中',
      currentScore: 3,
      sort: 3,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: true },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '工作态度合作精神',
      desc: '4.服从科室护长及组长的安排，对上级护士提出的问题或建议虚心接受，并积极改进，有改进效果',
      currentScore: 2,
      sort: 4,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: true },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '工作态度合作精神',
      desc: '5.有良好的工作习惯，对工作有计划性，有较高的工作效率，能在班上完成分配的工作量,积极参加科室组织的活动',
      currentScore: 1,
      sort: 5,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: true },
      ]
    },
    {
      label: '工作态度合作精神',
      desc: '6.有良好的个人习惯，善于运用五常法，做事充分准备，事后及时清理补充',
      currentScore: 5,
      sort: 6,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: true },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '工作态度合作精神',
      desc: '7.对待病人、家属、同事、来访人员等或接听电话时态度温和、有礼',
      currentScore: 4,
      sort: 7,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: true },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '学习能力',
      desc: '8.学习态度端正，主动参加科室、医院组织的业务学习、技能培训',
      currentScore: 3,
      sort: 8,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: true },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '学习能力',
      desc: '9.参与科室教学查房、病历讨论等积极提出自己的见解或观点',
      currentScore: 2,
      sort: 9,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: true },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '学习能力',
      desc: '10.乐于学习，接受新理论新观点主动与护士长或同事进行分享',
      currentScore: 1,
      sort: 10,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: true },
      ]
    },
    {
      label: '学习能力',
      desc: '11.参与科室的业务管理工作、对科室工作提出建设性意见',
      currentScore: 5,
      sort: 11,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: true },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '学习能力',
      desc: '12.对工作有评判思维，有一定的分析、判断能力',
      currentScore: 4,
      sort: 12,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: true },
        { content: '3', score: 3, sort: 3, isSelected: false },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '专业技术能力',
      desc: '13.具有独立管床能力，遵循护理工作核心制度，独立完成工作，不拖班',
      currentScore: 3,
      sort: 13,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: true },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
    {
      label: '专业技术能力',
      desc: '13.具有独立管床能力，遵循护理工作核心制度，独立完成工作，不拖班',
      currentScore: 3,
      sort: 13,
      questionType: 1,
      answers: [
        { content: '5', score: 5, sort: 1, isSelected: false },
        { content: '4', score: 4, sort: 2, isSelected: false },
        { content: '3', score: 3, sort: 3, isSelected: true },
        { content: '2', score: 2, sort: 4, isSelected: false },
        { content: '1', score: 1, sort: 5, isSelected: false },
      ]
    },
  ]

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
      <tbody></tbody>
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