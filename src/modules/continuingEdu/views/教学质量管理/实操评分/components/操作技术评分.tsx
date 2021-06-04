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
  baseInfo: any,
  editable?: boolean,
  onEditChange?: Function
}

export default function 操作技术评分(props: Props) {
  const {
    // questionList, 
    editable, onEditChange
  } = props

  let questionList = [
    { content: '操作者', score: 2, label: '操作前', desc: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,aaaaaaaaaa', sort: 1 },
    { content: '核对', score: 5, label: '操作前', desc: '', sort: 2 },
    { content: '评分', score: 10, label: '操作前', desc: '', sort: 3 },
    { content: '告知', score: 6, label: '操作前', desc: '', sort: 4 },
    { content: '准备', score: 8, label: '操作前', desc: '', sort: 5 },
    { content: '', score: 5, label: '实施过程', desc: '6月1日下午，广州市召开疫情防控新闻发布会。广州市卫健委副主任、新闻发言人陈斌介绍，截至5月31日24时，广州市累计报告确诊病例34例、无症状感染者8例。新增报告的12名病例均为荔湾区主动排查发现，其中密接排查发现3例、核酸大排查发现9例。', sort: 6, contentEditable: true },
    { content: '', score: 5, label: '实施过程', desc: '', sort: 7, contentEditable: true },
    { content: '', score: 5, label: '实施过程', desc: '', sort: 8, contentEditable: true },
    { content: '', score: 20, label: '实施过程', desc: '', sort: 9, contentEditable: true },
    { content: '', score: 13, label: '实施过程', desc: '呈现出区域集中性。与此前出现的病例一样，5月31日新增病例仍集中在两个重点管控区域，\n其中中南街2例、白鹤洞街10例。', sort: 10, contentEditable: true },
    { content: '', score: 5, label: '实施过程', desc: '', sort: 11, contentEditable: true },
    { content: '态度', score: 8, label: '评价', desc: '', sort: 12 },
    { content: '整体性', score: 8, label: '评价', desc: '', sort: 13 },
  ] as any[]

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