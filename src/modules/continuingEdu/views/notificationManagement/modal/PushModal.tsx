import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Button } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { notificationApi } from "../api/NotificationApi";
import { appStore } from "src/stores";
const TextArea = Input.TextArea;

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function PushModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const checkForm = () => {};

  // 弹窗必填项
  const rules: Rules = {
    noticeContent: val => !!val || "通知详情不能为空"
  };

  useEffect(() => {
    console.log(props.params, "params1111");
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
          const { noticeContent } = params;
          current.setFields({ noticeContent });
      }, 100);
    }
  }, [visible]);

  const confirm = () => {
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          current = formRef.current;
          if (current) {
            let newParams = params;
            if (params.id) {
              newParams.noticeContent = current.getFields().noticeContent
              setEditLoading(true);
              notificationApi.pushData(newParams).then(res => {
                setEditLoading(false);
                Message.success("已推送！");   
                onOk();          
              })
            } else {

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
      width={750}
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.id ? "推送通知" : "推送详情"}
      footer={
        params.id ? (
          <div style={{ textAlign: "center" }}>
            <Button onClick={handleCancel} >取消</Button>
            <Button type="primary" onClick={confirm} loading={editLoading}>推送</Button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={handleCancel}>我知道了</Button>
          </div>
        )
      }

    >
      <Wrapper>
        <div />
        <Form ref={formRef} rules={rules}>
          <Row>
            <Col span={3} className="label">
              接收人:
            </Col>
            <Col span={21}>
              <ul className="ul">
              {params.empNames?.map((item: any, index: any) => (
                <li key={index} className="empNames">{item}</li>
              ))}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              通知详情:
            </Col>
            <Col span={21}>
              <Form.Field name="noticeContent">
                <TextArea
                  placeholder="请输入通知详情～"
                  autosize={{ minRows: 6 }}
                  disabled={!params.id}
                />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
  .ul {
    max-height: 148px;
    overflow-y: auto;
    margin-bottom: 30px;
    border: 1px dashed #cccccc;
    background: rgba(245,245,245,1);
    padding: 15px 15px 5px 15px!important;
    box-sizing: border-box;
    border-radius: 2px;
    .empNames {
      display: inline-block;
      padding: 0 7px;
      line-height: 23px;
      background: #00A680;
      margin: 0 10px 10px 0;
      border-radius: 5px;
      color: white;
    }
  }
`;
