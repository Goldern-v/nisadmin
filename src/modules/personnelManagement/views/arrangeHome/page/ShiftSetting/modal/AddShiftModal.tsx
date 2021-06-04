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
  TimePicker,
  message
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import service from "src/services/api";
import { Spin, Switch } from "src/vendors/antd";
import { authStore, appStore } from "src/stores";
import SwitchField from "src/components/Swich";
import { arrangeService } from "../../../services/ArrangeService";
import moment from "moment";

const Option = Select.Option;

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  editData?: any;
  type?: any; // 区分医院（吴敏）
  identity?: any; // 区分登陆者身份（吴敏）
}

/** 设置规则 */
const rules: Rules =
  appStore.HOSPITAL_ID == "hj"
    ? {
      name: val => !!val || "请填写班次名称",
      shiftType: val => !!val || "请填写班次类别",
      // workTime: val => !!val || "请填写上班时间",
      workTime1: val => !!val || "请填写上班开始时间",
      workTime2: val => !!val || "请填写上班结束时间",
      effectiveTime: val => !!val || "请填写标准工时",
      nameColor: val => !!val || "请填写颜色标记"
    }
    : {
      name: val => !!val || "请填写班次名称",
      shiftType: val => !!val || "请填写班次类别",
      // workTime: val => !!val || "请填写上班时间",
      workTime1: val => !!val || "请填写上班开始时间",
      workTime2: val => !!val || "请填写上班结束时间",
      effectiveTime: val => (!!val || val == "0" ? "" : "请填写标准工时")
    };

export default function AddShiftModal(props: Props) {
  const [title, setTitle] = useState("添加班次");
  const [shiftList, setShiftList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();

  const parsingTime = (time: string) => {
    const [timeRange, timeRange2] = time.split(';')
    const [workTime1, workTime2] = (timeRange || '').split('-')
    const [workTime3, workTime4] = (timeRange2 || '').split('-')
    return {
      workTime1: moment(workTime1, 'HH:mm'),
      workTime2: moment(workTime2, 'HH:mm'),
      workTime3: workTime3 ? moment(workTime3, 'HH:mm') : undefined,
      workTime4: workTime4 ? moment(workTime4, 'HH:mm') : undefined,
    }
  }

  const getTimeStr = (time1: moment.Moment, time2: moment.Moment, time3?: moment.Moment, time4?: moment.Moment) => {
    let str = time1.format('HH:mm') + '-' + time2.format('HH:mm')
    if (time3 && time4) {
      str += ';' + time3.format('HH:mm') + '-' + time4.format('HH:mm')
    }
    return str
  }

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    let data = { ...(props.editData || {}), ...value };
    data.deptCode = authStore.selectedDeptCode;
    data.settingMorningHour
      ? data.settingMorningHour
      : (data.settingMorningHour = 0);
    data.settingNightHour ? data.settingNightHour : (data.settingNightHour = 0);
    data.deptCode = authStore.selectedDeptCode;
    data.workTime = getTimeStr(data.workTime1, data.workTime2, data.workTime3, data.workTime4)
    delete data.workTime1
    delete data.workTime2
    delete data.workTime3
    delete data.workTime4
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
              // workTime: props.editData.workTime,
              ...parsingTime(props.editData.workTime),
              effectiveTime: props.editData.effectiveTime,
              nameColor: props.editData.nameColor,
              status: props.editData.status,
              rangeLimit: props.editData.rangeLimit,
              settingNightHour: props.editData.settingNightHour,
              settingMorningHour: props.editData.settingMorningHour,
            });
          } else {
            /** 表单数据初始化 */
            from!.setFields({
              name: "",
              shiftType: "",
              workTime1: moment('8:00', 'HH:mm'),
              workTime2: moment('16:00', 'HH:mm'),
              workTime3: undefined,
              workTime4: undefined,
              effectiveTime: "8",
              nameColor: "",
              status: true,
              rangeLimit: "",
              settingNightHour: "0",
              settingMorningHour: "0",
            });
          }
        });
    }
  }, [visible]);


  const onFormChange = (name: string, value: any, form: Form<any>) => {
    // 之前有的标准工时计算 现在有两个时间段不自动计算
    /*if (name === "workTime") {
      let hour: any = 0;
      let min: any = 0;
      let index: any = value.indexOf("-");
      let num1: any = value.substring(0, index).trim();
      let index1: any = num1.indexOf(":");
      let hour1: any = Number(num1.substring(0, index1).trim());
      let min1: any = Number(num1.substring(index1 + 1, num1.length)) || 0;
      let num2: any = value.substring(index + 1, value.length) || 0;
      let index2: any = num2.indexOf(":");
      let hour2: any = Number(num2.substring(0, index2)) || 0;
      let min2: any = Number(num2.substring(index2 + 1, num2.length)) || 0;
      if (12 <= hour2 && hour2 <= 14) {
        hour = 12 - hour1;
      } else {
        hour = hour2 - hour1;
      }
      if (min2 >= min1) {
        min = min2 - min1;
      } else if (min2 < min1) {
        hour = hour - 1;
        min = 60 + min2 - min1;
      }
      form.setField("effectiveTime", min === 0 ? hour : `${hour}.${min}`);
      // console.log(`${hour}.${min}`, "计算结果");
    }*/
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
          onChange={props.type && props.type == "nys" ? onFormChange : () => {
          }}
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
            {/*<div style={tips}>例如：多个上班时间段可用;隔开，如08:00-12:00;02:00-18:00</div>*/}
            {/* 时间段1 */}
            <Col span={12}>
              <Form.Field label={`上班时间`} name="workTime1" required>
                <TimePicker format={'HH:mm'}/>
              </Form.Field>
            </Col>
            <Col span={1}>
              <div style={{ lineHeight: '32px', textAlign: 'center' }}>-</div>
            </Col>
            <Col span={8}>
              <Form.Field name="workTime2" required>
                <TimePicker format={'HH:mm'}/>
              </Form.Field>
            </Col>
            {/* 时间段2 */}
            <Col span={12} style={{ paddingLeft: '100px' }}>
              <Form.Field name="workTime3" required>
                <TimePicker format={'HH:mm'}/>
              </Form.Field>
            </Col>
            <Col span={1}>
              <div style={{ lineHeight: '32px', textAlign: 'center' }}>-</div>
            </Col>
            <Col span={8}>
              <Form.Field name="workTime4" required>
                <TimePicker format={'HH:mm'}/>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`标准工时`} name="effectiveTime" required>
                <Input/>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`白工时`} name="settingMorningHour">
                <Input/>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`夜工时`} name="settingNightHour">
                <Input/>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field
                label={`颜色标记`}
                name="nameColor"
                required={appStore.HOSPITAL_ID == "hj"}
              >
                <Select>
                  {colorList.map((item: any, index: number) => (
                    <Select.Option key={index} value={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            {appStore.HOSPITAL_ID == "nys" &&
            <Col span={24}>
              <Form.Field label={`周班次数`} name="rangeLimit">
                <Input/>
              </Form.Field>
            </Col>
            }
            <Col span={24}>
              <Form.Field label={`启用状态`} name="status">
                <SwitchField/>
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
}
const tips = {
  "padding-left": "100px",
  "font-size": "10px",
  "color": "red"
}

const Wrapper = styled.div``;
