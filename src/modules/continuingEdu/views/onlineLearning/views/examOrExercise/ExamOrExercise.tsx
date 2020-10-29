import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, message, Spin } from "antd";
import { Link } from "react-router-dom";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { examOrExerciseModel } from "./ExamOrExerciseModel";
export interface Props {}
export default observer(function OnlineLearningReview(props: Props) {
  const { queryObj } = appStore;
  const { examInfo, examLoading } = examOrExerciseModel;

  useEffect(() => {
    console.log(examInfo, "examInfoexamInfo111111111");
    examOrExerciseModel.init();
  }, [queryObj.id]);

  return (
    <Wrapper>
      <Spin spinning={examLoading}>考试 练习</Spin>
    </Wrapper>
  );
});

const Wrapper = styled.div`
    margin: 50px auto;
    background: rgb(255, 255, 255);
    padding: 15px 40px 30px;
    width: 760px;
    min-height: 740px;
    box-sizing: border-box;
}
`;
