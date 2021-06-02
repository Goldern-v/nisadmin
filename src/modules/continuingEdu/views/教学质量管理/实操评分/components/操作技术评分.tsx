import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Input, InputNumber } from 'antd'
import { Place } from 'src/components/common'
import { appStore } from 'src/stores'
import BaseInfo from 'src/modules/nurseFiles/view/nurseFiles-hj/views/exportNurseFile/page/BaseInfo'
import { Span } from '../../../trainingSetting/formApply/modal/formCommon/common'

const TextArea = Input.TextArea

export interface Props {
  questionList: any[],
  editable?: boolean,
  baseInfo: any,
  onEditChange?: Function
}

export default function 操作技术评分(props: Props) {
  const { questionList, editable, onEditChange } = props

  const minRowSpanList = [3, 3, 3, 3, 4, 4, 4, 3, 6, 2, 2, 2, 2]

  const formatList = (originList: any[]) => {
    let newList = [] as any[]
    let groupIdx = 0
    let groupLabel = ''

    if (editable) {
      for (let i = 0; i < originList.length; i++) {
        let item = { ...originList[i], rowSpan: 0 }

        if (groupLabel !== item.label) {
          groupIdx = i
          groupLabel = item.label
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
        let descArr = item.desc.split('')

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
            desc: descItem.value,
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

        if (groupLabel !== item.label) {
          groupIdx = newList.length
          groupLabel = item.label
          appendList[0].rowSpan = appendList[0].rowSpan + contentRowSpan
        } else {
          newList[groupIdx].rowSpan = newList[groupIdx].rowSpan + contentRowSpan
        }

        newList = [...newList, ...appendList]
      }
    }

    console.log(newList)

    return newList
  }

  let visibleList = formatList(questionList)

  const totalQuestionScore = [0, ...visibleList]
    .reduce((perv: number, next: any) => {
      return perv + next.score || 0
    })

  return <Wrapper className={editable ? 'editable' : ''}>
    <div className="main-title">操作技术评分标准</div>
    <div className="main-title">操作技术评分标准</div>
    <div className="sub">
      <span className="sub-title">被评价人</span>
      <span className="sub-content"></span>
      <span className="sub-title">科室</span>
      <span className="sub-content"></span>
      <span className="sub-title">职称</span>
      <span className="sub-content"></span>
      <span className="sub-title" style={{ marginLeft: 30 }}>考核日期</span>
      <span className="sub-content"></span>
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
            {item.rowSpan > 0 && <td rowSpan={item.rowSpan}>{item.label}</td>}
            {editable ? (
              <React.Fragment>
                {item.contentEditable ? (
                  <td className="align-center  input-cell">
                    <TextArea
                      autosize={{ minRows: minRowSpanList[idx] || 1 }}
                      value={item.content}
                      onChange={(e) => {

                        let newQuestionList = [...questionList]
                        newQuestionList[idx].content = e.target.value

                        onEditChange && onEditChange({
                          ...BaseInfo,
                          questionList: newQuestionList
                        })
                      }} />
                  </td>
                ) : (
                  <td className="align-center">{item.content}</td>
                )}
                <td className="align-center input-cell">
                  <InputNumber
                    style={{ width: 50 }}
                    value={item.score}
                    onChange={(val) => {
                      let newQuestionList = [...questionList]
                      newQuestionList[idx].score = val

                      onEditChange && onEditChange({
                        ...BaseInfo,
                        questionList: newQuestionList
                      })
                    }} />
                </td>
                <td className="input-cell">
                  <TextArea
                    autosize={{ minRows: minRowSpanList[idx] || 1 }}
                    value={item.desc}
                    onChange={(e) => {

                      let newQuestionList = [...questionList]
                      newQuestionList[idx].desc = e.target.value

                      onEditChange && onEditChange({
                        ...BaseInfo,
                        questionList: newQuestionList
                      })
                    }} />
                </td>
                <td className="align-center"></td>
                <td className="align-center"></td>
                <td className="align-center"></td>
              </React.Fragment>) : (<React.Fragment>
                {item.contentRowSpan > 0 && <td className="align-center" rowSpan={item.contentRowSpan}>{item.content}</td>}
                {item.contentRowSpan > 0 && <td className="align-center" rowSpan={item.contentRowSpan}>{item.score}</td>}
                <td>{item.desc || <div style={{ width: 22, height: 22 }}></div>}</td>
                {item.contentRowSpan > 0 && <td className="align-center" rowSpan={item.contentRowSpan}></td>}
                {item.contentRowSpan > 0 && <td className="align-center" rowSpan={item.contentRowSpan}></td>}
                {item.contentRowSpan > 0 && <td className="align-center" rowSpan={item.contentRowSpan}></td>}
              </React.Fragment>)}
          </tr>
        ))}
        <tr>
          <td colSpan={2} className="align-center">总分</td>
          <td className="align-center">{totalQuestionScore}</td>
          <td style={{ textIndent: 30 }}>累计实得分</td>
          <td className="align-center"></td>
          <td colSpan={2} ></td>
        </tr>
      </tbody>
    </table>
  </Wrapper>
}

const Wrapper = styled.div`
  .sub{
    vertical-align: middle;
    .sub-title{

    }
    .sub-content{
      display: inline-block;
      min-width: 80px;
      border-bottom: 1px solid #000;
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