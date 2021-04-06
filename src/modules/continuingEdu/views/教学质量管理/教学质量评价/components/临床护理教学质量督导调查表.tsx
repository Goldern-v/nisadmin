import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'
import { Place } from 'src/components/common'

export interface Props {
  formName: string,
  questionList: any[],
  submitTime: string,
  baseInfo: any,
}

export default function 临床护理教学质量督导调查表(props: Props) {
  const { formName, questionList, submitTime, baseInfo } = props

  const awnserOptions = baseInfo.answerOptionGroup

  let baseColSize = 4
  const scoreCols = Object.keys(awnserOptions || {})
  const totalColSize = baseColSize + scoreCols.length

  return <table>
    <colgroup>
      <col width="50" />
      <col width="60" />
      <col width="210" />
      {scoreCols.map((key: string) => (<col width="60" />))}
    </colgroup>
    <tbody>
      <tr>
        <td colSpan={totalColSize} className="hospital-name">{appStore.HOSPITAL_Name}</td>
      </tr>
      <tr>
        <td colSpan={totalColSize} className="form-name">{formName}</td>
      </tr>
      <tr>
        <td colSpan={totalColSize}>
          <div className="flex-row">
            <span>评教科室：</span>
            <Place />
            <span>{submitTime}</span>
          </div>
        </td>
      </tr>
      <tr>
        <td rowSpan={2} className="align-center">序号</td>
        <td rowSpan={2} className="align-center">项目</td>
        <td rowSpan={2} className="align-center">巡查内容</td>
        <td colSpan={scoreCols.length + 1} className="align-center">检查结果</td>
      </tr>
      <tr>
        {scoreCols.map((key: string) => (
          <td
            key={key}
            className="align-center">
            {awnserOptions[key].scores === 0 ?
              awnserOptions[key].optionContent :
              awnserOptions[key].scores}
          </td>
        ))}
        <td className="align-center">备注</td>
      </tr>
      {questionList.map((item: any, idx: number) => <tr key={idx}>
        <td className="align-center">{idx + 1}</td>
        {item.subjectNameRowSpan > 0 && (
          <td
            rowSpan={item.subjectNameRowSpan}
            className="align-center">
            {item.subjectName}
          </td>
        )}
        <td className="small-font-size">{item.questionContent}</td>
        {scoreCols.map((key: string) => (
          <td
            key={`${idx}-${key}`}
            className="align-center">
            {(item.answerGroup[key]?.isSelected) ? '√' : ''}
          </td>
        ))}
        <td>{item.answerRemark}</td>
      </tr>)}
      <tr>
        <td colSpan={3}>检查人姓名：</td>
        <td colSpan={totalColSize - 3}> 科室负责人签名：</td>
      </tr>
      <tr>
        <td colSpan={totalColSize}>备注说明：</td>
      </tr>
      <tr>
        <td colSpan={totalColSize} className="small-font-size">
          <div>1：此表主要用于护理教学质量巡查。</div>
          <div>2：评分共5个等级，请在相应分数栏内打√。 如该科室不需要或因不可抗的因素而无法执行该  检查项目时，请勾选“不适用”</div>
          <div>3.分值估算方法：5分：完全符合  4分：大部分符合 3分：半数符合 2分：少于半数符合  1分：仅有少数符合</div>
          <div>4.对个别项目执行情况需做详细说明是请在备注栏注明</div>
        </td>
      </tr>
    </tbody>
  </table>
}