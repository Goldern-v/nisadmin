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
  const [quesContent, setQuesContent] = useState({
    questionType: 1,
    questionContent: "",
    answerList: [],
    answer: {
      rightAnswer: "",
      suggestedAnswer: ""
    }
  });

  const questionType = (data: any) => {
    const type = ["单选题", "多选题", "填空题", "问答题"];
    return type[data - 1];
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let obj: any = {
          questionIdList: [params]
        };
        setEditLoading(true);
        stepServices.previewPaper(obj).then((res: any) => {
          setEditLoading(false);
          setQuesContent(res.data.questionList[0]);
        });
      }, 100);
    }
  }, [visible]);

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
        title={questionType(quesContent.questionType)}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={handleCancel}>
              我知道了
            </Button>
          </div>
        }
      >
        {/* //1单选题、2多选题、3填空题、4、问答题 */}
        {quesContent &&
        (quesContent.questionType === 1 || quesContent.questionType === 2) ? (
          <Content>
            <div className="title">
              {quesContent.questionContent.replace(/##/g, "____")}
            </div>
            <ul>
              {quesContent.answerList.map((item: any, index: any) => (
                <li className="content" key={index}>
                  {item.optionLabel}. &nbsp;{item.optionContent}
                </li>
              ))}
            </ul>
            <div>
              标准答案：
              {quesContent.answerList.map((item: any, index: any) => (
                <span>
                  {item.isRight === 1 && <span>{item.optionLabel}</span>}
                </span>
              ))}
            </div>
          </Content>
        ) : quesContent.questionType == 3 ? (
          <Content>
            <div className="title">
              {quesContent.questionContent.replace(/##/g, "____")}
            </div>
            <div>标准答案：{quesContent.answer.rightAnswer}</div>
          </Content>
        ) : quesContent.questionType == 4 ? (
          <Content>
            <div className="title">
              {quesContent.questionContent.replace(/##/g, "____")}
            </div>
            <div>标准答案：{quesContent.answer.suggestedAnswer}</div>
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
  font-size: 14px !important;
  .title {
    margin-bottom: 8px !important;
  }
  .content {
    list-style-type: none !important;
    line-height: 20px !important;
  }
`;
