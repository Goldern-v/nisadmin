import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Spin } from 'antd'
import { ScrollBox } from 'src/components/common'
import 实习生带教评价调查表 from './实习生带教评价调查表'
import 规培生带教评价调查表 from './规培生带教评价调查表'
import 临床护理教学质量督导调查表 from './临床护理教学质量督导调查表'
import { evalTypeGroup } from '../data/evalType'
import { teachingQualityEvalService } from './../services/TeachingQualityEvalService'
import moment from 'moment'

export interface Props {
  visible: boolean,
  onCancel: Function,
  params: any
}

export default function TeachingQualityEvalForm(props: Props) {
  const { visible, onCancel, params } = props

  const [data, setData] = useState({} as any)

  const questionList = data.questionList || []

  const [loading, setLoading] = useState(false)

  const submitTime = params.submitTime ? moment(params.submitTime).format('YYYY-MM-DD') : ''

  useEffect(() => {
    if (visible) getData()
  }, [visible])

  const getData = () => {
    setLoading(true)
    setData({})

    teachingQualityEvalService
      .getEvalFormOfSomeOne({
        evalPlanId: params.evalPlanId,
        empNo: params.empNo
      })
      .then((res) => {
        setLoading(false)
        if (res.data)
          setData(formatData(res.data))

      }, () => setLoading(false))
  }

  const formatData = (orginData: any) => {
    if (orginData.evalType === '3') {
      /**分数列 */
      let answerOptionGroup = {} as any

      orginData.subjectInfo.answerOptionList.forEach((item: any) => {

        if (!isNaN(item.scores))
          answerOptionGroup[`answerOption_${item.scores.toString()}`] = {
            ...item,
          }
      })

      let questionList = [] as any[]

      for (let i = 0; i < (orginData.subjectInfo.subjectList || []).length; i++) {
        let item0 = orginData.subjectInfo.subjectList[i]

        let itemQustionList = item0.questionList || []

        for (let j = 0; j < itemQustionList.length; j++) {
          let item1 = itemQustionList[j]

          let answerGroup = {} as any

          item1.answerList.forEach((awnser: any) => {
            if (!isNaN(awnser.scores)) answerGroup[`answerOption_${awnser.scores}`] = {
              ...awnser
            }
          })

          questionList.push({
            ...item1,
            subjectName: item0.subjectName,
            subjectNameRowSpan: j === 0 ? itemQustionList.length : 0,
            answerGroup,
          })
        }
      }

      let formattedData = {
        ...orginData,
        answerOptionGroup,
        questionList,
      }

      return formattedData
    } else {
      return { ...orginData }
    }
  }

  const formName = () => {
    return data.evalType ? evalTypeGroup[data.evalType as string]?.formName : ''
  }

  const formContent = () => {
    let Template: (props: any) => JSX.Element = () => <span></span>

    if (data.evalType === '1')
      Template = 实习生带教评价调查表

    if (data.evalType === '2')
      Template = 规培生带教评价调查表

    if (data.evalType === '3')
      Template = 临床护理教学质量督导调查表

    return <Template
      questionList={questionList}
      formName={formName()}
      submitTime={submitTime}
      baseInfo={data} />
  }

  return <Modal
    title="评教调查表"
    visible={visible}
    centered
    width={800}
    footer={null}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Spin spinning={loading}>
        {!loading && formContent()}
        {loading && <div className="loading-content"></div>}
      </Spin>
    </Wrapper>
  </Modal>
}

// @ts-ignore
const Wrapper = styled(ScrollBox)`
  .loading-content{
    width: 100%;
    height: 500px;
  }
  table{
    width: 100%;
    border-collapse: collapse;
    border-color: #000;
  }
  td,th{
    text-align: left;
    line-height: 20px;
    font-size: 14px;
    color: #000;
    padding: 0;
    border: 1px #000 solid;
    padding: 2px 8px;
    &.selected{
      position: relative;
      &::after{
        content: '√';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: -4px;
        color: #000;
        font-size: 30px;
        transform: translateY(-50%);
      }
    }
    &.align-center{
      text-align: center;
    }
    &.small-font-size{
      font-size: 12px;
    }
  }
  .hospital-name{
    line-height: 45px;
    font-size: 20px;
    font-weight: bold;
    color: #000;
    letter-spacing: 5px;
    text-align: center;
  }
  .form-name{
    letter-spacing: 1px;
    font-weight: bold;
    color: #000;
    text-align: center;
  }
  .flex-row{
    display: flex;
  }
`
