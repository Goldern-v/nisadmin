import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Modal,
  message as Message,
  Select,
  Radio,
  DatePicker,
  Spin
} from "antd";
import Form from "src/components/Form/Form";
import moment from "moment";
import { Rules } from "src/components/Form/interfaces";
import service from "src/services/api"; //获取科室公共接口
import { traineeFilesApi } from "../api/TraineeFilesApi"; // 接口
import { appStore } from "src/stores";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function TraineeFilesEditModal(props: Props) {
  const [deptList, setDeptList]: any = useState([]); // 科室
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();

  // 弹窗必填项
  const rules: Rules = {
    name: val => !!val || "姓名不能为空",
    sex: val => !!val || "性别不能为空",
    schoolName: val => !!val || "院校不能为空",
    major: val => !!val || "专业不能为空",
    education: val => !!val || "学历不能为空",
    idCardNo: val => !!val || "身份证号码不能为空",
    phone: val => !!val || "联系电话不能为空",
    isResident: val => !!val || "是否住宿不能为空",
    studyTime: val => appStore.HOSPITAL_ID !== 'gzhd' && (!!val || "实习时间不能为空"),
    studyDeptCode: val => !!val || "实习科室不能为空",
    isCPCMember: val => appStore.HOSPITAL_ID == 'gzhd' && (!!val || "党员不能为空"),
    isGroupLeader: val => !!val || "是否组长不能为空",
    address: val => !!val || "家庭住址不能为空",
    emergencyContactPerson: val => !!val || "紧急联系人不能为空",
    emergencyContactPhone: val => !!val || "紧急联系人电话不能为空"
  };

  const nysRules: Rules = {
    name: val => !!val || "姓名不能为空",
    sex: val => !!val || "性别不能为空",
    schoolName: val => !!val || "院校不能为空",
    major: val => !!val || "专业不能为空",
    studyDeptCode: val => !!val || "实习科室不能为空",
  };


  // 初始化科室
  const getDeptList = () => {
    service.commonApiService.getNursingUnitAll().then(res => {
      setDeptList(res.data.deptList);
    });
  };
  useEffect(() => {
    if (visible) {
      getDeptList();
    }
  }, [visible]);

  // 初始化 判断是否修改回显数据
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current: any = formRef.current;
        if (!current) return;
        if (params.identifier) {
          current.clear();
          let data: any = { ...params };
          // setLoading(true);
          // traineeFilesApi.queryInfoByIdentifier(params.identifier).then(res => {
          //   setLoading(false);
          //   setDataobj(res.data);
          // });
          const educationList: any = [
            { name: "博士", num: "9" },
            { name: "研究生", num: "8" },
            { name: "本科", num: "7" },
            { name: "大专", num: "6" },
            { name: "中专", num: "5" }
          ];
          if (data.education) {
            data.education = educationList.find(
              (item: any) => item.name === data.education
            )
              ? educationList.find((item: any) => item.name === data.education)
                .num
              : "";
          }
          const {
            identifier,
            name,
            sex,
            age,
            schoolName,
            major,
            education,
            idCardNo,
            phone,
            isResident,
            dormitoryNumber,
            internshipBegin,
            internshipEnd,
            studyDeptCode,
            studyDeptName,
            isGroupLeader,
            address,
            emergencyContactPerson,
            emergencyContactPhone,
            remark,
            isCPCMember,
            isOnJob
          } = data;
          current.setFields({
            identifier,
            name,
            sex: sex === "男" ? "0" : "1",
            isOnJob: isOnJob === '在院' ? '1' : '0',
            age,
            schoolName,
            major,
            education,
            idCardNo,
            phone,
            isResident: isResident === "否" ? "0" : "1",
            isCPCMember: isCPCMember === "否" ? "0" : "1",
            dormitoryNumber,
            isGroupLeader: isGroupLeader === "否" ? "0" : "1",
            address,
            emergencyContactPerson,
            emergencyContactPhone,
            remark,
            studyDeptCode,
            studyTime: internshipBegin && internshipEnd ? [moment(internshipBegin), moment(internshipEnd)] : []
          });
        } else {
          current.clear();
        }
      }, 100);
    }
  }, [visible, formRef]);

  // 保存
  const checkForm = () => {
    let current: any = formRef.current;
    if (current) {
      current
        .validateFields()
        .then((res: any) => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            newParams.internshipBegin = newParams.studyTime && newParams.studyTime[0]
              ? newParams.studyTime[0].format("YYYY-MM-DD")
              : "";
            newParams.internshipEnd = newParams.studyTime && newParams.studyTime[1]
              ? newParams.studyTime[1].format("YYYY-MM-DD")
              : "";
            newParams.studyDeptName = newParams.studyDeptCode
              ? deptList.find(
                (item: any) => item.code === newParams.studyDeptCode
              ).name
              : "";
            if (params.identifier) {
              newParams.identifier = params.identifier;
              newParams.id = params.id;
              setEditLoading(true);
              traineeFilesApi
                .saveOrUpdateInfo(newParams)
                .then(res => {
                  setEditLoading(false);
                  let msg = "修改成功";
                  Message.success(msg);
                  onOk();
                })
                .catch((e: any) => {
                  console.log(e);
                  setEditLoading(false);
                });
            } else {
              traineeFilesApi.saveOrUpdateInfo(newParams).then(res => {
                setEditLoading(false);
                let msg = "添加成功";
                Message.success(msg);
                onOk();
              });
            }
          }
        })
        .catch((e: any) => {
          console.log(e);
          setEditLoading(false);
        });
    }
  };

  // 关闭取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      visible={visible}
      width={550}
      onCancel={handleCancel}
      forceRender={true}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.identifier ? "修改" : "添加"}
    >
      <Wrapper>
        <Form ref={formRef} rules={appStore.HOSPITAL_ID == 'nys' ? nysRules : rules}>
          {params.identifier && (
            <Row>
              <Col span={6} className="label">
                <span className="mustWrite">*</span> 实习编号:
              </Col>
              <Col span={16}>
                <Form.Field name="identifier">
                  <Input disabled />
                </Form.Field>
              </Col>
            </Row>
          )}
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 姓名:
            </Col>
            <Col span={16}>
              <Form.Field name="name">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 性别:
            </Col>
            <Col span={16}>
              <Form.Field name="sex">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="0">男</Radio.Button>
                  <Radio.Button value="1">女</Radio.Button>
                </Radio.Group>
              </Form.Field>
            </Col>
          </Row>
          {appStore.HOSPITAL_ID == 'hj' &&
            <Row>
              <Col span={6} className="label">
                在院状态:
              </Col>
              <Col span={16}>
                <Form.Field name="isOnJob">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="0">离院</Radio.Button>
                    <Radio.Button value="1">在院</Radio.Button>
                  </Radio.Group>
                </Form.Field>
              </Col>
            </Row>
          }
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 院校:
            </Col>
            <Col span={16}>
              <Form.Field name="schoolName">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 专业:
            </Col>
            <Col span={16}>
              <Form.Field name="major">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={appStore.HOSPITAL_ID == 'nys' ? 'displayNone' : "mustWrite"}>*</span> 学历:
            </Col>
            <Col span={16}>
              <Form.Field name="education">
                <Select defaultValue="7">
                  <Select.Option value="9">博士</Select.Option>
                  <Select.Option value="8">研究生</Select.Option>
                  <Select.Option value="7">本科</Select.Option>
                  <Select.Option value="6">大专</Select.Option>
                  <Select.Option value="5">中专</Select.Option>
                </Select>
              </Form.Field>
            </Col>
          </Row>
          {appStore.HOSPITAL_ID == 'gzhd' &&
            <Row>
              <Col span={6} className="label">
                <span className="mustWrite">*</span> 是否党员:
              </Col>
              <Col span={16}>
                <Form.Field name="isCPCMember">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="1">是</Radio.Button>
                    <Radio.Button value="0">否</Radio.Button>
                  </Radio.Group>
                </Form.Field>
              </Col>
            </Row>
          }
          <Row>
            <Col span={6} className="label">
              <span className={appStore.HOSPITAL_ID == 'nys' ? 'displayNone' : "mustWrite"}>*</span> 身份证号码:
            </Col>
            <Col span={16}>
              <Form.Field name="idCardNo">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={appStore.HOSPITAL_ID == 'nys' ? 'displayNone' : "mustWrite"}>*</span> 联系电话:
            </Col>
            <Col span={16}>
              <Form.Field name="phone">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={appStore.HOSPITAL_ID == 'nys' ? 'displayNone' : "mustWrite"}>*</span> 是否住宿:
            </Col>
            <Col span={16}>
              <Form.Field name="isResident">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="1">是</Radio.Button>
                  <Radio.Button value="0">否</Radio.Button>
                </Radio.Group>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              宿舍编号:
            </Col>
            <Col span={16}>
              <Form.Field name="dormitoryNumber">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={appStore.HOSPITAL_ID == 'gzhd' || appStore.HOSPITAL_ID == 'nys' ? 'displayNone' : "mustWrite"}>*</span> 实习时间:
            </Col>
            <Col span={16}>
              <Form.Field name="studyTime">
                <DatePicker.RangePicker />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 实习科室:
            </Col>
            <Col span={16}>
              <Form.Field name="studyDeptCode">
                <Select
                  style={{ width: 180 }}
                  allowClear
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {deptList.map((item: any) => {
                    return (
                      <Select.Option value={item.code} key={item}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={appStore.HOSPITAL_ID == 'nys' ? 'displayNone' : "mustWrite"}>*</span> 是否组长:
            </Col>
            <Col span={16}>
              <Form.Field name="isGroupLeader">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="1">是</Radio.Button>
                  <Radio.Button value="0">否</Radio.Button>
                </Radio.Group>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={appStore.HOSPITAL_ID == 'nys' ? 'displayNone' : "mustWrite"}>*</span> 家庭住址:
            </Col>
            <Col span={16}>
              <Form.Field name="address">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={appStore.HOSPITAL_ID == 'nys' ? 'displayNone' : "mustWrite"}>*</span> 紧急联系人:
            </Col>
            <Col span={16}>
              <Form.Field name="emergencyContactPerson">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className={appStore.HOSPITAL_ID == 'nys' ? 'displayNone' : "mustWrite"}>*</span> 紧急联系人电话:
            </Col>
            <Col span={16}>
              <Form.Field name="emergencyContactPhone">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              备注:
            </Col>
            <Col span={16}>
              <Form.Field name="remark">
                <Input.TextArea rows={5} maxLength={100} />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  .label {
    line-height: 32px;
    text-align: right !important;
    margin-right: 10px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
  .mustWrite {
    color: red !important;
    margin-top: 2px;
  }
  .displayNone {
    display: none;
  }
`;
