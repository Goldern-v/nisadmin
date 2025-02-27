import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import createModal from "src/libs/createModal";
import TestPageModal from "./../TestPageModal/TestPageModal";
import { appStore } from "src/stores";
import {quesBankView} from 'src/modules/continuingEdu/modal/stepComponent/考试/modal/QuesBankView';

export interface Props {
  info?: any;
}

//参与人员
export default function TestInfo(props: Props) {
  const testPage = createModal(TestPageModal);
  const { info } = props;
  const { queryObj } = appStore;

  return (
    <Wrapper>
      <div className="content-item-title">上传设置</div>
      <div className="row">
        <div className="label w-106">最大考试次数：</div>
        <div className="content">{info.maxExamTimes}</div>
        <div className="label w-106">卷面总分：</div>
        <div className="content">{info.totalScores}</div>
        <div className="label w-106">及格分数线：</div>
        <div className="content">{info.passScores}</div>
        <div className="label w-106">题目设置：</div>
        <div className="content">
          【{info.teachingMethodName}】《{info.title}》
         </div>
        {info.id && queryObj.onlineLearningName != "考试" && appStore.HOSPITAL_ID != 'hj' && (
          <div>
            <div className="label w-106" />
            <div className="content">
              卷面题目数共 {info.questionCount} 题{" "}
              {info.randomOrderQue ? "随机显示题目顺序" : ""}{" "}
              {info.randomOrderQItem ? "随机显示选项顺序" : ""}
            </div>
            <div className="label w-106" />
            <div className="content">
              <Button
                type="primary"
                onClick={() =>
                  testPage.show({
                    id: info.id,
                    teachingMethodName: info.teachingMethodName,
                    title: info.title,
                    startTime: info.startTime,
                    endTime: info.endTime,
                    examDuration: info.examDuration,
                    passScores: info.passScores
                  })
                }
              >
                试卷预览
            </Button>
            </div>
          </div>
        )}
        {info.id && queryObj.onlineLearningName != "考试" && appStore.HOSPITAL_ID == 'hj' &&
          info.paperList.map((item: any, index: any) => {
            return (
              <div>
                <div className="label w-106" />
                <div style={{ fontWeight: 900 }}>试卷{index + 1}</div>
                <div className="label w-106" />
                <div className="content">
                  卷面题目数共 {item.questionCount} 题{" "}
                  {info.randomOrderQue ? "随机显示题目顺序" : ""}{" "}
                  {info.randomOrderQItem ? "随机显示选项顺序" : ""}
                </div>
                <div className="label w-106" />
                <div className="content" style={{ marginBottom: "15px" }}>
                  <Button
                    type="primary"
                    onClick={() =>{
                        quesBankView.importType='examinee'
                        testPage.show({
                            paperId: item.paperId,
                            teachingMethodName: info.teachingMethodName,
                            title: info.title,
                            startTime: info.startTime,
                            endTime: info.endTime,
                            examDuration: info.examDuration,
                            passScores: info.passScores
                        })}}
                  >
                    试卷预览
                  </Button>
                </div>
              </div>
            )
          })
        }
      </div>
      <testPage.Component />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .row {
    margin-bottom: 5px;
    width: 100%;
    font-size: 13px;
    overflow: hidden;
    .label {
      float: left;
      text-align: right;
      min-height: 16px;
      &.w-106 {
        width: 106px;
      }
    }
    .content {
      overflow: hidden;
      padding-right: 50px;
    }
  }
`;
