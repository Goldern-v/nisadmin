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
import { arrangeService } from "../services/ArrangeService";
import { authStore } from "src/stores";
import { selectViewModal } from "../viewModal/SelectViewModal";

const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {};
}

/** 设置规则 */
const rules: Rules = {
  publicDate: val => !!val || "请填写发表日期"
};

export default function ShowStandardTimeModal(props: Props) {
  const [title, setTitle] = useState("查看标准工时");
  const [list, setList] = useState([]);

  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();

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

  const getData = () => {
    arrangeService
      .schInitialHourGetListByDate({
        wardCode: authStore.selectedDeptCode,
        startDate: selectViewModal.params.startTime,
        endDate: selectViewModal.params.endTime
      })
      .then((res: any) => {
        setList(res.data);
      });
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (visible) {
      getData();
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
      <Wrapper>
        <div className="row">
          <span className="key">默认:</span>
          <span className="value">37.5h</span>
        </div>
        {list.map((item: any) => (
          <div className="row" key={item.startDate}>
            <span className="key">{item.startDate}起:</span>
            <span className="value">{item.initialHour}h</span>
          </div>
        ))}
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  .row {
    text-align: center;
    font-size: 16px;
    .key {
      margin-right: 5px;
    }
    .value {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;
