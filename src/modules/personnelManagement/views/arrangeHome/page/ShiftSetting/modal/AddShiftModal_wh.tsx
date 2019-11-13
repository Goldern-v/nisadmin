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
import emitter from "src/libs/ev";

const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  editData?: any;
}

/** 设置规则 */
const rules: Rules = {
  name: val => !!val || "请填写班次名称",
  shiftType: val => !!val || "请填写班次类别"
  // workTime: (val) => !!val || '请填写上班时间',
  // effectiveTime: (val) => !!val || '请填写标准工时',
  // nameColor: (val) => !!val || '请填写颜色标记'
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

    emitter.emit("获取选中班次列表", (shiftList: any) => {
      // message.success('保存排班班次设置')
      console.log("获取选中班次", shiftList);
      let data = {
        ...(props.editData || {}),
        ...value,
        shiftTypeNo: shiftList[shiftList.length - 1].shiftTypeNo + 1
      };
      console.log(
        shiftList[shiftList.length - 1],
        "shiftList[shiftList.length - 1]"
      );
      data.deptCode = authStore.selectedDeptCode;
      /** 保存接口 */
      arrangeService.schShiftSettingSaveOrUpdate(data).then((res: any) => {
        message.success("保存成功");
        props.onOkCallBack && props.onOkCallBack();
        onCancel();
      });
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
              effectiveTime: "0",
              nameColor: "",
              status: true
            });
          }
        });
    }
  }, [visible]);

  const onFormChange = (name: string, value: any, form: Form<any>) => {
    if (name == "shiftType" && value == "休假") {
      form.setField("workTime", "");
      form.setField("effectiveTime", "");
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
          onChange={onFormChange}
        >
          <Row>
            <Col span={24}>
              <Form.Field label={`班次名称`} name="name" required>
                <Input />
              </Form.Field>
            </Col>

            <Col span={24}>
              <Form.Field label={`班次类别`} name="shiftType" required>
                <Select>
                  {shiftList.map((item: any, index: number) => (
                    <Select.Option key={index} value={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`上班时间`} name="workTime">
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`标准工时`} name="effectiveTime">
                <Input />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`颜色标记`} name="nameColor">
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
