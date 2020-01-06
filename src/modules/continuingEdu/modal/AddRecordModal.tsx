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
  message,
  Steps
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import Step1 from "./stepComponent/Step1";
import Step2 from "./stepComponent/Step2";
import Step3 from "./stepComponent/Step3";
import Step4 from "./stepComponent/Step4";
import Step5 from "./stepComponent/Step5";
const { Step } = Steps;
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {};
}

export default function AddRecordModal(props: Props) {
  const [title, setTitle] = useState("添加记录");
  const [currentStep, setCurrentStep] = useState(0);
  let { visible, onCancel } = props;

  const stepList = [
    {
      title: "类型选择",
      component: <Step1 />
    },
    {
      title: "基本设置",
      component: <Step2 />
    },
    {
      title: "参与人员",
      component: <Step3 />
    },
    {
      title: "上传设置",
      component: <Step4 />
    },
    {
      title: "完成",
      component: <Step5 />
    }
  ];

  const nextStep = () => {
    const current = currentStep + 1;
    setCurrentStep(current);
  };

  const prevStep = () => {
    const current = currentStep - 1;
    setCurrentStep(current);
  };

  useLayoutEffect(() => {}, [visible]);

  return (
    <Modal
      width={900}
      title={title}
      visible={visible}
      onCancel={onCancel}
      // onOk={onSave}
      okText="保存"
      forceRender
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={prevStep}>上一步</Button>
          <Button onClick={onCancel}>取消</Button>
          <Button onClick={nextStep}>下一步</Button>
        </div>
      }
    >
      <Steps current={currentStep}>
        {stepList.map(item => (
          <Step title={item.title} />
        ))}
      </Steps>
      <StepCon>
        {stepList
          .filter((item, index) => index == currentStep)
          .map(item => item.component)}
      </StepCon>
    </Modal>
  );
}
const Wrapper = styled.div``;
const StepCon = styled.div`
  margin-top: 30px;
`;
