import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  AutoComplete,
  Select,
  Checkbox,
  InputNumber,
  message
} from "antd";
import Form from "src/components/Form";
import { Rules } from "src/components/Form/interfaces";
import { to } from "src/libs/fns";
import DateTimePicker from "src/components/DateTimePicker";
import { scStepViewModal as stepViewModal } from "./SCStepViewModal";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "../公共/selectNurseModal/SelectPeopleModal";
import { CheckUserItem } from "src/modules/notice/page/SentNoticeView";
import { observer } from "mobx-react-lite";
import UpdateTable from "./UpdateTable";
import { cloneJson } from "src/utils/json/clone";
import TestPageModal from "src/modules/continuingEdu/views/trainingInfoReview/components/TestPageModal/TestPageModal";

export interface Props {}

export default observer(function Step4() {
  const testPage = createModal(TestPageModal); // 习题预览弹窗
  // 组织方式

  const selectNurseModal = createModal(SelectPeopleModal);

  let refForm = React.createRef<Form>();
  /** 设置规则 */
  const rules: Rules = {
    publicDate: val => !!val || "请填写发表日期"
  };

  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    Object.assign(stepViewModal.stepData2, data);
  };

  useLayoutEffect(() => {
    refForm.current && refForm.current.setFields(stepViewModal.stepData2);
  }, []);

  const handlePagePreview = () => {
    testPage.show({
      // id: info.id,
      // teachingMethodName: info.teachingMethodName,
      // title: info.title,
      // startTime: info.startTime,
      // endTime: info.endTime,
      // examDuration: info.examDuration,
      // passScores: info.passScores,
    });
  };

  return (
    <Wrapper>
      <Form
        ref={refForm}
        rules={rules}
        labelWidth={100}
        onChange={onFormChange}
      >
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
          <Col span={24}>
            <Form.Field label={`上传题库`} name="scoreItems">
              <UpdateTable type="sc" />
            </Form.Field>
          </Col>
        </Row>
      </Form>

      <selectNurseModal.Component />
      <testPage.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  margin: 40px 100px 20px;
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
