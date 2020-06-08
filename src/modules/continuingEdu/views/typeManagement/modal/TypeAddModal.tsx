import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Select } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { appStore } from "src/stores";
import { typeManagementApi } from "../api/TypeManagementApi";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function TypeEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [query, setQuery] = useState({
    firstLevelMenuId: "",
    secondLevelMenuId: ""
  });
  const [firstLevelMenu, setFirstLevelMenu] = useState([] as any[]);
  const [secondLevelMenu, setSecondLevelMenu] = useState([] as any[]);
  const formRef = React.createRef<Form>();

  // 弹窗必填项
  const rules: Rules = {
    name: val => !!val || "名称不能为空",
    pId: val => !!val || "请根据一级菜单选择对应的二级菜单",
    teachingMethod: val => !!val || "教学方式不能为空"
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
        // 获取一级、二级菜单下拉框
        typeManagementApi.getMenuTree().then(res => {
          if (res.data) {
            setFirstLevelMenu(res.data);
            let target = res.data.find(
              (item: any) => item.id == query.firstLevelMenuId
            );
            if (target) setSecondLevelMenu(target.childList || []);
          }
        });
        current.clear();
        setQuery({ ...query, firstLevelMenuId: "" });
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
            let newParams = current.getFields();
            newParams.pId = Number(newParams.pId);
            newParams.teachingMethod = Number(newParams.teachingMethod);
            setEditLoading(true);
            typeManagementApi.addTypeData(newParams).then(res => {
              setEditLoading(false);
              let msg = "添加类型成功";
              Message.success(msg);
              onOk();
            });
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
      title="添加类型"
    >
      <Wrapper>
        <Form ref={formRef} rules={rules}>
          <Row>
            <Col span={4} className="label">
              一级菜单:
            </Col>
            <Col span={20}>
              <Form.Field name="">
                <Select
                  value={query.firstLevelMenuId}
                  style={{ width: 120 }}
                  onChange={(id: any) => {
                    setQuery({
                      ...query,
                      firstLevelMenuId: id,
                      secondLevelMenuId: ""
                    });
                    let newArr = [] as any[];
                    let target = firstLevelMenu.find(
                      (item: any) => item.id == id
                    );
                    if (target && target.childList) newArr = target.childList;
                    setSecondLevelMenu(newArr);
                  }}
                >
                  {firstLevelMenu.map((item: any, idx: number) => (
                    <Select.Option value={item.id.toString()} key={idx}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={4} className="label">
              二级菜单:
            </Col>
            <Col span={20}>
              <Form.Field name="pId">
                <Select
                  value={query.secondLevelMenuId}
                  style={{ width: 120 }}
                  onChange={(id: any) =>
                    setQuery({ ...query, secondLevelMenuId: id })
                  }
                >
                  {secondLevelMenu.map((item: any, idx: number) => (
                    <Select.Option value={item.id.toString()} key={idx}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={4} className="label">
              类型名称:
            </Col>
            <Col span={20}>
              <Form.Field name="name">
                <Input placeholder="名称" />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={4} className="label">
              教学方式:
            </Col>
            <Col span={20}>
              <Form.Field name="teachingMethod">
                <Select defaultValue="1">
                  <Select.Option value="1">学习</Select.Option>
                  <Select.Option value="2">培训</Select.Option>
                  <Select.Option value="3">考试</Select.Option>
                  <Select.Option value="4">练习</Select.Option>
                  <Select.Option value="5">实操</Select.Option>
                  <Select.Option value="6">演练</Select.Option>
                </Select>
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
