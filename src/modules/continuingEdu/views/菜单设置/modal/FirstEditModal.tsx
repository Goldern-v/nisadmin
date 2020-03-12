import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { meunSettingApi } from "../api/MeunSettingApi";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
}

export default function FirstEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();

  const rules: Rules = {
    name: val => !!val || "名称不能为空",
    sort: val =>
      isNaN(Number(val)) || val === "" || Number(val) < 0
        ? "排序必填且为正整数"
        : ""
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
        if (params.id) {
          const { name, sort } = params;
          current.setFields({
            name,
            sort
          });
        } else {
          current.clear();
          const { sort } = params;
          current.setFields({
            sort
          });
        }
      }, 100);
    }
  }, [visible, params]);

  const checkForm = () => {
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            newParams.sort = Number(newParams.sort);
            if (params.id) {
              newParams.id = params.id;
              setEditLoading(true);
              meunSettingApi.updateFirst(newParams).then(res => {
                setEditLoading(false);
                let msg = "一级菜单修改成功";
                Message.success(msg);
                onOk();
              });
            } else {
              meunSettingApi.saveFirst(newParams).then(res => {
                setEditLoading(false);
                let msg = "一级菜单创建成功";
                Message.success(msg);
                onOk();
              });
            }
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
      title={params.id ? "修改一级菜单" : "添加一级菜单"}
    >
      <Wrapper>
        <Form ref={formRef} rules={rules}>
          <Row>
            <Col span={4} className="label">
              名称:
            </Col>
            <Col span={20}>
              <Form.Field name="name">
                <Input placeholder="名称" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={4} className="label">
              排序:
            </Col>
            <Col span={20}>
              <Form.Field name="sort">
                <Input placeholder="排序" />
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
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
`;
