import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { Modal, Radio, Input, DatePicker, message } from "antd";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { trainingSettingApi } from "../../api/TrainingSettingApi";
import moment from "moment";

export interface Props {
  params: any;
  visible: boolean;
  onCancel: any;
  onOkCallBack?: any;
}

export default observer(function CheckModal(props: Props) {
  const { visible, onCancel, params, onOkCallBack } = props;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [auditResult, setAuditResult] = useState(1);
  const [auditRemark, setAuditRemark] = useState("");

  let userName = authStore.user ? authStore.user.empName : "";

  const handleOk = () => {
    setLoading(true);
    let obj = {
      taskId: params.taskId,
      password,
      auditResult,
      auditRemark
    };
    trainingSettingApi.auditForm(obj).then(
      res => {
        setLoading(false);
        message.success("审核操作成功");
        appStore.history.push(`/continuingEdu/资质准入审核`);
        onOkCallBack && onOkCallBack();
      },
      () => setLoading(false)
    );
  };

  useLayoutEffect(() => {
    if (visible) {
      setAuditResult(1);
      setAuditRemark("");
    }
  }, [visible]);

  const handleCancel = () => {
    if (loading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      centered
      confirmLoading={loading}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={params.title}
    >
      <Wrapper>
        <div className="row">
          <span className="label w-60">审核结果:</span>
          <span className="content">
            <Radio.Group
              value={auditResult}
              onChange={(e: any) => setAuditResult(e.target.value)}
            >
              <Radio value={1}>通过</Radio>
              <Radio value={-1}>退回</Radio>
            </Radio.Group>
          </span>
        </div>
        <div className="row">
          <div className="label w-60">审核意见:</div>
          <div className="content">
            <Input.TextArea
              autosize={{
                minRows: 4
              }}
              disabled={loading}
              value={auditRemark}
              onChange={(e: any) => setAuditRemark(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <span className="label w-60 m-5">密码:</span>
          <span className="content">
            <Input.Password
              placeholder="请输入账号密码"
              value={password}
              style={{ width: "69%" }}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </span>
        </div>

        <div className="row">
          <div
            className="label w-60"
            style={{ position: "relative", top: "2px" }}
          >
            审 核 人:
          </div>
          <div className="content">
            <Input
              size="small"
              value={userName}
              disabled={true}
              style={{ width: "80px", textAlign: "center" }}
            />
            <span style={{ margin: "0 5px 0 10px" }}>审核时间:</span>
            <DatePicker
              size="small"
              showTime
              value={moment()}
              disabled={true}
              format="YYYY-MM-DD HH:mm"
              style={{ width: "150px", minWidth: "150px!important" }}
            />
          </div>
        </div>
      </Wrapper>
    </Modal>
  );
});

const Wrapper = styled.div`
  .row {
    margin-bottom: 10px;
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    .label {
      float: left;
      text-align: right;
      margin-right: 15px;
      &.w-60 {
        width: 80px;
      }
      &.m-5 {
        margin-top: 5px;
      }
    }
    .content {
      overflow: hidden;
      padding-right: 50px;
    }
  }
`;
