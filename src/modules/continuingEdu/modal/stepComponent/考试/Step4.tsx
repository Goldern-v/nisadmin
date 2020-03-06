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
  InputNumber
} from "antd";
import Form from "src/components/Form";
import { Rules } from "src/components/Form/interfaces";
import { to } from "src/libs/fns";
import DateTimePicker from "src/components/DateTimePicker";
import { ksStepViewModal as stepViewModal } from "./KSStepViewModal";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "../公共/selectNurseModal/SelectPeopleModal";
import { CheckUserItem } from "src/modules/notice/page/SentNoticeView";
import { observer } from "mobx-react-lite";
import UpdateTable from "./UpdateTable";
export interface Props {}

export default observer(function Step4() {
  // 组织方式

  const selectNurseModal = createModal(SelectPeopleModal);

  let refForm = React.createRef<Form>();
  /** 设置规则 */
  const rules: Rules = {
    publicDate: val => !!val || "请填写发表日期"
  };

  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    stepViewModal.stepData2 = data;
  };

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    /** 保存接口 */
    // service(value).then((res: any) => {
    //   message.success('保存成功')
    //   props.onOkCallBack && props.onOkCallBack()
    //   onCancel()
    // })
  };

  /** 选择人员 */
  const openSelectNurseModal = (name: string) => {
    let checkedUserList = [];
    if (name == "teacherList") {
      checkedUserList = stepViewModal.stepData2.teacherList;
    } else if (name == "sicPersonList") {
      checkedUserList = stepViewModal.stepData2.sicPersonList;
    }
    selectNurseModal.show({
      checkedUserList: checkedUserList,
      onOkCallBack: (checkedUserList: CheckUserItem[]) => {
        refForm.current && refForm.current.setField(name, checkedUserList);
      }
    });
  };

  useLayoutEffect(() => {
    refForm.current && refForm.current.setFields(stepViewModal.stepData2);
  }, []);

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
            <Form.Field label={`最大考试次数`} name="title">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`总成绩`} name="title">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`及格分数线`} name="title">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field
              label={`答题时长`}
              name="title"
              suffix={"分钟"}
              aside="注：从点击“开始答题”按钮时，单独给每个人开始计时"
            >
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`上传题库`} name="title">
              <UpdateTable />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`考试开始时间`} name="startTime">
              <DateTimePicker />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`通知消息`} name="noticeContent">
              <Input.TextArea placeholder="请输入通知详细或考试内容，在【完成】页面勾选通知设置，通知会自动发送" />
            </Form.Field>
          </Col>
        </Row>
      </Form>
      <selectNurseModal.Component />
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
