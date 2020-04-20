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
  const [quesType, setQuesType] = useState({});
  const checkForm = () => {};

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let obj: any = {
          questionIdList: [params]
        };
        setEditLoading(true);
        stepServices.previewPaper(obj).then((res: any) => {
          setEditLoading(false);
          setQuesType(res.data.questionList[0]);
          console.log(quesType, "quesType", res.data.questionList[0]);
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
        title="题库选择"
        footer={
          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={handleCancel}>
              我知道了
            </Button>
          </div>
        }
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .tabs {
    display: inline-block;
    width: 100px;
    border-right: 1px solid #ccc;
  }
  .content {
    width: 100%;
    background: red;
  }
  .ant-modal-content / deep/ .ant-modal-body {
    padding: 0 !important;
    margin-top: 5px;
  }
`;
