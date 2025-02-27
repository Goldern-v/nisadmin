import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { Modal, message as Message, Button, Tabs } from "antd";
import SelectLabel from "./components/SelectLabel";
import Header from "./components/Header";
import { observer } from "mobx-react-lite";
import Table from "./components/Table";
import CheckedContent from "./components/CheckedContent";
import { quesBankView } from "./QuesBankView";
import TestPageModal from "src/modules/continuingEdu/views/trainingInfoReview/components/TestPageModal/TestPageModal";
import createModal from "src/libs/createModal";
import { stepServices } from "../../services/stepServices";
import { stepViewModal as allStepViewModal } from "../../StepViewModal";
import { appStore } from "src/stores";

const { TabPane } = Tabs;

export interface Props {
  pertId?: any; //厚街上传试题需要传试卷id
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function PushModal(props: Props) {
  const { visible, onCancel, onOk, pertId } = props;
  const [editLoading, setEditLoading] = useState(false);
  const testPage = createModal(TestPageModal); // 预览弹窗

  // 初始化
  useLayoutEffect(() => {
    quesBankView.init();
  }, []);

  // 习题预览弹窗
  const handlePagePreview = () => {
    if (quesBankView.questionIdList && quesBankView.questionIdList.length > 0) {
      quesBankView.importType = 'exercisePreview'
      testPage.show({
        questionIdList: quesBankView.questionIdList,
        teachingMethodName: "",
        title: "",
        startTime: "--",
        endTime: "--",
        examDuration: "--",
        passScores: "--"
      });
    } else {
      Message.error("预览试卷前请先添加题目！");
    }
  };

  // 保存
  const checkForm = () => {
    if (quesBankView.questionIdList && quesBankView.questionIdList.length > 0) {
      let obj = {
        taskCode: allStepViewModal.taskCode,
        questionIdList: quesBankView.questionIdList,
        pertId: appStore.HOSPITAL_ID == 'hj' ? pertId : null,
        teachingMethod: allStepViewModal.stepData1.teachingMethod
      };
      setEditLoading(true);
      stepServices
        .saveQuestionsToTeachingPlanTask(obj)
        .then((res: any) => {
          setEditLoading(false);
          res.data.map((item: any) => item.pickQuestionCount = item.questionCount)
          quesBankView.saveData = res.data;
          quesBankView.questionIdList = [];
          quesBankView.questionList = [];
          onOk();
          Message.success("题库上传成功");
        })
        .catch(e => {
          setEditLoading(false);
          console.log(e);
        });
    } else {
      Message.error("您还没有添加任何题目哦！");
    }
  };

  // 弹窗取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Wrapper>
      <Modal
        width={1350}
        visible={visible}
        onCancel={handleCancel}
        onOk={checkForm}
        confirmLoading={editLoading}
        title="题库上传"
        centered
        footer={
          <div style={{ textAlign: "center" }}>
            <Button onClick={handleCancel}>取消</Button>
            <Button
              onClick={() => {
                handlePagePreview();
              }}
            >
              预览试卷
            </Button>
            <Button type="primary" onClick={checkForm} loading={editLoading}>
              确定
            </Button>
          </div>
        }
      >
        <Content>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="题库选择" key="1" style={{ display: "flex" }}>
              <div
                className="select"
                style={{
                  width: "24%",
                  borderRight: "1px solid #ccc"
                }}
              >
                <SelectLabel />
              </div>
              <div className="content" style={{ width: "76%" }}>
                <Header />
                <Table />
              </div>
            </TabPane>
            <TabPane tab="我已选择" key="2">
              <CheckedContent />
            </TabPane>
          </Tabs>
          <TotalNum>
            已勾选（{quesBankView.allQuestionNum}）： 单选题（
            {quesBankView.RadioQuestionNum}） 多选题（
            {quesBankView.checkBoxQuestionNum}）填空题（
            {quesBankView.TKQuestionNum}） 问答题（{quesBankView.JDQuestionNum}
            ）
          </TotalNum>
        </Content>
      </Modal>
      <testPage.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  .tabs {
    display: inline-block;
    width: 100px;
    border-right: 1px solid #ccc;
  }
  .content {
    width: 100%;
    background: red;
  }
  .ant-modal-content / deep/ .ant-modal-body {
    padding: 0 !important;
    margin-top: 5px;
  }
`;
const Content = styled.div`
  position: relative;
`;

const TotalNum = styled.div`
  font-weight: bold;
  position: absolute;
  right: 15px;
  top: 8px;
`;
