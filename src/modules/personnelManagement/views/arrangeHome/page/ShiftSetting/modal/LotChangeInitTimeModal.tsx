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
  message,
  InputNumber
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import service from "src/services/api";
import moment from "moment";
import { arrangeService } from "../../../services/ArrangeService";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {};
}

/** 设置规则 */
const rules: Rules = {
  startDate: val => !!val || "请填写开始日期",
  initialHour: val => !!val || "请填写班次工时",
  depts: val => !!val || "请选择科室"
};

export default function LotChangeInitTimeModal(props: Props) {
  const [title, setTitle] = useState("批量修改班次工时");
  const [deptList, setDeptList] = useState([]);

  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    let list = value.depts.map((item: string) => ({
      deptCode: item,
      startDate: value.startDate.format("YYYY-MM-DD"),
      initialHour: value.initialHour
    }));
    /** 保存接口 */
    arrangeService.schInitialHourSaveOrUpdateList({ list }).then((res: any) => {
      message.success("保存成功");
      props.onOkCallBack && props.onOkCallBack();
      onCancel();
    });
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      service.commonApiService.getNursingUnitAll().then(res => {
        setDeptList(res.data.deptList);
      });

      /** 表单数据初始化 */

      refForm!.current!.setFields({
        startDate: moment(),
        initialHour: "",
        depts: []
      });
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
    >
      <Form ref={refForm} rules={rules} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`开始时间`} name="startDate" required>
              <DatePicker />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`班次工时`} name="initialHour" required>
              <InputNumber />
            </Form.Field>
          </Col>

          <Col span={20}>
            <Form.Field label={`科室`} name="depts" required>
              <Select mode="multiple" style={{ width: "100%" }}>
                {(deptList || []).map((item: any) => {
                  return (
                    <Select.Option key={item.code} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Field>
          </Col>
          <Col span={4}>
            <Form.Field label={``} name="depts" labelWidth={1}>
              <SelectAll deptList={deptList} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

function SelectAll(props: any) {
  const { value, onChange, deptList } = props;
  let style: React.CSSProperties = {
    position: "relative",
    right: 7
  };

  if (value && value.length == deptList.length) {
    return (
      <Button onClick={() => onChange([])} style={style}>
        清空
      </Button>
    );
  } else {
  }
  return (
    <Button
      onClick={() => onChange(deptList.map((item: any) => item.code))}
      style={style}
    >
      全选
    </Button>
  );
}

const Wrapper = styled.div``;
