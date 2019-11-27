import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { BaseStepCon, BaseStepBox } from 'src/components/BaseStep'
import { Button } from 'antd'
import moment from 'moment'
export interface Props {
  upLoaderEmpName?: string,
  upLoadTime?: string,
}

export default function AuditInfo(props: Props) {
  const { upLoaderEmpName, upLoadTime } = props
  const overTime = (startTime: string) => {
    if (!startTime) return '...小时'
    let time = moment().diff(moment(startTime), 'minute')

    let minutes = time % 60 ? `${time % 60}分钟` : ''
    let days: any = parseInt((time / (24 * 60)).toString())
    let hours: any = parseInt(((time / 60) % 24).toString())
    hours = hours >= 1 ? `${hours}小时` : ''
    days = days >= 1 ? `${days}天` : ''
    if (!hours && !minutes && !days) return '0小时'
    return days + hours + minutes
  }
  return <React.Fragment>
    <TopTitleCon>
      <div className='topTitleIcon' />
      <div className='topTitle'>审核过程</div>
    </TopTitleCon>
    <BaseStepCon>
      <BaseStepBox success={'success'}>
        <StepBox>
          <div className='title'>提交书籍</div>
          <div>{`${upLoaderEmpName || ''} ${upLoadTime || ''}`}</div>
        </StepBox>
      </BaseStepBox>
      <BaseStepBox success={''}>
        <StepBox>
          <div className='title'>护理部审核</div>
          <div>审核中 耗时{overTime(upLoadTime || '')}</div>
        </StepBox>
      </BaseStepBox>
    </BaseStepCon>
  </React.Fragment>
}

const TopTitleCon = styled.div`
  margin-bottom: 16px;
  .topTitleIcon {
    margin-left: -5px;
    display: inline-block;
    width: 6px;
    height: 12px;
    background: rgba(75, 176, 141, 1);
  }
  .topTitle {
    margin-left: 10px;
    display: inline-block;
    font-size: 16px;
    color: #333333;
  }
`

const StepBox = styled.div`
  padding-bottom: 10px;
  * {
    font-size: 12px;
  }
  .title {
    color: #000;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .info,
  .date,
  .nodo {
    color: #687179;
    margin-bottom: 3px;
  }
  .text-box {
    color: 12px;
    background: #e6eceb;
    border-radius: 2px;
    padding: 10px 12px;
    margin: 5px 0 0;
    .text-box-title {
      font-weight: bold;
    }
  }
`