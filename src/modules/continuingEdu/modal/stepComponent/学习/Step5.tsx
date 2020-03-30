import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Radio, Icon } from "antd";
import { xxStepViewModal } from "./XXStepViewModal";
import { stepViewModal } from "../StepViewModal";
import Zimage from "src/components/Zimage";
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import { observer } from "mobx-react-lite";
import moment from "moment";
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

  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <td className="key">名&nbsp;&nbsp;称：</td>
            <td className="value">{xxStepViewModal.stepData2.title}</td>
          </tr>
          <tr>
            <td className="key">学习开始时间：</td>
            <td className="value">
              {xxStepViewModal.stepData2.startTime &&
                moment(xxStepViewModal.stepData2.startTime).format(
                  "YYYY-MM-DD HH:mm"
                )}
            </td>
          </tr>
          <tr>
            <td className="key">学习开放时间：</td>
            <td className="value">
              {xxStepViewModal.stepData2.openTime}
              {xxStepViewModal.stepData2.openTimeUnit}{" "}
              <span className="aside">即：{xxStepViewModal.endTime} 结束</span>
            </td>
          </tr>
          <tr>
            <td className="key">组织方式：</td>
            <td className="value">
              {organizationWayMap[xxStepViewModal.stepData2.organizationWay]}
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
            <td className="key">学习地址：</td>
            <td className="value">{xxStepViewModal.stepData2.address}</td>
          </tr>
          <tr>
            <td className="key">学&nbsp;&nbsp;分：</td>
            <td className="value">
              {
                studentCreditTypeMap[
                  xxStepViewModal.stepData2.studentCreditType
                ]
              }{" "}
              {xxStepViewModal.stepData2.studentCredit} 分
            </td>
          </tr>
          <tr>
            <td className="key">学&nbsp;&nbsp;时：</td>
            <td className="value">
              {xxStepViewModal.stepData2.studentClassHours}
            </td>
          </tr>
          <tr>
            <td className="key">必&nbsp;&nbsp;修：</td>
            <td className="value">
              {xxStepViewModal.stepData2.bxNurse
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
            <td className="key">上传附件：</td>
            <td className="value">
              <FileList>
                {stepViewModal.stepData4.attachmentIds.length > 0 && (
                  <FilesBox className="files">
                    {stepViewModal.stepData4.attachmentIds.map(
                      (item: any, index: number) => (
                        <div className="file-box" key={index}>
                          {getFileType(item.path) == "img" ? (
                            <Zimage
                              src={item.path}
                              className="type-img"
                              alt=""
                            />
                          ) : (
                            <img
                              src={getFilePrevImg(item.path)}
                              className="type-img"
                              alt=""
                            />
                          )}

                          <div className="name">{item.name}</div>
                          <div className="size">{item.size}</div>
                          {/* <Icon type="close" title="删除图片" /> */}
                        </div>
                      )
                    )}
                  </FilesBox>
                )}
              </FileList>
            </td>
          </tr>
          <tr>
            <td className="key">通知设置：</td>
            <td className="value">
              <Radio
                checked={!!xxStepViewModal.stepData5.ifSendMessage}
                onClick={() => {
                  xxStepViewModal.stepData5.ifSendMessage = !xxStepViewModal
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
      vertical-align: top;
    }
    .value {
      padding-left: 10px;
      .files {
        padding: 12px 0px 12px !important;
      }
    }
  }
`;
const FileList = styled.div``;
const FilesBox = styled.div`
  padding: 12px 30px 12px;
  margin-top: -12px;
  /* border-bottom: 1px solid #ddd; */
  overflow: auto;
  /* max-height: 120px; */
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
    width: 255px;
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
