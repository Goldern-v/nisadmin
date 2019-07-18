import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Steps } from 'antd'
const { Step } = Steps
export default function midRightQualityControlRecordDetail() {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   
  // })
  return (
    <Con>
      <Steps direction='vertical' current={3}>
        <Step title='提交' description='王大丽、王大丽 22019-10-10 10:00）（周一）' />
        <Step
          title='病区处理'
          description='王萌萌（神经内科）2019-10-10 10:00 （周一）22222222222222222222222222222222222222222222222222222222222222222222222233333333333333333333333333333333333344444444444444444444444444444555555555555555555556666666666'
        />
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
`
