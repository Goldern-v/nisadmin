import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import createModal from "src/libs/createModal";
import TestPageModal from './../TestPageModal/TestPageModal'

export interface Props {
  info?: any
}

//参与人员
export default function TestInfo(props: Props) {
  const testPage = createModal(TestPageModal)
  const { info } = props

  return <Wrapper>
    <div className="content-item-title">上传设置</div>
    <div className="row">
      <div className="label w-106">最大考试次数：</div>
      <div className="content">3</div>
      <div className="label w-106">卷面总分：</div>
      <div className="content">100</div>
      <div className="label w-106">及格分数线：</div>
      <div className="content">60</div>
      <div className="label w-106">题目设置：</div>
      <div className="content">【考试】《1月理论考核第一期》</div>
      <div className="label w-106"></div>
      <div className="content">卷面题目数共  37  题    随机显示题目顺序    随机显示选项顺序</div>
      <div className="label w-106"></div>
      <div className="content"><Button size="small" onClick={() => testPage.show()}>试卷预览</Button></div>
    </div>
    <testPage.Component />
  </Wrapper>
}
const Wrapper = styled.div`
  .row{
    margin-bottom: 5px;
    width: 100%;
    font-size: 13px;
    overflow: hidden;
    .label{
      float: left;
      text-align: right;
      min-height:16px;
      &.w-106{
        width: 106px;
      }
    }
    .content{
      overflow: hidden;
      padding-right: 50px;
    }
  }
`