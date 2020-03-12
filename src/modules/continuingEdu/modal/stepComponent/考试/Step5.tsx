import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Radio, Icon } from "antd";
import { ksStepViewModal } from "./KSStepViewModal";
import { stepViewModal } from "../StepViewModal";
import Zimage from "src/components/Zimage";
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import { observer } from "mobx-react-lite";
export interface Props {}

export default observer(function Step5() {
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
    1: "院级学分",
    2: "片区学分",
    3: "病区学分"
  };

  let totalNum = ksStepViewModal.stepData2.questionStatList.reduce(
    (total: any, current: any) => {
      return total + current.questionCount;
    },
    0
  );

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
            <td className="value">{ksStepViewModal.stepData2.startTime}</td>
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

          <tr>
            <td className="key">学员学时：</td>
            <td className="value">
              {ksStepViewModal.stepData2.studentClassHours}
            </td>
          </tr>

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
        </tbody>
      </table>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 20px 100px 20px;
  font-size: 14px;
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
