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
import { ksStepViewModal as stepViewModal } from "./KSStepViewModal";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "../公共/selectNurseModal/SelectPeopleModal";
import { CheckUserItem } from "src/modules/notice/page/SentNoticeView";
import { observer } from "mobx-react-lite";
import UpdateTable from "./UpdateTable";
import { cloneJson } from "src/utils/json/clone";
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
    Object.assign(stepViewModal.stepData2, data);
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
    let checkedUserList:any = [];
    if (name == "scorePersonList") {
      checkedUserList = stepViewModal.stepData2.scorePersonList;
    }
    selectNurseModal.show({
      checkedUserList: checkedUserList,
      onOkCallBack: (checkedUserList: CheckUserItem[]) => {
        let userList = checkedUserList.reduce((total: any[], item: any) => {
          return [
            ...total,
            ...item.userList.map((item: any) => ({
              label: item.empName,
              key: item.empNo
            }))
          ];
        }, []);
        if(userList.length > 3) {
          return message.warn('选择人数不能超过三人')
        }
        refForm.current && refForm.current.setField(name, userList);
      }
    });
  };

  useLayoutEffect(() => {
    refForm.current && refForm.current.setFields(stepViewModal.stepData2);
  }, []);


  /** 判断是否有问答题，只有问答题才允许选择评分负责人 */
  let hasWdt = stepViewModal.stepData2.questionStatList.find((item:any) => {
    return item.questionType == 4
  })
  
  if(!hasWdt) {
    stepViewModal.stepData2.needScorePerson = false
    stepViewModal.stepData2.scorePersonList = []
    refForm.current && refForm.current.setField('scorePersonList', []);
  }


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
            <Form.Field label={`最大考试次数`} name="maxExamTimes">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`总成绩`} name="totalScores">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`及格分数线`} name="passScores">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field
              label={`答题时长`}
              name="examDuration"
              suffix={"分钟"}
              aside="注：从点击“开始答题”按钮时，单独给每个人开始计时"
            >
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`上传题库`} name="questionStatList">
              <UpdateTable />
            </Form.Field>
          </Col>
          <Col span={24}>
        {/* <Form.Field label={`卷面设置`} name="卷面设置"> */}
        <span
          style={{
            display: "inline-block",
            width: 100,
            marginRight: 20,
            textAlign: "right",
            fontSize: 14,
            float: "left"
          }}
        >
          卷面设置
        </span>
        <div style={{ marginLeft: 120 }}>
          <Row>
            <Checkbox
              checked={!!stepViewModal.stepData2.randomOrderQue}
              onClick={() => {
                stepViewModal.stepData2.randomOrderQue = !stepViewModal
                  .stepData2.randomOrderQue;
                  refForm.current?.setField('randomOrderQue', stepViewModal.stepData2.randomOrderQue )    
              }}
            >
              随机显示题目顺序
            </Checkbox>
          </Row>
          <Row style={{marginTop: 10}}>
            <Checkbox
              checked={!!stepViewModal.stepData2.randomOrderQItem}
              onClick={() => {
                stepViewModal.stepData2.randomOrderQItem = !stepViewModal
                  .stepData2.randomOrderQItem;
                  refForm.current?.setField('randomOrderQItem', stepViewModal.stepData2.randomOrderQItem )       
              }}
            >
              随机显示题目选项顺序
            </Checkbox>
          </Row>
          <Row style={{marginTop: 10}}>
            <Checkbox
              checked={!!stepViewModal.stepData2.showScoreInstantly}
              onClick={() => {
                stepViewModal.stepData2.showScoreInstantly = !stepViewModal
                  .stepData2.showScoreInstantly;
                  refForm.current?.setField('showScoreInstantly', stepViewModal.stepData2.showScoreInstantly )  
              }}
            >
              交卷后显示分数
              <span style={{ color: "#999" }}>（含有问答题不建议勾选）</span>
            </Checkbox>
          </Row>
        </div>
        {/* </Form.Field> */}
      </Col>
      <Col span={24} style={{marginTop: 10, marginBottom: 10}}>
        <span
          style={{
            display: "inline-block",
            width: 100,
            marginRight: 20,
            textAlign: "right",
            fontSize: 14
          }}
        >
          评分
        </span>
        <Checkbox
          disabled={!hasWdt}
          checked={!!stepViewModal.stepData2.needScorePerson}
          onClick={() => {
            stepViewModal.stepData2.needScorePerson = !stepViewModal.stepData2
              .needScorePerson;
              refForm.current?.setField('needScorePerson', stepViewModal.stepData2.needScorePerson )    

              if(!stepViewModal.stepData2.needScorePerson) {
                refForm.current && refForm.current.setField('scorePersonList', []);
              }
          }}
        >
          是否需要评分负责人
        </Checkbox>
      </Col>

      {!!stepViewModal.stepData2.needScorePerson && (
        <React.Fragment>
          <Col span={2} />
          <Col span={22}>
            <Form.Field
              label={`评分负责人`}
              name="scorePersonList"
              suffix={
                <MoreBox
                  onClick={() => {
                    openSelectNurseModal("scorePersonList");
                  }}
                />
              }
            >
              <Select
                labelInValue={true}
                mode="multiple"
                style={{ width: "100%" }}
                open={false}
              />
            </Form.Field>
          </Col>
        </React.Fragment>
      )}
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
