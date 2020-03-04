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
import { xxStepViewModal as stepViewModal  } from "./XXStepViewModal";
export interface Props {}

export default function Step1() {


  // 组织方式
  const zzfs = [{ name: "线上", code: "1" }, { name: "线下", code: "2" }];
  const studentCreditTypeList = [
    { name: "院级学分", code: "1" },
    { name: "片区学分", code: "2" },
    { name: "病区学分", code: "3" }
  ];

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
    { name: "周", code: "周" },
  ];

  let refForm = React.createRef<Form>();
  /** 设置规则 */
  const rules: Rules = {
    publicDate: val => !!val || "请填写发表日期"
  };

  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    console.log(data, "datadata");
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

   useLayoutEffect(() => {
    refForm.current?.setFields(stepViewModal.stepData2)
   }, [])

  return (
    <Wrapper>
      <Form ref={refForm} rules={rules} labelWidth={100} onChange={onFormChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`学习名称`} name="title">
              <Input />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`学习开始时间`} name="startTime">
              <DateTimePicker />
            </Form.Field>
          </Col>

          <DateSelectCon>
            <div className="date-row">
              <span className="date-label">学习开放</span>
              <Form.Field label={``} name="openTime" labelWidth={1}>
                  <InputNumber></InputNumber>
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
                  <span className="aside">{stepViewModal.endTime ? `即：${stepViewModal.endTime} 结束`: ''}</span>
            </div>
            <div className="date-row">
              <span  className="date-label">学习结束</span>
              <Form.Field label={``} name="daysToArchive" labelWidth={1}>
                <InputNumber min={2}></InputNumber>
              </Form.Field>
              <span className="aside">天后进行归档</span>
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

          <Col span={24}>
            <Form.Field label={`学习地址`} name="address">
              <Input />
            </Form.Field>
          </Col>

          <Col span={10}>
            <Form.Field label={`学分`} name="studentCreditType">
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
            <Form.Field label={`学时`} name="studentClassHours" suffix="学时">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`必修`} name="bxNurse" aside="注：没有选择的默认为选修">
              <Checkbox.Group>
                {bxNursing.map(item => (
                  <Checkbox value={item.code} key={item.code}>
                    {item.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`通知消息`} name="noticeContent">
              <Input.TextArea  placeholder="请输入通知详细或考试内容，在【完成】页面勾选通知设置，通知会自动发送"/>
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 40px 100px 20px;
`;

const DateSelectCon = styled.div`
  .date-row {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 20px;
    padding-left: 100px;
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
