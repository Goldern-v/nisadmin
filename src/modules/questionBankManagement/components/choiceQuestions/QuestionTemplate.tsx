import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function QuestionTemplate() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Wrapper>
      <div className='title'>
        患者，女性，26岁，妊娠5个月。支气管扩张5年。今晨突然鲜血从口鼻涌出，随即烦躁不安， 极度呼吸困难，唇
        指发绀。最关键的抢救措施是 ( ){' '}
      </div>
      <div className='option'>A. 胸腔穿刺抽气 </div>
      <div className='option'>B. 立即鼻导管给氧 </div>
      <div className='option'>C. 进行气管插管 </div>
      <div className='option'>D. 立即清除血块，保持呼吸道通畅 </div>
      <div className='option'>E. 注射呼吸兴奋剂 </div>
      <div className='answer'>标准答案：A</div>
      <div className='label-con'>
        <span>标签：</span>
        <div className='label-box'>
          <span className='label-name'>产科</span>
          <span>(12)</span>
        </div>
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
