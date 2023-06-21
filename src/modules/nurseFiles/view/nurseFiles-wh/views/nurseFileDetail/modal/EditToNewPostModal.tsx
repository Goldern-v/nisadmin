import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import {
  Modal,
  Button,
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
import { authStore, appStore } from "src/stores";
import emitter from "src/libs/ev";
const Option = Select.Option;
const isSdlj = ['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID)
const isZhzxy = ['zhzxy'].includes(appStore.HOSPITAL_ID)

export interface Props extends ModalComponentProps {
  data?: any;
  signShow?: string;
  getTableData?: () => {};
}
const rules: Rules = {
  oldDeptCode: val => !!val || "原工作科室",
  newDeptCode: val => !!val || "现工作科室",
  ...!isSdlj ? {deptBeDepartment: val => !!val || "现科室隶属部门"} : {},
  transferDate: val => !!val || "请填写转岗时间"
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
        transferDate: data.transferDate ? moment(data.transferDate) : null,
        post:data.post || '',
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
          {!isSdlj ? <Col span={24}>
            <Form.Field label={`原工作科室`} name="oldDeptCode" required>
              <Select placeholder="选择原工作科室">
                {["925", 'dghm'].includes(appStore.HOSPITAL_ID) ?
                nurseFileDetailViewModal.getDict("全部科室").map((item: any) => (
                  <Option value={item.code} key={item.code}>
                    {item.name}
                  </Option>
                )) :
                list.map((item: any) => (
                      <Option value={item.code} key={item.code}>
                        {item.name}
                      </Option>
                  ))
                }
              </Select>
            </Form.Field>
          </Col> :
          <Col span={24}>
            <Form.Field label={`原工作科室`} name="oldDeptCode" required>
              <AutoComplete
                dataSource={nurseFileDetailViewModal
                    .getDict("全部科室").map((item: any) => item.name)}
                placeholder="选择原工作科室"
                filterOption={(inputValue: any, option: any) =>
                  option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Field>
          </Col>}
          <Col span={24}>
            <Form.Field label={`现工作科室`} name="newDeptCode" required>
              <Select placeholder="选择现工作科室">
                {nurseFileDetailViewModal
                  .getDict("全部科室")
                  .map((item: any) => (
                    <Option value={item.code} key={item.code}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Form.Field>
          </Col>
          {!isSdlj && <Col span={24}>
            <Form.Field
              label={`现科室隶属部门`}
              name="deptBeDepartment"
              required
            >
              <Select placeholder="现科室隶属部门">
                {nurseFileDetailViewModal
                  .getDict("现科室隶属部门")
                  .map((item: any) => (
                    <Option value={item.code} key={item.code}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Form.Field>
          </Col>}
          {isZhzxy && <Col span={24}>
            <Form.Field
              label={`职务`}
              name="post"
              required
            >
              <Select placeholder="职务">
                {nurseFileDetailViewModal
                  .getDict("职务")
                  .map((item: any) => (
                    <Option value={item.code} key={item.code}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Form.Field>
          </Col>}
          <Col span={24}>
            <Form.Field label={`转岗时间`} name="transferDate" required>
              <DatePicker />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
