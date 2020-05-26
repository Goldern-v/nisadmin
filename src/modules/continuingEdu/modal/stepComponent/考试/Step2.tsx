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
import { stepViewModal as allStepViewModal } from "../StepViewModal";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "../公共/selectNurseModal/SelectPeopleModal";
import { CheckUserItem } from "src/modules/notice/page/SentNoticeView";
import { observer } from "mobx-react-lite";
export interface Props {}

export default observer(function Step1() {
  // 组织方式
  const zzfs = [{ name: "线上", code: 1 }, { name: "线下", code: 2 }];
  const studentCreditTypeList = [
    { name: "院级学分", code: 1 },
    { name: "片区学分", code: 2 },
    { name: "病区学分", code: 3 }
  ];

  const [selectedCheck, setSelectedCheck] = useState([] as any); //必修全选
  const bxNursing = [
    { name: "N0", code: "nurse0" },
    { name: "N1", code: "nurse1" },
    { name: "N2", code: "nurse2" },
    { name: "N3", code: "nurse3" },
    { name: "N4", code: "nurse4" },
    { name: "N5", code: "nurse5" },
    { name: "其他", code: "nurseOther" }
  ];
  const openTimeUnitList = [
    { name: "小时", code: "小时" },
    { name: "天", code: "天" },
    { name: "周", code: "周" }
  ];

  const selectNurseModal = createModal(SelectPeopleModal);

  let refForm = React.createRef<Form>();
  /** 设置规则 */
  const rules: Rules = {
    publicDate: val => !!val || "请填写发表日期"
  };

  const onFormChange = (name: string, value: any, from: Form) => {
    setSelectedCheck([...selectedCheck, value]);
    let isOk = selectedCheck.filter((item: any) => item);
    let data = from.getFields();
    if (isOk) {
      data.bxNurse = stepViewModal.stepData2.bxNurse;
    } else {
      data.bxNurse = [];
    }
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
    let checkedUserList = [];
    if (name == "sicPersonList") {
      checkedUserList = stepViewModal.stepData2.sicPersonList;
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
        if (userList.length > 3) {
          return message.warn("选择人数不能超过三人");
        }
        refForm.current && refForm.current.setField(name, userList);
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
            <Form.Field label={`考试名称`} name="title">
              <Input />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`考试开始时间`} name="startTime">
              <DateTimePicker />
            </Form.Field>
          </Col>

          <DateSelectCon>
            <div className="date-row">
              <span className="date-label">考试开放</span>
              <Form.Field label={``} name="openTime" labelWidth={1}>
                <InputNumber />
              </Form.Field>
              <Form.Field label={``} name="openTimeUnit" labelWidth={1}>
                <Select>
                  {openTimeUnitList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
              <span className="aside">
                {stepViewModal.endTime
                  ? `即：${stepViewModal.endTime} 结束`
                  : ""}
              </span>
            </div>
            <div className="date-row">
              <span className="date-label">考试结束</span>
              <Form.Field label={``} name="daysToArchive" labelWidth={1}>
                <InputNumber min={2} />
              </Form.Field>
              <span className="aside">
                天后进行归档{" "}
                {stepViewModal.overTime ? `即：${stepViewModal.overTime}` : ""}
              </span>
            </div>
          </DateSelectCon>

          <Col span={24}>
            <Form.Field label={`组织方式`} name="organizationWay">
              <Select>
                {zzfs.map(item => (
                  <Select.Option value={item.code} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          {stepViewModal.stepData2.organizationWay == "2" && (
            <React.Fragment>
              <Col span={4} />
              <Col span={20}>
                <Form.Field
                  label={`签到负责人`}
                  name="sicPersonList"
                  suffix={
                    <MoreBox
                      onClick={() => {
                        openSelectNurseModal("sicPersonList");
                      }}
                    />
                  }
                  aside="签到时间从 考试开始前半个小时  至 考试结束"
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

          <Col span={24}>
            <Form.Field label={`考试地址`} name="address">
              <AutoComplete
                dataSource={allStepViewModal.dictObj.studyAndTrainAddress.map(
                  (item: any) => item.name
                )}
              />
            </Form.Field>
          </Col>

          <Col span={10}>
            <Form.Field label={`学员学分`} name="studentCreditType">
              <Select>
                {studentCreditTypeList.map(item => (
                  <Select.Option value={item.code} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={14}>
            <Form.Field
              label={``}
              name="studentCredit"
              suffix="分"
              labelWidth={1}
            >
              <InputNumber />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field
              label={`学员学时`}
              name="studentClassHours"
              suffix="学时"
            >
              <InputNumber />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field
              label={`必修`}
              name="bxNurse"
              aside="注：没有选择的默认为选修"
            >
              <div>
                <Checkbox
                  indeterminate={(() => {
                    if (stepViewModal.stepData2.bxNurse.length <= 0)
                      return false;
                    if (
                      stepViewModal.stepData2.bxNurse.length >= bxNursing.length
                    )
                      return false;
                    return true;
                  })()}
                  onChange={(e: any) => {
                    let checked = e.target.checked;
                    console.log(checked, "checkedchecked");
                    if (checked)
                      stepViewModal.stepData2.bxNurse = bxNursing.map(
                        (item: any) => item.code
                      );
                    else stepViewModal.stepData2.bxNurse = [];
                  }}
                  checked={
                    stepViewModal.stepData2.bxNurse.length >=
                      bxNursing.length && bxNursing.length > 0
                  }
                >
                  全选
                </Checkbox>
                <Checkbox.Group
                  value={stepViewModal.stepData2.bxNurse}
                  onChange={(val: any) => {
                    stepViewModal.stepData2.bxNurse = val;
                    console.log(val, "val1111");
                  }}
                >
                  {bxNursing.map((item: any) => (
                    <Checkbox
                      onChange={(e: any) =>
                        (stepViewModal.stepData2.bxNurse = [
                          stepViewModal.stepData2.bxNurse,
                          ...e.target.value
                        ])
                      }
                      key={item.code}
                      value={item.code}
                    >
                      {item.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            </Form.Field>
          </Col>
          {/* <Col span={24}>
            <Form.Field label={`通知消息`} name="noticeContent">
              <Input.TextArea placeholder="请输入通知详细或考试内容，在【完成】页面勾选通知设置，通知会自动发送" />
            </Form.Field>
          </Col> */}
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
