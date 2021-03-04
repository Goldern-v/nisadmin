import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Select } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { mainPageApi } from "../api/MainPageApi";
import { mainPageModal } from '../MainPageModal'
import { appStore } from "src/stores";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function TypeEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();


  // 弹窗必填项
  const rules: Rules = {
    name: val => !!val || "名称不能为空",
    teachingMethod: val => !!val || "教学方式不能为空",
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
          let data: any = { ...params };
          const teachingMethodList = [
            "学习",
            "培训",
            "考试",
            "练习",
            "实操",
            "演练"
          ];
          data.teachingMethod = teachingMethodList[params.teachingMethod - 1];
          const { name, sort, teachingMethod, trainingKeyPointId, knowledgePointDivisionId, learningFormId } = data;
          current.setFields({
            name,
            sort,
            teachingMethod
          });
          mainPageModal.trainingKeyPointTreeId = trainingKeyPointId || '';
          mainPageModal.knowledgePointDivisionTreeId = knowledgePointDivisionId || '';
          mainPageModal.learningFormTreeId = learningFormId || '';
        } else {
          current.clear();
          const { sort, teachingMethod } = params;
          current.setFields({
            sort,
            teachingMethod
          });

        }
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
            newParams.sort = Number(newParams.sort);
            newParams.trainingKeyPointId = mainPageModal.trainingKeyPointTreeId;
            newParams.knowledgePointDivisionId = mainPageModal.knowledgePointDivisionTreeId;
            newParams.learningFormId = mainPageModal.learningFormTreeId;
            if (params.id) {
              newParams.id = params.id;
              delete newParams.teachingMethod;
              setEditLoading(true);
              if (appStore.HOSPITAL_ID == 'hj') {
                updateTypeDataHJ(newParams)
              } else {
                mainPageApi.updateTypeData(newParams).then(res => {
                  setEditLoading(false);
                  let msg = "类型修改成功";
                  Message.success(msg);
                  onOk();
                });
              }
            } else {
              if (newParams.teachingMethod === "学习") {
                newParams.teachingMethod = 1;
              }
              newParams.pId = Number(params.Pid);
              newParams.teachingMethod = Number(newParams.teachingMethod);
              if (appStore.HOSPITAL_ID == 'hj') {
                updateTypeDataHJ(newParams)
              } else {
                mainPageApi.addTypeData(newParams).then(res => {
                  setEditLoading(false);
                  let msg = "类型添加成功";
                  Message.success(msg);
                  onOk(res);
                });
              }
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  // 厚街类型管理单独接口
  const updateTypeDataHJ = (newParams: any) => {
    mainPageApi.updateTypeDataHJ(newParams).then(res => {
      setEditLoading(false);
      let msg = "类型添加成功";
      Message.success(msg);
      onOk(res);
    });
  }

  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  const getName = (tree: any, id: any) => {
    return tree.find((item: any) => item.id == id).name
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.id ? "修改" : "添加"}
    >
      <Wrapper>
        <Form ref={formRef} rules={rules}>
          {params.id &&
            <Row>
              <Col span={5} className="label">
                名称:
            </Col>
              <Col span={19}>
                <Form.Field name="name">
                  <Input placeholder="名称" disabled />
                </Form.Field>
              </Col>
            </Row>
          }
          <Row>
            <Col span={5} className="label">
              教学方式:
            </Col>
            <Col span={19}>
              <Form.Field name="teachingMethod">
                <Select defaultValue="1" disabled={params.id}>
                  <Select.Option value="1">学习</Select.Option>
                  <Select.Option value="2">培训</Select.Option>
                  <Select.Option value="3">考试</Select.Option>
                  <Select.Option value="4">练习</Select.Option>
                  <Select.Option value="5">实操</Select.Option>
                  <Select.Option value="6">演练</Select.Option>
                  <Select.Option value="7">实践</Select.Option>
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className="label">
              排序:
            </Col>
            <Col span={19}>
              <Form.Field name="sort">
                <Input placeholder="排序" />
              </Form.Field>
            </Col>
          </Row>
          {appStore.HOSPITAL_ID == 'hj' && (
            <div>
              <Row>
                <Col span={5} className="label">
                  类型名称:
                </Col>
                <Col span={19}>
                  <Form.Field name="">
                    <Select
                      value={mainPageModal.trainingKeyPointTreeId}
                      style={{ width: 120 }}
                      onChange={(id: any) => {
                        mainPageModal.trainingKeyPointTreeId = id;
                        mainPageModal.knowledgePointDivisionTreeId = "";
                        let target: any = mainPageModal.trainingKeyPointTree.find(
                          (item: any) => item.id == id
                        );
                        if (target && target.childList)
                          mainPageModal.knowledgePointDivisionTree = target.childList;
                      }}
                    >
                      {mainPageModal.trainingKeyPointTree.map(
                        (item: any, idx: number) => (
                          <Select.Option value={item.id} key={idx}>
                            {item.name}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={5} className="label">
                  知识划分点:
                </Col>
                <Col span={19}>
                  <Form.Field name="">
                    <Select
                      value={mainPageModal.knowledgePointDivisionTreeId}
                      style={{ width: 120 }}
                      onChange={(id: any) => {
                        mainPageModal.knowledgePointDivisionTreeId = id;
                        mainPageModal.learningFormTreeId = "";
                        let target: any = mainPageModal.knowledgePointDivisionTree.find(
                          (item: any) => item.id == id
                        );
                        if (target && target.childList)
                          mainPageModal.learningFormTree = target.childList;
                      }}
                    >
                      {mainPageModal.knowledgePointDivisionTree.map(
                        (item: any, idx: number) => (
                          <Select.Option value={item.id} key={idx}>
                            {item.name}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={5} className="label">
                  教学:
                </Col>
                <Col span={19}>
                  <Form.Field name="">
                    <Select
                      value={mainPageModal.learningFormTreeId}
                      style={{ width: 120 }}
                      onChange={(id: any) =>
                        mainPageModal.learningFormTreeId = id
                      }
                    >
                      {mainPageModal.learningFormTree.map(
                        (item: any, idx: number) => (
                          <Select.Option value={item.id} key={idx}>
                            {item.name}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  </Form.Field>
                </Col>
              </Row>
            </div>
          )}
        </Form>
      </Wrapper>
    </Modal>
  );
})
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
