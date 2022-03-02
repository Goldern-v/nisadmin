import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import {
  Modal,
  Input,
  Select,
  Row,
  Col,
  message,
  DatePicker,
  InputNumber,
  TimePicker
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import { Spin } from "src/vendors/antd";
import { authStore, appStore } from "src/stores";
import { arrangeService } from "../../../services/ArrangeService";
import moment from "moment";

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  editData?: any; //表单数据
}

/** 设置规则 */
let rules: Rules = {
  // empNo: (val) => !!val || "请填写工号",
  statusType: (val) => !!val || "请选择班次类型",
  workDate: (val) => !!val || "请选择加减班日期",
  startDate: (val) => !!val || "请选择开始日期",
  endDate: (val) => !!val || "请选择结束日期",
}

let type = [
  {
    value: '1',
    lable: "加班"
  },
  {
    value: '2',
    lable: "减班"
  }
]
interface statusType {
  value: string,
  lable: string
}
export default function AddSubClassModalModal(props: Props) {
  const [title, setTitle] = useState("添加加减班");
  const [modalLoading, setModalLoading] = useState(false);
  const [tip, setTip] = useState(false);
  const [statusTypeList, setStatusTypeList] = useState<statusType[]>(type)
  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();


  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    /** 保存接口 */
    value.workDate = moment(value.workDate).format("YYYY-MM-DD")
    value.startDate = moment(value.startDate).format("YYYY-MM-DD HH:mm")
    value.endDate = moment(value.endDate).format("YYYY-MM-DD HH:mm")
    value.empNo = authStore.user && authStore.user.empNo
    if (props.editData) {
      value.id = props.editData.id
    }
    arrangeService.expectAddOrSub(value).then((res: any) => {
      message.success("保存成功");
      props.onOkCallBack && props.onOkCallBack();
      onCancel();
    });
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      let form = refForm.current;
      if (props.editData) {
        setTitle('修改加减班')
        form!.setFields({
          empNo: props.editData.empNo,
          statusType: props.editData.statusType,
          workDate: moment(props.editData.workDate),
          startDate: moment(props.editData.startDate),
          endDate: moment(props.editData.endDate),
          hour: props.editData.hour,
          settingNightHour: props.editData.settingNightHour,
          settingMorningHour: props.editData.settingMorningHour,
          remark: props.editData.remark,
        });
      } else {
        /** 表单数据初始化 */
        form!.setFields({
          workDate: moment()
        });
      }
    }
  }, [visible]);
  const onFormChange = (name: string, value: any, form: Form<any>) => {
    if (["startDate", "endDate"].includes(name)) {
      const { startDate, endDate } = form.getFields();
      const m = startDate && endDate ? endDate.diff(startDate, "m") : 0;
      const h = Math.floor(m / 30) * 0.5;
      form.setFields({
        hour: h
      });
    }
  }
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
    >
      <Wrapper>
        <Spin spinning={modalLoading}>
          <Form
            ref={refForm}
            rules={rules}
            labelWidth={100}
            onChange={onFormChange}
          >
            <Row>
              {/* <Col span={24}>
                <Form.Field label={`工号`} name="empNo" required>
                  <Input />
                </Form.Field>
              </Col> */}
              <Col span={24}>
                <Form.Field label={`班次类型`} name="statusType" required>
                  <Select>
                    {
                      statusTypeList.map((item: statusType) => {
                        return <Select.Option value={item.value}>
                          {item.lable}
                        </Select.Option>
                      })
                    }
                  </Select>
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`加减班日期`} name="workDate" required>
                  <DatePicker />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`开始时间`} name="startDate" required>
                  <TimePicker format={"HH:mm"} />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`结束时间`} name="endDate" required>
                  <TimePicker format={"HH:mm"} />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`工时`} name="hour">
                  <InputNumber />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`夜工时`} name="settingNightHour">
                  <InputNumber />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`白工时`} name="settingMorningHour">
                  <InputNumber />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`备注`} name="remark">
                  <Input.TextArea style={{ height: 80, resize: "none" }} />
                </Form.Field>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Wrapper>
    </Modal>
  );
}
const tips = {
  "padding-left": "100px",
  "font-size": "10px",
  color: "red",
};
const blockColor = {
  margin: "-5px -12px",
  padding: "5px 17px",
  color: "#fff",
};
const Wrapper = styled.div`
  .color-lump{
    .ant-select-selection__rendered {
      margin-left: 0;
    }
    .ant-select-selection-selected-value {
      width: 100%;
      padding-right: 28px;
    }
  }
`;
