import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Steps } from 'antd'
const { Step } = Steps
export default function midRightQualityControlRecordDetail() {
  //
  // useEffect(() => {
  //
  // })
  const apiData = [
    {
      title: '提交',
      descriptionName: '王大丽',
      descriptionTime: '2019-07-10 10:00',
      descriptionMessage: '检查婴儿病区的设备是否良好，这是处理意见这是处理意见这是处理意见'
    },
    {
      title: '病区处理',
      descriptionName: '赵平',
      descriptionTime: '2019-05-11 13:00',
      descriptionMessage: '检查婴儿病区的设备是否良好，这是处理意见这是处理意见这是处理意见'
    },
    {
      title: '护士长评价',
      descriptionName: '胡柯菲',
      descriptionTime: '2019-05-18 17:00',
      descriptionMessage: '检查后，婴儿病区的设备良好。'
    },
    {
      title: '护理部评价',
      descriptionName: '',
      descriptionTime: '',
      descriptionMessage: '未完成'
    }
  ]
  // const descriptionDom = (

  // )
  return (
    <Con>
      <TopTitleCon>
        <div className='topTitleIcon' />
        <div className='topTitle'>质控轨迹</div>
      </TopTitleCon>

      <Steps direction='vertical' size='small' current={3}>
        {apiData.map((item: any) => (
          <Step
            title={item.title}
            description={
              <DescriptionDom>
                <div className='descriptionName'> {item.descriptionName}</div>
                <div className='descriptionTime'>{item.descriptionTime}</div>
                <div className='descriptionMessage'>{item.descriptionMessage}</div>
              </DescriptionDom>
            }
          />
        ))}

        {/* <Step title='病区处理' description={descriptionDom} />
        <Step title='护士长评价' description={descriptionDom} />
        <Step title='护理部评价' description='未完成' /> */}
      </Steps>
    </Con>
  )
}

const Con = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 19px 12px 19px 28px;

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
const TopTitleCon = styled.div`
  margin-bottom: 16px;
  .topTitleIcon {
    margin-left: -12px;
    display: inline-block;
    width: 6px;
    height: 12px;
    background: rgba(75, 176, 141, 1);
  }
  .topTitle {
    margin-left: 16px;
    display: inline-block;
    font-size: 16px;
    color: #333333;
  }
`
const DescriptionDom = styled.div`
  /* margin-right: 12px; */
  .descriptionName {
    /* margin-top: 5px; */
    color: #687179;
    font-size: 12px;
  }
  .descriptionTime {
    color: #687179;
    font-size: 12px;
  }
  .descriptionMessage {
    margin-top: 10px;
    padding: 10px;
    background-color: #e6eceb;
    border-radius: 2px;
    color: #333333;
    font-size: 12px;
  }
`
