import { Input, Modal } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export interface Props {
  visible: boolean;
  title?: string | undefined;
  value: string;
  propsBody?: Record<string, any>;
  onOk: Function;
  onClose: Function;
}
export default observer(function TextareaModal(props: Props) {
  const { title, onOk, onClose, propsBody = { rows: 3 } } = props;
  const [val, setVal] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await onOk(val);
      onClose();
    } catch (e) {
    } finally {
      setConfirmLoading(false);
    }
  };

  useEffect(() => {
    if (props.visible) {
      setVal(props.value);
    }
  }, [props.value, props.visible]);
  return (
    <Modal
      title={title}
      visible={props.visible}
      confirmLoading={confirmLoading}
      okText="保存"
      onOk={() => handleOk()}
      onCancel={() => onClose()}
    >
      <Input.TextArea
        value={val}
        onChange={(e: any) => setVal(e.target.value)}
        {...propsBody}
      />
    </Modal>
  );
});

const Wrapper = styled.div``;
