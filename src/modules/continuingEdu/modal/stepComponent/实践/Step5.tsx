import styled from "styled-components";
import React from "react";
import { Radio, Input } from "antd";
import { sjStepViewModal } from "./SJStepViewModal";
import { stepViewModal } from "../StepViewModal";
import Zimage from "src/components/Zimage";
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { appStore } from "src/stores";
import { newStudentCreditTypeMap } from "./../StepCommon";
export interface Props { }

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
  // const studentCreditTypeMap: any = {
  //   1: "国家级",
  //   2: "省级",
  //   3: "市级"
  // };
  const studentCreditTypeMap = newStudentCreditTypeMap;

  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <td className="key">名&nbsp;&nbsp;称：</td>
            <td className="value">{sjStepViewModal.stepData2.title}</td>
          </tr>
          <tr>
            <td className="key">实践开始时间：</td>
            <td className="value">
              {sjStepViewModal.stepData2.startTime &&
                moment(sjStepViewModal.stepData2.startTime).format(
                  "YYYY-MM-DD HH:mm"
                )}
            </td>
          </tr>
          {appStore.hisMatch({
            map: {
              nys: (
                <tr>
                  <td className="key">实践结束时间：</td>
                  <td className="value">
                    {sjStepViewModal.stepData2.endTime &&
                      moment(sjStepViewModal.stepData2.endTime).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                  </td>
                </tr>
              ),
              other: (
                <tr>
                  <td className="key">实践开放时间：</td>
                  <td className="value">
                    {sjStepViewModal.stepData2.openTime}
                    {sjStepViewModal.stepData2.openTimeUnit}{" "}
                    <span className="aside">即：{sjStepViewModal.getEndTime} 结束</span>
                  </td>
                </tr>
              )
            }
          })}
          <tr>
            <td className="key">组织方式：</td>
            <td className="value">
              {organizationWayMap[sjStepViewModal.stepData2.organizationWay]}
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
            <td className="key">实践地址：</td>
            <td className="value">{sjStepViewModal.stepData2.address}</td>
          </tr>
          <tr>
            <td className="key">签到负责人：</td>
            <td className="value">
              {sjStepViewModal.stepData2.sicPersonList
                .map((item: any) => item.label)
                .join("，")}
            </td>
          </tr>
          <tr>
            <td className="key">主持人：</td>
            <td className="value">
              {sjStepViewModal.stepData2.hostPersonList
                .map((item: any) => item.label)
                .join("，")}
            </td>
          </tr>
          {sjStepViewModal.stepData2.hostCredit == 1 ? (
            <tr>
              <td className="key">主持人学分：</td>
              <td className="value">
                {studentCreditTypeMap[sjStepViewModal.stepData2.hostCreditType]}{" "}
                {sjStepViewModal.stepData2.hostCredit} 分
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">主持人学分：</td>
              <td className="value">无</td>
            </tr>
          )}
          {sjStepViewModal.stepData2.hostClassHours == 1 ? (
            <tr>
              <td className="key">主持人学时：</td>
              <td className="value">
                {sjStepViewModal.stepData2.hostClassHours}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">主持人学时：</td>
              <td className="value">无</td>
            </tr>
          )}
          {appStore.hisMatch({
            map: {
              gxjb: [],
              other:
                sjStepViewModal.stepData2.category == 1 ? (
                  <tr>
                    <td className="key">类&nbsp;&nbsp;别：</td>
                    <td className="value">中医类</td>
                  </tr>
                ) : (
                  <tr>
                    <td className="key">类&nbsp;别：</td>
                    <td className="value">非中医类</td>
                  </tr>
                )
            }
          })}
          {/* {sjStepViewModal.stepData2.category == 1 ? (
            <tr>
              <td className="key">类&nbsp;&nbsp;别：</td>
              <td className="value">中医类</td>
            </tr>
          ) : (
            <tr>
              <td className="key">类&nbsp;&nbsp;别：</td>
              <td className="value">非中医类</td>
            </tr>
          )} */}

          {sjStepViewModal.stepData2.hasStudentCredit == 1 ? (
            <tr>
              <td className="key">学员学分：</td>
              <td className="value">
                {
                  studentCreditTypeMap[
                  sjStepViewModal.stepData2.studentCreditType
                  ]
                }{" "}
                {sjStepViewModal.stepData2.studentCredit} 分
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">学员学分：</td>
              <td className="value">无</td>
            </tr>
          )}
          {sjStepViewModal.stepData2.hasStudentClassHours == 1 ? (
            <tr>
              <td className="key">学员学时：</td>
              <td className="value">
                {sjStepViewModal.stepData2.studentClassHours}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">学员学时：</td>
              <td className="value">无</td>
            </tr>
          )}
          <tr>
            <td className="key">必&nbsp;&nbsp;修：</td>
            <td className="value">
              {sjStepViewModal.stepData2.bxNurse
                .map((item: any) => bxNursingMap[item])
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
                checked={!!sjStepViewModal.stepData5.ifSendMessage}
                onClick={() => {
                  sjStepViewModal.stepData5.ifSendMessage = !sjStepViewModal
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
                value={sjStepViewModal.stepData2.noticeContent}
                onChange={(e: any) =>
                  (sjStepViewModal.stepData2.noticeContent = e.target.value)
                }
              />
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
    .showTable {
      margin-bottom: 10px !important;
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
