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
  DatePicker
} from "antd";
import Form from "src/components/Form/Form";
import moment from "moment";
import { Rules } from "src/components/Form/interfaces";
import service from "src/services/api"; //获取科室公共接口
import { nursingEduFilesApi } from "../api/NursingEduFilesApi"; //接口
import { nursingEduFilesModal } from "../NursingEduFilesModal"; //仓库数据
import { appStore } from "src/stores";

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function NursingEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [deptList, setDeptList]: any = useState([]); // 科室
  const [editLoading, setEditLoading] = useState(false); // 保存loading
  const formRef = React.createRef<Form>();

  // 弹窗必填项
  const rules: Rules = {
    name: val => !!val || "姓名不能为空",
    sex: val => !!val || "性别不能为空",
    age: val => !!val || "年龄不能为空",
    title: val => !!val || "职称不能为空",
    education: val => !!val || "学历不能为空",
    originalWorkUnit: val => !!val || "原单位名称不能为空",
    originalDepartment: val => !!val || "原科室不能为空",
    idCardNo: val => !!val || "身份证号码不能为空",
    phone: val => !!val || "联系电话不能为空",
    isResident: val => !!val || "是否住宿不能为空",
    studyTime: val => !!val || "进修时间不能为空",
    studyDeptCode01: val => !!val || "进修科室一不能为空",
    address: val => !!val || "家庭住址不能为空",
    emergencyContactPerson: val => !!val || "紧急联系人不能为空",
    emergencyContactPhone: val => !!val || "紧急联系人电话不能为空"
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

  // 初始化  判断是否修改回显
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
        if (params.id) {
          current.clear();
          let data: any = { ...params };
          // 学历单独处理
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
            title,
            education,
            originalWorkUnit,
            originalDepartment,
            idCardNo,
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
          } = data;
          current.setFields({
            identifier,
            name,
            sex: sex === "男" ? "0" : "1",
            age,
            title,
            education,
            originalWorkUnit,
            originalDepartment,
            idCardNo,
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
            console.log(newParams, "newParams1111");
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
            if (params.id) {
              newParams.identifier = params.identifier;
              newParams.id = params.id;
              setEditLoading(true);
              nursingEduFilesApi
                .saveOrUpdateInfo(newParams)
                .then(res => {
                  setEditLoading(false);
                  let msg = "修改成功";
                  Message.success(msg);
                  onOk();
                  // current.clear();
                })
                .catch((e: any) => {
                  console.log(e);
                  setEditLoading(false);
                });
            } else {
              nursingEduFilesApi.saveOrUpdateInfo(newParams).then(res => {
                setEditLoading(false);
                let msg = "添加成功";
                Message.success(msg);
                onOk(res);
                // current.clear();
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
      onCancel={handleCancel}
      width={550}
      forceRender={true}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.identifier ? "修改" : "添加"}
      bodyStyle={{maxHeight: 'calc(74vh)'}}
    >
      <Wrapper>
        <Form ref={formRef} rules={rules}>
          {params.identifier && (
            <Row>
              <Col span={6} className="label">
                <span className="mustWrite">*</span> 进修编码:
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
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 年龄:
            </Col>
            <Col span={16}>
              <Form.Field name="age">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 职称:
            </Col>
            <Col span={16}>
              <Form.Field name="title">
                <Select defaultValue="见习护士">
                  <Select.Option value="见习护士">见习护士</Select.Option>
                  <Select.Option value="护士">护士</Select.Option>
                  <Select.Option value="主管护师">主管护师</Select.Option>
                  <Select.Option value="副主任护师">副主任护师</Select.Option>
                  <Select.Option value="主任护师">主任护师</Select.Option>
                  { ["gxjb"].includes(appStore.HOSPITAL_ID) && <Select.Option value="护师">护师</Select.Option> }
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 学历:
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
              <span className="mustWrite">*</span> 原单位名称:
            </Col>
            <Col span={16}>
              <Form.Field name="originalWorkUnit">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 原科室:
            </Col>
            <Col span={16}>
              <Form.Field name="originalDepartment">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 身份证号码:
            </Col>
            <Col span={16}>
              <Form.Field name="idCardNo">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 联系电话:
            </Col>
            <Col span={16}>
              <Form.Field name="phone">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 是否住宿:
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
              <span className="mustWrite">*</span> 进修时间:
            </Col>
            <Col span={16}>
              <Form.Field name="studyTime">
                <DatePicker.RangePicker />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 进修科室一:
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
          {
            !['qhwy', 'whhk'].includes(appStore.HOSPITAL_ID) &&
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
          }
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 家庭住址:
            </Col>
            <Col span={16}>
              <Form.Field name="address">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 紧急联系人:
            </Col>
            <Col span={16}>
              <Form.Field name="emergencyContactPerson">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="label">
              <span className="mustWrite">*</span> 紧急联系人电话:
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
`;
