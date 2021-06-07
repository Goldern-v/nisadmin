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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
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
        { content: '0', score: 0, sort: 6, isSelected: false },
      ]
    },
    {
      label: '专业技术能力',
      desc: '14.熟练掌握科室常用护理操作技术及常用仪器的使用方法,掌握基本生命支持技术、熟练使用科室监护仪的急救仪器',
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
      label: '专业技术能力',
      desc: '15.掌握护理病历的书写，对护理病历内容进行一级质控',
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
      label: '专业技术能力',
      desc: '16.掌握科室高危药物、基本急救药物的药理知识及常见用法',
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
      label: '专业技术能力',
      desc: '17.掌握医院感控知识，如垃圾分类、防护措施、职业暴露处理流程等',
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
      label: '专业技术能力',
      desc: '18.有安全意识，掌握科室高危环节、高危药物、高危患者的范畴熟练处理危急值报告，对科室突发事件及时反应、作出处理及上报',
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
      label: '专业技术能力',
      desc: '19.掌握常用的评估方法，如对患者从头到脚趾式的健康评估及心理评估等',
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
      label: '专业技术能力',
      desc: '20.遇到重大抢救时，能协调并配合医生快速实施抢救',
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
  ]

  const formatQuestionList = (originList: any[]) => {
    let groupObj = {} as any
    let scoreQuestionList = originList.filter((item: any) => item.questionType === 1)

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
                {idx1 === 0 && <td className="align-center bold" rowSpan={groupItem.children.length}>{groupItem.label}</td>}
                <td>{questionItem.desc}</td>
                {[0, 1, 2, 3, 4, 5].map((idx2: number) => (
                  <td
                    key={`answer-${idx}-${idx1}-${idx2}`}
                    className={questionItem.answers[idx2]?.isSelected ? 'selected' : ''}></td>
                ))}
              </tr>
            ))}
          </React.Fragment>
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