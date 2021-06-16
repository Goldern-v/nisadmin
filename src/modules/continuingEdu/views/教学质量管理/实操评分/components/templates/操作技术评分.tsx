import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Input, InputNumber } from 'antd'

const TextArea = Input.TextArea

export interface Props {
  questionList: any[],
  baseInfo: any,
  isTemplate?: boolean,
  editable?: boolean,
  onEditChange?: Function
}

export default function 操作技术评分(props: Props) {
  const {
    questionList,
    baseInfo,
    editable,
    onEditChange,
    isTemplate,
  } = props

  const minRowSpanList = [3, 3, 3, 3, 4, 4, 4, 3, 6, 2, 2, 2, 2]

  const formatList = (originList: any[]) => {
    let newList = [] as any[]
    let groupIdx = 0
    let groupLabel = null as string | null

    if (editable) {
      for (let i = 0; i < originList.length; i++) {
        let item = { ...originList[i], rowSpan: 0 }

        if (groupLabel !== item.projectProcess) {
          groupIdx = i
          groupLabel = item.projectProcess
          item.rowSpan = item.rowSpan + 1
        } else {
          newList[groupIdx].rowSpan = newList[groupIdx].rowSpan + 1
        }

        newList.push(item)
      }
    } else {
      //扣分详情每达到50个字符长度或者遇到换行符就换一行
      let descRowSizeLimit = 51

      for (let i = 0; i < originList.length; i++) {
        let item = originList[i]

        let descRow = [
          {
            value: '',
            length: 0
          }
        ] as any[]

        let descArr = item.questionContent.split('')

        for (let j = 0; j < descArr.length; j++) {
          let str = descArr[j]
          let chartLength = 1
          if (!!str.match(/[^\x00-\xff]/ig)) {
            chartLength = 2
          }

          let currentDescRow = descRow[descRow.length - 1]

          if (
            (currentDescRow.length + chartLength > descRowSizeLimit) || str === '\n'
          ) {
            descRow.push({
              value: str,
              length: chartLength
            })
          } else {
            currentDescRow.value += str
            currentDescRow.length += chartLength
          }
        }

        const appendList = descRow.map((descItem: any, descIdx: number) => {
          return {
            ...item,
            questionContent: descItem.value,
            contentRowSpan: 0,
            rowSpan: 0,
          }
        })

        //如果desc行数不够默认的行数则补充到默认的行数
        while (appendList.length < minRowSpanList[i]) {
          appendList.push({
            value: '',
            length: 0
          })
        }

        const contentRowSpan = appendList.length
        appendList[0].contentRowSpan = contentRowSpan

        let answer = appendList[0].answerList[0] || {}
        let getedScore = Number(answer?.answerContent)
        if (isNaN(getedScore)) getedScore = 0

        appendList[0].getedScore = getedScore
        appendList[0].questionScore = answer?.answerScore || 0

        if (groupLabel !== item.projectProcess) {
          groupIdx = newList.length
          groupLabel = item.projectProcess
          appendList[0].rowSpan = appendList[0].rowSpan + contentRowSpan
        } else {
          newList[groupIdx].rowSpan = newList[groupIdx].rowSpan + contentRowSpan
        }

        newList = [...newList, ...appendList]
      }
    }

    return newList
  }

  let visibleList = formatList(questionList)

  const totalQuestionScore = [0, ...visibleList]
    .reduce((perv: number, next: any) => {
      let nextVal = (next.questionScore || 0)
      if (editable) {
        nextVal = next.answerList[0]?.answerScore || 0
      }
      return perv + nextVal
    })

  const totalGetedScore = [0, ...visibleList]
    .reduce((perv: number, next: any) => {
      return perv + (next.getedScore || 0)
    })

  return <Wrapper className={editable ? 'editable' : ''}>
    {editable ? (
      <React.Fragment>
        <div className="main-title">
          <Input.TextArea
            autosize={{ minRows: 1 }}
            value={baseInfo.tableName}
            onChange={(e) => {
              onEditChange && onEditChange({
                ...baseInfo,
                tableName: e.target.value,
                questionList,
              })
            }} />
        </div>
        <div className="main-title">操作技术评分标准</div>
      </React.Fragment>
    ) : (
      <div className="main-title">{baseInfo.tableName}操作技术评分标准</div>
    )}
    <div className="sub">
      <span className="sub-title">被评价人</span>
      <span className="sub-content">{baseInfo.empName}</span>
      <span className="sub-title">科室</span>
      <span className="sub-content">{baseInfo.deptName}</span>
      <span className="sub-title">职称</span>
      <span className="sub-content">{baseInfo.title}</span>
      <span className="sub-title" style={{ marginLeft: 30 }}>考核日期</span>
      <span className="sub-content">{baseInfo.comitDate}</span>
    </div>
    <table>
      <colgroup>
        <col width="30" />
        <col width="80" />
        <col width="50" />
        <col />
        <col width="30" />
        <col width="50" />
        <col width="50" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td colSpan={2} className="align-center bold">项目</td>
          <td className="align-center bold">项目得分</td>
          <td className="bold">扣分细则</td>
          <td className="align-center bold">分值</td>
          <td className="align-center bold">实扣分</td>
          <td className="align-center bold">实得分</td>
        </tr>
        {visibleList.map((item: any, idx: number) => (
          <tr key={idx}>
            {item.rowSpan > 0 && <td rowSpan={item.rowSpan}>{item.projectProcess}</td>}
            {editable ? (
              <React.Fragment>
                {item.contentEditable ? (
                  <td className="align-center  input-cell">
                    <TextArea
                      autosize={{ minRows: minRowSpanList[idx] || 1 }}
                      value={item.subjectTypeName}
                      onChange={(e) => {

                        let newQuestionList = [...questionList]
                        newQuestionList[idx].subjectTypeName = e.target.value

                        onEditChange && onEditChange({
                          ...baseInfo,
                          questionList: newQuestionList
                        })
                      }} />
                  </td>
                ) : (
                  <td className="align-center">{item.subjectTypeName}</td>
                )}
                <td className="align-center input-cell">
                  <InputNumber
                    style={{ width: 50 }}
                    value={item.answerList[0]?.answerScore || 0}
                    onChange={(val) => {
                      let newQuestionList = [...questionList]
                      newQuestionList[idx].answerList[0].answerScore = val

                      onEditChange && onEditChange({
                        ...baseInfo,
                        questionList: newQuestionList
                      })
                    }} />
                </td>
                <td className="input-cell">
                  <TextArea
                    autosize={{ minRows: minRowSpanList[idx] || 1 }}
                    value={item.questionContent}
                    onChange={(e) => {

                      let newQuestionList = [...questionList]
                      newQuestionList[idx].questionContent = e.target.value

                      onEditChange && onEditChange({
                        ...baseInfo,
                        questionList: newQuestionList
                      })
                    }} />
                </td>
                <td className="align-center"></td>
                <td className="align-center"></td>
                <td className="align-center"></td>
              </React.Fragment>) : (<React.Fragment>
                {item.contentRowSpan > 0 && <td className="align-center" rowSpan={item.contentRowSpan}>{item.subjectTypeName}</td>}
                {item.contentRowSpan > 0 && <td className="align-center" rowSpan={item.contentRowSpan}>{item.questionScore}</td>}
                <td>{item.questionContent || <div style={{ width: 22, height: 22 }}></div>}</td>
                {item.contentRowSpan > 0 && (
                  <td
                    className="align-center"
                    rowSpan={item.contentRowSpan}>
                    {!isTemplate ? (item.getedScore) : ''}
                  </td>
                )}
                {item.contentRowSpan > 0 && (
                  <td
                    className="align-center"
                    rowSpan={item.contentRowSpan}>
                    {!isTemplate ? (item.questionScore - item.getedScore) : ''}
                  </td>
                )}
                {item.contentRowSpan > 0 && (
                  <td
                    className="align-center"
                    rowSpan={item.contentRowSpan}>
                    {!isTemplate ? (item.getedScore) : ''}
                  </td>
                )}
              </React.Fragment>)}
          </tr>
        ))}
        <tr>
          <td colSpan={2} className="align-center">总分</td>
          <td className="align-center">{totalQuestionScore}</td>
          <td style={{ textIndent: 30 }}>累计实得分</td>
          <td className="align-center"></td>
          <td colSpan={2} className="align-center">
            {(isTemplate || editable) ? '' : totalGetedScore}
          </td>
        </tr>
      </tbody>
    </table>
    <div style={{ marginTop: 10 }}>
      <span>评价人签名：</span>
      <span>{baseInfo.practicaler?.empName}</span>
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  .sub{
    vertical-align: middle;
    margin-bottom: 10px;
    .sub-title{

    }
    .sub-content{
      display: inline-block;
      min-width: 80px;
      border-bottom: 1px solid #000;
      min-height: 20px;
      vertical-align: middle;
      text-align: center;
      margin-right: 10px;
      padding: 0 10px;
    }
  }
  &.editable{
    td{
      &.input-cell{
        padding:0;
        textarea{
          resize: none;
          overflow: hidden;
          border-radius: 0;
          padding: 8 2px;
        }
      }
    }
  }
`