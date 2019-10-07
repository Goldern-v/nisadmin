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
  let record = props.detailData.record
  let detailData:any = {
    master:[],
    itemGroupList:[],
    itemCount:[],
    userList:[],
    bedNurseList:[],
    causeList:[]
  }

  let [messageBoxData, setMessageBoxData]: any = useState({})
  let [itemConData, setItemConData]: any = useState([])
  let [itemCount, setItemCount]: any = useState({})
  let [userList, setUserList]: any = useState([])
  let [bedNurseList, setBedNurseList]: any = useState([])
  let [onlyReadError, setOnlyReadError]: any = useState(false)
  let [causeList, setCauseList]: any = useState([])

  useEffect(() => {
    if (detailData.master) {
      setMessageBoxData(detailData.master)
    }
    if (detailData.itemGroupList) {
      setItemConData(
        detailData.itemGroupList.map((item: any, index: number) => {
          return { ...item, index: numToChinese(index + 1) }
        })
      )
    }
    if (detailData.itemCount) {
      setItemCount(detailData.itemCount)
    }
    if (detailData.userList) {
      setUserList(detailData.userList)
    }
    if (detailData.bedNurseList) {
      setBedNurseList(detailData.bedNurseList)
    }
    if (detailData.causeList) {
      setCauseList(detailData.causeList)
    }
  }, [])

  return (
    <Wrapper>
      <MessageBox>
        <div className='boxLeft'>
          <div>查房时间：2019-11-12</div>
          <div>查检病区：神经内科护理单元</div>
        </div>
        <div className='boxRight'>
          <div>检查者：王大锤 王小蒙</div>
          <div>状态：待质控组长审核</div>
        </div>
      </MessageBox>
      <ContentCon>
      {itemConData.map((itemGroup: any, itemGroupIndex: number) => (
          <QuestionItem key={itemGroupIndex}>
            <div className='titleCon'>
              <div className='titleLeftCon'>
                {itemGroup.index}、{itemGroup.qcItemTypeName}
              </div>
            </div>
            {itemGroup.itemList.map((item: any, itemIndex: number) => (
              <div className='itemCon' key={itemIndex}>
                <div className='itemQuestionCon'>
                  <Radio.Group value="有问题" disabled buttonStyle='solid'>
                    <Radio value={'无问题'} style={{ marginLeft: '20px', marginRight: '30px' }}>
                      无问题
                    </Radio>
                    <Radio value={'无问题'} style={{ marginLeft: '20px', marginRight: '30px' }}>
                      无问题
                    </Radio>
                  </Radio.Group>
                  {}
                  <div className='itemAttachmentCon'>
                    {item.attachUrls && (
                      <Zimage
                        text={
                          <span>
                            <Icon type='paper-clip' /> {item.attachUrls.split(',').length}
                          </span>
                        }
                        list={item.attachUrls.split(',')}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </QuestionItem>
        ))}
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
    margin: 5px 0 0;
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
    min-height: 60px;
    padding: 4px 0;
    border-bottom: 0.5px dashed #bbbbbb;
    .itemQuestionCon {
      margin-top: 5px;
      font-size: 12px;
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
  .notesCon {
    box-sizing: border-box;
    min-height: 116px;
    padding: 10px 0;
    display: flex;
    border-bottom: 0.5px dashed #bbbbbb;
    .notesLeftCon {
      width: 34px;
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
