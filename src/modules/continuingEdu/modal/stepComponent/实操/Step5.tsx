import styled from "styled-components";
import React,{ useState, useEffect } from "react";
import { Radio, Input,Button } from "antd";
import { scStepViewModal } from "./SCStepViewModal";
import { stepViewModal } from "../StepViewModal";
import { observer } from "mobx-react-lite";
import moment from "moment";
import ShowTable from "./ShowTable";
import { appStore } from "src/stores";
import { newStudentCreditTypeMap } from "./../StepCommon";
import PracticalPreview from './PracticalPreview'
export interface Props { }

export default observer(function Step5() {
  const [modalVisible,setModalVisible] = useState(false)
  const [modalParams,setModalParams] = useState({})
  const [btnLoading,setBtnLoading] = useState(false)
  const [modalTitle,setModalTitle] = useState('')
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

  const handlePreview =()=>{
    setBtnLoading(true)
    scStepViewModal.getpraticalGradeManageId(scStepViewModal.stepData2.prcaticalData.code).then(res=>{
      setModalParams(res.data)
      setModalTitle('预览')
      setModalVisible(true)
      setBtnLoading(false)
    })

  }
  const handleModelOk = ()=>{
    setModalVisible(false)
    console.log('ddd');

  }

  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <td className="key">实操名称：</td>
            <td className="value">《{scStepViewModal.stepData2.title}》</td>
          </tr>
          <tr>
            <td className="key">考核开始时间：</td>
            <td className="value">
              {scStepViewModal.stepData2.startTime &&
                moment(scStepViewModal.stepData2.startTime).format(
                  "YYYY-MM-DD HH:mm"
                )}
            </td>
          </tr>
          {appStore.hisMatch({
            map: {
              nys: (
                <tr>
                  <td className="key">考核结束时间：</td>
                  <td className="value">
                    {scStepViewModal.stepData2.endTime &&
                      moment(scStepViewModal.stepData2.endTime).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                  </td>
                </tr>
              ),
              other: (
                <tr>
                  <td className="key">考核开放时间：</td>
                  <td className="value">
                    {scStepViewModal.stepData2.openTime}
                    {scStepViewModal.stepData2.openTimeUnit}{" "}
                    <span className="aside">即：{scStepViewModal.getEndTime} 结束</span>
                  </td>
                </tr>
              )
            }
          })}
          <tr>
            <td className="key">组织方式：</td>
            <td className="value">
              {organizationWayMap[scStepViewModal.stepData2.organizationWay]}
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
            <td className="key">实操考核地址：</td>
            <td className="value">{scStepViewModal.stepData2.address}</td>
          </tr>

          {scStepViewModal.stepData2.organizationWay == "2" && (
            <React.Fragment>
              <tr>
                <td className="key">签到负责人：</td>
                <td className="value">
                  {scStepViewModal.stepData2.sicPersonList
                    .map((item: any) => item.label)
                    .join("，")}
                </td>
              </tr>
            </React.Fragment>
          )}
          <tr>
            <td className="key">评分负责人：</td>
            <td className="value">
              <span>需要</span>
              {!!scStepViewModal.stepData2.scorePersonList.length && (
                <span>
                  （
                  {scStepViewModal.stepData2.scorePersonList
                    .map((item: any) => item.label)
                    .join("，")}
                  ）
                </span>
              )}
            </td>
          </tr>
          {scStepViewModal.stepData2.hasScorePersonClassHours == 1 ? (
            <tr>
              <td className="key">评分人学分：</td>
              <td className="value">
                {scStepViewModal.stepData2.scorePersonClassHours} 分
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">评分人学分：</td>
              <td className="value">无</td>
            </tr>
          )}
          {appStore.hisMatch({
            map: {
              gxjb: [],
              other:
                scStepViewModal.stepData2.category == 1 ? (
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
          {/* {scStepViewModal.stepData2.category == 1 ? (
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

          {scStepViewModal.stepData2.hasStudentCredit == 1 ? (
            <tr>
              <td className="key">学员学分：</td>
              <td className="value">
                {
                  studentCreditTypeMap[
                  scStepViewModal.stepData2.studentCreditType
                  ]
                }{" "}
                {scStepViewModal.stepData2.studentCredit} 分
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">学员学分：</td>
              <td className="value">无</td>
            </tr>
          )}
          {scStepViewModal.stepData2.hasStudentClassHours == 1 ? (
            <tr>
              <td className="key">学员学时：</td>
              <td className="value">
                {scStepViewModal.stepData2.studentClassHours}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="key">学员学时：</td>
              <td className="value">无</td>
            </tr>
          )}
          <tr>
            <td className="key">总成绩：</td>
            <td className="value">{scStepViewModal.stepData2.totalScores}</td>
          </tr>
          <tr>
            <td className="key">及格分数线：</td>
            <td className="value">{scStepViewModal.stepData2.passScores}</td>
          </tr>

          <tr>
            <td className="key">必&nbsp;&nbsp;修：</td>
            <td className="value">
              {scStepViewModal.stepData2.bxNurse
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
          {['whyx','fsxt','925','whhk','fssdy', 'zjhj','ytll'].includes(appStore.HOSPITAL_ID) ?
              <tr>
                <td className="key">实操评分管理表：</td>
                <td className="value">{scStepViewModal.stepData2.selectPrcaticalOperation}<Button onClick={handlePreview} loading={btnLoading} >预览</Button></td>
              </tr> :
              (
                <React.Fragment>
                  <tr>
                    <td className="key">评分项上传：</td>
                    <td className="value" />
                  </tr>
                  <tr>
                    <td className="key" />
                    <td className="value">
                      <ShowTable />
                    </td>
                  </tr>
                </React.Fragment>
              )
            }
          <tr>
            <td className="key">通知设置：</td>
            <td className="value">
              <Radio
                checked={!!scStepViewModal.stepData5.ifSendMessage}
                onClick={() => {
                  scStepViewModal.stepData5.ifSendMessage = !scStepViewModal
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
                value={scStepViewModal.stepData2.noticeContent}
                onChange={(e: any) =>
                  (scStepViewModal.stepData2.noticeContent = e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <PracticalPreview
        modalVisible={modalVisible}
        modalTitle={modalTitle}
        params={modalParams}
        onCancel={() => { setModalVisible(false)}}
        onOk={handleModelOk}
        ></PracticalPreview>
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
