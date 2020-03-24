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
  AutoComplete
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";

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
import { nurseFilesService } from "../../../services/NurseFilesService";
import { observer } from "mobx-react-lite";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  data?: any;
  signShow?: string;
  getTableData?: () => {};
}
const rules: Rules = {
  time: val => !!val || "请填写时间",
  specialFileName: val => !!val || "请选择文件类型"
};
export default observer(function EditWorkHistoryModal(props: Props) {
  const [title, setTitle] = useState("");

  let { visible, onCancel, onOk, data, signShow } = props;
  let refForm = React.createRef<Form>();

  const onFieldChange = () => {};

  const onSave = async () => {
    let obj = {
      empNo: nurseFileDetailViewModal.nurserInfo.empNo,
      empName: nurseFileDetailViewModal.nurserInfo.empName,
      auditedStatus: "",
      urlImageOne: ""
    };
    if ((authStore.user && authStore.user.post) == "护长") {
      obj.auditedStatus = "waitAuditedNurse";
    } else if ((authStore.user && authStore.user.post) == "护理部") {
      obj.auditedStatus = "waitAuditedDepartment";
    }
    if (signShow === "修改") {
      Object.assign(obj, { id: data.id });
    }
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    value.time && (value.startTime = value.time.format("YYYY-MM-DD"));
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(","));
    nurseFilesService
      .nurseJuniorSpecialFileAdd({ ...obj, ...value })
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
        time: moment(data.time),
        specialFileName: data.specialFileName,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(",") : []
      });
    }
    if (signShow === "修改") {
      setTitle("修改专科护士");
    } else if (signShow === "添加") {
      setTitle("添加专科护士");
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onSave}
      onCancel={onCancel}
      okText="保存"
      forceRender
    >
      <Form
        ref={refForm}
        rules={rules}
        labelWidth={120}
        onChange={onFieldChange}
      >
        <Row>
          <Col span={24}>
            <Form.Field label={`获得时间`} name="time">
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`文件类型`} name="specialFileName" required>
              <AutoComplete
                dataSource={nurseFileDetailViewModal
                  .getDict("文件类型")
                  .map(item => item.name)}
              />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`附件`} name="urlImageOne">
              <MultipleImageUploader text="添加图片" />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
const Wrapper = styled.div``;
