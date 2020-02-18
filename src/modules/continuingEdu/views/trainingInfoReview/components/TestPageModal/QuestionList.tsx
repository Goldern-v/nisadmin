import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {
  data?: any[]
}

export default function QuestionList() {
  const correctImg = <img src={require('./../../assets/question-correct.png')} />

  return <Wrapper>
    <div className="main-title">《1月理论考核第一期》</div>
    <div className="test-info">
      <div className="test-info-item">
        开始时间: 2019-10-17 15:30:00
      </div>
      <div className="test-info-item">
        结束时间: 2019-10-17 15:30:00
      </div>
      <div className="test-info-item">
        考试时间: 50分钟
      </div>
      <div className="test-info-item">
        及格分数线: 60
      </div>
      <div className="test-info-item">
        题目数量: 37题
      </div>
    </div>
    <div className="question-list">
      <div className="question-item">
        <div className="question-content">
          <span className="index">1、</span>
          <span className="question-type">[选择题]</span>
          <span className="question-desc">现场医护人员到达现场进行基础生命支持复苏，支援人员和急救小组人员间是几分钟</span>
        </div>
        <div className="anwser-content">
          <span className="choice-item">
            <span className="correct-choice">{correctImg}</span>
            <span className="choice-desc">A、10</span>
          </span>
          <span className="choice-item">
            <span className="correct-choice">{correctImg}</span>
            <span className="choice-desc">B、10</span>
          </span>
          <span className="choice-item">
            <span className="correct-choice">{correctImg}</span>
            <span className="choice-desc">C、20</span>
          </span>
          <span className="choice-item">
            <span className="correct-choice">{correctImg}</span>
            <span className="choice-desc">D、5</span>
          </span>
        </div>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  width: 750px;
  margin: 15px auto;
  background: #fff;
  padding: 25px;
  min-height: 800px;
  border: 1px solid #e8e8e8;
  .test-info{
    background: #eee;
    padding: 15px 0;
    overflow: hidden;
    .test-info-item{
      width: 50%;
      padding-left: 15px;
      padding-right: 15px;
      display: inline-block;
    }
  }
  .main-title{
    font-size: 20px;
    color: #000;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
  .question-desc{
    .white-space{
      display: inline-block;
      width: 60px;
      border-bottom:1px solid #000;
      vertical-align: middle;
      height: 20px;
    }
  }
  .question-item{
    padding-left: 10px;
    font-size: 13px;
    margin-top: 15px;
    .question-type{
      color: #F59A23;
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

    .anwser-content{
      padding: 0 5px;
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
`