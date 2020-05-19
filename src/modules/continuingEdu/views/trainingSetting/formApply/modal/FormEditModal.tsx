import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Modal,
  message as Message,
  Select,
  Button
} from "antd";
import Form from "src/components/Form/Form";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function FormEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const checkForm = () => {};

  useEffect(() => {
    if (visible) {
      setTimeout(() => {}, 100);
    }
  }, [visible]);

  const confirmSave = () => {};

  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      width={1000}
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.id ? "修改" : "新建"}
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleCancel}>取消</Button>
          <Button>存草稿</Button>
          <Button type="primary" onClick={confirmSave}>
            提交审核
          </Button>
        </div>
      }
    >
      <Wrapper />
    </Modal>
  );
}
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
`;
