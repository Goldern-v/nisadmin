import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";
import {
  Modal,
  Input,
  Button,
  Radio,
  DatePicker,
  Select,
  Row,
  Col,
  message,
  AutoComplete,
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";

import { nurseFileDetailViewModal } from "../NurseFileDetailViewModal";
import {
  TITLE_LIST,
  POST_LIST,
  EDUCATION_LIST,
} from "../../nurseFilesList/modal/AddNursingModal";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import moment from "moment";
// 加附件
import ImageUploader from "src/components/ImageUploader";
import { appStore, authStore } from "src/stores";
import service from "src/services/api";
import emitter from "src/libs/ev";
// import MultipleImageUploader from "src/components/ImageUploader/MultipleImageUploader";
import { nurseFilesService } from "../../../services/NurseFilesService";
import { observer } from "mobx-react-lite";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  id?: number;
  data?: any;
  getTableData?: () => {};
}

// const uploadCard = () => Promise.resolve("123");

const rules: Rules = {
  empName: (val) => !!val || "请填写姓名",
  empNo: (val) => !!val || "请填写工号",
  sex: (val) => !!val || "请选择性别",
  nation: (val) => !!val || "请填写民族",
  birthday: (val) => !!val || "请选择出生日期",
  age: (val) => !!val || "请填写年龄",
  nativePlace: (val) => !!val || "请填写籍贯",
  job: (val) => !!val || "请填写职务",
  goWorkTime: (val) => !!val || "请填写参加工作时间",
  highestEducation: (val) => !!val || "请填写最高学历",
  newTitle: (val) => !!val || "请填写技术职称",
  // zyzsNumber: (val) => !!val || '请填写护士执业证书编号',
  cardNumber: (val) => {
    if (!!!val) return "请填写身份证号";

    //身份证验证
    let idCardNumberReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

    if (idCardNumberReg.test(val)) return true;
    else return "请输入正确的身份证号码";
  },
  // socialGroup: (val) => !!val || "请填写学术任职",
  phone: (val) => !!val || "请填写手机号",
  address: (val) => !!val || "请填写家庭住址",
  goHospitalWorkDate: (val) => !!val || "请填写来院工作时间",
  workConversion: (val) => !!val || "请填写工作编制",
  // enrolDate: (val) => !!val || "请填写纳编时间",
  // firstDegree: (val) => !!val || "请填写第一学历",
  // nearImageUrl: (val) => !!val || "请添加个人头像",
  // zyzsNursingPostDate: (val) => !!val || "请填写开始从事护理时间",
  // zyzsDate: (val) => !!val || "请填写获取执业证书开始时间",
};

export default observer(function EditWorkHistoryModal(props: Props) {
  let { visible, onCancel, onOk, data, id } = props;
  let refForm = React.createRef<Form>();

  const onFieldChange = () => {};

  const uploadCard = async (file: any) => {
    let obj: any = {
      file,
      empNo: appStore.queryObj.empNo,
      type: "0",
    };

    const [err, res] = await to(service.commonApiService.uploadFile(obj));

    if (err) {
      return "";
    }
    if (res.data) {
      let pathImg = `${res.data.path}`;
      return pathImg;
    }
  };

  const onSave = async () => {
    let obj = {
      id: id,
      auditedStatus: "",
    };

    if ((authStore.user && authStore.user.post) == "护长") {
      obj.auditedStatus = "waitAuditedNurse";
    } else if ((authStore.user && authStore.user.post) == "护理部") {
      obj.auditedStatus = "waitAuditedDepartment";
    }

    if (!refForm.current) return;

    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    value.birthday && (value.birthday = value.birthday.format("YYYY-MM-DD"));
    value.goWorkTime &&
      (value.goWorkTime = value.goWorkTime.format("YYYY-MM-DD"));
    value.goHospitalWorkDate &&
      (value.goHospitalWorkDate = value.goHospitalWorkDate.format(
        "YYYY-MM-DD"
      ));
    value.enrolDate && (value.enrolDate = value.enrolDate.format("YYYY-MM-DD"));
    value.zyzsUrl && (value.zyzsUrl = value.zyzsUrl.join(","));

    value.zyzsNursingPostDate &&
      (value.zyzsNursingPostDate = value.zyzsNursingPostDate.format(
        "YYYY-MM-DD"
      ));
    value.zyzsDate && (value.zyzsDate = value.zyzsDate.format("YYYY-MM-DD"));

    nurseFilesService
      .saveOrUpdateBaseInfo({ ...value, ...obj })
      .then((res: any) => {
        message.success("保存成功");
        props.getTableData && props.getTableData();
        emitter.emit("refreshNurseFileDeatilLeftMenu");
        onCancel();
      });
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        birthday: data.birthday ? moment(data.birthday) : null,
        goHospitalWorkDate: data.goHospitalWorkDate
          ? moment(data.goHospitalWorkDate)
          : null,
        enrolDate: data.enrolDate ? moment(data.enrolDate) : null,
        empName: data.empName,
        empNo: data.empNo,
        sex: data.sex,
        job: data.job,
        nation: data.nation,
        age: data.age,
        nativePlace: data.nativePlace,
        highestEducation: data.highestEducation,
        zyzsNumber: data.zyzsNumber,
        cardNumber: data.cardNumber,
        socialGroup: data.socialGroup,
        phone: data.phone,
        address: data.address,
        nearImageUrl: data.nearImageUrl,
        zyzsUrl: data.zyzsUrl ? data.zyzsUrl.split(",") : [],
        newTitle: data.newTitle,
        workConversion: data.workConversion,
        zyzsNursingPostDate: data.zyzsNursingPostDate
          ? moment(data.zyzsNursingPostDate)
          : null,
        zyzsDate: data.zyzsDate ? moment(data.zyzsDate) : null,
        goWorkTime: data.goWorkTime ? moment(data.goWorkTime) : null,
      });
      // refForm.current.setField('unit', 123)
    }
  }, [visible]);

  return (
    <Modal
      title="修改基本信息"
      width={1000}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
    >
      <Form
        ref={refForm}
        labelWidth={140}
        onChange={onFieldChange}
        rules={rules}
      >
        <Row>
          <Col span={12}>
            <Form.Field label={`姓名`} name="empName" required>
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`工号`} name="empNo" required>
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`性别`} name="sex" required>
              <Select>
                <Option value="0">男</Option>
                <Option value="1">女</Option>
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`民族`} name="nation" required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`出身年月`} name="birthday" required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`年龄`} name="age" required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`籍贯`} name="nativePlace" required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`职务`} name="job" required>
              <AutoComplete dataSource={POST_LIST} />
            </Form.Field>
          </Col>{" "}
          <Col span={12}>
            <Form.Field label={`参加工作时间`} name="goWorkTime" required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`最高学历`} name="highestEducation" required>
              <Select>
                {EDUCATION_LIST.map((name: string) => (
                  <Option value={name} key={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`技术职称`} name="newTitle" required>
              <Select>
                {TITLE_LIST.map((name: string) => (
                  <Option value={name} key={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          {/* <Col span={12}>
            <Form.Field label={`护士执业证书编号`} name="zyzsNumber" required>
              <Input />
            </Form.Field>
          </Col> */}
          <Col span={12}>
            <Form.Field label={`身份证号`} name="cardNumber" required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`学术任职`} name="socialGroup">
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`手机号`} name="phone" required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`家庭住址`} name="address" required>
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field
              label={`来院工作时间`}
              name="goHospitalWorkDate"
              required
            >
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`工作编制`} name="workConversion" required>
              <Select>
                {nurseFileDetailViewModal.getDict("工作编制").map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`纳编时间`} name="enrolDate">
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`第一学历`} name="firstDegree">
              <Select>
                {EDUCATION_LIST.map((name: string) => (
                  <Option value={name} key={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field
              label={`开始从事护理时间`}
              name="zyzsNursingPostDate"
            >
              <DatePicker />
            </Form.Field>
          </Col>
          {/* <Col span={12}>
            <Form.Field label={`获取执业证书开始时间`} name="zyzsDate" required>
              <DatePicker />
            </Form.Field>
          </Col> */}
        </Row>
        <Row>
          <Col span={12}>
            <Form.Field label={`添加个人头像`} name="nearImageUrl">
              <ImageUploader
                upload={uploadCard}
                maxSize={2048000}
                text="添加个人头像"
                tip={"近期免冠照片或近期工作照片, 大小不超过2MB"}
              />
            </Form.Field>
          </Col>
          {/* <Col span={12}>
            <Form.Field label={`添加附件`} name="zyzsUrl">
              <MultipleImageUploader text="添加图片" />
            </Form.Field>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  );
});
const Wrapper = styled.div``;
