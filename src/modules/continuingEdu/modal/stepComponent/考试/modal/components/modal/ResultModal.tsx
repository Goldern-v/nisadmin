import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Button, Tabs } from "antd";
import { stepServices } from "../../../../services/stepServices";

export interface Props {
  params: any;
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function ResultModal(props: Props) {
  const { visible, onCancel, onOk, params } = props;
  const [editLoading, setEditLoading] = useState(false);
  const checkForm = () => {};
  const {
    questionContent,
    choiceQuestionList,
    labelList,
    questionType,
    answerContent,
    questionLabels
  } = params;

  // 选择题
  const choiceList = (choiceQuestionList || [])
    .concat()
    .sort((a: any, b: any) => {
      return a.serialNum - b.serialNum;
    });
  const Options = () => {
    return choiceList.map((item: any, idx: number) => {
      return (
        <div className="option" key={idx}>{`${item.questionOption}. ${
          item.answerContent
        }`}</div>
      );
    });
  };
  const CorrectOptions = () => {
    let correctArr: any[] = [];
    correctArr = (choiceList || [])
      .filter((item: any) => item.isRight == true)
      .map((item: any) => item.questionOption);

    return correctArr.join("、");
  };
  const Labels = () => {
    return (labelList || [])
      .filter((item: any) => item.hided == false)
      .map((item: any, idx: number) => {
        return (
          <div className="label-box" key={idx}>
            <span className="label-name">{item.labelContent}</span>
            <span>({item.questionCount || 0})</span>
          </div>
        );
      });
  };

  // 填空题
  const TKLabels = () => {
    return (questionLabels || [])
      .filter((item: any) => item.hided == false)
      .map((item: any, idx: number) => {
        return (
          <div className="label-box" key={idx}>
            <span className="label-name">{item.labelContent}</span>
            <span>({item.questionCount || 0})</span>
          </div>
        );
      });
  };
  const FormatAnswerContent = () => {
    let formatContent = "";
    if (answerContent) formatContent = answerContent.replace(/\n/g, " ");
    return formatContent;
  };
  const FormatQustionContent = () => {
    let formatContent = "";
    if (questionContent) formatContent = questionContent.replace(/##/g, "____");
    return <WrapPre>{formatContent}</WrapPre>;
  };

  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Wrapper>
      <Modal
        width={500}
        visible={visible}
        onCancel={handleCancel}
        onOk={checkForm}
        confirmLoading={editLoading}
        title={questionType}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={handleCancel}>
              我知道了
            </Button>
          </div>
        }
      >
        {questionType &&
        (questionType === "单选题" || questionType === "多选题") ? (
          <Content>
            <div className="title">
              <WrapPre>{questionContent}</WrapPre>
            </div>
            {Options()}
            <div className="answer">标准答案：{CorrectOptions()}</div>
            {labelList && (
              <span className="label-con">
                <span>标签：</span>
                {Labels()}
              </span>
            )}
          </Content>
        ) : questionType === "填空题" ? (
          <Content>
            <div className="title">{FormatQustionContent()}</div>
            <div className="answer">标准答案：{FormatAnswerContent()}</div>
            {questionLabels && (
              <div className="label-con">
                <span>标签：</span>
                {TKLabels()}
              </div>
            )}
          </Content>
        ) : questionType === "问答题" ? (
          <Content>
            <div className="title">
              <WrapPre>{questionContent || ""}</WrapPre>
            </div>
            <div className="answer">
              <WrapPre>标准答案：{answerContent || ""}</WrapPre>
            </div>
            {questionLabels && (
              <div className="label-con">
                <span>标签：</span>
                {TKLabels()}
              </div>
            )}
          </Content>
        ) : (
          ""
        )}
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
`;
const Content = styled.div`
  margin: 8px 6px;
  font-size: 12px;
  .title {
    margin-bottom: 2px;
  }
  .option {
    margin-left: 40px;
  }
  .answer {
    margin-top: 6px;
  }
  .label-box {
    margin-top: 5px;
    padding: 1px 8px;
    border-radius: 2px;
    border: 1px solid rgba(204, 204, 204, 1);
    margin-right: 10px;
    display: inline-block;
    .label-name {
      color: #6077c7;
    }
  }
`;
const WrapPre = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-bottom: 0;
`;
