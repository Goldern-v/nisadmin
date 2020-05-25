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
import BaseTabs from "src/components/BaseTabs";
import SetTittle from "./components/SetTittle";
import SetRange from "./components/SetRange";

const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => void;
  blockId: any;
  registerCode: any;
}

/** 设置规则 */
const rules: Rules = {
  publicDate: val => !!val || "请填写发表日期"
};

export default function SettingModal(props: Props) {
  const [title, setTitle] = useState("设置");
  let { visible, onCancel, blockId, registerCode, onOkCallBack } = props;

  let refForm = React.createRef<Form>();

  const tabConfig = visible
    ? [
      {
        title: "标题设置",
        component: (
          <SetTittle
            blockId={blockId}
            registerCode={registerCode}
            onOkCallBack={onOkCallBack}
          />
        ),
        index: 1
      }
      // {
      //   title: "交班班次与提醒设置",
      //   component: (
      //     <SetRange
      //       blockId={blockId}
      //       registerCode={registerCode}
      //       onOkCallBack={onOkCallBack}
      //     />
      //   ),
      //   index: 2
      // }
    ]
    : [];

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
    if (visible) {
    }
  }, [visible]);

  return (
    <Modal
      title={null}
      closable={false}
      footer={
        <div>
          <Button onClick={onCancel}>关闭</Button>
        </div>
      }
      visible={visible}
      onCancel={() => {
        onCancel()
        onOkCallBack && onOkCallBack()
      }}
      onOk={onSave}
      okText="保存"
      forceRender
      width={900}
      bodyStyle={{ padding: 0 }}
      centered
    >
      <BaseTabs config={tabConfig} style={{ border: 0 }} />
    </Modal>
  );
}
const Wrapper = styled.div``;
