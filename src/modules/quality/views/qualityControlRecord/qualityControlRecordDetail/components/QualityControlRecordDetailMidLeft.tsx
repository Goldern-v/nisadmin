import styled from 'styled-components'
import React from 'react'
import { Checkbox, Radio, Icon, Input, Row, Col } from 'antd'
// import React, { useState, useEffect } from 'react'
const { TextArea } = Input
export default function qualityControlRecordDetailMidLeft() {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   
  // })
  const titleBoxChange = (e: any) => {
    console.log(`${e.target.checked}`)
  }
  const itemRadioChange = (e: any) => {
    console.log(e.target.value)
  }
  // 附件
  const itemAttachmentCheck = () => {
    console.log('附件')
  }
  return (
    <Con>
      <MessageBox>
        <div className='boxLeft'>
          <div>质控日期：2019-11-12</div>
          <div>质控病区：神经内科护理单元</div>
          <div>床号：30床</div>
          <div>需要跟踪评价：是</div>
          <div>质控结果：是(30) 否(10) 不适用(20)</div>
        </div>

        <div className='boxRight'>
          <div>质控人：王大锤、王小萌</div>
          <div>管床护士：王大锤(N2)</div>
          <div>住院号：P3223</div>
          <div>跟踪日期：2019-7-1</div>
          <div>通过率：59%</div>
        </div>
      </MessageBox>
      <QuestionCon>
        <div className='titleCon'>
          <div className='titleLeftCon'>一、组织管理</div>
          <div className='titleRightCon'>
            <Checkbox onChange={titleBoxChange}>只看错题</Checkbox>
          </div>
        </div>
        <div className='itemCon'>
          <div className='itemTitleCon'>1-1 病区是否有护理部年度工作计划</div>
          <div className='itemMidCon'>
            <Radio.Group onChange={itemRadioChange} defaultValue={3} disabled buttonStyle='solid'>
              <Radio value={1} style={{ marginLeft: '20px', marginRight: '30px' }}>
                是
              </Radio>
              <Radio value={2} style={{ marginLeft: '20px', marginRight: '30px' }}>
                否
              </Radio>
              <Radio value={3} style={{ marginLeft: '20px', marginRight: '30px' }}>
                不适用
              </Radio>
            </Radio.Group>
            <div className='itemAttachmentCon' onClick={itemAttachmentCheck}>
              <Icon type='paper-clip' /> 2
            </div>
          </div>
        </div>
        {/* <div className='itemCon'>
          <div className='itemTitleCon'>1-2 病区是否有护理部年度工作计划</div>
          <div className='itemMidCon'>
            <Radio.Group onChange={itemRadioChange} defaultValue={3} disabled buttonStyle='solid'>
              <Radio value={1} style={{ marginLeft: '20px', marginRight: '30px' }}>
                是
              </Radio>
              <Radio value={2} style={{ marginLeft: '20px', marginRight: '30px' }}>
                否
              </Radio>
              <Radio value={3} style={{ marginLeft: '20px', marginRight: '30px' }}>
                不适用
              </Radio>
            </Radio.Group>
            <div className='itemAttachmentCon' onClick={itemAttachmentCheck}>
              <Icon type='paper-clip' /> 2
            </div>
          </div>
        </div>

        <div className='itemCon'>
          <div className='itemTitleCon'>1-3 病区是否有护理部年度工作计划</div>
          <div className='itemMidCon'>
            <Radio.Group onChange={itemRadioChange} defaultValue={3} disabled buttonStyle='solid'>
              <Radio value={1} style={{ marginLeft: '20px', marginRight: '30px' }}>
                是
              </Radio>
              <Radio value={2} style={{ marginLeft: '20px', marginRight: '30px' }}>
                否
              </Radio>
              <Radio value={3} style={{ marginLeft: '20px', marginRight: '30px' }}>
                不适用
              </Radio>
            </Radio.Group>
            <div className='itemAttachmentCon' onClick={itemAttachmentCheck}>
              <Icon type='paper-clip' /> 2
            </div>
          </div>
        </div> */}
        {/* // */}
        <div className='notesCon'>
          <div className='notesLeftCon'>备注</div>
          <div className='notesRightCon'>
            <TextArea rows={4} disabled value='今天是个好天气,' />
          </div>
        </div>
        {/* // */}
        <QuestionBottomCon>
          <div className='questionBottomTitle'>问题可能原因</div>
          <div className='questionBottomCheckbox'>
            <Checkbox.Group style={{ width: '100%' }} disabled value={['A', 'C']}>
              <Row>
                <Col span={4}>
                  <Checkbox value='A'>管理元素</Checkbox>
                </Col>
                <Col span={4}>
                  <Checkbox value='B'>个人元素</Checkbox>
                </Col>
                <Col span={4}>
                  <Checkbox value='C'>病人元素</Checkbox>
                </Col>
                <Col span={4}>
                  <Checkbox value='D'>沟通元素</Checkbox>
                </Col>
                <Col span={4}>
                  <Checkbox value='E'>教育培训元素</Checkbox>
                </Col>
                <Col span={4}>
                  <Checkbox value='F'>其它元素</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
        </QuestionBottomCon>
      </QuestionCon>
    </Con>
  )
}

const Con = styled.div`
  min-height: 100%;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
`
const MessageBox = styled.div`
  height: 154px;
  line-height: 26px;
  padding: 10px 20px;
  background-color: #f2f2f2;
  font-size: 15px;
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
const QuestionCon = styled.div`
  margin-top: 10px;
  flex: 1;
  height: 0;
  font-size: 15px;

  .titleCon {
    height: 30px;
    line-height: 30px;
    display: flex;
    .titleLeftCon {
      flex: 1;
      width: 0;
    }
    .titleRightCon {
      width: 100px;
      text-align: right;
    }
  }
  .itemCon {
    box-sizing: border-box;
    height: 68px;
    border-bottom: 0.5px dashed #bbbbbb;
    .itemTitleCon {
      height: 28px;
      line-height: 28px;
    }
    .itemMidCon {
      margin-top: 5px;
      .itemAttachmentCon {
        display: inline-block;
        cursor: pointer;
      }
    }
  }
  .notesCon {
    box-sizing: border-box;
    height: 116px;
    padding: 10px 0;
    display: flex;
    border-bottom: 0.5px dashed #bbbbbb;
    .notesLeftCon {
      width: 50px;
    }
    .notesRightCon {
      flex: 1;
      width: 0;
    }
  }
`
const QuestionBottomCon = styled.div`
  box-sizing: border-box;
  padding: 10px 0;
  height: 70px;
  .questionBottomCheckbox {
    margin-top: 10px;
  }
`
