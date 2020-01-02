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
import { authStore } from "src/stores";
import { arrangeService } from "../../../services/ArrangeService";
import moment from "moment";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  oldData?: any;
}

/** 设置规则 */
const rules: Rules = {
  startDate: val => !!val || "请填写开始时间",
  endDate: val => !!val || "请填写结束时间",
  rangeId: val => !!val || "请选择班次"
};

export default function AddExpectedModal(props: Props) {
  const [title, setTitle] = useState("");
  const [rangeList, setRangeList] = useState([]);
  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    let rangeName: any = ((rangeList.find(
      (item: any) => item.id === value.rangeId
    ) || {}) as any).name;
    let obj: any = {
      deptCode: authStore.selectedDeptCode,
      empNo: authStore.user && authStore.user.empNo,
      empName: authStore.user && authStore.user.empName,
      detail: value.detail,
      startDate: value.startDate
        ? moment(value.startDate).format("YYYY-MM-DD")
        : "",
      endDate: value.endDate ? moment(value.endDate).format("YYYY-MM-DD") : "",
      rangeId: value.rangeId,
      rangeName
    };
    if (props.oldData) {
      obj.id = props.oldData.id;
    }
    /** 保存接口 */
    arrangeService.schExpectSaveOrUpdate(obj).then((res: any) => {
      message.success("保存成功");
      onCancel();
      props.onOkCallBack && props.onOkCallBack();
    });
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    let fromRef = refForm!.current;
    if (refForm.current && visible) {
      arrangeService.getArrangeMenu().then(res => {
        setRangeList(res.data);
        if (!props.oldData) {
          setTitle("添加期望排班");
          /** 表单数据初始化 */
          fromRef!.setFields({
            startDate: moment(),
            endDate: moment(),
            rangeId: "",
            detail: ""
          });
        } else {
          setTitle("编辑期望排班");
          fromRef!.setFields({
            startDate: props.oldData.startDate
              ? moment(props.oldData.startDate)
              : null,
            endDate: props.oldData.endDate
              ? moment(props.oldData.endDate)
              : null,
            rangeId: props.oldData.rangeId,
            detail: props.oldData.detail
          });
        }
      });
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
    >
      <Form ref={refForm} rules={rules} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`开始时间`} name="startDate" required>
              <DatePicker disabled={props.oldData} />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`结束时间`} name="endDate" required>
              <DatePicker disabled={props.oldData} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`班次`} name="rangeId" required>
              <Select>
                {rangeList.map((item: any) => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`备注`} name="detail">
              <Input.TextArea style={{ height: 80, resize: "none" }} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
