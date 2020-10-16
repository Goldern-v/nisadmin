import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { Link } from "react-router-dom";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { onlineLearningReviewModel } from "./OnlineLearningReviewModel";
import { onlineLearningModal } from "../OnlineLearningModal";
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
  const { baseInfo } = onlineLearningReviewModel;
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

  // // 获取按钮状态名
  // const getTaskStatusName = () => {
  //   let isOk = arr.find(
  //     (item: any) =>
  //       item === baseInfo.teachingMethodName &&
  //       baseInfo.organizationWay === "线下"
  //   );
  //   if (isOk) {
  //     return baseInfo.taskStatus ? "您已签到" : "您未签到";
  //   } else {
  //     return baseInfo.taskStatus ? "您已完成" : "您未完成";
  //   }
  // };

  return (
    <Wrapper>
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
              {baseInfo.taskStatus
                ? "您已完成签到!"
                : "您尚未签到，请通过护理助手app进行签到!"}
            </span>
          )}
          {attachmentList.length > 0 && !isOk && (
            <Button
              type="primary"
              disabled={baseInfo.taskStatus || baseInfo.tpStatus === "finished"}
              onClick={() => handleFinish()}
            >
              {baseInfo.taskStatus ? "您已完成" : "您未完成"}
            </Button>
          )}
          <Button
            onClick={() => {
              history.goBack(), onlineLearningModal.tabsChanged(0);
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
    </Wrapper>
  );
});
