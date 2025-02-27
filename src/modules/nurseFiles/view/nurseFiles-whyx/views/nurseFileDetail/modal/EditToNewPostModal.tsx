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
  message
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { nurseFilesService } from "../../../services/NurseFilesService";
import { nurseFileDetailViewModal } from "../NurseFileDetailViewModal";
import {
  TITLE_LIST,
  POST_LIST
} from "../../nurseFilesList/modal/AddNursingModal";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import moment from "moment";
import loginViewModel from "src/modules/login/LoginViewModel";
// 加附件
import ImageUploader from "src/components/ImageUploader";
import { authStore, appStore } from "src/stores";
import service from "src/services/api";
import emitter from "src/libs/ev";
import MultipleImageUploader from "src/components/ImageUploader/MultipleImageUploader";
import YearPicker from "src/components/YearPicker";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  data?: any;
  signShow?: string;
  getTableData?: () => {};
}
const rules: Rules = {
  oldDeptCode: val => !!val || "原工作科室",
  newDeptCode: val => !!val || "现工作科室",
  deptBeDepartment: val => !!val || "现科室隶属部门",
  transferDate: val => !!val || "请填写转岗时间"
  // awardWinningName: (val) => !!val || '请填写获奖/推广创新项目名称',
  // rank: (val) => !!val || '请填写本人排名',
  // awardlevel: (val) => !!val || '请填写授奖级别',
  // approvalAuthority: (val) => !!val || '请填写批准机关'
};
export default function EditToNewPostModal(props: Props) {
  const [title, setTitle] = useState("");
  const [list, setList]: any = useState([]);
  const [type, setType] = useState("");
  const [oldType, setOldType] = useState("");
  let { visible, onCancel, onOk, data, signShow } = props;
  let refForm = React.createRef<Form>();

  const onFieldChange = () => {};

  const onSelectChange = (value: any) => {
    setType(value);
  };
  const onSelectChangeOld = (value: any) => {
    setOldType(value);
  };

  const onSave = async (sign: boolean) => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName
    };

    if (signShow === "修改") {
      Object.assign(obj, { id: data.id });
    }
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    if (!Object.keys(value).length) {
      return message.warning("数据不能为空");
    }

    /** 补全科室名称 */
    value.newDeptName = (nurseFileDetailViewModal
      .getDict("全部科室")
      .find(item => item.code == value.newDeptCode) || { name: "" })!.name;
    value.oldDeptName = (nurseFileDetailViewModal
      .getDict("全部科室")
      .find(item => item.code == value.oldDeptCode) || { name: "" })!.name;

    value.transferDate &&
      (value.transferDate = value.transferDate.format("YYYY-MM-DD"));
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(","));
    nurseFilesService
      .commonSaveOrUpdate("nurseWHTransferPost", { ...value, ...obj, sign })
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
        oldDeptCode: data.oldDeptCode,
        newDeptCode: data.newDeptCode,
        deptBeDepartment: data.deptBeDepartment,
        transferDate: data.transferDate ? moment(data.transferDate) : null
        // urlImageOne: data.urlImageOne ? data.urlImageOne.split(',') : []
      });
    }
    if (signShow === "修改") {
      setTitle("修改岗位变动信息");
      setList(authStore.deptList);
    } else if (signShow === "添加") {
      setTitle("添加岗位变动信息");
      setList(authStore.deptList);
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      forceRender
      centered
      footer={[
        <Button key="back" onClick={onCancel}>
          关闭
        </Button>,
        <Button key="save" type="primary" onClick={() => onSave(false)}>
          保存
        </Button>,
        <Button key="submit" type="primary" onClick={() => onSave(true)}>
          提交审核
        </Button>
      ]}
    >
      <Form
        ref={refForm}
        rules={rules}
        labelWidth={120}
        onChange={onFieldChange}
      >
        <Row>
          <Col span={24}>
            <Form.Field label={`原工作科室`} name="oldDeptCode" required>
              <Select placeholder="选择原工作科室">
                {list.map((item: any) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`现工作科室`} name="newDeptCode" required>
              <Select placeholder="选择现工作科室">
                {nurseFileDetailViewModal
                  .getDict("全部科室")
                  .map((item: any) => (
                    <Select.Option value={item.code} key={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field
              label={`现科室隶属部门`}
              name="deptBeDepartment"
              required
            >
              <Select placeholder="现科室隶属部门">
                {nurseFileDetailViewModal
                  .getDict("现科室隶属部门")
                  .map((item: any) => (
                    <Select.Option value={item.code} key={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`转岗时间`} name="transferDate" required>
              <DatePicker />
            </Form.Field>
          </Col>
          {/* <Col span={24}>
            <Form.Field label={`附件`} name='urlImageOne'>
              <MultipleImageUploader text='添加图片' />
            </Form.Field>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
