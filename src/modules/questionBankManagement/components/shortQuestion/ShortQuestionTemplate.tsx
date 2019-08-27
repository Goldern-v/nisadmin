import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import WrapPre from './../common/WrapPre'
export interface Props {
  data: any
}

export default function ShortQuestionTemplate(props: Props) {
  const { data } = props;
  const { questionContent, answerContent, questionLabels } = data;

  const Labels = () => {
    return (questionLabels || []).filter((item: any) => item.hided == false).map((item: any, idx: number) => {
      return <div className='label-box' key={idx}>
        <span className='label-name'>{item.labelContent}</span>
        <span>({item.questionCount || 0})</span>
      </div>
    });
  }

  return (
    <Wrapper>
      <div className='title'>
        <WrapPre>{questionContent || ''}</WrapPre>
      </div>
      <div className='answer'>
        <WrapPre>标准答案：{answerContent || ''}</WrapPre>
      </div>
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
