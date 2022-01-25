import styled from 'styled-components'
import React from 'react'
import { BaseStepCon, BaseStepBoxImg } from 'src/components/BaseStep'
import { getWeekString } from 'src/utils/date/week'
interface Props {
  detailData?: any
}
export default function auditProcessDetail(props: Props) {
  return (
    <Con>
      <TopTitleCon>
        <div className='topTitleIcon' />
        <div className='topTitle'>审核信息</div>
      </TopTitleCon>
      <BaseStepCon>
        {props.detailData?.map((item: any, index: number) => (
            <BaseStepBoxImg imgurl={item.nearImageUrl} success={(item.taskType == '2' || item.taskType == '3') ? 'fail' : 'success'} key={index}>
              <StepBox>
                <React.Fragment>
                  <div className='title'>{item.taskDesc}</div>
                  <div className='info'>{item.handlerEmpName}</div>
                  <div className='info'>
                    {item.handleTime} ({getWeekString(item.handleTime)})
                  </div>
                  <div className='remark'>{item.handleRemark}</div>
                </React.Fragment>
              </StepBox>
            </BaseStepBoxImg>
          ))}
      </BaseStepCon>
    </Con>
  )
}

const Con = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 20px;

  .ant-steps-item-icon {
    margin-right: 8px;
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
  .remark {
    background-color: #eeeeee;
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
