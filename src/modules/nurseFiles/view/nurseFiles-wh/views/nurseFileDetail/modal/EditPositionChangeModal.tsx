import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
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
import MultipleImageUploader from "src/components/ImageUploader/MultipleImageUploader";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  data?: any;
  signShow?: string;
  getTableData?: () => {};
}
const isSdlj = ['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID)

// winNewTiTleDate: data.winNewTiTleDate ? moment(data.winNewTiTleDate) : null,
// employNewTiTleDate: data.employNewTiTleDate ? moment(data.employNewTiTleDate) : null,
// titleOld: data.titleOld,
// titleNew: data.titleNew,
const rules: Rules = {
  ...!isSdlj ? {
    titleOld: val => !!val || "请填写原职称名称",
    titleNew: val => !!val || "请填写现职称名称"
  } : { titleNew: val => !!val || "请填写职称名称" },
  // ...appStore.HOSPITAL_ID==='zhzxy'?{titleNumber:val=>!!val||'请填写证书编号'}:null,
  winNewTiTleDate: val => !!val || "请选择考取专业技术资格证书时间",
  employNewTiTleDate: val => !!val || "请选择聘用专业技术资格时间"
};
export default function EditPositionChangeModal(props: Props) {
  const [title, setTitle] = useState("");

  let { visible, onCancel, onOk, data, signShow } = props;
  let refForm = React.createRef<Form>();

  const onFieldChange = () => { };

  const onSave = async (sign: boolean) => {
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
    if (!Object.keys(value).length) {
      return message.warning("数据不能为空");
    }
    // value.startDate && (value.startDate = value.startDate.format('YYYY-MM-DD'))
    value.winNewTiTleDate &&
      (value.winNewTiTleDate = value.winNewTiTleDate.format("YYYY-MM-DD"));
    value.employNewTiTleDate &&
      (value.employNewTiTleDate = value.employNewTiTleDate.format(
        "YYYY-MM-DD"
      ));
    // value.endDate && (value.endDate = value.endDate.format('YYYY-MM-DD'))
    value.urlImageOne && (value.urlImageOne = value.urlImageOne.join(","));
    nurseFilesService
      .commonSaveOrUpdate("nurseWHTitle", { ...obj, ...value, sign })
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
        // startDate: data.startDate ? moment(data.startDate) : null,
        winNewTiTleDate: data.winNewTiTleDate
          ? moment(data.winNewTiTleDate)
          : null,
        employNewTiTleDate: data.employNewTiTleDate
          ? moment(data.employNewTiTleDate)
          : null,
        titleOld: data.titleOld,
        titleNew: data.titleNew,
        urlImageOne: data.urlImageOne ? data.urlImageOne.split(",") : [],
        ...appStore.hisMatch({
          map: {
            'sdlj,nfsd,qzde,zhzxy': {
              titleNumber: data.titleNumber
            },
            other: {}
          },
          vague: true
        })
      });
    }
    if (signShow === "修改") {
      setTitle("修改职称变动奖励");
    } else if (signShow === "添加") {
      setTitle("添加职称变动信息");
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
          {/* <Col span={24}>
            <Form.Field label={`开始时间`} name='startDate'>
              <DatePicker />
            </Form.Field>
          </Col> */}
          {/* <Col span={24}>
            <Form.Field label={`结束时间`} name='endDate'>
              <DatePicker />
            </Form.Field>
          </Col> */}
          {!isSdlj && <Col span={24}>
            <Form.Field label={`原职称名称`} name="titleOld" required>
              <Select>
                {nurseFileDetailViewModal
                  .getDict("技术职称")
                  .map((item: any, index: number) => (
                    <Option value={item.code} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Form.Field>
          </Col>}
          <Col span={24}>
            <Form.Field label={isSdlj ? '职称名称' : `现职称名称`} name="titleNew" required>
              <Select>
                {nurseFileDetailViewModal
                  .getDict("技术职称")
                  .map((item: any, index: number) => (
                    <Option value={item.code} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Form.Field>
          </Col>
          {isSdlj && <Col span={24}>
            <Form.Field label="证书编号" name="titleNumber">
              <Input />
            </Form.Field>
          </Col>}
          {appStore.HOSPITAL_ID==='zhzxy' && <Col span={24}>
            <Form.Field label="证书编号" name="titleNumber">
              <Input />
            </Form.Field>
          </Col>}
          <Col span={24}>
            <Form.Field
              label={`考取专业技术资格证书时间`}
              name="winNewTiTleDate"
              required
            >
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field
              label={`聘用专业技术资格时间`}
              name="employNewTiTleDate"
              required
            >
              <DatePicker />
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
}
const Wrapper = styled.div``;
