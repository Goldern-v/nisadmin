import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Checkbox,
  InputNumber
} from "antd";
import Form from "src/components/Form";
import DateTimePicker from "src/components/DateTimePicker";
import { sjStepViewModal as stepViewModal } from "./SJStepViewModal";
import { observer } from "mobx-react-lite";
import { cloneJson } from "src/utils/json/clone";
import { appStore } from 'src/stores'
import createModal from "src/libs/createModal";
import SelectPeopleModal from "../公共/selectNurseModal/SelectPeopleModal";
import { CheckUserItem } from "src/modules/notice/page/SentNoticeView";
export interface Props { }

export default observer(function Step2() {
  const selectNurseModal = createModal(SelectPeopleModal);
  // 组织方式
  const zzfs = [{ name: "线上", code: 1 }, { name: "线下", code: 2 }];
  // 学分
  const studentCreditTypeList = appStore.HOSPITAL_ID === 'wh' || appStore.HOSPITAL_ID === 'gxjb' ? [
    { name: "国家级", code: 1 },
    { name: "省级", code: 2 },
    { name: "市级", code: 3 }
  ] : [
    { name: "院级学分", code: 1 },
    { name: "片区学分", code: 2 },
    { name: "病区学分", code: 3 }
  ];
  //学时
  const studentTimeTypeList = [
    { name: 0, code: 0 },
    { name: 0.5, code: 0.5 },
    { name: 1, code: 1 },
    { name: 2, code: 2 },
    { name: 3, code: 3 }
  ]
  //学时自由输入
  const [studyTime, setStudyTime] = useState(0)
  //必修全选
  const [selectedCheck, setSelectedCheck] = useState([] as any);
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
    { name: "周", code: "周" },
  ];
  let refForm = React.createRef<Form>();

  //表单变化函数
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
    if (name == "hostPersonList") {
      checkedUserList = stepViewModal.stepData2.hostPersonList;
    } else if (name == "sicPersonList") {
      checkedUserList = stepViewModal.stepData2.sicPersonList;
    }
    selectNurseModal.show({
      checkedUserList: checkedUserList,
      onOkCallBack: (checkedUserList: CheckUserItem[]) => {
        console.log(checkedUserList, "checkedUserList");
        let userList = checkedUserList.reduce((total: any[], item: any) => {
          return [
            ...total,
            ...item.userList.map((item: any) => ({
              label: item.empName,
              key: item.empNo
            }))
          ];
        }, []);
        refForm.current && refForm.current.setField(name, userList);
      }
    });
  };

  //初始化
  useLayoutEffect(() => {
    refForm.current && refForm.current.setFields(stepViewModal.stepData2);
  }, []);


  useLayoutEffect(() => {
    console.log(cloneJson(stepViewModal.stepData2), 'stepViewModal.stepData299')
    refForm.current?.setFields(stepViewModal.stepData2)
  }, [])

  return (
    <Wrapper>
      <Form ref={refForm} labelWidth={100} onChange={onFormChange}>
        <Row>
          {/* 实践名称 */}
          <Col span={24}>
            <Form.Field label={`实践名称`} name="title">
              <Input />
            </Form.Field>
          </Col>
          {/* 实践开始时间 */}
          <Col span={24}>
            <Form.Field label={`实践开始时间`} name="startTime">
              <DateTimePicker />
            </Form.Field>
          </Col>
          {appStore.hisMatch({
            map: {
              nys: (
                <Col span={24}>
                  <Form.Field label={`实践结束时间`} name="endTime">
                    <DateTimePicker />
                  </Form.Field>
                </Col>
              ),
              other: (
                <DateSelectCon>
                  <div className="date-row">
                    <span className="date-label">实践开放</span>
                    <Form.Field label={``} name="openTime" labelWidth={1}>
                      <InputNumber></InputNumber>
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
          {/* 组织方式 */}
          <Col span={24}>
            <Form.Field label={`组织方式`} name="organizationWay">
              <Select disabled>
                {zzfs.map(item => (
                  <Select.Option value={item.code} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          {/* 主持人 */}
          <Col span={4} />
          <Col span={20}>
            <Form.Field
              label={`主持人`}
              name="hostPersonList"
              suffix={
                <MoreBox
                  onClick={() => {
                    openSelectNurseModal("hostPersonList");
                  }}
                />
              }
            >
              <Select
                removeIcon={false}
                labelInValue={true}
                mode="tags"
                style={{ width: "100%" }}
                open={false}
              />
            </Form.Field>
          </Col>
          {/* 主持人学分学时 */}
          {stepViewModal.stepData2.hostPersonList.length > 0 && (
            <React.Fragment>
              {/* 主持人学分 */}
              <Col span={24}>
                <Form.Field label={`主持人学分`} name="hasHostCredit">
                  <Select style={{ width: 120 }}>
                    <Select.Option value={1}>有</Select.Option>
                    <Select.Option value={0}>无</Select.Option>
                  </Select>
                </Form.Field>
              </Col>
              {stepViewModal.stepData2.hasHostCredit == 1 && (
                <React.Fragment>
                  <Col span={10}>
                    <Form.Field label={``} name="hostCreditType">
                      <Select>
                        {studentCreditTypeList.map(item => (
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
                      name="hostCredit"
                      suffix="分"
                      labelWidth={1}
                    >
                      <InputNumber />
                    </Form.Field>
                  </Col>
                </React.Fragment>
              )}
              {/* 主持人学时 */}
              <Col span={24}>
                <Form.Field label={`主持人学时`} name="hasHostClassHours">
                  <Select style={{ width: 120 }}>
                    <Select.Option value={1}>有</Select.Option>
                    <Select.Option value={0}>无</Select.Option>
                  </Select>
                </Form.Field>
              </Col>
              {stepViewModal.stepData2.hasHostClassHours == 1 && (
                <React.Fragment>
                  <Col span={24}>
                    <Form.Field
                      label={``}
                      name="hostClassHours"
                      suffix="学时"
                    >
                      <Select
                        showSearch
                        onSearch={(val: any) => setStudyTime(Number(val))}
                      >
                        {studyTime && ![0.5, 1, 2, 3].indexOf(studyTime) ? (
                          <Select.Option
                            value={studyTime}
                            key={`${studyTime}-`}
                          >
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
            </React.Fragment>
          )}
          {/* 实践地址 */}
          <Col span={24}>
            <Form.Field label={`实践地址`} name="address">
              <Input />
            </Form.Field>
          </Col>
          {/* 签到负责人 */}
          <Col span={24}>
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
            >
              <Select
                removeIcon={false}
                labelInValue={true}
                mode="tags"
                style={{ width: "100%" }}
                open={false}
              />
            </Form.Field>
          </Col>
          {/* 类别 */}
          {(appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == "gxjb") && (
            <Col span={24}>
              <Form.Field label={`类别`} name="category">
                <Select style={{ width: 120 }}>
                  <Select.Option value={1}>中医类</Select.Option>
                  <Select.Option value={2}>非中医类</Select.Option>
                </Select>
              </Form.Field>
            </Col>
          )}
          {/* 学员学分 */}
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
                  <Select>
                    {studentCreditTypeList.map(item => (
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
          {/* 学员学时 */}
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
                <Form.Field
                  label={``}
                  name="studentClassHours"
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
                      <Select.Option
                        value={studyTime}
                        key={`${studyTime}-`}
                      >
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
          {/* 必修 */}
          <Col span={24}>
            <Form.Field label={`必修`} name="bxNurse" aside="注：没有选择的默认为选修">
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
                    console.log(checked, "checkedchecked");
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
        </Row>
      </Form>
      <selectNurseModal.Component />
    </Wrapper>
  );
})
const Wrapper = styled.div`
  margin: 40px 100px 20px;
`;

const DateSelectCon = styled.div`
  .date-row {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 20px;
    padding-left: 100px;
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
