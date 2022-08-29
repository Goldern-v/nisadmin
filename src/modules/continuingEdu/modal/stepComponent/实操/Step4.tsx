import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { Row, Col, Input, Checkbox, InputNumber, Select } from "antd";
import Form from "src/components/Form";
import { scStepViewModal as stepViewModal } from "./SCStepViewModal";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "../公共/selectNurseModal/SelectPeopleModal";
import { observer } from "mobx-react-lite";
import UpdateTable from "./UpdateTable";
import TestPageModal from "src/modules/continuingEdu/views/trainingInfoReview/components/TestPageModal/TestPageModal";
import { appStore } from "src/stores";
import service from "src/services/api";

export interface Props {}

export default observer(function Step4() {
  const [isOk, setIsOk] = useState(false); // app评分开关默认值
  const testPage = createModal(TestPageModal); // 习题预览弹窗
  const [pratical, setPratical] = useState([]);
  const [selectLoading, setSelectLoading] = useState(false);
  const selectNurseModal = createModal(SelectPeopleModal);
  let refForm = React.createRef<Form>();

  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    if (["wh", "gxjb", "ytll"].includes(appStore.HOSPITAL_ID)) {
      if (data.scoreItems && data.scoreItems.length > 4) {
        setIsOk(true);
        Object.assign(stepViewModal.stepData2, data);
        stepViewModal.stepData2.scoreInApp = 0;
        return;
      } else {
        setIsOk(false);
      }
    }
    Object.assign(stepViewModal.stepData2, data);
  };
  const handleonvaluechange = () => {
    if (["whyx","fsxt"].includes(appStore.HOSPITAL_ID)) {
      let list = pratical.find((item: any) => {
        return stepViewModal.stepData2.adminTable == item.code;
      });
      if (refForm.current) {
        refForm.current.setField("prcaticalData", list);
        refForm.current.setField(
          "selectPrcaticalOperation",
          stepViewModal.stepData2.prcaticalData.value
        );
        refForm.current.setField(
          "totalScores",
          stepViewModal.stepData2.prcaticalData.totalScore
        );
      }
    }
  };

  useLayoutEffect(() => {
    refForm.current && refForm.current.setFields(stepViewModal.stepData2);
    service.commonApiService.getPraticalGradeManage().then((res) => {
      let praticalList: any = [];
      res.data.list.map((item: any) => {
        let operObj = {
          value: appStore.HOSPITAL_ID == "whyx" ? `${item.paperName}/${item.chapter}` : `${item.paperName}`,
          code: item.id,
          paperName: item.paperName,
          chapter: item.chapter,
          totalScore: item.totalScore,
        };
        praticalList.push(operObj);
      });
      if (praticalList.length) {
        setPratical(praticalList);
      }
    });
  }, []);

  //   选择实操评分管理表 下拉选框模糊查询
  const fetchOptions = (inputValue: any, option: any) => {
    return (
      option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
    );
  };

  return (
    <Wrapper>
      <Form ref={refForm} labelWidth={100} onChange={onFormChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`总成绩`} name="totalScores">
              <span>
                <Input readOnly value={stepViewModal.stepData2.totalScores} />
              </span>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`及格分数线`} name="passScores">
              <InputNumber />
            </Form.Field>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          {["wh","gxjb","ytll"].includes(appStore.HOSPITAL_ID) ? (
            <Col span={24} style={{ height: "28px" }}>
              <span className="labelSpan">上传题库</span>
              <Checkbox
                className="checkbox"
                disabled={isOk}
                value={stepViewModal.stepData2.scoreInApp}
                checked={stepViewModal.stepData2.scoreInApp ? true : false}
                onChange={(e: any) => {
                  e.target.checked
                    ? (stepViewModal.stepData2.scoreInApp = 1)
                    : (stepViewModal.stepData2.scoreInApp = 0);
                }}
              >
                app评分
              </Checkbox>
              <span style={{ color: "red" }}>
                (*评分项超过4项只能在PC端进行评分，无法在app操作！)
              </span>
              <Form.Field label={``} name="scoreItems">
                <UpdateTable type="sc" />
              </Form.Field>
            </Col>
          ) : (
            <Col span={24} >
              {["whyx","fsxt"].includes(appStore.HOSPITAL_ID)?
              <Form.Field
                label={`选择实操评分管理表`}
                name="adminTable"
                onValueChange={handleonvaluechange}
              >
                <Select showSearch filterOption={fetchOptions}>
                  {pratical.length &&
                    pratical.map((item: any, index: any) => (
                      <Select.Option key={item.code} value={item.code}>
                        {item.value}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Field>
              :
              <Form.Field label={`上传题库`} name="scoreItems">
                <UpdateTable type="sc" />
              </Form.Field>
              }     
            </Col>
          )}
        </Row>
      </Form>

      <selectNurseModal.Component />
      <testPage.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  margin: 40px 100px 20px;
  .labelSpan {
    font-size: 14px;
    margin-left: 42px;
  }
  .checkbox {
    margin: 5px 0 10px 28px;
    font-size: 13px;
  }
`;

const DateSelectCon = styled.div`
  .date-row {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 20px;
    padding-left: 120px;
    font-size: 14px;
    .select-item {
      width: 120px;
      margin-left: 20px;
    }
    .aside {
      font-size: 12px;
      color: #666;
    }
    .date-label {
      margin-right: 20px;
    }
  }
  .label {
    width: 0;
    margin: 0;
  }
  .formField-wrapper {
    margin: 0;
  }
  .formField-container {
    width: 100px;
    margin-right: 20px;
  }
`;

function MoreBox(props: any) {
  const { onClick } = props;
  const Wrapper = styled.div`
    width: 32px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    &:hover {
      border-color: #1db38b;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(0, 166, 128, 0.2);
    }
  `;
  return <Wrapper onClick={onClick}>...</Wrapper>;
}

const TipCon = styled.div`
  padding: 20px;
  background: #f0f0f0;
`;
