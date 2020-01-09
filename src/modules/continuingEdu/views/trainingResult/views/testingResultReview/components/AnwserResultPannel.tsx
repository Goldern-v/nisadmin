import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import moment from 'moment'

export interface Props {
  data?: any
}

export default function AnwserResultPannel(props: Props) {
  const { data } = props
  return <Wrapper>
    <div className="emp-info">妇科/张新</div>
    <div className="title">试卷详情</div>
    <div className="base-info">
      <div className="row">得分：94分</div>
      <div className="row">及格分数线：60分</div>
      <div className="row">答题用时：2分35秒</div>
      <div className="row">开始时间：2019/03/20 10:00</div>
      <div className="row">结束时间：2019/03/20  11:00</div>
      <div className="row">
        答题情况：10/20
        <span style={{ color: '#aaa' }}>（正确题数/答题数）</span>
      </div>
      <div className="row">题目数量：20</div>
      <div className="row">正确率：80%</div>
    </div>
    <div className="title">❌错题:</div>
    <div className="wrong-awnser-list">
      <div className="wrong-awnser-item">
        <div className="question">
          <span className="index">4、</span>
          <span className="type">[单选]</span>
          <span className="desc">关于戴手套描述错误的是（ 2分）</span>
        </div>
        <div className="awnser">
          <div className="left">学员选【C,D】</div>
          <div className="right">正确答案：【A,C,D】</div>
        </div>
      </div>
      <div className="wrong-awnser-item">
        <div className="question">
          <span className="index">4、</span>
          <span className="type">[单选]</span>
          <span className="desc">关于戴手套描述错误的是（ 2分）</span>
        </div>
        <div className="awnser">
          <div className="left">学员选【C,D】</div>
          <div className="right">正确答案：【A,C,D】</div>
        </div>
      </div>
      <div className="wrong-awnser-item">
        <div className="question">
          <span className="index">4、</span>
          <span className="type">[单选]</span>
          <span className="desc">关于戴手套描述错误的是（ 2分）</span>
        </div>
        <div className="awnser">
          <div className="left">学员选【C,D】</div>
          <div className="right">正确答案：【A,C,D】</div>
        </div>
      </div>
      <div className="wrong-awnser-item">
        <div className="question">
          <span className="index">4、</span>
          <span className="type">[单选]</span>
          <span className="desc">关于戴手套描述错误的是（ 2分）</span>
        </div>
        <div className="awnser">
          <div className="left">学员选【C,D】</div>
          <div className="right">正确答案：【A,C,D】</div>
        </div>
      </div>
      <div className="wrong-awnser-item">
        <div className="question">
          <span className="index">4、</span>
          <span className="type">[单选]</span>
          <span className="desc">关于戴手套描述错误的是（ 2分）</span>
        </div>
        <div className="awnser">
          <div className="left">学员选【C,D】</div>
          <div className="right">正确答案：【A,C,D】</div>
        </div>
      </div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  padding: 15px 10px;
  .emp-info{
    font-size: 22px;
    color:#000;
    font-weight: bold;
  }
  .title{
    margin-top: 18px;
    margin-bottom: 10px;
    font-size: 16px;
    color:#000;
    font-weight: bold;
  }
  .base-info{
    padding-left: 6px;
    margin-bottom: 30px;
    &>div{
      font-size: 13px;
    }
  }
  .wrong-awnser-list{
    padding: 0 5px;
  }
  .wrong-awnser-item{
    border-bottom: 1px solid #b4bbc5;
    padding-bottom: 20px;
    padding-top: 10px;
    &:first-of-type{
      padding-top: 0;
    }
    &:last-of-type{
      border-bottom: none;
    }
    .question{
      .type{
        color: #F59A23;
      }
    }
    .awnser{
      overflow: hidden;
      .left{
        float: left;
      }
      .right{
        float: right;
      }
    }
  }
`