import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Steps } from 'antd'
const { Step } = Steps
export default function midRightQualityControlRecordDetail() {
  //
  // useEffect(() => {
  //
  // })
  return (
    <Con>
      <Steps direction='vertical' current={3}>
        <Step title='提交' description='王大丽、王大丽 22019-10-10 10:00）（周一）' />
        <Step title='病区处理' description='王萌萌（神经内科）2019-10-10 10:00 （周一）' />
        <Step title='护士长评价' description='王萌萌（神经内科）2019-10-10 10:00（周一）' />
        <Step title='护理部评价' description='未完成' />
      </Steps>
    </Con>
  )
}

const Con = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 10px 20px;
  font-size: 12px;
  .ant-steps-item-icon {
    /* width: 20px;
    height: 20px;
    border-radius: 20px; */
    margin-right: 8px;
    /* svg {
      font-size: 18px;
    } */
  }
  .ant-steps-item-title {
    font-size: 14px;
    font-weight: bold;
  }
  .ant-steps-item-description {
    font-size: 13px;
    font-weight: 400;
    color: rgba(104, 113, 121, 1);
  }
`
