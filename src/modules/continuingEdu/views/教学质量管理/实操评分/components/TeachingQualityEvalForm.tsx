import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Spin } from 'antd'
import { ScrollBox } from 'src/components/common'
import 操作技术评分 from './操作技术评分'
import 个案护理发表评分表 from './个案护理发表评分表'
import 护士床边综合能力考核表 from './护士床边综合能力考核表'
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
    setData([])
  }

  const formContent = () => {
    let Template: (props: any) => JSX.Element = () => <span></span>

    Template = 护士床边综合能力考核表

    return <PageWrapper>
      <Template
        questionList={questionList}
        onEditChange={(payload: any) => setData(payload)}
        editable={false}
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
    font-size: 24px;
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
