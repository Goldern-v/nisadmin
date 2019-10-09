import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { numToChinese } from 'src/utils/number/numToChinese';
import Zimage from 'src/components/Zimage'
import { Checkbox, Radio, Icon, Input, Row, Col, Spin } from 'antd'
const { TextArea } = Input

interface Props {
  detailData: any
}

export default function Left(props: Props) {
  const { detailData } = props
  let messageBoxData = detailData.record || {}
  let pageItem = detailData.pageItem || {}
  let attachment = detailData.attachment || []

  return (
    <Wrapper>
      <MessageBox>
        <div className='boxLeft'>
          <div>查房时间：{messageBoxData.srDate}</div>
          <div>查检病区：{messageBoxData.wardName}</div>
        </div>
        <div className='boxRight'>
          <div>检查者：{messageBoxData.srName}</div>
          <div>状态：{messageBoxData.nextNodePendingName}</div>
        </div>
      </MessageBox>
      <ContentCon>
        <QuestionItem>
            {/* -------值班人员 */}
            <div className='titleCon'>
              <div className='titleLeftCon'>一、值班人员</div>
            </div>
            <div className='itemCon'>值班人员：{messageBoxData.onDutyEmpName}</div>

            {/* -------护士在岗情况 */} 
            <div className='titleCon'>
              <div className='titleLeftCon'>二、护士在岗情况</div>
            </div>
            <div className='itemCon'>
              <div className='itemQuestionCon'>
                {/* 选择项 */}
                <Radio.Group value={pageItem.nurseStatus} disabled buttonStyle='solid'>
                  <span className='problemPro'>有无问题：</span>
                  <Radio value={'0'} style={{ marginLeft: '15px', marginRight: '25px' }}>
                    无问题
                  </Radio>
                  <Radio value={'1'} style={{ marginLeft: '15px', marginRight: '25px' }}>
                    有问题
                  </Radio>
                </Radio.Group>
                {/* //问题详情+附件 */}
                {pageItem.nurseStatus == '1' && (
                  <div>
                    <div className='notesCon'>
                      <div className='notesLeftCon'>问题详情</div>
                      <div className='notesRightCon'>
                        <TextArea rows={4} readOnly value={pageItem.nurseProblem} autosize disabled/>
                      </div>
                    </div>
                    <div className='fujian'>
                      <span className='problemPro'>附件：</span>
                      {attachment.map((item: any, itemIndex: number) => (
                        <div className='imgCon' key={itemIndex}>
                          <Zimage
                          text={
                            <span style={{ fontSize: '13px'}}>
                              <Icon type='paper-clip' style={{ fontSize: '13px'}}/>{item.path.split(',').length}
                            </span>
                          }
                          list={item.path.split(',')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* -------病人情况 */} 
            <div className='titleCon'>
              <div className='titleLeftCon'>三、病人情况</div>
            </div>
            <div className='itemCon itemCon1'>
              <div className='itemQuestionCon'>
                {/* 选择项 */}
                <Radio.Group value={pageItem.patientStatus} disabled buttonStyle='solid'>
                <span className='problemPro'>有无问题：</span>
                  <Radio value={'0'} style={{ marginLeft: '20px', marginRight: '30px' }}>
                    无问题
                  </Radio>
                  <Radio value={'1'} style={{ marginLeft: '20px', marginRight: '30px' }}>
                    有问题
                  </Radio>
                </Radio.Group>
                {/* //问题详情+附件 */}
                {pageItem.nurseStatus == '1' && (
                  <div>
                    <div className='notesCon'>
                      <div className='notesLeftCon'>问题详情</div>
                      <div className='notesRightCon'>
                        <TextArea rows={4} readOnly value={pageItem.patientProblem} autosize disabled/>
                      </div>
                    </div>
                    <div className='fujian'>
                      <span className='problemPro'>附件：</span>
                      {attachment.map((item: any, itemIndex: number) => (
                        <div className='imgCon' key={itemIndex}>
                          <Zimage
                          text={
                            <span style={{ fontSize: '13px'}}>
                              <Icon type='paper-clip' style={{ fontSize: '13px'}}/>{item.path.split(',').length}
                            </span>
                          }
                          list={item.path.split(',')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </QuestionItem>
      </ContentCon>
    </Wrapper>
  )
}

const Wrapper = styled.div` 
  margin: 0 auto;
  width: 760px;
  padding: 10px 20px;
  color: #000000;
  background: #fff;
  border: 1px solid #ddd;
  .imgCon{
    display: inline-block;
  }
  .fujian{
    margin-bottom: 10px;
  }
`
const MessageBox = styled.div`
  margin-top: 10px;
  min-height: 60px;
  line-height: 24px;
  padding: 10px 20px;
  background-color: #f2f2f2;
  font-size: 12px;
  display: flex;
  .boxLeft {
    flex: 1;
    width: 0;
  }
  .boxRight {
    flex: 1;
    width: 0;
  }
`
const ContentCon = styled.div`
  margin-top: 10px;
  font-size: 12px;
  padding-bottom: 20px;
`
const QuestionItem = styled.div`
  .titleCon {
    margin: 10px 0 0 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    .titleLeftCon {
      flex: 1;
      width: 0;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .itemCon {
    box-sizing: border-box;
    min-height: 40px;
    padding: 4px 0;
    border-bottom: 0.5px dashed #bbbbbb;
    .itemQuestionCon {
      margin-top: 5px;
      font-size: 12px;
      .problemPro{
        color: #000;
      }
      .itemAttachmentCon {
        display: inline-block;
        cursor: pointer;
        span {
          color: #333;
          &:hover {
            color: ${(p) => p.theme.$mtc};
          }
        }
      }
      .ant-radio-disabled + span {
        color: black;
      }
      .ant-radio-inner::after {
        background-color: #00a680;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .itemCon1{
    border-bottom: none !important;
  }
  .notesCon {
    box-sizing: border-box;
    min-height: 116px;
    padding: 10px 0;
    display: flex;
    .notesLeftCon {
      width: 68px;
    }
    .notesRightCon {
      flex: 1;
      width: 0;
      font-size: 12px;
      textarea {
        font-size: 12px;
        resize: none;
        min-height: 90px !important;
      }
      .ant-input-disabled {
        color: black;
      }
    }
  }
`
const QuestionBottomCon = styled.div`
  box-sizing: border-box;
  padding: 10px 0;
  height: 70px;
  .questionBottomCheckbox {
    margin-top: 10px;
    .ant-checkbox-wrapper {
      margin-right: 15px;
    }
    span {
      padding-right: 0;
      font-size: 12px;
      color: black;
    }
  }
`

const OnlyReadError = styled.div`
  text-align: right;
  margin-top: 10px;
  margin-bottom: -35px;
  position: relative;
  z-index: 2;
`
