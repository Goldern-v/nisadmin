import styled from "styled-components";
import React from "react";
import StudyContent from "src/modules/continuingEdu/views/trainingInfoReview/components/pageContents/StudyContent";
import { observer } from "mobx-react-lite";
import { onlineLearningReviewModel } from "../OnlineLearningReviewModel";

export interface Props {
}

export default observer(function BaseInfoPannel() {
  const { baseInfo, baseLoading } = onlineLearningReviewModel;

  return (
    <Wrapper>
      <BaseInfoPage>
        <StudyContent data={baseInfo}/>
      </BaseInfoPage>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  overflow: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
  ::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  height: 100%;
`;

const BaseInfoPage = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  width: 760px;
  padding: 15px 20px;
  margin: 15px auto;
  min-height: 800px;
  .main-title {
    padding: 15px;
    text-align: center;
    font-size: 28px;
    color: #000;
    line-height: 30px;
  }
  .content-item-title {
    font-size: 14px;
    margin: 10px 0;
    ::before {
      content: "";
      display: inline-block;
      height: 18px;
      width: 5px;
      background: rgba(112, 182, 3, 1);
      vertical-align: sub;
      margin-right: 10px;
    }
  }
`;
