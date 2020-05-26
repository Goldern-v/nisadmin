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

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        // 修改
        if (params && params.formId) {
          let formName = getData();
          console.log(formName, "formName");
          trainingSettingApi.formData(params.formId).then((res: any) => {
            switch (formApplyModal.getFormCode) {
              case "FQA00001":
                return (formApplyModal.LCDJformContent = res.data);
                break;
              case "FQA00002":
                return (formApplyModal.RYZYformContent = res.data);
                break;
              case "FQA00003":
                return (formApplyModal.GFXZLformContent = res.data);
                break;
              case "FQA00004":
                return (formApplyModal.RYZZformContent = res.data);
                break;
              case "FQA00005":
                return (formApplyModal.CJJSformContent = res.data);
                break;
              case "FQA00006":
                return (formApplyModal.TSGWformContent = res.data);
                break;
              default:
                return (formApplyModal.YNJXformContent = res.data);
                break;
            }
          });
        } else {
          formApplyModal.cleanAllStepData();
        }
      }, 100);
    }
  }, [visible]);

  //保存表单
  const confirmSave = (actionType: 1 | 2 | undefined) => {
    setEditLoading(true);
    let data: any = getData();
    return trainingSettingApi.saveForm(actionType, data).then(res => {
      setEditLoading(false);
      if (actionType == 1) Message.success("保存草稿成功");
      if (actionType == 2) Message.success("提交成功");
      onOk();
    });
  };

  // 通过form值判断入参
  const getData = () => {
    const formArr: any = [
      formApplyModal.LCDJformContent,
      formApplyModal.CJJSformContent
    ];
    const key = Number(
      formApplyModal.getFormCode.substring(
        formApplyModal.getFormCode.length - 1
      )
    );
    console.log(formArr[key - 1], "formArr[key - 1]");
    return formArr[key - 1];
  };

  // 取消关闭
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
      title={params && params.formId ? "修改" : "新建"}
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
