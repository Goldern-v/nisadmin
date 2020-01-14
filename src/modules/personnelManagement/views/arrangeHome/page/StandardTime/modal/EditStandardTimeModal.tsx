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
  oldData?: any;
}

/** 设置规则 */
const rules: Rules = {
  startDate: val => !!val || "请填写生效日期",
  initialHour: val => !!val || "请填写标准工时"
};

export default function EditStandardTimeModal(props: Props) {
  const [title, setTitle] = useState("新建标准工时");

  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    let data = { ...(props.oldData || {}), ...value };
    data.startDate = data.startDate
      ? data.startDate.format("YYYY-MM-DD")
      : null;
    data.deptCode = authStore.selectedDeptCode;
    /** 保存接口 */
    arrangeService.schInitialHourSaveOrUpdate(data).then((res: any) => {
      message.success("保存成功");
      props.onOkCallBack && props.onOkCallBack();
      onCancel();
    });
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current.weekday() != 0;
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      if (props.oldData) {
        setTitle("编辑标准工时");
        refForm!.current!.setFields({
          startDate: props.oldData.startDate
            ? moment(props.oldData.startDate)
            : null,
          initialHour: Number(props.oldData.initialHour)
        });
      } else {
        setTitle("新建标准工时");
        /** 表单数据初始化 */
        refForm!.current!.setFields({
          startDate: moment().startOf("week"),
          initialHour: 37.5
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
            <Form.Field label={`生效日期`} name="startDate" required>
              <DatePicker disabledDate={disabledDate} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`标准工时`} name="initialHour" required>
              <InputNumber />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
