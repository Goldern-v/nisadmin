import React, { useState, useEffect } from "react";
import { Modal, message as Message, Button, Spin } from "antd";
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
  const [loading, setLoading] = useState(false);
  const checkForm = () => {};
  // const obj: any = {
  //   LCDJFormContent: "FQA00001",
  //   RYZYFormContent: "FQA00002",
  //   GFXZLFormContent: "FQA00003",
  //   RYZZFormContent: "FQA00004",
  //   CJJSFormContent: "FQA00005",
  //   TSGWFormContent: "FQA00006",
  //   YNJXFormContent: "FQA00007"
  // };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        // 修改
        if (params && params.formId) {
          setLoading(true);
          formApplyModal.cleanAllStepData();
          trainingSettingApi.formData(params.formId).then((res: any) => {
            setLoading(false);
            res.data.id = params.formId;
            formApplyModal.allData(res.data, formApplyModal.getFormCode);
            // for (let key in obj) {
            //   if (formApplyModal.getFormCode === obj[key]) {
            //     formApplyModal[key as string] = res.data;
            //   }
            // }
          });
        } else {
          // 清空表单数据
          formApplyModal.cleanAllStepData();
          let obj = {
            formCode: formApplyModal.getFormCode
          };
          // 获取表单基本信息
          trainingSettingApi.getAutoGenerateItems(obj).then((res: any) => {
            formApplyModal.allData(res.data, formApplyModal.getFormCode);
          });
        }
      }, 100);
    }
  }, [visible, formApplyModal.getFormCode]);

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

  // 取消关闭
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      width={900}
      bodyStyle={{ background: "#ccc" }}
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
      <Spin spinning={loading}>
        <FormCommon />
      </Spin>
    </Modal>
  );
}
