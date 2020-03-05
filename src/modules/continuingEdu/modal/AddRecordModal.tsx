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
import Step1 from "./stepComponent/公共/Step1";
import Step3 from "./stepComponent/公共/Step3";
import Step4 from "./stepComponent/公共/Step4";

import Step2_xx from "./stepComponent/学习/Step2";
import Step5_xx from "./stepComponent/学习/Step5";

import Step2_px from "./stepComponent/培训/Step2";
import Step5_px from "./stepComponent/培训/Step5";

import { ScrollBox } from "src/components/common";
import {
  stepViewModal,
  selfStepViewModalMap
} from "./stepComponent/StepViewModal";
import { observer } from "mobx-react-lite";
import { stepServices } from "./stepComponent/services/stepServices";
const { Step } = Steps;
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  id?: any;
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
}

export default observer(function AddRecordModal(props: Props) {
  const [title, setTitle] = useState("添加记录");
  const [currentStep, setCurrentStep] = useState(0);
  let { visible, onCancel, onOkCallBack } = props;

  const getStep2 = () => {
    //1.学习、2培训、3考试、4练习、5实操、6演练
    if (stepViewModal.stepData1.teachingMethod == 1) {
      return <Step2_xx />;
    } else if (stepViewModal.stepData1.teachingMethod == 2) {
      return <Step2_px />;
    } else {
      return <Step2_xx />;
    }
  };
  const getStep5 = () => {
    //1.学习、2培训、3考试、4练习、5实操、6演练
    if (stepViewModal.stepData1.teachingMethod == 1) {
      return <Step5_xx />;
    } else if (stepViewModal.stepData1.teachingMethod == 2) {
      return <Step5_px />;
    } else {
      return <Step5_xx />;
    }
  };

  const stepList = [
    {
      title: "类型选择",
      component: <Step1 />
    },
    {
      title: "基本设置",
      component: getStep2()
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
      component: getStep5()
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

  const addTeachingPlanInfoStudy = () => {
    stepViewModal.addTeachingPlanInfoStudy().then(res => {
      message.success("提交成功");
      onCancel();
      onOkCallBack && onOkCallBack();
    });
  };

  useLayoutEffect(() => {
    if (visible) {
      if (props.id) {
        /** 修改 */
        stepServices.getCompleteInfo(props.id).then(res => {
          stepViewModal.initData(res.data);
          console.log(
            selfStepViewModalMap,
            res.data.teachingMethod,
            "res.data.teachingMethod"
          );
          selfStepViewModalMap[res.data.teachingMethod].initData(res.data);
          setCurrentStep(0);
        });
      } else {
        setCurrentStep(0);
      }
    } else {
      setCurrentStep(-1);
      stepViewModal.cleanAllStepData();
    }
  }, [visible]);

  return (
    <Modal
      width={900}
      title={title}
      visible={visible}
      onCancel={onCancel}
      centered
      // onOk={onSave}
      okText="保存"
      forceRender
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={prevStep}>上一步</Button>
          <Button onClick={onCancel}>取消</Button>

          {currentStep <= 3 && (
            <Button
              onClick={nextStep}
              type="primary"
              // disabled={!stepViewModal.isOkStep(currentStep)}
            >
              下一步
            </Button>
          )}
          {currentStep == 4 && (
            <Button onClick={addTeachingPlanInfoStudy} type="primary">
              提交审核
            </Button>
          )}
        </div>
      }
    >
      <StepHead>
        <Steps current={currentStep}>
          {stepList.map(item => (
            <Step title={item.title} />
          ))}
        </Steps>
      </StepHead>

      <StepCon>
        {stepList
          .filter((item, index) => index == currentStep)
          .map(item => item.component)}
      </StepCon>
    </Modal>
  );
});
const Wrapper = styled.div``;
const StepCon = styled(ScrollBox)`
  margin-top: 0px;
  height: 55vh;
  overflow: auto;
`;
const StepHead = styled.div`
  padding: 0px 20px 15px;
  border-bottom: 1px solid #ddd;
`;
