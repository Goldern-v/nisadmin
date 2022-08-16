import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Row,
  Col,
  Input,
  AutoComplete,
  Select,
  Checkbox,
  InputNumber,
  message,
  Radio
} from "antd";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import DateTimePicker from "src/components/DateTimePicker";
import { pxStepViewModal as stepViewModal } from "./PXStepViewModal";
import { stepViewModal as allStepViewModal } from "../StepViewModal";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "../公共/selectNurseModal/SelectPeopleModal";
import { CheckUserItem } from "src/modules/notice/page/SentNoticeView";
import { observer } from "mobx-react-lite";
import { appStore } from "src/stores";
import { newStudentCreditTypeList } from "./../StepCommon";
const { TextArea } = Input;
export interface Props {
}

export default observer(function Step1() {
  // 组织方式
  const zzfs =
    appStore.HOSPITAL_ID === "hj" &&
      allStepViewModal.getParentsName === "集中培训"
      ? [{ name: "线下", code: 2 }]
      : [{ name: "线上", code: 1 }, { name: "线下", code: 2 }];
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
  const [studentCreditTypeList, setStudentCreditTypeList]: any = useState([]);
  const [selectedCheck, setSelectedCheck] = useState([] as any); //必修全选
  const bxNursing = appStore.hisMatch({
    map: {
      lcey: [
        { name: "N0", code: "nurse0" },
        { name: "N1-1", code: "nurse1_1" },
        { name: "N1-2", code: "nurse1_2" },
        { name: "N2-1", code: "nurse2_1" },
        { name: "N2-2", code: "nurse2_2" },
        { name: "N3-1", code: "nurse3_1" },
        { name: "N3-2", code: "nurse3_2" },
        { name: "N3-3", code: "nurse3_3" },
        { name: "N4-1", code: "nurse4_1" },
        { name: "N4-2", code: "nurse4_2" },
        { name: "其他", code: "nurseOther" }
      ],
      other: [
        { name: "N0", code: "nurse0" },
        { name: "N1", code: "nurse1" },
        { name: "N2", code: "nurse2" },
        { name: "N3", code: "nurse3" },
        { name: "N4", code: "nurse4" },
        { name: "N5", code: "nurse5" },
        { name: "其他", code: "nurseOther" }
      ]
    }
  });
  const openTimeUnitList = [
    { name: "小时", code: "小时" },
    { name: "天", code: "天" },
    { name: "周", code: "周" }
  ];
  const selectNurseModal = createModal(SelectPeopleModal);
  let refForm = React.createRef<Form>();
  const getStudentCreditTypeList = () => {
    if (['wh' ,'gxjb', 'whyx', 'ytll'].includes(appStore.HOSPITAL_ID)) {
      // setStudentCreditTypeList([
      //   { name: "国家级", code: 1 },
      //   { name: "省级", code: 2 },
      //   { name: "市级", code: 3 }
      // ]);
      setStudentCreditTypeList(newStudentCreditTypeList)
    } else {
      if (allStepViewModal.getThirdName == "院级") {
        setStudentCreditTypeList([{ name: "院级学分", code: 1 }]);
      } else if (allStepViewModal.getThirdName == "科级") {
        setStudentCreditTypeList([{ name: "病区学分", code: 3 }]);
      } else {
        setStudentCreditTypeList([
          { name: "院级学分", code: 1 },
          { name: "片区学分", code: 2 },
          { name: "病区学分", code: 3 }
        ]);
      }
    }
    stepViewModal.stepData2.studentCreditType =
      studentCreditTypeList.length && studentCreditTypeList[0].code;
    stepViewModal.stepData2.teacherCreditType =
      studentCreditTypeList.length && studentCreditTypeList[0].code;
  };

  const onFormChange = (name: string, value: any, from: Form) => {
    setSelectedCheck([...selectedCheck, value]);
    let isOk = selectedCheck.filter((item: any) => item);
    let data = from.getFields();
    if (isOk) {
      data.bxNurse = stepViewModal.stepData2.bxNurse;
    } else {
      data.bxNurse = [];
    }
    stepViewModal.stepData2 = data;
  };

  /** 选择人员 */
  const openSelectNurseModal = (name: string) => {
    let checkedUserList = [];
    if (name == "teacherList") {
      checkedUserList = stepViewModal.stepData2.teacherList;
    } else if (name == "sicPersonList") {
      checkedUserList = stepViewModal.stepData2.sicPersonList;
    }
    selectNurseModal.show({
      checkedUserList: checkedUserList,
      onOkCallBack: (checkedUserList: CheckUserItem[]) => {
        let userList = checkedUserList.reduce((total: any[], item: any) => {
          return [
            ...total,
            ...item.userList ? item.userList.map((userListItem: any) => ({
              label: userListItem.empName,
              key: userListItem.empNo
            })) : [{ label: item.label, key: item.key }]
          ];
        }, []);
        if (userList.length > 3) {
          return message.warn("选择人数不能超过三人");
        }
        refForm.current && refForm.current.setField(name, userList);
      }
    });
  };

  useLayoutEffect(() => {
    getStudentCreditTypeList();
    refForm.current && refForm.current.setFields(stepViewModal.stepData2);
  }, [studentCreditTypeList.length]);

  return (
    <Wrapper>
      <Form
        ref={refForm}
        labelWidth={100}
        onChange={onFormChange}
      >
        <Row>
          <Col span={24}>
            <Form.Field label={`培训名称`} name="title">
              <Input />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`培训开始时间`} name="startTime">
              <DateTimePicker />
            </Form.Field>
          </Col>
          {appStore.hisMatch({
            map: {
              nys: (
                <Col span={24}>
                  <Form.Field label={`培训结束时间`} name="endTime">
                    <DateTimePicker />
                  </Form.Field>
                </Col>
              ),
              other: (
                <DateSelectCon>
                  <div className="date-row">
                    <span className="date-label">培训开放</span>
                    <Form.Field label={``} name="openTime" labelWidth={1}>
                      <InputNumber />
                    </Form.Field>
                    <Form.Field label={``} name="openTimeUnit" labelWidth={1}>
                      <Select>
                        {openTimeUnitList.map(item => (
                          <Select.Option value={item.code} key={item.name}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                    <span className="aside">
                      {stepViewModal.getEndTime
                        ? `即：${stepViewModal.getEndTime} 结束`
                        : ""}
                    </span>
                  </div>
                </DateSelectCon>
              )
            }
          })}

          <Col span={24}>
            <Form.Field label={`组织方式`} name="organizationWay">
              <Select
                disabled={
                  appStore.HOSPITAL_ID === "hj" &&
                  allStepViewModal.getParentsName === "集中培训"
                }
              >
                {zzfs.map(item => (
                  <Select.Option value={item.code} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          {stepViewModal.stepData2.organizationWay == "2" && (
            <React.Fragment>
              <Col span={4} />
              <Col span={20}>
                <Form.Field
                  label={`签到负责人`}
                  name="sicPersonList"
                  suffix={
                    <MoreBox
                      onClick={() => {
                        openSelectNurseModal("sicPersonList");
                      }}
                    />
                  }
                  aside="签到时间从 培训开始前半个小时  至 培训结束"
                >
                  <Select
                    labelInValue={true}
                    mode="multiple"
                    style={{ width: "100%" }}
                    open={false}
                  />
                </Form.Field>
              </Col>
            </React.Fragment>
          )}

          {stepViewModal.stepData2.organizationWay == "2" && (
            <Col span={24}>
              <Form.Field
                label={`签到开始时间`}
                name="signInStartTime"
              >
                <DateTimePicker />
              </Form.Field>
            </Col>
          )}

          {stepViewModal.stepData2.organizationWay == "2" && (
            <Col span={24}>
              <Form.Field
                label={`签到结束时间`}
                name="signInEndTime"
              >
                <DateTimePicker />
              </Form.Field>
            </Col>
          )}
          {stepViewModal.stepData2.organizationWay == "2" && appStore.HOSPITAL_ID === "fsxt" && (
            <Col span={24}>
              <Form.Field
                label={`标准出勤率`}
                name="standardCheckInRate"
              >
                <Input/>
              </Form.Field>
            </Col>
          )}
          {stepViewModal.stepData2.organizationWay == "2" && (
            <Col span={24} className="rowDivF">
              <Form.Field
                label={`二维码`}
                name="qrCodeType"
              >
                <Radio.Group style={{ lineHeight: '30px' }}>
                  <Radio value={1}>静态码</Radio>
                  <Radio value={2}>动态码</Radio>
                </Radio.Group>
              </Form.Field>

              {stepViewModal.stepData2.qrCodeType == "2" && <div className="rowDiv">
                <Form.Field label={`刷新时间`} name="refreshTime">
                  <Input style={{ width: '150px' }} addonAfter="秒"/>
                </Form.Field>
              </div>}

            </Col>
          )}

          <Col span={24}>
            <Form.Field label={`培训地址`} name="address">
              <AutoComplete
                dataSource={allStepViewModal.dictObj.studyAndTrainAddress.map(
                  (item: any) => item.name
                )}
              />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field
              label={`讲师`}
              name="teacherList"
              suffix={
                <MoreBox
                  onClick={() => {
                    openSelectNurseModal("teacherList");
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

          {appStore.HOSPITAL_ID == "hj" || appStore.HOSPITAL_ID == 'nys' && (
            <Col span={24}>
              <Form.Field
                label={`院外讲师`}
                name="ywTeacherList"
              >
                <Select
                  labelInValue={true}
                  mode="tags"
                  style={{ width: "100%" }}
                  open={false}
                />
              </Form.Field>
            </Col>
          )}

          {appStore.hisMatch({
            map: {
              nys: <React.Fragment>
                <Col span={24}>
                  <Form.Field label={`描述`} name="trainDescribe">
                    <Input />
                  </Form.Field>
                </Col>
                <Col span={24}>
                  <Form.Field label={`培训内容`} name="trainContent">
                    <Input.TextArea autosize={{ minRows: 3 }} />
                  </Form.Field>
                </Col>
              </React.Fragment>
            }
          })}
          {(appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == "ytll") && (
            <Col span={24}>
              <Form.Field label={`类别`} name="category">
                <Select style={{ width: 120 }}>
                  <Select.Option value={1}>中医类</Select.Option>
                  <Select.Option value={2}>非中医类</Select.Option>
                </Select>
              </Form.Field>
            </Col>
          )}
          {/* {appStore.HOSPITAL_ID == "gxjb" && (
            <Col span={24}>
              <Form.Field label={`类别`} name="category">
                <Select style={{ width: 120 }}>
                  <Select.Option value={1}>中医类</Select.Option>
                  <Select.Option value={2}>非中医类</Select.Option>
                </Select>
              </Form.Field>
            </Col>
          )} */}
          <Col span={24}>
            <Form.Field label={`学员学分`} name="hasStudentCredit">
              <Select style={{ width: 120 }}>
                <Select.Option value={1}>有</Select.Option>
                <Select.Option value={0}>无</Select.Option>
              </Select>
            </Form.Field>
          </Col>
          {stepViewModal.stepData2.hasStudentCredit == 1 && (
            <React.Fragment>
              <Col span={10}>
                <Form.Field label={``} name="studentCreditType">
                  <Select
                    disabled={
                      appStore.HOSPITAL_ID == "hj" && !!["院级", "科级"].indexOf(allStepViewModal.getThirdName)
                    }
                  >
                    {studentCreditTypeList.map((item: any) => (
                      <Select.Option value={item.code} key={item.name}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Field>
              </Col>
              <Col span={14}>
                <Form.Field
                  label={``}
                  name="studentCredit"
                  suffix="分"
                  labelWidth={1}
                >
                  <InputNumber />
                </Form.Field>
              </Col>
            </React.Fragment>
          )}
          <Col span={24}>
            <Form.Field label={`学员学时`} name="hasStudentClassHours">
              <Select style={{ width: 120 }}>
                <Select.Option value={1}>有</Select.Option>
                <Select.Option value={0}>无</Select.Option>
              </Select>
            </Form.Field>
          </Col>
          {stepViewModal.stepData2.hasStudentClassHours == 1 && (
            <React.Fragment>
              <Col span={24}>
                <Form.Field label={``} name="studentClassHours" suffix="学时">
                  <Select
                    showSearch
                    onSearch={(val: any) => setStudyTime(Number(val))}
                  >
                    {studyTime && ![0.5, 1, 2, 3].indexOf(studyTime) ? (
                      <Select.Option value={studyTime} key={`${studyTime}-`}>
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
          <Col span={24}>
            <Form.Field label={`讲师学分`} name="hasTeacherCredit">
              <Select style={{ width: 120 }}>
                <Select.Option value={1}>有</Select.Option>
                <Select.Option value={0}>无</Select.Option>
              </Select>
            </Form.Field>
          </Col>
          {stepViewModal.stepData2.hasTeacherCredit == 1 && (
            <React.Fragment>
              <Col span={10}>
                <Form.Field label={``} name="teacherCreditType">
                  <Select
                    disabled={
                      appStore.HOSPITAL_ID == "hj" &&
                      (allStepViewModal.getThirdName == "院级" ||
                        allStepViewModal.getThirdName == "科级")
                    }
                  >
                    {studentCreditTypeList.map((item: any) => (
                      <Select.Option value={item.code} key={item.name}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Field>
              </Col>
              <Col span={14}>
                <Form.Field
                  label={``}
                  name="teacherCredit"
                  suffix="分"
                  labelWidth={1}
                >
                  <InputNumber />
                </Form.Field>
              </Col>
            </React.Fragment>
          )}
          <Col span={24}>
            <Form.Field label={`讲师学时`} name="hasTeacherClassHours">
              <Select style={{ width: 120 }}>
                <Select.Option value={1}>有</Select.Option>
                <Select.Option value={0}>无</Select.Option>
              </Select>
            </Form.Field>
          </Col>
          {stepViewModal.stepData2.hasTeacherClassHours == 1 && (
            <React.Fragment>
              <Col span={24}>
                <Form.Field label={``} name="teacherClassHours" suffix="学时">
                  <Select
                    showSearch
                    onSearch={(val: any) => setStudyTime(Number(val))}
                  >
                    {studyTime &&
                      studyTime !== 0.5 &&
                      studyTime !== 1 &&
                      studyTime !== 2 &&
                      studyTime !== 3 ? (
                      <Select.Option value={studyTime} key={`${studyTime}-`}>
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

          <Col span={24}>
            <Form.Field
              label={`必修`}
              name="bxNurse"
              aside="注：没有选择的默认为选修"
            >
              <div>
                <Checkbox
                  indeterminate={(() => {
                    if (stepViewModal.stepData2.bxNurse.length <= 0)
                      return false;
                    if (
                      stepViewModal.stepData2.bxNurse.length >= bxNursing.length
                    )
                      return false;
                    return true;
                  })()}
                  onChange={(e: any) => {
                    let checked = e.target.checked;
                    if (checked)
                      stepViewModal.stepData2.bxNurse = bxNursing.map(
                        (item: any) => item.code
                      );
                    else stepViewModal.stepData2.bxNurse = [];
                  }}
                  checked={
                    stepViewModal.stepData2.bxNurse.length >=
                    bxNursing.length && bxNursing.length > 0
                  }
                >
                  全选
                </Checkbox>
                <Checkbox.Group
                  value={stepViewModal.stepData2.bxNurse}
                  onChange={(val: any) => {
                    stepViewModal.stepData2.bxNurse = val;
                  }}
                >
                  {bxNursing.map((item: any) => (
                    <Checkbox
                      onChange={(e: any) =>
                      (stepViewModal.stepData2.bxNurse = [
                        stepViewModal.stepData2.bxNurse,
                        ...e.target.value
                      ])
                      }
                      key={item.code}
                      value={item.code}
                    >
                      {item.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            </Form.Field>
          </Col>
          {appStore.HOSPITAL_ID == "hj" &&
            allStepViewModal.getParentsName == "集中培训" && (
              <Col span={24}>
                <Form.Field label={`注意事项`} name="pointsForAttention">
                  <TextArea maxLength={300} rows={5} />
                </Form.Field>
              </Col>
            )}
          {/* <Col span={24}>
            <Form.Field label={`通知消息`} name="noticeContent">
              <Input.TextArea placeholder="请输入通知详细或考试内容，在【完成】页面勾选通知设置，通知会自动发送" />
            </Form.Field>
          </Col> */ }
        </Row>
      </Form>
      <selectNurseModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  margin: 40px 100px 20px;
  .rowDivF{
    position: relative;
    .rowDiv{
      position: absolute;
      top: 0;
      right: 270px;
    }
  }
`;

const DateSelectCon = styled.div`
  .date-row {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 20px;
    padding-left: 120px;
    font-size: 14px;
    .select-item {
      width: 120px;
      margin-left: 20px;
    }
    .aside {
      font-size: 12px;
      color: #666;
    }
    .date-label {
      margin-right: 20px;
    }
  }
  .label {
    width: 0;
    margin: 0;
  }
  .formField-wrapper {
    margin: 0;
  }
  .formField-container {
    width: 100px;
    margin-right: 20px;
  }
`;

function MoreBox(props: any) {
  const { onClick } = props;
  const Wrapper = styled.div`
    width: 32px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    &:hover {
      border-color: #1db38b;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(0, 166, 128, 0.2);
    }
  `;
  return <Wrapper onClick={onClick}>...</Wrapper>;
}
