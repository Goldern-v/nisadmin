import styled from "styled-components";
import React from "react";
import { Button, message } from "antd";
import { observer } from "mobx-react-lite";
import { getFilePrevImg } from "src/utils/file/file";
import { appStore } from "src/stores";
import createModal from "src/libs/createModal";
import PreviewModal from "../../../modal/PreviewModal"; // 学习预览
import { onlineLearningReviewModel } from "../OnlineLearningReviewModel";
import { onlineLearningReviewApi } from "../api/OnlineLearningReviewApi";

export interface Props { }

export default observer(function finishTaskProgress() {
  const { queryObj } = appStore;
  const { baseInfo } = onlineLearningReviewModel;
  const attachmentList = baseInfo.attachmentList || [];
  let isExamOrExercise = ['考试', '练习'].includes(baseInfo.teachingMethodName)
  const previewModal = createModal(PreviewModal);

  // 预览文件
  const showReview = (file: any) => {
    previewModal.show({
      title: file.name,
      path: file.path,
      id: file.id,
      finish: file.alreadyRead,
      videoQuestionList: baseInfo.attachmentList,
      learningFunc: finishTaskFun
    });
  };

  const finishTaskFun = (attachmentId: any) => {
    onlineLearningReviewApi.readAttachment(attachmentId).then(res => {
      if (res.code === "200") {
        onlineLearningReviewModel.getBaseInfo(queryObj.id);
      } else {
        message.error(`${res.desc}`);
      }
    });
  };

  return (
    <Wrapper>
      {attachmentList.length > 0 && (
        <div>
          <div className="title">完成进度</div>
          <div className="content-item-pannel">
            {attachmentList.map((item: any, idx: number) => (
              <div key={idx} className="file-item">
                <img
                  src={getFilePrevImg(item.name)}
                  className="type-img"
                  style={{ cursor: "pointer" }}
                  alt=""
                />
                <div className="file-title" title={item.name}>
                  附件{idx + 1}
                </div>
                <div
                  className={item.alreadyRead ? "file-finish" : "file-unFinish"}
                  title={item.name}
                >
                  {item.alreadyRead ? "已读" : "未读"}
                </div>
                <Button
                  className="download-btn"
                  onClick={() => showReview(item)}
                  disabled={baseInfo.tpStatus != "ongoing"}
                >
                  {baseInfo.teachingMethodName}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {baseInfo.teachingMethodName === "练习" && (
        <div className="file-item">
          <img
            src={require("../images/exercise.jpg")}
            className="type-img"
            style={{ cursor: "pointer" }}
            alt=""
          />
          <div className="file-title">习题</div>
          <Button
            className={
              !baseInfo.existProcessInfo ? "newBegin-btn" : "begin-btn"
            }
            onClick={() =>
              appStore.history.push(
                `/examOrExercise?id=${queryObj.id}&name=${baseInfo.teachingMethodName
                }&status="true"`
              )
            }
            disabled={baseInfo.tpStatus != "ongoing"}
          >
            {baseInfo.taskStatus === 1 ? "重新练习" : "开始练习"}
          </Button>
          {baseInfo.existProcessInfo === 1 && (
            <Button
              className="again-btn"
              onClick={() =>
                appStore.history.push(
                  `/examOrExercise?id=${queryObj.id}&name=${baseInfo.teachingMethodName
                  }`
                )
              }
            >
              继续练习
            </Button>
          )}
        </div>
      )}
      {baseInfo.teachingMethodName === "考试" && (
        <div className="file-item">
          <img
            src={require("../images/exam.jpg")}
            className="type-img"
            style={{ cursor: "pointer" }}
            alt=""
          />
          <div className="file-title">试卷</div>
          <Button
            disabled={
              baseInfo.tpStatus != "ongoing" ||
              baseInfo.remainingAnswerTimes == 0
            }
            className={
              !baseInfo.ongoingPaperList ? "newBegin-btn" : "begin-btn"
            }
            onClick={() =>
              appStore.history.push(
                `/examOrExercise?id=${queryObj.id}&name=${baseInfo.teachingMethodName
                }`
              )
            }
          >
            {baseInfo.alReadyAnswerTimes === 0
              ? "开始考试"
              : `重新考试(剩余${baseInfo.remainingAnswerTimes}次)`}
          </Button>
          {baseInfo.ongoingPaperList && (
            <Button
              className="again-btn"
              onClick={() =>
                appStore.history.push(
                  `/examOrExercise?id=${queryObj.id}&paperCode=${baseInfo.ongoingPaperList[0]
                  }&name=${baseInfo.teachingMethodName}`
                )
              }
            >
              继续考试
            </Button>
          )}
        </div>
      )}
      {!attachmentList.length && !isExamOrExercise && (
        <div className="no_conetent">
          暂时没有需要{baseInfo.teachingMethodName}的文件！
        </div>
      )}
      <previewModal.Component />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background: #fff;
  border-left: 1px solid #ddd;
  padding: 10px 15px;
  width: 450px;
  height: 100%;
  float: right;
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
  .title {
    font-size: 16px;
    font-weight: 900;
    margin-bottom: 10px;
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
  .content-item-pannel {
    padding: 0 12px;
  }
  .file-item {
    background: #eee;
    margin-bottom: 8px;
    border-radius: 5px;
    padding: 10px;
    height: 80px;
    width: 100%;
    position: relative;
    .type-img {
      width: 60px;
      height: 60px;
    }
  }
  .file-title {
    font-size: 13px;
    position: absolute;
    top: 30px;
    left: 80px;
    right: 186px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .file-finish {
    font-size: 13px;
    color: blue;
    position: absolute;
    top: 30px;
    left: 160px;
  }
  .file-unFinish {
    font-size: 13px;
    color: red;
    position: absolute;
    top: 30px;
    left: 160px;
  }
  .begin-btn {
    position: absolute;
    right: 100px;
    top: 24px;
  }
  .again-btn {
    position: absolute;
    right: 10px;
    top: 24px;
  }
  .download-btn {
    position: absolute;
    right: 10px;
    top: 24px;
  }
  .newBegin-btn {
    position: absolute;
    right: 10px;
    top: 24px;
  }
  .no_conetent {
    text-align: center;
    margin-top: 40px;
  }
`;
