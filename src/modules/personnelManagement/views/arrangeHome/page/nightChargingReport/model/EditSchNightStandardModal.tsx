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
import { authStore } from "src/stores";
import { starRatingReportService } from "../api/StarRatingReportService";

const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  standard: any;
  deptCode: any;
  onOkCallBack?: (standard: any) => void;
}

/** 设置规则 */
const rules: Rules = {
  standard: val => !!val || "请填写标准"
};

export default function EditSchNightStandardModal(props: Props) {
  const title = `编辑${authStore.selectedDeptName}标准`;

  let { visible, onCancel, standard, deptCode } = props;
  let refForm = React.createRef<Form>();

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    /** 保存接口 */
    starRatingReportService
      .saveOrUpdateSchNightStandard(deptCode, value.standard)
      .then((res: any) => {
        message.success("保存成功");
        props.onOkCallBack && props.onOkCallBack(value.standard);
        onCancel();
      });
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      /** 表单数据初始化 */
      refForm!.current!.setFields({
        standard: standard
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
            <Form.Field label={`标准`} name="standard">
              <InputNumber />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
