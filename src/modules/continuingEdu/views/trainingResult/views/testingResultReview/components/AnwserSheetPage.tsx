import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, InputNumber, Popover } from 'antd'

export interface Props {
  data?: any[],
  title?: string,
  type?: 'view' | 'edit',
  onDataChange?: (data: any[]) => void
}

export default function AnwserSheetPage(props: Props) {
  const { data, type, title, onDataChange } = props
  const viewType = type || 'edit'

  const correctImg =
    <img src={require('./../../../assets/question-correct.png')} />

  const choiceContent = (item: any, idx: number) => {
    let selectedArr = []
    let answersList = item.answersList || []
    for (let i = 0; i < answersList.length; i++) {
      let answerItem = answersList[i]

      if (answerItem.isSelected)
        selectedArr.push(answerItem.optionLabel)
    }

    return <div className="question-item" key={idx || 0}>
      <span className="question-result">
        {item.answerRight ?
          <span>{correctImg}</span> :
          <span>❌</span>}
      </span>
      <span className="question-content">
        <div>
          <span className="index">{item.sort}、</span>
          <span className="question-type">
            [{item.questionType == 1 ? '单选题' : '多选题'}]
          </span>
          <span className="question-desc">{item.questionContent}</span>
          <span style={{ color: '#999' }}>({item.scores}分) </span>
          <span className="emp-choices">
            学员选【{selectedArr.join(',')}】
          </span>
        </div>
        <div style={{ paddingLeft: '5px' }}>
          {answersList.map((awnserItem: any, awnserIdx: number) =>
            <span className="choice-item" key={`${idx}-${awnserIdx}`}>
              {!!awnserItem.isRight &&
                <span className="correct-choice">{correctImg}</span>}
              <span className="choice-desc">
                {`${awnserItem.optionLabel}、${awnserItem.optionContent}`}
              </span>
            </span>)}
        </div>
      </span>
    </div>
  }

  const fillContent = (item: any, idx: number) => {

    return <div className="question-item" key={idx || 0}>
      <span className="question-result">
        {item.answerRight ?
          <span>{correctImg}</span> :
          <span>❌</span>}
      </span>
      <span className="question-content">
        <div>
          <span className="index">{item.sort}、</span>
          <span className="question-type">[问答题] </span>
          <span className="question-desc">
            <span
              dangerouslySetInnerHTML={{
                __html: `${item.questionContent
                  .replace(/##/g, '<span class="fill-underline"></span>')}`
              }}></span>
            <span style={{ color: '#999' }}>({item.scores}分) </span>
          </span>
          <span style={{ color: '#027DB4' }}>
            正确答案:{item.answersList
              .map((answer: any) => answer.rightAnswer)
              .join(',')}
          </span>
        </div>
        <div style={{ paddingLeft: '5px' }}>
          <pre className="answer">
            学员答案: {item.answersList
              .map((answer: any) => answer.answerContent)
              .join(',')}
          </pre>
        </div>
      </span>
    </div>
  }

  const wendaContent = (item: any, idx: number) => {
    let answer = (item.answersList && item.answersList[0]) || {}
    return <div className="question-item" key={idx || 0}>
      <span className="question-result">
        {/* {item.answerRight ?
          <span>{correctImg}</span> :
          <span>❌</span>} */}
      </span>
      <span className="question-content">
        <div>
          <span className="index">{item.sort}、</span>
          <span className="question-type">[问答题] </span>
          <span className="question-desc">
            {item.questionContent}（{item.scores}分）
          </span>
          <Popover
            content={<pre>{answer.suggestedAnswer}</pre>}
            trigger="click" title="参考答案">
            <span className="refer">参考答案</span>
          </Popover>
          {viewType == 'edit' && <span className="de-score">
            答案扣
            <InputNumber
              className="de-score-ipt"
              size="small"
              value={item.deduction}
              precision={2}
              step={0.1}
              max={item.scores}
              min={0}
              onChange={(val: any) => {
                let newData = (data || [])?.concat()
                if (newData.length > 0) {
                  newData[idx].deduction = val
                  onDataChange && onDataChange(newData)
                }
              }} />
            分
          </span>}
        </div>
        <div style={{ paddingLeft: '5px' }}>
          <pre className="answer">
            学员答案: {answer.answerContent}
          </pre>
        </div>
      </span>
    </div>
  }

  return <Wrapper>
    <div className="main-title">《{title}》</div>
    <div className="question-list">
      {data?.map((item: any, idx: number) => {
        switch (item.questionType) {
          case 1:
          case 2:
            return choiceContent(item, idx)
          case 3:
            return fillContent(item, idx)
          case 4:
            return wendaContent(item, idx)
          default:
            return <span key={idx}></span>
        }
      })}
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
        color:#000;
      }
      img{
        width: 15px;
        position: relative;
        left: 1px;
      }
    }
    .fill-underline{
      display: inline-block;
      width: 40px;
      border-bottom: 1px solid #333;
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
        &.answer{
          color: #00f;
        }
      }
    }
  }
`