import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Modal, message as Message, Button } from "antd";
import FormCommon from "./formCommon/FormCommon";
import { trainingSettingApi } from "../../api/TrainingSettingApi";
import { formApplyModal } from "../FormApplyModal";

export interface Props {
  visible: boolean;
  params?: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function FormEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const checkForm = () => {};

  //保存表单
  const confirmSave = (actionType: 1 | 2 | undefined) => {
    setEditLoading(true);
    let data: any = formApplyModal.getData();
    return trainingSettingApi.saveForm(actionType, data).then(res => {
      setEditLoading(false);
      if (actionType == 1) Message.success("保存草稿成功");
      if (actionType == 2) Message.success("提交成功");
      onOk();
    });
  };

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
          <Button onClick={() => confirmSave(1)}>存草稿</Button>
          <Button type="primary" onClick={() => confirmSave(2)}>
            提交审核
          </Button>
        </div>
      }
    >
      <FormCommon />
    </Modal>
  );
}
