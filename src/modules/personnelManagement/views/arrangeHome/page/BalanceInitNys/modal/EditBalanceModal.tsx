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
import { InputNumber } from "src/vendors/antd";
import { arrangeService } from "../../../services/ArrangeService";
import moment from "moment";
import { authStore } from "src/stores";
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  nurseList: any[];
  oldData?: any;
  status?: any;
}

/** 必填项 */
const rules: Rules = {
  empName: val => !!val || "请选择护士",
  endDate: val => !!val || "请填写积假日期"
};

export default function EditBalanceModal(props: Props) {
  const [title, setTitle] = useState("新建累积积假");
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

    data.empNo = nurseList.find((item: any) => item.empName == data.empName)
      ? nurseList.find((item: any) => item.empName == data.empName).empNo
      : "";
    data.deptCode = authStore.selectedDeptCode;
    data.deptName = authStore.selectedDeptName;
    data.totalHoliday = Number(data.totalHoliday) || 0;

    /** 保存接口 */
    arrangeService.schBalanceHourSaveOrUpdatetNys(data).then((res: any) => {
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
        setTitle("编辑累积积假");
        refForm!.current!.setFields({
          empName: props.oldData.empName,
          endDate: moment(props.oldData.endDate),
          totalHoliday: props.oldData.totalHoliday,
          remark: props.oldData.remark,
          status: "2" || props.oldData.status
        });
      } else {
        setTitle("新建累积积假");
        /** 表单数据初始化 */
        refForm!.current!.setFields({
          empName: "",
          endDate: null,
          totalHoliday: 0,
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
            <Form.Field label={`护士姓名`} name="empName" required>
              <Select disabled={props.oldData}>
                {(nurseList || []).map((item: any, index: number) => (
                  <Select.Option value={item.empName} key={index}>
                    {item.empName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`积假日期`} name="endDate" required>
              <DatePicker disabledDate={disabledDate} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`累积积假`} name="totalHoliday">
              <InputNumber />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`积假类型`} name="status">
              <Select disabled={props.oldData}>
                <Select.Option value="2">初始积假</Select.Option>
                <Select.Option value="1">排班积假</Select.Option>
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
