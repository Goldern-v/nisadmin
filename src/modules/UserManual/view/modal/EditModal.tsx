import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Switch } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { setUserManualApi } from "../api/SetUserManualApi";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
}

export default function EditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();

  const rules: Rules = {
    type: val => !!val || "目录名不能为空",
    orderNo: val => !!val || "排序号不能为空"
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
        if (params.id) {
          const { type, orderNo, icon } = params;
          current.setFields({
            type,
            orderNo,
            icon
          });
        } else {
          current.clear();
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
            let id = params.id || null;
            let newParams = current.getFields();
            if (id) {
              newParams.id = id;
              newParams.orderNo = Number(newParams.orderNo);
              newParams.isShow = params.isShow;
              newParams.icon = params.icon;
              setEditLoading(true);
            } else {
              newParams.isShow = true;
            }
            console.log(newParams, "ppppppppp");
            setUserManualApi.saveOrUpdate(newParams).then(
              res => {
                setEditLoading(false);
                let msg = "目录创建成功";
                if (params.id) msg = "目录修改成功";
                Message.success(msg);
                onOk();
              },
              err => {
                setEditLoading(false);
              }
            );
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
      title={params.id ? "修改目录" : "新建目录"}
    >
      <Wrapper>
        <Form ref={formRef} rules={rules}>
          <Row>
            <Col span={4} className="label">
              目录名:
            </Col>
            <Col span={20}>
              <Form.Field name="type">
                <Input placeholder="目录名" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={4} className="label">
              排序号:
            </Col>
            <Col span={20}>
              <Form.Field name="orderNo">
                <Input placeholder="排序号" />
              </Form.Field>
            </Col>
          </Row>
          {/* <Row>
            <Col span={4} className="label">
              是否显示:
            </Col>
            <Col span={20}>
              <Form.Field name="isShow">
                <Switch
                  size="small"
                  defaultChecked={!params.isShow}
                  onChange={(check: any, record: any) => {
                    console.log(check, record, "pppppppp");
                  }}
                />
              </Form.Field>
            </Col>
          </Row> */}
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
