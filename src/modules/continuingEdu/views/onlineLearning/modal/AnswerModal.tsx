import styled from "styled-components";
import React, { useState } from "react";
import {
  Input,
  Modal,
  message as Message,
  Button,
  Radio,
  message,
  Checkbox
} from "antd";
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
export interface Props {
  params: any;
  visible: boolean;
  onCancel?: any;
  onOk?: any;
  onOkCallBack?: any;
}

export default function AnswerModal(props: Props) {
  const { visible, onOkCallBack, params } = props;
  const baseParams = {
    common: "",
    special: []
  } as any;
  const [answer, setAnswer] = useState(baseParams);

  const handleCancel = () => {
    if (answer.common || (answer.special && answer.special.length)) {
      onOkCallBack && onOkCallBack();
      setAnswer({});
    } else {
      message.warning("提交答案前请先选择或填写您认为正确的答案！");
    }
  };

  // 题目类型名称
  const typeName = (type: number) => {
    switch (type) {
      case 1:
        return "单选题";
      case 2:
        return "多选题";
      case 3:
        return "填空题";
      case 4:
        return "问答题";
      default:
        return "";
    }
  };

  // 题目类容类型
  const answerCon = (item: any) => {
    switch (item.questionType) {
      case 1:
        return (
          <RadioGroup
            value={answer.common}
            onChange={(e: any) =>
              setAnswer({ ...answer, common: e.target.value })
            }
          >
            {(item.answersList || []).map((answer: any, asIdx: any) => {
              return (
                <Radio
                  key={asIdx}
                  value={answer.optionLabel}
                  className="choiceCss"
                >
                  {answer.optionLabel}.{answer.optionContent}
                </Radio>
              );
            })}
          </RadioGroup>
        );
      case 2:
        return (
          <CheckboxGroup
            value={answer.special}
            onChange={(checkedValue: any) =>
              setAnswer({ ...answer, special: checkedValue })
            }
          >
            {(item.answersList || []).map((answer: any, asIdx: any) => {
              return (
                <Checkbox
                  key={asIdx}
                  value={answer.optionLabel}
                  className="choiceCss"
                >
                  {answer.optionLabel}.{answer.optionContent}
                </Checkbox>
              );
            })}
          </CheckboxGroup>
        );
      default:
        return (
          <Input.TextArea
            rows={item.questionType === 3 ? 2 : 4}
            placeholder={
              item.questionType === 3
                ? "请输入您的答案，若有多个请用空格隔开"
                : "请输入你的答案"
            }
            style={{ width: "100%" }}
            value={answer.common}
            onChange={(e: any) =>
              setAnswer({ ...answer, common: e.target.value })
            }
          />
        );
    }
  };

  return (
    <Wrapper>
      <Modal
        width={500}
        visible={visible}
        title={typeName(params.questionType)}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={handleCancel}>
              提交答案
            </Button>
          </div>
        }
      >
        <div className="question-list">
          <div className="question-item">
            <div className="question-content">
              <span className="index">1、</span>
              <span className="question-type">
                [{typeName(params.questionType)}]
              </span>
              <span className="question-desc">{params.questionContent}</span>
            </div>
            {answerCon(params)}
          </div>
        </div>
      </Modal>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  /deep/ .ant-modal-body {
    .all {
    }
    .title {
      margin-bottom: 8px !important;
    }
    .content {
      list-style-type: none !important;
      line-height: 25px !important;
    }
  }
  .question-list {
    margin-bottom: 15px;
    .rightAnswer {
      color: blue;
      margin: 5px 0 0 20px
    }
  }
  .answerModal {
    /deep/ .ant-modal-close {
      display: none !important; 
    }
    /deep/ .ant-modal-close-x {
      display: none !important;
    }
  }
  .question-item{
    padding-left: 10px;
    font-size: 13px;
    margin-top: 15px;
    .question-type{
      color: #F59A23;
    }
    .question-content {
      margin-bottom: 5px;
    }
    .answer-content{
      padding: 0 5px;
      &pre{
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
    .choice-item{
      position: relative;
      margin-right: 15px;
      .correct-choice{
        position: absolute;
        top: -2px;
        left: -2px;
        img{
          width: 14px;
        }
      }
    }
    .refer{
      margin-right:15px;
      cursor: pointer;
      color:#027DB4;
      display: inline-block;
      text-decoration: underline;
    }
    .de-score{
      .de-score-ipt{
        margin: 0 2px;
        width: 60px;
        .ant-input-number-input{
          color: red;
        }
        .ant-input-number-handler-wrap{
          display:none;
        }
      }
    }
    pre{
      white-space: pre-wrap;
      word-break: break-all;
      &.answer{
        color: #00f;
      }
    }
  }
  .choiceCss {
    display: block;
    margin-left: 20px;
    line-height: 25px;
  }
}

`;
