import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import {
  Modal,
  Button,
  Select,
  message,
  Steps
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Step1 from "./stepComponent/公共/Step1";
import Step3 from "./stepComponent/公共/Step3";
import Step4 from "./stepComponent/公共/Step4";

import Step2_xx from "./stepComponent/学习/Step2";
import Step5_xx from "./stepComponent/学习/Step5";

import Step2_px from "./stepComponent/培训/Step2";
import Step5_px from "./stepComponent/培训/Step5";

import Step2_ks from "./stepComponent/考试/Step2";
import Step4_ks from "./stepComponent/考试/Step4";
import Step5_ks from "./stepComponent/考试/Step5";

import Step2_lx from "./stepComponent/练习/Step2";
import Step4_lx from "./stepComponent/练习/Step4";
import Step5_lx from "./stepComponent/练习/Step5";

import Step2_yl from "./stepComponent/演练/Step2";
import Step5_yl from "./stepComponent/演练/Step5";

import Step2_sc from "./stepComponent/实操/Step2";
import Step4_sc from "./stepComponent/实操/Step4";
import Step5_sc from "./stepComponent/实操/Step5";

import Step2_sj from "./stepComponent/实践/Step2";
import Step5_sj from "./stepComponent/实践/Step5";

import { ScrollBox } from "src/components/common";
import {
  stepViewModal,
  selfStepViewModalMap
} from "./stepComponent/StepViewModal";
import { observer } from "mobx-react-lite";
import { stepServices } from "./stepComponent/services/stepServices";
import { ksStepViewModal } from "./stepComponent/考试/KSStepViewModal";

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
    } else if (stepViewModal.stepData1.teachingMethod == 3) {
      return <Step2_ks />;
    } else if (stepViewModal.stepData1.teachingMethod == 4) {
      return <Step2_lx />;
    } else if (stepViewModal.stepData1.teachingMethod == 5) {
      return <Step2_sc />;
    } else if (stepViewModal.stepData1.teachingMethod == 6) {
      return <Step2_yl />;
    } else if (stepViewModal.stepData1.teachingMethod == 7) {
      return <Step2_sj />;
    } else {
      return <Step2_xx />;
    }
  };
  const getStep4 = () => {
    //1.学习、2培训、3考试、4练习、5实操、6演练
    if (stepViewModal.stepData1.teachingMethod == 3) {
      return <Step4_ks />;
    } else if (stepViewModal.stepData1.teachingMethod == 4) {
      return <Step4_lx />;
    } else if (stepViewModal.stepData1.teachingMethod == 5) {
      return <Step4_sc />;
    } else {
      return <Step4 />;
    }
  };

  const getStep5 = () => {
    //1.学习、2培训、3考试、4练习、5实操、6演练
    if (stepViewModal.stepData1.teachingMethod == 1) {
      return <Step5_xx />;
    } else if (stepViewModal.stepData1.teachingMethod == 2) {
      return <Step5_px />;
    } else if (stepViewModal.stepData1.teachingMethod == 3) {
      return <Step5_ks />;
    } else if (stepViewModal.stepData1.teachingMethod == 4) {
      return <Step5_lx />;
    } else if (stepViewModal.stepData1.teachingMethod == 5) {
      return <Step5_sc />;
    } else if (stepViewModal.stepData1.teachingMethod == 6) {
      return <Step5_yl />;
    } else if (stepViewModal.stepData1.teachingMethod == 7) {
      return <Step5_sj />;
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
      component: getStep4()
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

  const addTeachingPlanInfoStudy = (status: any) => {
    stepViewModal.addTeachingPlanInfoStudy(status).then((res: any) => {
      message.success("提交成功");
      onCancel();
      onOkCallBack && onOkCallBack();
    });
  };

  useLayoutEffect(() => {
    if (visible) {
      (async () => {
        stepViewModal.initDict();
        let task = '';
        await stepServices.generateTaskCode().then(res => {
          stepViewModal.taskCode = res.data;
          task = res.data;
        });
        if (props.id) {
          /** 修改 */
          setTitle("修改记录");
          stepServices.getCompleteInfo(props.id).then(res => {
            stepViewModal.initData(res.data);
            selfStepViewModalMap[res.data.teachingMethod].initData(res.data);
            setCurrentStep(0);
          });
          // 厚街多套试卷数据初始化
          stepServices.getStatInfoOfAllEditRunTimeExamPapers(task, props.id).then((res: any) => {
            ksStepViewModal.manyQuestionStatLists = res.data || []
          })
        } else {
          setCurrentStep(0);
          setTitle("添加记录");
        }
      })();
    } else {
      setCurrentStep(- 1);
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
          {currentStep >= 1 && <Button onClick={prevStep}>上一步</Button>}

          <Button onClick={onCancel}>取消</Button>

          {currentStep <= 3 && (
            <Button
              onClick={nextStep}
              type="primary"
              disabled={
                !stepViewModal.isOkStep(
                  currentStep,
                  stepViewModal.stepData1.teachingMethodName
                )
              }
            >
              下一步
            </Button>
          )}
          {currentStep == 4 && (
            <React.Fragment>
              <Button
                onClick={() => addTeachingPlanInfoStudy(2)}
                type="primary"
              >
                提交审核
              </Button>
            </React.Fragment>
          )}
          {currentStep >= 1 && (
            <Button onClick={() => addTeachingPlanInfoStudy(1)}>存草稿</Button>
          )}
        </div>
      }
    >
      <StepHead>
        <Steps current={currentStep}>
          {stepList.map((item: any, index: any) => (
            <Step title={item.title} key={index} />
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
