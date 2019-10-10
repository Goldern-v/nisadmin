import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { BaseStepCon, BaseStepBox } from 'src/components/BaseStep'
import { getWeekString } from 'src/utils/date/week'

interface Props {
  detailData: any
}

export default function Right(props: Props) {
  let nodeDataList = props.detailData.srNodeList || []

  return (
    <Wrapper>
      <TopTitleCon>
        <div className='topTitleIcon' />
        <div className='topTitle'>流程轨迹</div>
      </TopTitleCon>
      <BaseStepCon>
      {nodeDataList &&
          nodeDataList.map((item: any, index: number) => (
            <BaseStepBox success={item.status == '1' && (item.noPass ? 'fail' : 'success')} key={index}>
              <StepBox>
                {item.status == '1' ? (
                  <React.Fragment>
                    <div className='title'>{item.nodeName}</div>
                    <div className='info'>{item.handlerName}</div>
                    <div className='info'>
                      {item.handleTime} ({getWeekString(item.handleTime)})
                    </div>
                    {item.nodeCode == 'big_dept_handle' && (
                      <React.Fragment>
                        {item.measureGroupList &&
                          item.measureGroupList.map((item: any, index: number) => (
                            <div className='text-box' key={index}>
                              <div className='text-box-title'>{index + 1 + '、' + item.itemName}：</div>
                              <div>
                                {item.measureList.map((item: any, index: number) => (
                                  <span key={index}>{item.measureName};</span>
                                ))}
                              </div>
                            </div>
                          ))}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className='title'>{item.nodeName}</div>
                    <span className='noDo'>未完成</span>
                  </React.Fragment>
                )}
              </StepBox>
            </BaseStepBox>
          ))}

      </BaseStepCon>
    </Wrapper>
  )
}

const Wrapper = styled.div` 
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
  .noDo {
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
