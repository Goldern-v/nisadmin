import styled from 'styled-components'
import React from 'react'
import { Modal, Icon,Input,Radio } from 'antd'
import NurseHandBookService from '../services/NurseSatisfactionSurveyService'
import { message } from 'antd/es'
const { TextArea } = Input
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
  const bdstyle: React.CSSProperties = {maxHeight: "88vh"}
  const afterClose = () => {}
  const handleOk = (record: any) => {
    if (record.questionOption=="") {
      message.error('填写不能为空！')
      return
    }
      api.commitPaper( {
        
        questionOption:record.questionOption,
        optionContent:record.optionContent,
        optionScore:record.optionScore,
        choiceId:record.questionOption,
      })
      .then((res) => {
        message.success('保存成功')
        onOk && onOk()
    }, )
  }
  
  return <Modal
    title={"满意度调查表详情"}
    width={1000}
    bodyStyle={bdstyle}
    afterClose={afterClose}
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
            {item.sortNum}、<span className={item.questionType==1?"questionType":"questionType"}>{item.questionType==1?"[单选题]":"[问答题]"}</span>
          <p>{item.questionContent}{item.questionType==1?<span> （<input value={item.questionOption} style={{ width: 20 }}/>）</span>:""} </p>
          </div>
          {item.questionType==1&&previewPaperData?.questionList[idx]?.choiceList.map((e: any, i: any) =>
          // {e.questionOption}、{e.optionContent}({e.optionScore}分)
          <div className="options" key={`${idx}_${i}`}><span className={e.isSelected==1?"check":"dis"}><Icon type="check" style={{fontSize:"20px"}}/></span>
              <Radio
              className="options"
                value={item.questionOption}
              >
               {e.questionOption}、{e.optionContent}({e.optionScore}分)
              </Radio>
          </div>
          
          )}
          {item.questionType==2&&<div className="essayQuestion">
          <TextArea
                  rows={3}
                  style={{ width: 554 }}
                />&nbsp;&nbsp;{item.shortQuestionAnswer}</div>}
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
      text-align: center;
      
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
      width: 90%;
      font-size: 16px;
      display: flex;
      line-height: 22px ;
      span{
        width: 70px;
      }
      p{
        width: 80%;
      }
    }
    .options{
      font-size: 14px;
      height: 25px;
      line-height: 25px;
      margin-left: 10px;
      position: relative;
    }
    .essayQuestion{
      width: 80%;
      line-height: 22px ;
      min-height: 70px;
      font-size: 16px;
    }
    .check{
      color: #03b615;
      position: absolute;
      left: -4px;
      top: 4px;
    }
    .dis{
      display: none;
    }
  }
`
