import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Spin } from 'antd'
import { ScrollBox } from 'src/components/common'
import 操作技术评分 from './操作技术评分'
import { evalTypeGroup } from '../data/evalType'
import { teachingQualityEvalService } from './../services/TeachingQualityEvalService'
import moment from 'moment'

export interface Props {
  visible: boolean,
  editable?: boolean,
  onCancel: Function,
  params: any
}

export default function TeachingQualityEvalForm(props: Props) {
  const { visible, onCancel, params } = props

  const [data, setData] = useState({} as any)

  const questionList = data.questionList || []

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (visible) getData()
  }, [visible])

  const getData = () => {
    // setLoading(true)
    setData({
      questionList: [
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
      ]
    })
  }

  const formContent = () => {
    let Template: (props: any) => JSX.Element = () => <span></span>

    Template = 操作技术评分

    return <PageWrapper>
      <Template
        questionList={questionList}
        onEditChange={(payload: any) => setData(payload)}
        editable={true}
        baseInfo={data} />
    </PageWrapper>
  }

  return <Modal
    title="评教调查表"
    visible={visible}
    centered
    bodyStyle={{ padding: 0 }}
    width={840}
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
  background: #ddd;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .loading-content{
    width: 100%;
    height: 500px;
  }
`

const PageWrapper = styled.div`
  background: #fff;
  margin: 30px auto;
  width: 740px;
  min-height: 1040px;
  padding: 30px;
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
    word-break: break-all;
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
    &.bold{
      font-weight: bold;
    }
  }
  .main-title{
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
