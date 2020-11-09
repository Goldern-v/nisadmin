import styled from "styled-components";
import React, { useEffect } from "react";
import { Button, message, Spin } from "antd";
import { Link } from "react-router-dom";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { onlineLearningReviewModel } from "./OnlineLearningReviewModel";
import { examOrExerciseApi } from "../examOrExercise/api/ExamOrExerciseApi";

import {
  Wrapper,
  TopPannel,
  NavCon,
  MainTitle,
  SubContent,
  ButtonGroups,
  MainPannel
} from "src/modules/continuingEdu/views/trainingInfoReview/components/common";
import BaseInfoPannel from "./components/BaseInfoPannel";
import FinishTaskProgress from "./components/FinishTaskProgress";
import { onlineLearningReviewApi } from "./api/OnlineLearningReviewApi";
export interface Props {}

export default observer(function OnlineLearningReview(props: Props) {
  const { history, queryObj } = appStore;
  const { baseInfo, baseLoading } = onlineLearningReviewModel;
  const tpStatusName =
    baseInfo.tpStatus === "finished"
      ? "已结束"
      : "ongoing"
      ? "进行中"
      : "待开始" || "";
  const attachmentList = baseInfo.attachmentList || [];
  const arr = ["实操", "实践"];
  let isOk =
    arr.find((item: any) => item === baseInfo.teachingMethodName) ||
    (baseInfo.teachingMethodName === "培训" &&
      baseInfo.organizationWay === "线下");

  useEffect(() => {
    onlineLearningReviewModel.init();
  }, [queryObj.id]);

  // 完成
  const handleFinish = () => {
    let isOk: boolean = attachmentList.find((item: any) => !item.alreadyRead);
    if (isOk) {
      message.warning("请先完成所有学习任务！");
      return;
    }
    let obj: object = {
      cetpId: queryObj.id,
      taskRole: 1
    };
    onlineLearningReviewApi.finishTask(obj).then((res: any) => {
      if (res.code === "200") {
        message.success("已成功完成所有任务！");
        onlineLearningReviewModel.getBaseInfo(queryObj.id);
      } else {
        message.error(`${res.desc}`);
      }
    });
  };

  // 获取按钮状态名
  const getTaskStatusNameWorld = () => {
    if (baseInfo.taskStatus) {
      return "您已签到";
    } else {
      if (baseInfo.tpStatus === "finished") {
        return "您未签到";
      } else {
        return "您尚未签到，请通过护理助手app进行签到!";
      }
    }
  };

  // 获取文字状态名
  const getTaskStatusNameBtn = () => {
    if (baseInfo.taskStatus) {
      return "您已完成";
    } else {
      if (baseInfo.tpStatus === "finished") {
        return "您未完成";
      } else {
        return "完成";
      }
    }
  };

  // 查看成绩
  const checkExam = () => {
    examOrExerciseApi
      .reviewMyScores(queryObj.id)
      .then((res: any) => {
        if (res.code === "200") {
          onlineLearningReviewModel.examScore = res.data || [];
          history.push(`/examScore?id=${queryObj.id}`);
        } else {
          message.error(`${res.desc}`);
        }
      })
      .catch(err => {});
  };

  return (
    <Wrapper>
      <Spin spinning={baseLoading}>
        <TopPannel>
          <NavCon>
            <Link to="/home">当前位置</Link>
            <span> ： </span>
            <Link to="/continuingEdu/在线学习">在线学习</Link>
            <span> >> 查看详情</span>
          </NavCon>
          <MainTitle>{baseInfo.title || " "}</MainTitle>
          <SubContent>
            <span className="label"> 状态:</span>
            <span>{tpStatusName}</span>
          </SubContent>
          <ButtonGroups>
            {isOk && (
              <span
                style={{
                  marginRight: "25px",
                  fontSize: "13px",
                  color: baseInfo.taskStatus ? "blue" : "red"
                }}
              >
                {getTaskStatusNameWorld()}
              </span>
            )}
            {attachmentList.length > 0 && !isOk && (
              <Button
                type="primary"
                disabled={
                  baseInfo.taskStatus || baseInfo.tpStatus === "finished"
                }
                onClick={() => handleFinish()}
              >
                {getTaskStatusNameBtn()}
              </Button>
            )}
            {baseInfo.taskStatus === 1 &&
              baseInfo.teachingMethodName === "考试" && (
                <Button type="primary" onClick={() => checkExam()}>
                  查看成绩
                </Button>
              )}
            <Button
              onClick={() => {
                history.goBack();
              }}
            >
              返回
            </Button>
          </ButtonGroups>
        </TopPannel>
        <MainPannel>
          <FinishTaskProgress />
          <BaseInfoPannel />
        </MainPannel>
      </Spin>
    </Wrapper>
  );
});
