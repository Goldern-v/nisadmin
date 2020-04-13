import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
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
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import service from "src/services/api";
import { Spin, Switch } from "src/vendors/antd";
import { authStore } from "src/stores";
import SwitchField from "src/components/Swich";
import { arrangeService } from "../../../services/ArrangeService";

const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  editData?: any;
  type?: any; // 区分医院（吴敏）
  identity?: any; // 区分登陆者身份（吴敏）
}

/** 设置规则 */
const rules: Rules = {
  name: val => !!val || "请填写班次名称",
  shiftType: val => !!val || "请填写班次类别",
  workTime: val => !!val || "请填写上班时间",
  effectiveTime: val => !!val || "请填写标准工时",
  nameColor: val => !!val || "请填写颜色标记"
};

export default function AddShiftModal(props: Props) {
  const [title, setTitle] = useState("添加班次");
  const [shiftList, setShiftList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    let data = { ...(props.editData || {}), ...value };
    data.deptCode = authStore.selectedDeptCode;
    /** 保存接口 */
    arrangeService.schShiftSettingSaveOrUpdate(data).then((res: any) => {
      message.success("保存成功");
      props.onOkCallBack && props.onOkCallBack();
      onCancel();
    });
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      setModalLoading(true);
      let from = refForm.current;
      service.commonApiService
        .multiDictInfo(["sch_range_shift_type", "sch_range_color"])
        .then(res => {
          setShiftList(res.data.sch_range_shift_type);
          setColorList(res.data.sch_range_color);
          setModalLoading(false);
          if (props.editData) {
            from!.setFields({
              name: props.editData.name,
              shiftType: props.editData.shiftType,
              workTime: props.editData.workTime,
              effectiveTime: props.editData.effectiveTime,
              nameColor: props.editData.nameColor,
              status: props.editData.status
            });
          } else {
            /** 表单数据初始化 */
            from!.setFields({
              name: "",
              shiftType: "",
              workTime: "8:00 - 16:00",
              effectiveTime: "8",
              nameColor: "",
              status: true
            });
          }
        });
    }
  }, [visible]);

  const onFormChange = (name: string, value: any, form: Form<any>) => {
    if (name === "workTime") {
      let index: any = value.indexOf("-");
      let num1: any = value.substring(0, index).trim();
      let num2: any = value.substring(index + 1, value.length).trim();
      console.log(value, "value", num1, "num1", num2, "num2");
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
    >
      <Spin spinning={modalLoading}>
        <Form
          ref={refForm}
          rules={rules}
          labelWidth={80}
          onChange={props.type && props.type == "nys" ? onFormChange : () => {}}
        >
          <Row>
            <Col span={24}>
              <Form.Field label={`班次名称`} name="name" required>
                <Input
                  disabled={props.type && props.type == "nys" && props.identity}
                />
              </Form.Field>
            </Col>

            <Col span={24}>
              <Form.Field label={`班次类别`} name="shiftType" required>
                <Select
                  disabled={props.type && props.type == "nys" && props.identity}
                >
                  {shiftList.map((item: any, index: number) => (
                    <Select.Option key={index} value={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`上班时间`} name="workTime" required>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`标准工时`} name="effectiveTime" required>
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`颜色标记`} name="nameColor" required>
                <Select>
                  {colorList.map((item: any, index: number) => (
                    <Select.Option key={index} value={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`启用状态`} name="status">
                <SwitchField />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
}
const Wrapper = styled.div``;
