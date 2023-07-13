import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  Input,
  Radio,
  Select,
  Row,
  Col,
  message, TimePicker, InputNumber
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import service from "src/services/api";
import { Spin, Switch } from "src/vendors/antd";
import {appStore, authStore} from "src/stores";
import SwitchField from "src/components/Swich";
import { arrangeService } from "../../../services/ArrangeService";
import emitter from "src/libs/ev";
import moment from "moment";

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  editData?: any;
}

/** 设置规则 */
const rules: Rules = {
  name: val => !!val || "请填写班次名称",
  shiftType: val => !!val || "请填写班次类别",
  ...appStore.hisMatch({
    map: {
      qhwy: {},
      other: {
        workTime1: (val: any) => !!val || "请填写上班开始时间",
        workTime2: (val: any) => !!val || "请填写上班结束时间",
      }
    }
  })
  // workTime: (val) => !!val || '请填写上班时间',
  // effectiveTime: (val) => !!val || '请填写标准工时',
  // nameColor: (val) => !!val || '请填写颜色标记'
};

/**隐藏责护 */
const HIDE_ZH = ['dghm','dglb'].includes(appStore.HOSPITAL_ID)
/** 是否显示班次系数 */
const isYtll = 'ytll' === appStore.HOSPITAL_ID
const isYtllText = 'ytll'
export default function AddShiftModal(props: Props) {
  const [title, setTitle] = useState("添加班次");
  const [shiftList, setShiftList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  // const [radioChange, setRadioChange] = useState("");
  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();
  // useEffect(()=>{
  //   console.log(radioChange);

  // },[radioChange])
  const parsingTime = (time: string) => {
    const [timeRange, timeRange2] = time.split(";");
    const [workTime1, workTime2] = (timeRange || "").split("-");
    const [workTime3, workTime4] = (timeRange2 || "").split("-");
    return {
      workTime1: workTime1 ? moment(workTime1, "HH:mm") : undefined,
      workTime2: workTime2 ? moment(workTime2, "HH:mm") : undefined,
      workTime3: workTime3 ? moment(workTime3, "HH:mm") : undefined,
      workTime4: workTime4 ? moment(workTime4, "HH:mm") : undefined,
    };
  };
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
        //shiftTypeNo: shiftList[0].shiftTypeNo - 1,
        shiftTypeNo: shiftList && shiftList.length>0 ?shiftList[0].shiftTypeNo - 1 : 0,
      };
      data.settingMorningHour
        ? data.settingMorningHour
        : (data.settingMorningHour = 0);
      data.settingNightHour
        ? data.settingNightHour
        : (data.settingNightHour = 0);
      data.deptCode = authStore.selectedDeptCode;
      data.workTime = getTimeStr(
          data.workTime1,
          data.workTime2,
          data.workTime3,
          data.workTime4
      );
      delete data.workTime1;
      delete data.workTime2;
      delete data.workTime3;
      delete data.workTime4;
      /** 保存接口 */
      arrangeService.schShiftSettingSaveOrUpdate(data).then((res: any) => {
        message.success("保存成功");
        props.onOkCallBack && props.onOkCallBack();
        onCancel();
      });
    });
  };
  const getTimeStr = (
      time1?: moment.Moment,
      time2?: moment.Moment,
      time3?: moment.Moment,
      time4?: moment.Moment
  ) => {
    let str = ""
    if (time1 && time2) {
      str = time1.format("HH:mm") + "-" + time2.format("HH:mm");
    }
    if (time3 && time4) {
      str += ";" + time3.format("HH:mm") + "-" + time4.format("HH:mm");
    }
    return str;
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
              isZh: props.editData.isZh,
              ...parsingTime(props.editData.workTime),
              // workTime: props.editData.workTime,
              effectiveTime: props.editData.effectiveTime,
              settingNightHour: props.editData.settingNightHour,
              settingMorningHour: props.editData.settingMorningHour,
              nameColor: props.editData.nameColor,
              status: props.editData.status,
              coefficient: props.editData?.coefficient || 0
            });
          } else {
            /** 表单数据初始化 */
            from!.setFields({
              name: "",
              shiftType: "",
              isZh: 0,
              // workTime: "8:00 - 16:00",
              workTime1: moment("8:00", "HH:mm"),
              workTime2: moment("12:00", "HH:mm"),
              workTime3: moment("14:00", "HH:mm"),
              workTime4: moment("18:00", "HH:mm"),
              effectiveTime: "0",
              settingNightHour: "0",
              settingMorningHour: "0",
              nameColor: "",
              status: true,
              coefficient: 0
            });
          }
        });
    }
  }, [visible]);

  const onFormChange = (name: string, value: any, form: Form<any>) => {
    if (name == "shiftType" && value == "休假") {
      form.setField("workTime", "");
      form.setField("effectiveTime", 0);
      form.setField("settingNightHour", 0);
      form.setField("settingMorningHour", 0);
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
      <Wrapper>
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
              {
                !HIDE_ZH &&
                <Col span={24}>
                  <Form.Field label={`是否为责护`} name="isZh" required>
                    <Radio.Group style={{marginTop:"7px"}}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </Radio.Group>
                  </Form.Field>
                </Col>
              }

                  <Col span={13}>
                    <Form.Field label={['lcey', 'lyyz'].includes(appStore.HOSPITAL_ID) ? `夏令上班时间` : '上班时间'} name="workTime1" required={'qhwy' !== appStore.HOSPITAL_ID }>
                      <TimePicker format={"HH:mm"} />
                    </Form.Field>
                  </Col>
                  <Col span={1}>
                    <div style={{ marginLeft: '-5px', lineHeight: "32px", textAlign: "center" }}>-</div>
                  </Col>
                  <Col span={8}>
                    <Form.Field name="workTime2" required>
                      <TimePicker format={"HH:mm"} />
                    </Form.Field>
                  </Col>
                  {/* 时间段2 */}
              {
               appStore.HOSPITAL_ID !=='dglb' && <>
                    <Col span={13} style={{ paddingLeft: "100px" }}>
                      <Form.Field name="workTime3" required>
                        <TimePicker format={"HH:mm"} />
                      </Form.Field>
                    </Col>
                    <Col span={1}>
                      <div style={{ marginLeft: '-5px', lineHeight: "32px", textAlign: "center" }}>-</div>
                    </Col>
                    <Col span={8}>
                      <Form.Field name="workTime4" required>
                        <TimePicker format={"HH:mm"} />
                      </Form.Field>
                    </Col>
                  </>
              }


              {/*<Col span={24}>*/}
              {/*  <Form.Field label={`上班时间`} name="workTime">*/}
              {/*    <Input />*/}
              {/*  </Form.Field>*/}
              {/*</Col>*/}
              <Col span={24}>
                <Form.Field label={`标准工时`} name="effectiveTime">
                  <Input />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`白工时`} name="settingMorningHour">
                  <Input />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`夜工时`} name="settingNightHour">
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
              {isYtll && <Col span={24}>
                <Form.Field label={`班次系数`} name="coefficient">
                  <InputNumber min={0} />
                </Form.Field>
              </Col>}
              <Col span={24}>
                <Form.Field label={`启用状态`} name="status">
                  <SwitchField />
                </Form.Field>
              </Col>
            </Row>
          </Form>
        </Spin>
        {!HIDE_ZH && <span className="tip">(主班和护士长不是责护，其他均是责护)</span>}
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
position: relative;
  .tip {
    position: absolute;
    top: 112px;
    left: 200px;
    color: red;
  }
`;
