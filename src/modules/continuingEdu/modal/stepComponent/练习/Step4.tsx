import styled from "styled-components";
import React, { useLayoutEffect } from "react";
import {
  Button,
  Row,
  Col,
} from "antd";
import Form from "src/components/Form";
import { lxStepViewModal as stepViewModal } from "./LXStepViewModal";
import { stepViewModal as allStepViewModal } from "../StepViewModal";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "../公共/selectNurseModal/SelectPeopleModal";
import { observer } from "mobx-react-lite";
import UpdateTable from "./UpdateTable";
import {quesBankView} from 'src/modules/continuingEdu/modal/stepComponent/考试/modal/QuesBankView';
import TestPageModal from "src/modules/continuingEdu/views/trainingInfoReview/components/TestPageModal/TestPageModal";
export interface Props { }

export default observer(function Step4() {
  const testPage = createModal(TestPageModal); // 习题预览弹窗
  const selectNurseModal = createModal(SelectPeopleModal);
  let refForm = React.createRef<Form>();

  const onFormChange = (name: string, value: any, from: Form) => {
    let data = from.getFields();
    Object.assign(stepViewModal.stepData2, data);
  };

  useLayoutEffect(() => {
    refForm.current && refForm.current.setFields(stepViewModal.stepData2);
  }, []);

  // 习题预览弹窗
  const handlePagePreview = () => {
    let getObj: any = {
      taskCode: allStepViewModal.taskCode,
      teachingMethod: allStepViewModal.stepData1.teachingMethod
    };
    if (allStepViewModal.stepData1.ceptId) {
      getObj.cetpId = allStepViewModal.stepData1.ceptId;
    }
    quesBankView.importType='preview'
    testPage.show({
      obj: getObj,
      teachingMethodName: "",
      title: "",
      startTime: "",
      endTime: "",
      examDuration: "",
      passScores: ""
    });
  };

  return (
    <Wrapper>
      <Form
        ref={refForm}
        labelWidth={100}
        onChange={onFormChange}
      >
        <Row>
          <Col span={24}>
            <TipCon>
              <div>出题规则：</div>
              <div>顺序答题，每次答题保留答题进度。可重复答题练习</div>
              <div>全部答题完毕方可获取学分学时</div>
            </TipCon>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span={24}>
            <Form.Field
              label={`上传题库`}
              name="questionStatList"
              labelWidth={70}
            >
              <UpdateTable />
            </Form.Field>
          </Col>
        </Row>
      </Form>
      <span className="ab">
        <Button
          size="small"
          onClick={() => {
            handlePagePreview();
          }}
        >
          习题预览
        </Button>
      </span>
      <testPage.Component />
      <selectNurseModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  margin: 40px 100px 20px;
  position: relative;
  .ab {
    display: inline-block;
    position: absolute;
    right: 6px;
    top: 123px;
  }
`;

const DateSelectCon = styled.div`
  .date-row {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 20px;
    padding-left: 120px;
    font-size: 14px;
    .select-item {
      width: 120px;
      margin-left: 20px;
    }
    .aside {
      font-size: 12px;
      color: #666;
    }
    .date-label {
      margin-right: 20px;
    }
  }
  .label {
    width: 0;
    margin: 0;
  }
  .formField-wrapper {
    margin: 0;
  }
  .formField-container {
    width: 100px;
    margin-right: 20px;
  }
`;

function MoreBox(props: any) {
  const { onClick } = props;
  const Wrapper = styled.div`
    width: 32px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    &:hover {
      border-color: #1db38b;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(0, 166, 128, 0.2);
    }
  `;
  return <Wrapper onClick={onClick}>...</Wrapper>;
}

const TipCon = styled.div`
  padding: 20px;
  background: #f0f0f0;
`;
