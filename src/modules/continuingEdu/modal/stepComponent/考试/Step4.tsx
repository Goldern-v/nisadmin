import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  Input,
  Select,
  Checkbox,
  InputNumber,
  message
} from "antd";
import Form from "src/components/Form";
import { Rules } from "src/components/Form/interfaces";
import { to } from "src/libs/fns";
import { ksStepViewModal as stepViewModal } from "./KSStepViewModal";
import { stepViewModal as allStepViewModal } from "../StepViewModal";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "../公共/selectNurseModal/SelectPeopleModal";
import { CheckUserItem } from "src/modules/notice/page/SentNoticeView";
import { observer } from "mobx-react-lite";
import UpdateTable from "./UpdateTable";
import { cloneJson } from "src/utils/json/clone";
import TestPageModal from "src/modules/continuingEdu/views/trainingInfoReview/components/TestPageModal/TestPageModal";
import { appStore } from "src/stores";
import { stepServices } from "../services/stepServices";
import { fileDownload } from "src/utils/file/file";
import UpdateTableHj from "./UpdateTableHj";
import UpdateTableNys from "./UpdateTableNys";


export interface Props { }

export default observer(function Step4() {
  const textPapersLists: any = stepViewModal.manyQuestionStatLists
  //学时
  const studentTimeTypeList = [
    { name: 0, code: 0 },
    { name: 0.5, code: 0.5 },
    { name: 1, code: 1 },
    { name: 2, code: 2 },
    { name: 3, code: 3 }
  ];
  //学时自由输入
  const [studyTime, setStudyTime] = useState(0);
  //学时自由输入
  const testPage = createModal(TestPageModal); // 习题预览弹窗

  // 组织方式

  const selectNurseModal = createModal(SelectPeopleModal);

  let refForm = React.createRef<Form>();
  /** 设置规则 */
  const rules: Rules = {
    publicDate: val => !!val || "请填写发表日期"
  };

  const onFormChange = async (name: string, value: any, from: Form) => {
    let data: any = from.getFields();
    Object.assign(stepViewModal.stepData2, data);
    let totalScore: any = 0;
    if (appStore.HOSPITAL_ID == 'hj') {
      if (textPapersLists.length) {
        await textPapersLists.map((item: any, index: number) => {
          let questionName: any = `questionScoresSettings${index}`
          let isHaveData: any = eval("data." + questionName)
          if (isHaveData) {
            item.questionScoresSettings = isHaveData.questionScoresSettings
          }
        })
        totalScore = textPapersLists[0].questionScoresSettings.reduce((total: any, current: any) => {
          return total + current.totalScores;
        }, 0);
      }
      stepViewModal.stepData2.totalScores = totalScore;
    } else {
      stepViewModal.stepData2.totalScores = data.questionStatList.reduce((total: any, current: any) => {
        return total + current.totalScores;
      }, 0);
    }
  };

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    /** 保存接口 */
    // service(value).then((res: any) => {
    //   message.success('保存成功')
    //   props.onOkCallBack && props.onOkCallBack()
    //   onCancel()
    // })
  };

  /** 选择人员 */
  const openSelectNurseModal = (name: string) => {
    let checkedUserList: any = [];
    if (name == "scorePersonList") {
      checkedUserList = stepViewModal.stepData2.scorePersonList;
    }
    selectNurseModal.show({
      checkedUserList: checkedUserList,
      onOkCallBack: (checkedUserList: CheckUserItem[]) => {
        let userList = checkedUserList.reduce((total: any[], item: any) => {
          return [
            ...total,
            ...item.userList.map((item: any) => ({
              label: item.empName,
              key: item.empNo
            }))
          ];
        }, []);
        if (userList.length > 3) {
          return message.warn('选择人数不能超过三人')
        }
        refForm.current && refForm.current.setField(name, userList);
      }
    });
  };

  useLayoutEffect(() => {
    refForm.current && refForm.current.setFields(stepViewModal.stepData2);
    if (appStore.HOSPITAL_ID == 'hj') {
      textPapersLists[0] && refForm.current && refForm.current.setFields({ questionScoresSettings0: textPapersLists[0] });
      textPapersLists[1] && refForm.current && refForm.current.setFields({ questionScoresSettings1: textPapersLists[1] });
      textPapersLists[2] && refForm.current && refForm.current.setFields({ questionScoresSettings2: textPapersLists[2] });
      textPapersLists[3] && refForm.current && refForm.current.setFields({ questionScoresSettings3: textPapersLists[3] });
      textPapersLists[4] && refForm.current && refForm.current.setFields({ questionScoresSettings4: textPapersLists[4] });
    }
  }, [textPapersLists.length]);


  /** 判断是否有问答题，只有问答题才允许选择评分负责人 */
  let hasWdt = appStore.HOSPITAL_ID == 'hj' ? textPapersLists[0] && textPapersLists[0].questionScoresSettings && textPapersLists[0].questionScoresSettings.find((item: any) => {
    return item.questionType == 4
  }) : stepViewModal.stepData2.questionStatList && stepViewModal.stepData2.questionStatList.find((item: any) => {
    return item.questionType == 4
  })

  if (!hasWdt) {
    stepViewModal.stepData2.needScorePerson = false
    stepViewModal.stepData2.scorePersonList = []
    refForm.current && refForm.current.setField('scorePersonList', []);
    if (appStore.HOSPITAL_ID != 'nys') stepViewModal.stepData2.showScoreInstantly = true
  } else {
    if (appStore.HOSPITAL_ID != 'nys') stepViewModal.stepData2.showScoreInstantly = false
  }

  // 习题预览弹窗
  const handlePagePreview = () => {
    let getObj: any = {
      taskCode: allStepViewModal.taskCode,
      teachingMethod: allStepViewModal.stepData1.teachingMethod
    };
    if (allStepViewModal.stepData1.ceptId) {
      getObj.cetpId = allStepViewModal.stepData1.ceptId;
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

  const downFileWith = () => {
    stepServices.downLoadQueUploadTemplateWithShortQues().then(res => {
      fileDownload(res);
    });
  };

  const downFileWithout = () => {
    stepServices.downLoadQueUploadTemplateWithoutShortQues().then(res => {
      fileDownload(res);
    });
  };

  // 厚街新增试卷
  const handleAddText = () => {
    let content = (
      <div>
        <div>您确定要新建一份试卷吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        stepServices
          .addExamPaper(allStepViewModal.taskCode)
          .then(res => {
            if (res.code == 200) {
              message.success("试卷新增成功");
              textPapersLists.push({
                pertId: res.data.pertId,
                sort: res.data.sort,
                questionScoresSettings: []
              })
            } else {
              message.error("试卷新增失败");
            }
          })
          .catch(e => { });
      }
    });
  }

  // 添加试卷组件
  const UpdateTablePage = () => {
    if (appStore.HOSPITAL_ID == 'hj') {
      return (<div>
        <Col span={24}>
          <Form.Field label={`上传题库`}>
            <div className="down-file-con">
              选择上传文件：
          <span onClick={downFileWith}>下载题库模板(含问答题)</span>
              &nbsp;
          <span onClick={downFileWithout}>下载题库模板(不含问答题)</span>
            </div>
          </Form.Field>
        </Col>
        <Button type='primary' className="addText" disabled={textPapersLists.length > 4} onClick={() => handleAddText()}>添加新试卷</Button>
        {textPapersLists.length > 0 && textPapersLists.map((item: any, index: any) => {
          return (
            <Col span={24}>
              <Form.Field label={`试卷${index + 1}`} name={`questionScoresSettings${index}`}>
                <UpdateTableHj data={item} />
              </Form.Field>
            </Col>
          )
        })}
      </div>)
    } else if (appStore.HOSPITAL_ID == 'nys') {
      return (
        <Col span={24}>
          <Form.Field label='上传题库' name="questionStatList">
            <UpdateTableNys />
          </Form.Field>
        </Col>
      )
    } else {
      return (
        <Col span={24}>
          <Form.Field label='上传题库' name="questionStatList">
            <UpdateTable />
          </Form.Field>
        </Col>
      )
    }
  }

  return (
    <Wrapper>
      <Form
        ref={refForm}
        rules={rules}
        labelWidth={100}
        onChange={onFormChange}
      >
        <Row>
          <Col span={24}>
            <Form.Field label={`最大考试次数`} name="maxExamTimes">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`总成绩`} name="totalScores">
              <span>
                <Input readOnly value={stepViewModal.stepData2.totalScores} />
              </span>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`及格分数线`} name="passScores">
              <InputNumber />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field
              label={`答题时长`}
              name="examDuration"
              suffix={"分钟"}
              aside="注：从点击“开始答题”按钮时，单独给每个人开始计时"
            >
              <InputNumber />
            </Form.Field>
          </Col>

          <UpdateTablePage />

          <Col span={24}>
            {/* <Form.Field label={`卷面设置`} name="卷面设置"> */}
            <span
              style={{
                display: "inline-block",
                width: 100,
                marginRight: 20,
                textAlign: "right",
                fontSize: 14,
                float: "left"
              }}
            >
              卷面设置
            </span>
            <div style={{ marginLeft: 120 }}>
              <Row>
                <Checkbox
                  checked={!!stepViewModal.stepData2.randomOrderQue}
                  onClick={() => {
                    stepViewModal.stepData2.randomOrderQue = !stepViewModal
                      .stepData2.randomOrderQue;
                    refForm.current ?.setField('randomOrderQue', stepViewModal.stepData2.randomOrderQue)    
              }}
                >
                  随机显示题目顺序
            </Checkbox>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Checkbox
                  checked={!!stepViewModal.stepData2.randomOrderQItem}
                  onClick={() => {
                    stepViewModal.stepData2.randomOrderQItem = !stepViewModal
                      .stepData2.randomOrderQItem;
                    refForm.current ?.setField('randomOrderQItem', stepViewModal.stepData2.randomOrderQItem)       
              }}
                >
                  随机显示题目选项顺序
            </Checkbox>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Checkbox
                  disabled={appStore.HOSPITAL_ID != 'nys'}
                  checked={!!stepViewModal.stepData2.showScoreInstantly}
                  onClick={() => {
                    stepViewModal.stepData2.showScoreInstantly = !stepViewModal
                      .stepData2.showScoreInstantly;
                    refForm.current ?.setField('showScoreInstantly', stepViewModal.stepData2.showScoreInstantly)  
              }}
                >
                  交卷后显示分数
              <span style={{ color: "#999" }}>（有问答题需要人工评分，没有则立即显示成绩）</span>
                </Checkbox>
              </Row>
            </div>
            {/* </Form.Field> */}
          </Col>
          <Col span={24} style={{ marginTop: 10, marginBottom: 10 }}>
            <span
              style={{
                display: "inline-block",
                width: 100,
                marginRight: 20,
                textAlign: "right",
                fontSize: 14
              }}
            >
              评分
          </span>
            <Checkbox
              disabled={!hasWdt}
              checked={!!stepViewModal.stepData2.needScorePerson}
              onClick={() => {
                stepViewModal.stepData2.needScorePerson = !stepViewModal.stepData2
                  .needScorePerson;
                refForm.current ?.setField('needScorePerson', stepViewModal.stepData2.needScorePerson)    

              if (!stepViewModal.stepData2.needScorePerson) {
                  refForm.current && refForm.current.setField('scorePersonList', []);
                }
              }}
            >
              是否需要评分负责人
        </Checkbox>
          </Col>

          {!!stepViewModal.stepData2.needScorePerson && (
            <React.Fragment>
              <Col span={2} />
              <Col span={22}>
                <Form.Field
                  label={`评分负责人`}
                  name="scorePersonList"
                  suffix={
                    <MoreBox
                      onClick={() => {
                        openSelectNurseModal("scorePersonList");
                      }}
                    />
                  }
                >
                  <Select
                    labelInValue={true}
                    mode="multiple"
                    style={{ width: "100%" }}
                    open={false}
                  />
                </Form.Field>
              </Col>
              {stepViewModal.stepData2.scorePersonList.length > 0 && (<React.Fragment>
                <Col span={2} />
                <Col span={22}>
                  <Form.Field label={`评分人学时`} name="hasScorePersonClassHours">
                    <Select style={{ width: 120 }}>
                      <Select.Option value={1}>有</Select.Option>
                      <Select.Option value={0}>无</Select.Option>
                    </Select>
                  </Form.Field>
                </Col>
                {stepViewModal.stepData2.hasScorePersonClassHours == 1 && (
                  <React.Fragment>
                    <Col span={2} />
                    <Col span={22}>
                      <Form.Field
                        label={``}
                        name="scorePersonClassHours"
                        suffix="学时"
                      >
                        <Select
                          showSearch
                          onSearch={(val: any) => setStudyTime(Number(val))}
                        >
                          {studyTime &&
                            studyTime !== 0.5 &&
                            studyTime !== 1 &&
                            studyTime !== 2 &&
                            studyTime !== 3 ? (
                              <Select.Option value={studyTime} key={`${studyTime} - `}>
                                {studyTime}
                              </Select.Option>
                            ) : (
                              ""
                            )}
                          {studentTimeTypeList.map(item => (
                            <Select.Option value={item.code} key={item.name}>
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Field>
                    </Col>
                  </React.Fragment>
                )}


              </React.Fragment>)}
            </React.Fragment>
          )}
        </Row>
      </Form>
      {appStore.HOSPITAL_ID !== 'hj' && <span className="ab">
        <Button
          size="small"
          onClick={() => {
            handlePagePreview();
          }}
        >
          试卷预览
        </Button>
      </span>
      }
      <testPage.Component />

      <selectNurseModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  margin: 40px 100px 20px;
  position: relative;
  .ab {
      display: inline - block;
      position: absolute;
      right: 6px;
      top: 215px;
    }
  .addText {
    margin: -20px 0 15px 120px;
  }
  .down-file-con {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
    span {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const DateSelectCon = styled.div`
      .date - row {
      display: flex;
      align - items: center;
      height: 32px;
      margin - bottom: 20px;
      padding - left: 120px;
      font - size: 14px;
    .select - item {
        width: 120px;
        margin - left: 20px;
      }
    .aside {
        font - size: 12px;
        color: #666;
      }
    .date - label {
        margin - right: 20px;
      }
    }
  .label {
      width: 0;
      margin: 0;
    }
  .formField - wrapper {
      margin: 0;
    }
  .formField - container {
      width: 100px;
      margin - right: 20px;
    }
    `;

function MoreBox(props: any) {
  const { onClick } = props;
  const Wrapper = styled.div`
    width: 32px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border - radius: 4px;
    text - align: center;
    display: flex;
    flex - direction: column;
    align - items: center;
    justify - content: flex - end;
    cursor: pointer;
    &: hover {
      border - color: #1db38b;
      outline: 0;
      box - shadow: 0 0 0 2px rgba(0, 166, 128, 0.2);
    }
    `;
  return <Wrapper onClick={onClick}>...</Wrapper>;
}
