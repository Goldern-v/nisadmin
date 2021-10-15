import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row, Select, Icon, Spin } from 'antd'
import NurseHandBookService from '../services/NurseSatisfactionSurveyService'
import { fileDownload } from 'src/utils/file/file'

const api = new NurseHandBookService();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
  previewPaperData?: any,
}
export default function editModal(props: Props) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp, previewPaperData } = props
  const [loading, setLoading] = useState(false)
  const handleOk = () => {}
  const bdstyle: React.CSSProperties = {maxHeight: "88vh"}
  const afterClose = () => {}
  
  return <Modal
    title={"满意度调查表详情"}
    width={1000}
    bodyStyle={bdstyle}
    afterClose={afterClose}
    confirmLoading={loading}
    okText={"保存"}
    centered
    visible={visible}
    onOk={() => {
      onOk()
    }}
    onCancel={() => onCancel()}>
    <Wrapper>
      <div className="page-item">
        <h1>《{previewPaperData?.text}》</h1>
        {previewPaperData?.questionList?.map((item: any, idx: any) =>
        <div className="body" key={idx}>
          <div className="title">
            {item.sortNum}、<span className={item.questionType==1?"questionType":"questionType essayQuestion"}>{item.questionType==1?"[单选题]":"[问答题]"}</span>
            {item.questionContent}
          </div>
          {previewPaperData?.questionList[idx]?.choiceList.map((item: any, i: any) =>
          <div className="options" key={`${idx}_${i}`}>{item.questionOption}、{item.optionContent}
          </div>
          )}
          
        </div>)}
      </div>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  margin: 20px auto;
  width: 760px;
  .page-item{
    width: 760px;
    min-height: 1000px;
    background-color: #fff;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 50%);
    padding: 20px 0;
    box-sizing: border-box;
    color: #000;
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 30px;
    &.null{
      font-size: 16px;
      color: #999;
      line-height: 500px;
      text-align: center;
    }
    .form-title{
      &>div{
        font-size: 24px;
        line-height: 36px;
      }
      font-weight: bold;
      text-align: center;
    }
    .align-center{
      text-align: center;
    }
    input{
      border: none;
      outline: none;
      
    }
    .underline, input.underline{
      border-bottom: 1px solid #000;
    }
    h1{
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
    .body{
      width: 90%;
      margin-left: 50px;
      margin-bottom: 20px;
    }
    .questionType{
      color: #f69d2a;
    }
    .title{
      font-size: 16px;
      display: flex;
      justify-content: start;
      line-height :  22px ;
      span{
        width: 80px;
      }
    }
    .options{
      font-size: 14px;
      height: 25px;
      line-height: 25px;
      margin-left: 10px;
    }
    .essayQuestion{
      margin-bottom: 100px;
    }
  }
`
