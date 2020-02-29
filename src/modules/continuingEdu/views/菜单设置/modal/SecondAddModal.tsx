import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, Modal, message as Message, Steps } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { meunSettingApi } from "../api/MeunSettingApi";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "./modal-two/SelectPeopleModal";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
}
const { Step } = Steps;

export default function SecondEditModal(props: Props) {
  // const selectPeopleModal = createModal(SelectPeopleModal);
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const checkForm = () => {};
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };
  // 初始化
  useEffect(() => {
    console.log(props.params);
  }, [params]);

  return (
    <Spin>
      <Modal
        width={800}
        visible={visible}
        onCancel={handleCancel}
        onOk={checkForm}
        confirmLoading={editLoading}
        title="添加二级菜单"
        footer={[
          <Button key="test">上一步</Button>,
          <Button key="test">取消</Button>,
          <Button key="test">下一步</Button>,
          <Button key="test" type="primary">
            确认
          </Button>
        ]}
      >
        <Wrapper>
          <Steps size="small" current={0}>
            <Step title="菜单设置" />
            <Step title="提交审核设置" />
            <Step title="完成" />
          </Steps>
          <div />
        </Wrapper>
      </Modal>
    </Spin>
  );
}
const Spin = styled.div`
  /deep/ .ant-modal-footer {
    text-align: center !important;
  }
`;
const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
