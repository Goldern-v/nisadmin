import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Button, Tabs } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import SelectLabel from "./components/SelectLabel";
import Header from "./components/Header";
import Table from "./components/Table";

const { TabPane } = Tabs;

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function PushModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const checkForm = () => {};

  // 弹窗必填项
  const rules: Rules = {};

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
        // const { noticeContent } = params;
        // current.setFields({ noticeContent });
      }, 100);
    }
  }, [visible]);

  const confirm = () => {
    let current = formRef.current;
    if (current) {
    }
  };

  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Wrapper>
      <Modal
        width={1100}
        visible={visible}
        onCancel={handleCancel}
        onOk={checkForm}
        confirmLoading={editLoading}
        title="题库选择"
        footer={
          <div style={{ textAlign: "center" }}>
            <Button onClick={handleCancel}>取消</Button>
            <Button>预览试卷</Button>
            <Button type="primary" onClick={handleCancel}>
              确定
            </Button>
          </div>
        }
      >
        <Tabs defaultActiveKey="1" type="card" style={{ minHeight: "500px" }}>
          <TabPane tab="题库选择" key="1" style={{ display: "flex" }}>
            <div
              className="select"
              style={{
                width: "24%",
                borderRight: "1px solid #ccc",
                height: "450px"
              }}
            >
              <SelectLabel />
            </div>
            <div className="content" style={{ width: "76%" }}>
              <Header />
              <Table />
            </div>
          </TabPane>
          <TabPane tab="我已选择" key="2">
            222
          </TabPane>
        </Tabs>
      </Modal>
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
