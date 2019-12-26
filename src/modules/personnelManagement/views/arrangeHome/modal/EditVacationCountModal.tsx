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
import { ArrangeItem } from "../types/Sheet";

const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: (value?: any) => {};
  data: ArrangeItem;
  baseNum: number;
}

/** 设置规则 */
const rules: Rules = {
  effectiveTime: val => !!val || "请填写工时"
};

export default function EditVacationCountModal(props: Props) {
  let { visible, onCancel, onOkCallBack, data, baseNum } = props;
  const [num, setNum]: any = useState(1);
  const [arrangeName, setArrangeName]: any = useState("");

  const onSave = async () => {
    onOkCallBack && onOkCallBack(num);

    onCancel();
  };
  useLayoutEffect(() => {
    if (visible && data) {
      setNum(baseNum || 0);
      setArrangeName(data.rangeName);
    }
  }, [visible]);

  return (
    <Modal
      title={"设置班次计数基数"}
      width={300}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
      centered
    >
      <Wrapper>
        <div className="title">{arrangeName}-当前选择班次的的计数</div>
        <InputNumber value={num} onChange={value => setNum(value)} />
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  text-align: center;
  .title {
    margin-bottom: 10px;
    font-size: 14px;
  }
`;
