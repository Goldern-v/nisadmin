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
  const teachingMethodList = [
    { name: '学习', code: '1' },
    { name: '培训', code: '2' },
    { name: '考试', code: '3' },
    { name: '练习', code: '4' },
    { name: '实操', code: '5' },
    { name: '演练', code: '6' },
    { name: '实践', code: '7' },
  ]; //类型

  /** 弹窗必填项 */
  const rules: Rules = {
    // name: val => !!val &&  || "名称不能为空",
    teachingMethod: val => !!val || "教学方式不能为空",
    sort: val =>
      isNaN(Number(val)) || val === "" || Number(val) < 0
        ? "排序必填且为正整数"
        : ""
  };

  /** 添加初始化必填项，修改回显数据 */
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
            "演练",
            "实践"
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

  /** 保存 */
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
              if (['hj', 'lyyz'].includes(appStore.HOSPITAL_ID)) {
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
              if (['hj', 'lyyz'].includes(appStore.HOSPITAL_ID)) {
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

  /** 厚街类型管理单独接口 */
  const updateTypeDataHJ = (newParams: any) => {
    mainPageApi.updateTypeDataHJ(newParams).then(res => {
      setEditLoading(false);
      let msg = "类型添加成功";
      Message.success(msg);
      onOk(res);
    });
  }

  /** 取消弹窗 */
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
      title={params.id ? "修改" : "添加"}
    >
      <Wrapper>
        <Form ref={formRef} rules={rules}>
          {['hj', 'lyyz'].includes(appStore.HOSPITAL_ID) &&
            <Row>
              <Col span={5} className="label">
                名称:
            </Col>
              <Col span={19}>
                <Form.Field name="name">
                  <Input placeholder="名称" disabled={params.id} />
                </Form.Field>
              </Col>
            </Row>
          }
          {!['hj', 'lyyz'].includes(appStore.HOSPITAL_ID) &&
            <Row>
              <Col span={5} className="label">
                名称:
            </Col>
              <Col span={19}>
                <Form.Field name="name">
                  <Input placeholder="名称" />
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
                  {teachingMethodList.map((item: any, idx: any) => (
                    <Select.Option value={item.code} key={idx}>
                      {item.name}
                    </Select.Option>
                  ))}
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
