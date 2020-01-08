import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, InputNumber, Popover } from 'antd'

export interface Props {
  data?: any[],
  onDataChange?: (data: any[]) => void
}

export default function AnwserSheetPage(props: Props) {
  const { data } = props

  const correctImg = <img src={require('./../../../assets/question-correct.png')} />

  const choiceContent = (item: any, idx: number) => {
    return <div className="question-item">
      <span className="question-result">
        <span>❌</span>
        {/* <span>{correctImg}</span> */}
      </span>
      <span className="question-content">
        <div>
          <span className="index">{idx + 1}、</span>
          <span className="question-type">[单选]</span>
          <span className="question-desc">下列哪些不是护理不良反应事件防范对策（ ）</span>
          <span className="emp-choices">学员选【C】</span>
        </div>
        <div style={{ paddingLeft: '5px' }}>
          <span className="choice-item">
            <span className="correct-choice">{correctImg}</span>
            <span className="choice-desc">A、接触患者的血液、体液、分泌物、排泄物、呕吐物时，应戴清洁手套</span>
          </span>
          <span className="choice-item">
            <span className="correct-choice">{correctImg}</span>
            <span className="choice-desc">B、应戴清洁手套</span>
          </span>
        </div>
      </span>
    </div>
  }

  const fillInContent = (item: any, idx: number) => {
    return <div className="question-item">
      <span className="question-result"></span>
      <span className="question-content">
        <div>
          <span className="index">{idx + 1}、</span>
          <span className="question-type">[问答题] </span>
          <span className="question-desc">下列哪些不是护理不良反应事件防范对策（8分）</span>
          <Popover content="11111111" trigger="click" title="参考答案">
            <span className="refer">参考答案</span>
          </Popover>
          <span className="de-score">
            答案扣
            <InputNumber
              className="de-score-ipt"
              size="small"
              precision={2}
              step={0.1}
              max={8}
              min={0} />
            分
          </span>
        </div>
        <div style={{ paddingLeft: '5px' }}>
          <pre className="awnser">这是学员答案，这是学员答案这是学员答案，
            这是学员答案这是学员答案，这是学员答案这是学员答案，
这是学员答案这是学员答案，
这是学员答案这是学员答案，这是学员答案这是学员。</pre>
        </div>
      </span>
    </div>
  }

  return <Wrapper>
    <div className="main-title">《2019年东莞市厚街医院N3-N5级护理人员第四季度理论考核试卷》</div>
    <div className="question-list">
      {choiceContent({}, 0)}
      {fillInContent({}, 1)}
    </div>
  </Wrapper>
}

const pageWidth = 750
const pagePadding = 25
const pageBorder = 1
const contentWidth = pageWidth - pagePadding * 2 - pageBorder * 2

const Wrapper = styled.div`
  width: ${pageWidth}px;
  margin: 15px auto;
  background: #fff;
  padding: ${pagePadding}px;
  min-height: 800px;
  border: ${pageBorder}px solid #e8e8e8;
  .main-title{
    font-size: 20px;
    color: #000;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
  .question-item{
    &>span{
      display: inline-block;
      vertical-align: top;
    }
    .question-result{
      width: 20px;
      min-height: 20px;
      float: left;
      span{
        font-size: 13px;
      }
      img{
        width: 15px;
        position: relative;
        left: 1px;
      }
    }
    .question-content{
      width: ${contentWidth - 20}px;
      padding-left: 10px;
      font-size: 13px;
      margin-bottom: 15px;
      .question-type{
        color: #F59A23;
      }
      .emp-choices{
        color: #00f;
        display: inline-block;
      }
      .choice-item{
        position: relative;
        margin-right: 15px;
        .correct-choice{
          position: absolute;
          top: -2px;
          left: -2px;
          img{
            width: 14px;
          }
        }
      }

      .refer{
        margin-right:15px;
        cursor: pointer;
        color:#027DB4;
        display: inline-block;
        text-decoration: underline;
      }

      .de-score{
        .de-score-ipt{
          margin: 0 2px;
          width: 60px;
          .ant-input-number-input{
            color: red;
          }
          .ant-input-number-handler-wrap{
            display:none;
          }
        }
      }
      pre{
        white-space: pre-wrap;
        word-break: break-all;
        &.awnser{
          color: #00f;
        }
      }
    }
  }
`