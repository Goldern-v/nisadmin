import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Modal, message as Message, Button } from "antd";
import FormCommon from "./formCommon/FormCommon";

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
      width={860}
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
      <FormCommon />
    </Modal>
  );
}
