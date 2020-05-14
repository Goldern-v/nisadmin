import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Row, Col, Modal, message as Message, Input, Button } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
const TextArea = Input.TextArea;

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function PermissionSettingsModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();

  // 弹窗必填项
  const rules: Rules = {};

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
      }, 100);
    }
  }, [visible]);

  const checkForm = () => {
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          current = formRef.current;
          if (current) {
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title="菜单权限设置"
      okText="保存"
    >
      <Wrapper>
        <Form ref={formRef} rules={rules}>
          <Row>
            <Col span={4} className="label">
              添加人员:
            </Col>
            <Col span={20}>
              <Button>+ 添加</Button>
            </Col>
          </Row>
          <Row className="row">
            <Col span={4} className="label" />
            <Col span={20}>
              <Form.Field name="teachingMethod">
                <TextArea rows={4} />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .row {
    margin-top: 15px;
  }
  .label {
    line-height: 32px;
  }
`;
