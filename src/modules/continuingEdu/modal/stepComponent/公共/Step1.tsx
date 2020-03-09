import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  AutoComplete,
  Select
} from "antd";
import Form from "src/components/Form";
import { Rules } from "src/components/Form/interfaces";
import { to } from "src/libs/fns";
import { stepServices } from "../services/stepServices";
import { stepViewModal, teachingMethodMap } from "../StepViewModal";
import { cloneJson } from "src/utils/json/clone";
import TypeEditModal from "src/modules/continuingEdu/views/主表单页/modal/TypeEditModal";
import { appStore } from "src/stores/index";
import qs from "qs";

export interface Props {}

export default function Step1() {
  const [editVisible, setEditVisible] = useState(false); // 控制类型管理弹窗状态
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [typeList, setTypeList]: any = useState([]);
  let Pid = qs.parse(appStore.location.search.replace("?", "")).id;
  let refForm = React.createRef<Form>();
  /** 设置规则 */
  const rules: Rules = {
    publicDate: val => !!val || "请填写发表日期"
  };

  useLayoutEffect(() => {
    let from = refForm.current;
    console.log(from, "from", cloneJson(stepViewModal.stepData1));
    getTypeList();
  }, []);

  useEffect(() => {
    if (typeList.length) {
      let form = refForm.current;
      form &&
        stepViewModal.stepData1.id &&
        form.setFields({
          id: stepViewModal.stepData1.id
        });
      console.log(
        form,
        stepViewModal.stepData1.id,
        "stepViewModal.stepData1.id"
      );
    }
  }, [typeList]);

  const onFormChange = (name: string, value: any, form: Form) => {
    if (name == "id") {
      let obj: any = typeList.find((item: any) => item.id == value);
      if (obj) {
        if (value !== -1) {
          form.setField("teachingMethodName", obj.teachingMethodName);
          stepViewModal.stepData1.teachingMethod = obj.teachingMethod;
          stepViewModal.stepData1.teachingMethodName = obj.teachingMethodName;
          stepViewModal.stepData1.name = obj.name;
          stepViewModal.stepData1.id = obj.id;
        }
      } else {
        form.setField("id", -1);
      }
      if (value == -1) {
        console.log(
          cloneJson(stepViewModal.stepData1),
          "stepViewModal.stepData1.teachingMethod"
        );
        form.setField(
          "teachingMethodName",
          teachingMethodMap[stepViewModal.stepData1.teachingMethod as any]
        );
      }
    }
  };

  // 查询类型
  const getTypeList = () => {
    stepServices.getMenuListByPId().then(res => {
      if (stepViewModal.stepData1.id) {
        setTypeList([...res.data, { id: -1, name: "其他" }]);
      } else {
        setTypeList([...res.data]);
      }
    });
  };
  // 添加类型管理
  const saveOrUpload = (record?: any) => {
    setEditParams({
      Pid: Pid
    });
    setEditVisible(true);
  };
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    getTypeList();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFormChange}>
        <Row>
          <Row>
            <Col span={20}>
              <Form.Field label={`类型`} name="id" required>
                <Select disabled={!!stepViewModal.oldData}>
                  {typeList.map((item: any) => (
                    <Select.Option value={item.id} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                onClick={() => saveOrUpload()}
              >
                其他类型
              </Button>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Field label={`教学方式`} name="teachingMethodName">
              <Input readOnly />
            </Form.Field>
          </Col>
        </Row>
      </Form>
      <TypeEditModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 40px 100px 20px;
`;
