import styled from "styled-components";
import React from "react";
import { Button, Radio, Input } from "antd";
import { pxStepViewModal } from "./PXStepViewModal";
import { stepViewModal } from "../StepViewModal";
import Zimage from "src/components/Zimage";
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import { observer } from "mobx-react-lite";
import moment from "moment";
import TestPageModal from "src/modules/continuingEdu/views/trainingInfoReview/components/TestPageModal/TestPageModal";
import createModal from "src/libs/createModal";
import { appStore } from "src/stores";
import { newStudentCreditTypeMap } from "./../StepCommon";
export interface Props { }

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
  // const studentCreditTypeMap: any = {
  //   1: "国家级",
  //   2: "省级",
  //   3: "市级"
  // };
  const studentCreditTypeMap = newStudentCreditTypeMap;

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
      startTime: "--",
      endTime: "--",
      examDuration: "--",
      passScores: "--"
    });
  };

  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <td className="key">培训名称：</td>
            <td className="value">{pxStepViewModal.stepData2.title}</td>
          </tr>
          <tr>
            <td className="key">培训开始时间：</td>
            <td className="value">
              {pxStepViewModal.stepData2.startTime &&
                moment(pxStepViewModal.stepData2.startTime).format(
                  "YYYY-MM-DD HH:mm"
                )}
            </td>
          </tr>
          {appStore.hisMatch({
            map: {
              nys: (
                <tr>
                  <td className="key">培训结束时间：</td>
                  <td className="value">
                    {pxStepViewModal.stepData2.endTime &&
                      moment(pxStepViewModal.stepData2.endTime).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                  </td>
                </tr>
              ),
              other: (
                <tr>
                  <td className="key">培训开放时间：</td>
                  <td className="value">
                    {pxStepViewModal.stepData2.openTime}
                    {pxStepViewModal.stepData2.openTimeUnit}{" "}
                    <span className="aside">即：{pxStepViewModal.getEndTime} 结束</span>
                  </td>
                </tr>
              )
            }
          })}
          <tr>
            <td className="key">组织方式：</td>
            <td className="value">
              {organizationWayMap[pxStepViewModal.stepData2.organizationWay]}
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
            <td className="key">培训地址：</td>
            <td className="value">{pxStepViewModal.stepData2.address}</td>
          </tr>
          {['whyx','whhk'].includes(appStore.HOSPITAL_ID) && 
          <tr>
            <td className="key">二级类型：</td>
            <td className="value">{pxStepViewModal.stepData2.secondaryType}</td>
          </tr>
          }

          {pxStepViewModal.stepData2.organizationWay == "2" && (
            <React.Fragment>
              <tr>
                <td className="key">签到负责人：</td>
                <td className="value">
                  {pxStepViewModal.stepData2.sicPersonList
                    .map((item: any) => item.label)
                    .join("，")}
                </td>
              </tr>
              <tr>
                <td className="key">签到开始时间：</td>
                <td className="value">
                  {pxStepViewModal.stepData2.signInStartTime &&
                    moment(pxStepViewModal.stepData2.signInStartTime).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                </td>
              </tr>
              <tr>
                <td className="key">签到结束时间：</td>
                <td className="value">
                  {pxStepViewModal.stepData2.signInEndTime &&
                    moment(pxStepViewModal.stepData2.signInEndTime).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                </td>
              </tr>
              {(['fsxt', '925', 'zjhj'].includes(appStore.HOSPITAL_ID)) && 
              <tr>
                <td className="key">标准出勤率：</td>
                <td className="value">{pxStepViewModal.stepData2.standardCheckInRate}</td>
              </tr>}
              <tr>
                <td className="key">签到方式：</td>
                <td className="value">
                  {pxStepViewModal.stepData2.qrCodeType==2?"动态二维码":"静态二维码"}  
                  {pxStepViewModal.stepData2.qrCodeType==2&&<span style={{marginLeft: "20px"}}>刷新时间:{pxStepViewModal.stepData2.refreshTime}秒</span>}
                </td>
              </tr>
            </React.Fragment>
          )}
          {(appStore.HOSPITAL_ID === 'hj' || appStore.HOSPITAL_ID === 'nys') &&
            <tr>
              <td className="key">院外讲师：</td>
              <td className="value">
                {pxStepViewModal.stepData2.ywTeacherList
                  .map((item: any) => item.label)
                  .join("，")}
              </td>
            </tr>
          }
          <tr>
            <td className="key">讲师：</td>
            <td className="value">
              {pxStepViewModal.stepData2.teacherList
                .map((item: any) => item.label)
                .join("，")}
            </td>
          </tr>
          {appStore.HOSPITAL_ID == 'nys' && (
            <React.Fragment>
              <tr>
                <td className="key">培训内容：</td>
                <td className="value">{pxStepViewModal.stepData2.trainContent}</td>
              </tr>
              <tr>
                <td className="key">描述：</td>
                <td className="value">{pxStepViewModal.stepData2.trainDescribe}</td>
              </tr>
            </React.Fragment>
          )}
          {appStore.hisMatch({
            map: {
              gxjb: [],
              other:
                pxStepViewModal.stepData2.category == 1 ? (
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
          {/* {pxStepViewModal.stepData2.category == 1 ? (
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
          {pxStepViewModal.stepData2.hasStudentCredit == 1 ? (
            <tr>
              <td className="key">学员学分：</td>
              <td className="value">
                {
                  studentCreditTypeMap[
                  pxStepViewModal.stepData2.studentCreditType
                  ]
                }{" "}
                {pxStepViewModal.stepData2.studentCredit} 分
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">学员学分：</td>
              <td className="value">无</td>
            </tr>
          )}
          {pxStepViewModal.stepData2.hasTeacherCredit == 1 ? (
            <tr>
              <td className="key">讲师学分：</td>
              <td className="value">
                {
                  studentCreditTypeMap[
                  pxStepViewModal.stepData2.teacherCreditType
                  ]
                }{" "}
                {pxStepViewModal.stepData2.teacherCredit} 分
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">讲师学分：</td>
              <td className="value">无</td>
            </tr>
          )}
          {pxStepViewModal.stepData2.hasStudentClassHours == 1 ? (
            <tr>
              <td className="key">学员学时：</td>
              <td className="value">
                {pxStepViewModal.stepData2.studentClassHours}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">学员学时：</td>
              <td className="value">无</td>
            </tr>
          )}
          {pxStepViewModal.stepData2.hasTeacherClassHours == 1 ? (
            <tr>
              <td className="key">讲师学时：</td>
              <td className="value">
                {pxStepViewModal.stepData2.teacherClassHours}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">讲师学时：</td>
              <td className="value">无</td>
            </tr>
          )}
          <tr>
            <td className="key">必&nbsp;&nbsp;修：</td>
            <td className="value">
              {pxStepViewModal.stepData2.bxNurse &&
                pxStepViewModal.stepData2.bxNurse
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
                {stepViewModal.stepData4.attachmentIds &&
                  stepViewModal.stepData4.attachmentIds.length > 0 && (
                    <FilesBox className="files">
                      {stepViewModal.stepData4.attachmentIds.map(
                        (item: any, index: number) => (
                          <div className="file-box" key={index}>
                            {getFileType(item.path) === "img" ? (
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
                          </div>
                        )
                      )}
                    </FilesBox>
                  )}
              </FileList>
            </td>
          </tr>
          {appStore.hisMatch({
            map: {
              zzwy: Number(stepViewModal.stepData4PX.isNeedQuestionnaire) !== 0,
              other: true
            }
          }) && <tr>
            <td className="key">题目设置：</td>
            <td className="value">
              <div>一份试卷</div>
              {stepViewModal.stepData4PX.questionStatList &&
                stepViewModal.stepData4PX.questionStatList.map((item: any) => {
                  return (<div>
                    <span style={{ marginRight: 10 }}>
                      《{item.questionnaireTitle}》 共{item.questionCount}题
                    </span>
                  </div>)
                })}
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
          </tr>}

          <tr>
            <td className="key">通知设置：</td>
            <td className="value">
              <Radio
                checked={!!pxStepViewModal.stepData5.ifSendMessage}
                onClick={() => {
                  pxStepViewModal.stepData5.ifSendMessage = !pxStepViewModal
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
                value={pxStepViewModal.stepData2.noticeContent}
                onChange={(e: any) =>
                  (pxStepViewModal.stepData2.noticeContent = e.target.value)
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
      vertical-align: center;
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
