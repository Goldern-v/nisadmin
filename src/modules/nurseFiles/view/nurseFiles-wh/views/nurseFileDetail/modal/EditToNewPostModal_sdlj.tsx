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
import { nurseFilesService } from "../../../services/NurseFilesService";
import { nurseFileDetailViewModal } from "../NurseFileDetailViewModal";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import moment from "moment";
import { authStore } from "src/stores";
export interface Props extends ModalComponentProps {
  data?: any;
  signShow?: string;
  getTableData?: () => {};
}
const rules: Rules = {
  transferDate: val => !!val || "请选择开始时间",
  endDate: val => !!val || "请选择结束时间",
  newDeptCode: val => !!val || "请选择科室",
  deptBeDepartment: (val) => !!val || '请选择',
};
export default function EditToNewPostModal(props: Props) {
  const [title, setTitle] = useState("");
  const [list, setList]: any = useState([]);
  let { visible, onCancel, onOk, data, signShow } = props;
  let refForm = React.createRef<Form>();

  const onFieldChange = () => {};


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
    // value.oldDeptName = (nurseFileDetailViewModal
    //   .getDict("全部科室")
    //   .find(item => item.code == value.oldDeptCode) || { name: "" })!.name;

    value.transferDate &&
      (value.transferDate = value.transferDate.format("YYYY-MM-DD"));
    nurseFilesService
      .commonSaveOrUpdate("nurseWHTransferPost", { ...value, ...obj, sign })
      .then((res: any) => {
        message.success("保存成功");
        props.getTableData && props.getTableData();
        // emitter.emit("refreshNurseFileDeatilLeftMenu");
        onCancel();
      });
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      refForm!.current!.setFields({
        // oldDeptCode: data.oldDeptCode,
        newDeptCode: data.newDeptCode,
        deptBeDepartment: data.deptBeDepartment,
        transferDate: data.transferDate ? moment(data.transferDate) : null,
        endDate: data.endDate ? moment(data.endDate) : null
      });
    }
    if (signShow === "修改") {
      setTitle("修改岗位变动信息");
      setList(authStore.deptList);
    } else if (signShow === "添加") {
      setTitle("添加岗位变动信息");
      setList(authStore.deptList);
      refForm!.current!.setFields({
        deptBeDepartment: '合格',
      })
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
            <Form.Field label={`开始时间`} name='transferDate' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`结束时间`} name='endDate' required>
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`科室`} name="newDeptCode" required>
              <AutoComplete
                dataSource={list.map((item: any) => item.name)}
                placeholder="请选择或者输入科室"
                filterOption={(inputValue: any, option: any) =>
                  option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`考核成绩`} name='deptBeDepartment' required>
              <Select>
                {['合格', '不合格'].map((item) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
