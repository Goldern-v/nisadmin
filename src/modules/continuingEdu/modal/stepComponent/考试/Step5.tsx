import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Radio, Input } from "antd";
import { ksStepViewModal } from "./KSStepViewModal";
import { stepViewModal } from "../StepViewModal";
import Zimage from "src/components/Zimage";
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import { observer } from "mobx-react-lite";
import moment from "moment";
import TestPageModal from "src/modules/continuingEdu/views/trainingInfoReview/components/TestPageModal/TestPageModal";
import createModal from "src/libs/createModal";

export interface Props {}

export default observer(function Step5() {
  const testPage = createModal(TestPageModal); // 习题预览弹窗

  const organizationWayMap: any = {
    1: "线上",
    2: "线下"
  };

  const bxNursingMap: any = {
    nurse0: "N0",
    nurse1: "N1",
    nurse2: "N2",
    nurse3: "N3",
    nurse4: "N4",
    nurse5: "N5",
    nurseOther: "其他"
  };
  const studentCreditTypeMap: any = {
    1: "国家级",
    2: "省级",
    3: "市级"
  };

  let totalNum =
    ksStepViewModal.stepData2.questionStatList &&
    ksStepViewModal.stepData2.questionStatList.reduce(
      (total: any, current: any) => {
        return total + current.questionCount;
      },
      0
    );

  // 习题预览弹窗
  const handlePagePreview = () => {
    let getObj: any = {
      taskCode: stepViewModal.taskCode,
      teachingMethod: stepViewModal.stepData1.teachingMethod
    };
    if (stepViewModal.stepData1.ceptId) {
      getObj.cetpId = stepViewModal.stepData1.ceptId;
    }
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
      <table>
        <tbody>
          <tr>
            <td className="key">考试名称：</td>
            <td className="value">《{ksStepViewModal.stepData2.title}》</td>
          </tr>
          <tr>
            <td className="key">考试开始时间：</td>
            <td className="value">
              {ksStepViewModal.stepData2.startTime &&
                moment(ksStepViewModal.stepData2.startTime).format(
                  "YYYY-MM-DD HH:mm"
                )}
            </td>
          </tr>
          <tr>
            <td className="key">考试开放时间：</td>
            <td className="value">
              {ksStepViewModal.stepData2.openTime}
              {ksStepViewModal.stepData2.openTimeUnit}{" "}
              <span className="aside">即：{ksStepViewModal.endTime} 结束</span>
            </td>
          </tr>
          <tr>
            <td className="key">组织方式：</td>
            <td className="value">
              {organizationWayMap[ksStepViewModal.stepData2.organizationWay]}
            </td>
          </tr>
          <tr>
            <td className="key">类&nbsp;&nbsp;型：</td>
            <td className="value">
              {stepViewModal.stepData1.name}(
              {stepViewModal.stepData1.teachingMethodName})
            </td>
          </tr>
          <tr>
            <td className="key">考试地址：</td>
            <td className="value">{ksStepViewModal.stepData2.address}</td>
          </tr>
          {/* 
          {ksStepViewModal.stepData2.organizationWay == "2" && (
            <React.Fragment>
              <tr>
                <td className="key">签到负责人：</td>
                <td className="value">
                  {ksStepViewModal.stepData2.sicPersonList
                    .map((item: any) => item.label)
                    .join("，")}
                </td>
              </tr>
              <tr>
                <td className="key">签到方式：</td>
                <td className="value">二维码</td>
              </tr>
            </React.Fragment>
          )} */}

          <tr>
            <td className="key">评分负责人：</td>
            <td className="value">
              <span>
                {ksStepViewModal.stepData2.needScorePerson ? "需要" : "不需要"}
              </span>
              {!!ksStepViewModal.stepData2.scorePersonList.length && (
                <span>
                  （
                  {ksStepViewModal.stepData2.scorePersonList
                    .map((item: any) => item.label)
                    .join("，")}
                  ）
                </span>
              )}
            </td>
          </tr>
          {ksStepViewModal.stepData2.hasScorePersonClassHours == 1 ? (
            <tr>
              <td className="key">评分人学分：</td>
              <td className="value">
                {ksStepViewModal.stepData2.scorePersonClassHours} 分
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">评分人学分：</td>
              <td className="value">无</td>
            </tr>
          )}

          {ksStepViewModal.stepData2.category == 1 ? (
            <tr>
              <td className="key">类&nbsp;&nbsp;别：</td>
              <td className="value">中医类</td>
            </tr>
          ) : (
            <tr>
              <td className="key">类&nbsp;&nbsp;别：</td>
              <td className="value">非中医类</td>
            </tr>
          )}

          {ksStepViewModal.stepData2.hasStudentCredit == 1 ? (
            <tr>
              <td className="key">学员学分：</td>
              <td className="value">
                {
                  studentCreditTypeMap[
                    ksStepViewModal.stepData2.studentCreditType
                  ]
                }{" "}
                {ksStepViewModal.stepData2.studentCredit} 分
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">学员学分：</td>
              <td className="value">无</td>
            </tr>
          )}
          {ksStepViewModal.stepData2.hasStudentClassHours == 1 ? (
            <tr>
              <td className="key">学员学时：</td>
              <td className="value">
                {ksStepViewModal.stepData2.studentClassHours}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">学员学时：</td>
              <td className="value">无</td>
            </tr>
          )}
          <tr>
            <td className="key">最大考试次数：</td>
            <td className="value">{ksStepViewModal.stepData2.maxExamTimes}</td>
          </tr>
          <tr>
            <td className="key">卷面总分：</td>
            <td className="value">{ksStepViewModal.stepData2.totalScores}</td>
          </tr>
          <tr>
            <td className="key">及格分数线：</td>
            <td className="value">{ksStepViewModal.stepData2.passScores}</td>
          </tr>
          <tr>
            <td className="key">答题时长：</td>
            <td className="value">
              {ksStepViewModal.stepData2.examDuration} 分钟
            </td>
          </tr>

          <tr>
            <td className="key">题目设置：</td>
            <td className="value">
              <div>【考试】《{ksStepViewModal.stepData2.title}》</div>
              <div>
                <span style={{ marginRight: 10 }}>
                  卷面题目共 {totalNum} 题
                </span>
                {!!ksStepViewModal.stepData2.randomOrderQue && (
                  <span style={{ marginRight: 10 }}>随机显示题目顺序</span>
                )}
                {!!ksStepViewModal.stepData2.randomOrderQItem && (
                  <span style={{ marginRight: 10 }}>随机显示题目选项顺序</span>
                )}
                {!!ksStepViewModal.stepData2.showScoreInstantly && (
                  <span style={{ marginRight: 10 }}>交卷后显示分数</span>
                )}
              </div>
              <div>
                <Button
                  size="small"
                  onClick={() => {
                    handlePagePreview();
                  }}
                  className="ab"
                >
                  试卷预览
                </Button>
              </div>
            </td>
          </tr>

          <tr>
            <td className="key">必&nbsp;&nbsp;修：</td>
            <td className="value">
              {ksStepViewModal.stepData2.bxNurse
                .map((item: any) => bxNursingMap[item])
                .join("，")}
            </td>
          </tr>
          <tr>
            <td className="key">参与人员：</td>
            <td className="value">
              {stepViewModal.stepData3.participantList
                .reduce((total: any[], item: any) => {
                  return [
                    ...total,
                    ...item.userList.map((item: any) => ({
                      label: item.empName,
                      key: item.empNo
                    }))
                  ];
                }, [])
                .map((item: any) => item.label)
                .join("，")}
            </td>
          </tr>
          <tr>
            <td className="key">通知设置：</td>
            <td className="value">
              <Radio
                checked={!!ksStepViewModal.stepData5.ifSendMessage}
                onClick={() => {
                  ksStepViewModal.stepData5.ifSendMessage = !ksStepViewModal
                    .stepData5.ifSendMessage;
                }}
              >
                立即发送通知：发布后自动发送通知
              </Radio>
            </td>
          </tr>
          <tr>
            <td className="key" />
            <td className="value">
              <Input.TextArea
                style={{ width: "100%" }}
                placeholder="请输入通知详细或考试内容，在【完成】页面勾选通知设置，通知会自动发送"
                value={ksStepViewModal.stepData2.noticeContent}
                onChange={(e: any) =>
                  (ksStepViewModal.stepData2.noticeContent = e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <testPage.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 20px 100px 20px;
  font-size: 14px;
  .ab {
    margin: 5px 0;
  }
  table {
    width: 100%;
    tr,
    td {
      height: 30px;
    }
    .key {
      width: 100px;
      text-align: right;
    }
    .value {
      padding-left: 10px;
    }
  }
`;
const FileList = styled.div``;
const FilesBox = styled.div`
  padding: 12px 30px 12px;
  margin-top: -12px;
  /* border-bottom: 1px solid #ddd; */
  overflow: auto;
  max-height: 120px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
  .file-box {
    width: 260px;
    height: 65px;
    background: rgba(246, 246, 246, 1);
    border-radius: 2px;
    float: left;
    margin-right: 8px;
    margin-top: 4px;
    margin-bottom: 4px;
    padding: 10px 12px;
    position: relative;
    .type-img {
      position: absolute;
      left: 12px;
      top: 0;
      bottom: 0;
      width: 44px;
      height: 44px;
      margin: auto 0;
    }
    .name {
      margin: 0 5px 0 60px;
      font-size: 13px;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .size {
      margin: 0 0px 0 60px;
      font-size: 13px;
      color: #999;
    }
    &:hover {
      .anticon-close {
        display: block;
      }
    }
    .anticon-close {
      display: none;
      position: absolute;
      right: 10px;
      top: 4px;
      height: 8px;
      width: 8px;
      cursor: pointer;
    }
  }
`;
