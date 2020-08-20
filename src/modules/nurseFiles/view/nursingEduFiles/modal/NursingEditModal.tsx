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
import { Rules } from "src/components/Form/interfaces";
import { nursingEduFilesApi } from "../api/NursingEduFilesApi";
import { nursingEduFilesModal } from "../NursingEduFilesModal";
import service from "src/services/api"; //获取科室公共接口

import moment from "moment";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function NursingEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const [dataObj, setDataobj]: any = useState([]); // 科室
  const [loading, setLoading] = useState(false);
  const [deptList, setDeptList]: any = useState([]); // 科室

  // 弹窗必填项
  const rules: Rules = {
    // name: val => !!val || "名称不能为空",
    // teachingMethod: val => !!val || "教学方式不能为空",
    // sort: val =>
    //   isNaN(Number(val)) || val === "" || Number(val) < 0
    //     ? "排序必填且为正整数"
    //     : ""
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

  // studyTimeBegin  studyTimeEnd
  useEffect(() => {
    console.log(nursingEduFilesModal.deptList, "nursingEduFilesModal.deptList");
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
        if (params.identifier) {
          const educationList: any = [
            { name: "博士", num: "9" },
            { name: "研究生", num: "8" },
            { name: "本科", num: "7" },
            { name: "大专", num: "6" },
            { name: "中专", num: "5" }
          ];
          if (params.education) {
            params.education = educationList.find(
              (item: any) => item.name === params.education
            )
              ? educationList.find(
                  (item: any) => item.name === params.education
                ).num
              : "";
          }
          const {
            identifier,
            name,
            sex,
            age,
            title,
            education,
            originalWorkUnit,
            originalDepartment,
            phone,
            isResident,
            dormitoryNumber,
            studyTimeBegin,
            studyTimeEnd,
            studyDeptCode01,
            studyDeptCode02,
            studyDeptName01,
            studyDeptName02,
            address,
            emergencyContactPerson,
            emergencyContactPhone,
            remark
          } = params;
          current.setFields({
            identifier,
            name,
            sex: sex === "男" ? "0" : "1",
            age,
            title,
            education,
            originalWorkUnit,
            originalDepartment,
            phone,
            isResident: isResident === "否" ? "0" : "1",
            dormitoryNumber,
            studyDeptCode01,
            studyDeptCode02,
            address,
            emergencyContactPerson,
            emergencyContactPhone,
            remark,
            studyTime: [moment(studyTimeBegin), moment(studyTimeEnd)]
          });
        } else {
          current.clear();
        }
      }, 100);
    }
  }, [visible]);

  const checkForm = () => {
    let current: any = formRef.current;
    if (current) {
      current
        .validateFields()
        .then((res: any) => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            newParams.studyTimeBegin = newParams.studyTime
              ? newParams.studyTime[0].format("YYYY-MM-DD")
              : "";
            newParams.studyTimeEnd = newParams.studyTime
              ? newParams.studyTime[1].format("YYYY-MM-DD")
              : "";
            newParams.studyDeptName01 = newParams.studyDeptCode01
              ? deptList.find(
                  (item: any) => item.code === newParams.studyDeptCode01
                ).name
              : "";
            newParams.studyDeptName02 = newParams.studyDeptCode02
              ? deptList.find(
                  (item: any) => item.code === newParams.studyDeptCode02
                ).name
              : "";
            if (params.identifier) {
              newParams.identifier = params.identifier;
              setEditLoading(true);
              nursingEduFilesApi.saveOrUpdateInfo(newParams).then(res => {
                setEditLoading(false);
                let msg = "修改成功";
                Message.success(msg);
                onOk();
                current.clear();
              });
            } else {
              nursingEduFilesApi.saveOrUpdateInfo(newParams).then(res => {
                setEditLoading(false);
                let msg = "添加成功";
                Message.success(msg);
                onOk(res);
                current.clear();
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
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };
  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.identifier ? "修改" : "添加"}
    >
      <Spin spinning={loading}>
        <Wrapper>
          <Form ref={formRef} rules={rules}>
            {params.identifier && (
              <Row>
                <Col span={6} className="label">
                  进修编码:
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
                姓名:
              </Col>
              <Col span={16}>
                <Form.Field name="name">
                  <Input />
                </Form.Field>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="label">
                性别:
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
            <Row>
              <Col span={6} className="label">
                年龄:
              </Col>
              <Col span={16}>
                <Form.Field name="age">
                  <Input />
                </Form.Field>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="label">
                职称:
              </Col>
              <Col span={16}>
                <Form.Field name="title">
                  <Select defaultValue="见习护士">
                    <Select.Option value="见习护士">见习护士</Select.Option>
                    <Select.Option value="护士">护士</Select.Option>
                    <Select.Option value="主管护师">主管护师</Select.Option>
                    <Select.Option value="副主任护师">副主任护师</Select.Option>
                    <Select.Option value="主任护师">主任护师</Select.Option>
                  </Select>
                </Form.Field>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="label">
                学历:
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
            <Row>
              <Col span={6} className="label">
                原单位名称:
              </Col>
              <Col span={16}>
                <Form.Field name="originalWorkUnit">
                  <Input />
                </Form.Field>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="label">
                原科室:
              </Col>
              <Col span={16}>
                <Form.Field name="originalDepartment">
                  <Input />
                </Form.Field>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="label">
                联系电话:
              </Col>
              <Col span={16}>
                <Form.Field name="phone">
                  <Input />
                </Form.Field>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="label">
                是否住宿:
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
                进修时间:
              </Col>
              <Col span={16}>
                <Form.Field name="studyTime">
                  <DatePicker.RangePicker />
                </Form.Field>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="label">
                进修科室一:
              </Col>
              <Col span={16}>
                <Form.Field name="studyDeptCode01">
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
                进修科室二:
              </Col>
              <Col span={16}>
                <Form.Field name="studyDeptCode02">
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
                家庭住址:
              </Col>
              <Col span={16}>
                <Form.Field name="address">
                  <Input />
                </Form.Field>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="label">
                紧急联系人:
              </Col>
              <Col span={16}>
                <Form.Field name="emergencyContactPerson">
                  <Input />
                </Form.Field>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="label">
                紧急联系人电话:
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
      </Spin>
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
`;
