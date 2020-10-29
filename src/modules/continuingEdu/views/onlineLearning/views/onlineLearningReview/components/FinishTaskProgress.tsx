import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Spin, message } from "antd";
import { observer } from "mobx-react-lite";
import { getFileSize, getFileType, getFilePrevImg } from "src/utils/file/file";
import { appStore } from "src/stores";
import createModal from "src/libs/createModal";
import PreviewModal from "src/utils/file/modal/PreviewModal"; // 学习预览
import { onlineLearningReviewModel } from "../OnlineLearningReviewModel";
import { onlineLearningReviewApi } from "../api/OnlineLearningReviewApi";

export interface Props {}

export default observer(function finishTaskProgress() {
  const { queryObj } = appStore;
  const { baseInfo } = onlineLearningReviewModel;
  const attachmentList = baseInfo.attachmentList || [];
  let isExamOrExercise =
    baseInfo.teachingMethodName === "考试" ||
    baseInfo.teachingMethodName === "练习"
      ? true
      : false;
  const previewModal = createModal(PreviewModal);

  const showReview = (file: any) => {
    previewModal.show({
      title: file.name,
      path: file.path,
      id: file.id,
      finish: file.alreadyRead,
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
                >
                  {baseInfo.teachingMethodName}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {!attachmentList.length && (
        <div className="no_conetent">
          暂时没有需要{baseInfo.teachingMethodName}的文件！
        </div>
      )}
      {/* {isExamOrExercise && (
        <div className="file-item">
          <div className="file-title">
            {baseInfo.teachingMethodName === "考试" ? "试卷" : "习题"}
          </div>
          <Button
            className="download-btn"
            onClick={() =>
              appStore.history.push(`/examOrExercise?id=${queryObj.id}`)
            }
          >
            {baseInfo.teachingMethodName}
          </Button>
        </div>
      )}
      {!attachmentList.length && !isExamOrExercise && (
        <div className="no_conetent">
          暂时没有需要{baseInfo.teachingMethodName}的文件！
        </div>
      )} */}
      <previewModal.Component />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background: #fff;
  border-left: 1px solid #ddd;
  padding: 10px 15px;
  width: 380px;
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
  .download-btn {
    position: absolute;
    right: 10px;
    top: 24px;
  }
  .no_conetent {
    text-align: center;
    margin-top: 40px;
  }
`;
