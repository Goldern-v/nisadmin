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
  const obj: any = {
    LCDJFormContent: "FQA00001",
    RYZYFormContent: "FQA00002",
    GFXZLFormContent: "FQA00003",
    RYZZFormContent: "FQA00004",
    CJJSFormContent: "FQA00005",
    TSGWFormContent: "FQA00006",
    YNJXFormContent: "FQA00007"
  };
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        // 修改
        if (params && params.formId) {
          trainingSettingApi.formData(params.formId).then((res: any) => {
            res.data.id = params.formId;
            allData(res.data);
            // for (let key in obj) {
            //   if (formApplyModal.getFormCode === obj[key]) {
            //     formApplyModal[key] = res.data;
            //   }
            // }
            // formApplyModal.initData(res.data);
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
    return trainingSettingApi.saveForm(actionType, getData()).then(res => {
      setEditLoading(false);
      if (actionType == 1) Message.success("保存草稿成功");
      if (actionType == 2) Message.success("提交成功");
      onOk();
    });
  };

  // 通过form值判断入参
  const getData = () => {
    const formArr: any = [
      formApplyModal.LCDJFormContent,
      formApplyModal.RYZYFormContent,
      formApplyModal.GFXZLFormContent,
      formApplyModal.RYZZFormContent,
      formApplyModal.CJJSFormContent,
      formApplyModal.TSGWFormContent,
      formApplyModal.YNJXFormContent
    ];
    const key = Number(
      formApplyModal.getFormCode.substring(
        formApplyModal.getFormCode.length - 1
      )
    );
    return formArr[key - 1];
  };

  // 判断回显哪张表单
  const allData = (data: any) => {
    switch (formApplyModal.getFormCode) {
      case "FQA00001":
        return (formApplyModal.LCDJFormContent = data);
        break;
      case "FQA00002":
        return (formApplyModal.RYZYFormContent = data);
        break;
      case "FQA00003":
        return (formApplyModal.GFXZLFormContent = data);
        break;
      case "FQA00004":
        return (formApplyModal.RYZZFormContent = data);
        break;
      case "FQA00005":
        return (formApplyModal.CJJSFormContent = data);
        break;
      case "FQA00006":
        return (formApplyModal.TSGWFormContent = data);
        break;
      default:
        return (formApplyModal.YNJXFormContent = data);
        break;
    }
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
