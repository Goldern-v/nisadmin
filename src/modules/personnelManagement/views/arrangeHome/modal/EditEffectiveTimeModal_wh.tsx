import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  Input,
  Button,
  Radio,
  DatePicker,
  Select,
  Row,
  Col,
  message
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import { InputNumber, TimePicker } from "src/vendors/antd";
import { ArrangeItem } from "../types/Sheet";
import moment from "moment";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: (value?: any) => {};
  data: ArrangeItem;
}

/** 设置规则 */
const rules: Rules = {
  startDate_2: val => !!val || "请填写开始时间",
  endDate_2: val => !!val || "请填写结束时间",
  statusType: val => !!val || "请选择班次类型"
};

export default function EditEffectiveTimeModal(props: Props) {
  let { visible, onCancel, onOkCallBack, data } = props;
  const [title, setTitle]: any = useState("加/减班");
  let refForm = React.createRef<Form>();

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    let data = {
      detail: value.detail,
      statusType: value.statusType,
      effectiveTime: value.effectiveTime,
      settingNightHour: value.settingNightHour,
      startDate: `${moment(value.startDate_1).format("YYYY-MM-DD")} ${moment(
        value.startDate_2
      ).format("HH:mm")}`,
      endDate: `${moment(value.endDate_1).format("YYYY-MM-DD")} ${moment(
        value.endDate_2
      ).format("HH:mm")}`
    };
    onOkCallBack && onOkCallBack(data);
    onCancel();
  };

  const onFormChange = (name: string, value: any, form: Form<any>) => {
    let time_1 = form.getField("startDate_2");
    let time_2 = form.getField("endDate_2");
    if (time_1 && time_2 && (name == "startDate_2" || name == "endDate_2")) {
      let diff = Math.max(
        (time_2.valueOf() - time_1.valueOf()) / 1000 / 60 / 60,
        0
      ).toFixed(2);
      form.setField("effectiveTime", diff);
    }
  };
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      /** 表单数据初始化 */
      refForm!.current!.setFields({
        effectiveTime: Math.abs(
          (data.effectiveTime || 0) - (data.effectiveTimeOld || 0)
        ),
        detail: data.detail,
        settingNightHour:
          data.schAddOrSubs &&
          data.schAddOrSubs[0] &&
          data.schAddOrSubs[0].settingNightHour,
        startDate_1: moment(data.workDate),
        startDate_2:
          data.schAddOrSubs &&
          data.schAddOrSubs[0] &&
          data.schAddOrSubs[0]!.startDate
            ? moment(data.schAddOrSubs[0]!.startDate)
            : null,
        endDate_1: moment(data.workDate),
        endDate_2:
          data.schAddOrSubs &&
          data.schAddOrSubs[0] &&
          data.schAddOrSubs[0]!.endDate
            ? moment(data.schAddOrSubs[0]!.endDate)
            : null,
        statusType:
          data.schAddOrSubs &&
          data.schAddOrSubs[0] &&
          data.schAddOrSubs[0]!.statusType
            ? data.schAddOrSubs[0]!.statusType
            : ""
      });
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      width={500}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      centered
      forceRender
    >
      <Form ref={refForm} rules={rules} labelWidth={70} onChange={onFormChange}>
        <Row>
          <Row>
            <Col span={15}>
              <Form.Field label={`开始时间`} name="startDate_1" required>
                <DatePicker disabled={true} />
              </Form.Field>
            </Col>
            <Col span={9}>
              <Form.Field label={``} name="startDate_2" labelWidth={1}>
                <TimePicker format={"HH:mm"} />
              </Form.Field>
            </Col>
            <Col span={15}>
              <Form.Field label={`结束时间`} name="endDate_1" required>
                <DatePicker disabled={true} />
              </Form.Field>
            </Col>
            <Col span={9}>
              <Form.Field label={``} name="endDate_2" labelWidth={1}>
                <TimePicker format={"HH:mm"} />
              </Form.Field>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Field label={`类型`} name="statusType" required>
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="1">加班</Radio.Button>
                <Radio.Button value="2">减班</Radio.Button>
              </Radio.Group>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`工时`} name="effectiveTime" required>
              <InputNumber readOnly={true} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`夜工时`} name="settingNightHour">
              <InputNumber />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`备注`} name="detail">
              <Input.TextArea />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
