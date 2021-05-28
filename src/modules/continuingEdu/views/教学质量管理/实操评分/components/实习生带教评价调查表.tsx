import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'
import { Place } from 'src/components/common'

export interface Props {
  formName: string,
  questionList: any[],
  submitTime: string,
}

export default function 实习生带教评价调查表(props: Props) {
  const { formName, questionList, submitTime } = props

  const extraRowName = ['最满意的带教老师有：', '不满意的带教老师有：', '对教学工作的意见和建议：']

  const baseList = questionList.filter((item) => extraRowName.indexOf(item.questionContent) < 0)
  const extraList = questionList.filter((item) => extraRowName.indexOf(item.questionContent) >= 0)

  return <table>
    <colgroup>
      <col width="50" />
      <col />
      <col width="80" />
      <col width="80" />
      <col width="80" />
      <col width="80" />
    </colgroup>
    <tbody>
      <tr>
        <td colSpan={6} className="hospital-name">{appStore.HOSPITAL_Name}</td>
      </tr>
      <tr>
        <td colSpan={6} className="form-name">{formName}</td>
      </tr>
      <tr>
        <td colSpan={6}>
          <div className="flex-row">
            <span>评教科室：</span>
            <Place />
            <span>{submitTime}</span>
          </div>
        </td>
      </tr>
      <tr>
        <td className="align-center">序号</td>
        <td className="align-center">内容</td>
        <td colSpan={4} className="align-center">评价</td>
      </tr>
      {baseList.map((item: any, index: number) => <tr key={`base-item-${index}`}>
        <td className="align-center">{index + 1}</td>
        <td>{item.questionContent}</td>
        {((answerList: any[]) => {
          let maxRow = 4
          let currentRow = 1
          let currentIdx = 0
          let tds = []
          while (currentRow <= maxRow) {
            let target = answerList[currentIdx]
            let tdKey = `answer-item-${index}-${currentIdx}`

            if (target)
              tds.push(<td
                colSpan={target.colSpan || 1}
                className={target.isSelected ? 'selected' : ''}
                key={tdKey}>
                {currentIdx + 1}.{target.optionContent}
              </td>)
            else
              tds.push(<td key={tdKey}></td>)

            currentRow += target ? (target.colSpan || 1) : 1
            currentIdx++
          }
          return tds
        })(item.answerList)}
      </tr>)}
      {extraList.map((item: any, index: number) => <tr
        key={`extra-item-${index}`}>
        <td
          colSpan={6}>
          {item.questionContent}{(item.answerList || [])[0]?.answerContent || ''}
        </td>
      </tr>)}
    </tbody>
  </table>
}