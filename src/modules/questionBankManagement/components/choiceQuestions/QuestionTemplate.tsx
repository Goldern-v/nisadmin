import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import WrapPre from './../common/WrapPre'
export interface Props {
  data: any
}

export default function QuestionTemplate(props: Props) {
  const { data } = props;
  const { questionContent, choiceQuestionList, labelList } = data;
  const choiceList = (choiceQuestionList || []).concat().sort((a: any, b: any) => {
    return a.serialNum - b.serialNum
  })

  const Options = () => {
    return choiceList.map((item: any, idx: number) => {
      return <div className='option' key={idx}>{`${item.questionOption}. ${item.answerContent}`}</div>
    })
  }

  const CorrectOptions = () => {
    let correctArr: any[] = [];
    correctArr = (choiceList || []).filter((item: any) => item.right == true).map((item: any) => item.questionOption);

    return correctArr.join('、')
  }

  const Labels = () => {
    return (labelList || []).filter((item: any) => item.hided == false).map((item: any, idx: number) => {
      return <div className='label-box' key={idx}>
        <span className='label-name'>{item.labelContent}</span>
        <span>({item.questionCount || 0})</span>
      </div>
    });
  }

  return (
    <Wrapper>
      <div className='title'>
        <WrapPre>{questionContent}</WrapPre>
      </div>
      {Options()}
      <div className='answer'>标准答案：{CorrectOptions()}</div>
      <div className='label-con'>
        <span>标签：</span>
        {Labels()}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 8px 6px;
  font-size: 12px;
  .title {
    margin-bottom: 2px;
  }
  .option {
    margin-left: 40px;
  }
  .answer {
    margin-top: 6px;
  }
  .label-box {
    margin-top: 5px;
    padding: 1px 8px;
    border-radius: 2px;
    border: 1px solid rgba(204, 204, 204, 1);
    margin-right: 10px;
    display: inline-block;
    .label-name {
      color: #6077c7;
    }
  }
`
