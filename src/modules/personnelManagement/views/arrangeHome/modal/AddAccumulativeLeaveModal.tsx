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
  totalHoliday: val => !!val || "请填写天数",
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
      statusType: value.statusType,
      totalHoliday: value.totalHoliday,
    };
    onOkCallBack && onOkCallBack(data);
    onCancel();
  };

  const onFormChange = (name: string, value: any, form: Form<any>) => {

  };
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      /** 表单数据初始化 */
      refForm!.current!.setFields({
        statusType: data.schJiJias && data.schJiJias[0].statusType,
        totalHoliday: data.schJiJias && data.schJiJias[0].totalHoliday
      });
    }
  }, [visible]);

  return (
    <Modal
      title={'添加积假'}
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
          <Col span={24}>
            <Form.Field label={`天数`} name="totalHoliday" required>
              <InputNumber step={0.5}/>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`类型`} name="statusType" required>
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="1">加班</Radio.Button>
                <Radio.Button value="2">减班</Radio.Button>
              </Radio.Group>
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
