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
import { DictItem } from "src/services/api/CommonApiService";
import { InputNumber } from "src/vendors/antd";
import { arrangeService } from "../../../services/ArrangeService";
import moment from "moment";
import { authStore } from "src/stores";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  nurseList: any[];
  oldData?: any;
  status?: any;
}

/** 设置规则 */
const rules: Rules = {
  // publicDate: (val) => !!val || '请填写发表日期'
  // publicDate: (val) => !!val || '请填写发表日期'
  empNo: val => !!val || "请选择护士",
  endDate: val => !!val || "请填写结余日期"
};

export default function EditBalanceModal(props: Props) {
  const [title, setTitle] = useState("新建结余工时");

  let { visible, onCancel, nurseList, status } = props;
  let refForm = React.createRef<Form>();

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    let data = { ...(props.oldData || {}), ...value };
    data.endDate = data.endDate.format("YYYY-MM-DD");
    data.workDate = data.endDate;
    data.startDate = moment(data.endDate)
      .startOf("week")
      .format("YYYY-MM-DD");

    data.empName = nurseList.find((item: any) => item.empNo == data.empNo)
      ? nurseList.find((item: any) => item.empNo == data.empNo).name
      : data.empNo;
    data.deptCode = authStore.selectedDeptCode;
    data.deptName = authStore.selectedDeptName;
    /** 保存接口 */
    arrangeService.schBalanceHourSaveOrUpdate(data).then((res: any) => {
      message.success("保存成功");
      props.onOkCallBack && props.onOkCallBack();
      onCancel();
    });
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current.weekday() != 6;
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      if (props.oldData) {
        setTitle("编辑结余工时");
        refForm!.current!.setFields({
          empNo: props.oldData.empNo,
          endDate: moment(props.oldData.endDate),
          publicHourNow: props.oldData.publicHourNow,
          holidayHourNow: props.oldData.holidayHourNow,
          balanceHourNow: props.oldData.balanceHourNow,
          remark: props.oldData.remark,
          status: props.oldData.status
        });
      } else {
        setTitle("新建结余工时");
        /** 表单数据初始化 */
        refForm!.current!.setFields({
          empNo: "",
          endDate: null,
          publicHourNow: "",
          holidayHourNow: "",
          balanceHourNow: "",
          remark: "",
          status: status
        });
      }
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
      centered
    >
      <Form ref={refForm} rules={rules} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`护士姓名`} name="empNo" required>
              <Select disabled={props.oldData}>
                {(nurseList || []).map((item: any, index: number) => (
                  <Select.Option value={item.empNo} key={index}>
                    {item.empName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`结余日期`} name="endDate" required>
              <DatePicker disabledDate={disabledDate} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`工时结余`} name="balanceHourNow">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`公休结余`} name="publicHourNow">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`节休结余`} name="holidayHourNow">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`节休结余`} name="holidayHourNow">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`结余类型`} name="status">
              <Select>
                <Select.Option value="2">初始结余</Select.Option>
                <Select.Option value="1">排班结余</Select.Option>
              </Select>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`备注`} name="remark">
              <Input.TextArea
                style={{ resize: "none", minHeight: 60 }}
                autosize={true}
              />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
