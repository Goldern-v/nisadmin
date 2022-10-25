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
  message,
  InputNumber,
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
  clickType:string,
}


export default function AddShiftModal(props: Props) {
  const [title, setTitle] = useState('添加班次');
  const [shiftList, setShiftList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [backgroundColorList, setBackgroundColorList] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [tip, setTip] = useState(false);
  const [holiday, setHoliday] = useState<boolean>(false)
  const [isSpecial, setSpecial] = useState<boolean>(false)
/** 设置规则 */
let rules: Rules
switch (appStore.HOSPITAL_ID) {  
  case 'hj':
    rules = {
      name: (val) => !!val || "请填写班次名称",
      shiftType: (val) => !!val || "请填写班次类别",
      // workTime: val => !!val || "请填写上班时间",
      workTime1: (val) => !!val || "请填写上班开始时间",
      workTime2: (val) => !!val || "请填写上班结束时间",
      effectiveTime: (val) => !!val || "请填写标准工时",
      nameColor: (val) => !!val || "请填写颜色标记",
    }
    break;
  case 'lcey':
    rules = {
      name: (val) => !!val || "请填写班次名称",
      shiftType: (val) => !!val || "请填写班次类别",
      workTime1: (val) => !!val || "请填写上班开始时间",
      workTime2: (val) => !!val || "请填写上班结束时间",
      workTime5: (val) => !!val || "请填写上班开始时间",
      workTime6: (val) => !!val || "请填写上班结束时间",
      effectiveTime: (val) => (!!val || val == "0" ? "" : "请填写标准工时"),
      winterEffectiveTime: (val) => (!!val || val == "0" ? "" : "请填写标准工时"),
    };
    break;
    case 'nfzxy':
      rules = {
        name: (val) => !!val || "请填写班次名称",
        shiftType: (val) => !!val || "请填写班次类别",
        // workTime: val => !!val || "请填写上班时间",
        workTime1: (val) => !!val || "请填写上班开始时间",
        workTime2: (val) => !!val || "请填写上班结束时间",
        effectiveTime: (val) => (!!val || val == "0" ? "" : "请填写标准工时"),
      }
      holiday && (rules = {})
    break;
  default:
    rules = {
      name: (val) => !!val || "请填写班次名称",
      shiftType: (val) => !!val || "请填写班次类别",
      // workTime: val => !!val || "请填写上班时间",
      workTime1: (val) => !!val || "请填写上班开始时间",
      workTime2: (val) => !!val || "请填写上班结束时间",
      effectiveTime: (val) => (!!val || val == "0" ? "" : "请填写标准工时"),
    }
    break;
    
}


  // 聊城二院-冬夏令 计算时间
  const [time1, setTime1] = useState(0)
  const [time2, setTime2] = useState(0)
  const [time3, setTime3] = useState(0)
  const [time4, setTime4] = useState(0)
  // 白小时
  const [summer_daytime, setSummer_daytime] = useState(0)
  const [summer_nightTime, setSummer_nightTime] = useState(0)
  const [winter_daytime, setWinter_daytime] = useState(0)
  const [winter_nightTime, setWinter_nightTime] = useState(0)



  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();

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

  // 聊城二院 冬令时
  const winterTime = (time: string) => {
    const [timeRange, timeRange2] = time.split(";");
    const [workTime5, workTime6] = (timeRange || "").split("-");
    const [workTime7, workTime8] = (timeRange2 || "").split("-");
    return {
      workTime5: workTime5 ? moment(workTime5, "HH:mm") : undefined,
      workTime6: workTime6 ? moment(workTime6, "HH:mm") : undefined,
      workTime7: workTime7 ? moment(workTime7, "HH:mm") : undefined,
      workTime8: workTime8 ? moment(workTime8, "HH:mm") : undefined,
    };
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

  const onSave = async () => {
    if (appStore.HOSPITAL_ID == 'jmfy' && !authStore.isDepartment) {
      message.warning("没有权限修改");
      return
    }
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    let data = { ...(props.editData || {}), ...value };
    data.deptCode = authStore.selectedDeptCode;
    data.settingMorningHour
      ? data.settingMorningHour
      : (data.settingMorningHour = 0);
    data.settingNightHour ? data.settingNightHour : (data.settingNightHour = 0);
    if (appStore.HOSPITAL_ID === 'lcey') {
      data.settingWinNightHour ? data.settingWinNightHour : (data.settingWinNightHour = 0);
      data.settingWinMorningHour ? data.settingWinMorningHour : (data.settingWinMorningHour = 0);
      data.winWorkTime = getTimeStr(
        data.workTime5,
        data.workTime6,
        data.workTime7,
        data.workTime8
      );
      delete data.workTime5;
      delete data.workTime6;
      delete data.workTime7;
      delete data.workTime8;
    }
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
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if(props.clickType==='editForm')  setTitle('编辑班次')//同步更改弹窗标题
    if (refForm.current && visible) {
      setModalLoading(true);
      let from = refForm.current;
      service.commonApiService
        .multiDictInfo(["sch_range_shift_type", "sch_range_color", "sch_background_color"])
        .then((res) => {
          setShiftList(res.data.sch_range_shift_type);
          setColorList(res.data.sch_range_color);
          setBackgroundColorList(res.data.sch_background_color);
          setModalLoading(false);
          if (props.editData) {
            from!.setFields(Object.assign({
              name: props.editData.name,
              shiftType: props.editData.shiftType,
              // workTime: props.editData.workTime,
              ...parsingTime(props.editData.workTime),
              effectiveTime: props.editData.effectiveTime,
              winterEffectiveTime: props.editData.winterEffectiveTime,
              nameColor: props.editData.nameColor,
              status: props.editData.status,
              rangeLimit: props.editData.rangeLimit,
              settingNightHour: props.editData.settingNightHour,
              settingMorningHour: props.editData.settingMorningHour,
              coefficient: props.editData.coefficient,
              backgroundColor: props.editData.backgroundColor,
              npProportion: props.editData.npProportion == 1 ? '1' : '0',
              deductionDay: props.editData.deductionDay
            }, appStore.HOSPITAL_ID === 'lcey' ? {
              ...winterTime(props.editData.winWorkTime),
              settingWinNightHour: props.editData.settingWinNightHour,
              settingWinMorningHour: props.editData.settingWinMorningHour
            } : {}));
          } else {
            /** 表单数据初始化 */
            from!.setFields(Object.assign({
              name: "",
              shiftType: "",
              workTime1: moment("8:00", "HH:mm"),
              workTime2: moment("12:00", "HH:mm"),
              workTime3: moment("14:00", "HH:mm"),
              workTime4: moment("18:00", "HH:mm"),
              effectiveTime: "8",
              winterEffectiveTime: '8',
              nameColor: ['whyx','whhk'].includes(appStore.HOSPITAL_ID) ? '#333333' : "",
              status: true,
              rangeLimit: "",
              settingNightHour: "0",
              settingMorningHour: appStore.HOSPITAL_ID == 'lcey' ? "8" : '0',
              coefficient: "",
              backgroundColor: "#ffffff",
              npProportion: "0",
              deductionDay: "0",
            }, appStore.HOSPITAL_ID === 'lcey' ? {
              workTime5: moment("8:00", "HH:mm"),
              workTime6: moment("12:00", "HH:mm"),
              workTime7: moment("14:00", "HH:mm"),
              workTime8: moment("17:30", "HH:mm"),
              settingWinNightHour: '0',
              settingWinMorningHour: '7.5'
            } : {}));
          }
        });
    }
  }, [visible]);
  if (appStore.HOSPITAL_ID === 'lcey') {
    useLayoutEffect(()=>{
      const from = refForm.current;
      // 如果是添加班次，就计算时间工时总和  如果是编辑，直接显示后端返回的值
      if(from&&props.clickType==='addForm') {
        if ((time1 !== 0 && time2 !== 0 )) {
          from.setField("effectiveTime", (time1 + time2).toFixed(2));
        }
        if((time3 !== 0 && time4 !== 0)){
          from.setField("winterEffectiveTime", (time3 + time4).toFixed(2));
        }
        // 聊城二院-冬夏白夜小时计算
        if (time1 !== 0 && summer_daytime !== 0) {
          from.setField("settingMorningHour", (time1 + summer_daytime).toFixed(2))
        }
        from.setField("settingNightHour", summer_nightTime.toFixed(2))
        if (time3 !== 0 && winter_daytime !== 0) {
          from.setField("settingWinMorningHour", (time3 + winter_daytime).toFixed(2))
        }
        from.setField("settingWinNightHour", winter_nightTime.toFixed(2))
      } 
    },[time1,time2,time3,time4])

      
  }
  const onFormChange = (name: string, value: any, form: Form<any>) => {
    if (name == 'shiftType') {
      setHoliday(['nfzxy'].includes(appStore.HOSPITAL_ID) && value=='休假')
      setSpecial(value == '例假')
      let num = form.getField('deductionDay')
      form.setField('deductionDay',(value == '例假' && num == 0) ? 1.5 : 0)
    }
    if (name == 'deductionDay') {
      let num = (value || 0) / 0.5
      if (num.toString().indexOf('.') != -1) {
        form.setField('deductionDay',Math.floor(num)*0.5)
      }
    }
    if (appStore.HOSPITAL_ID === "lcey") {
      if (["workTime1", "workTime2", "workTime3", "workTime4"].includes(name)) {
        const { workTime1, workTime2, workTime3, workTime4 } = form.getFields();
        setTime1(workTime1 && workTime2 ? workTime2.diff(workTime1, "h",true) : 0)
        setTime2(workTime3 && workTime4 ? workTime4.diff(workTime3, "h",true) : 0)

        let summer_nightTime = workTime4 && workTime4.diff(moment("18:00", "HH:mm"), "h", true)
        if (summer_nightTime >= 0) { 
          setSummer_daytime(workTime3 ? moment("18:00", "HH:mm").diff(workTime3, "h", true) : 0)
          setSummer_nightTime(workTime4 ? summer_nightTime : 0)
        } else{
          setSummer_daytime(workTime3 && workTime4 ? workTime4.diff(workTime3, "h",true) : 0)
          setSummer_nightTime(0)
        }
      }
      if (["workTime5", "workTime6", "workTime7", "workTime8"].includes(name)) {
        const { workTime5, workTime6, workTime7, workTime8 } = form.getFields();
        setTime3(workTime5 && workTime6 ? workTime6.diff(workTime5, "h",true) : 0)
        setTime4(workTime7 && workTime8 ? workTime8.diff(workTime7, "h",true) : 0)
        
        let winter_nightTime = workTime8 && workTime8.diff(moment("17:30", "HH:mm"), 'h', true)
        if (winter_nightTime >= 0) {
          setWinter_daytime(workTime7 ? moment("17:30", "HH:mm").diff(workTime7, "h", true) : 0)
          setWinter_nightTime(workTime8 ? winter_nightTime : 0)
        } else {
          setWinter_daytime(workTime7 && workTime8 ? workTime8.diff(workTime7, "h",true) : 0)
          setWinter_nightTime(0)
        }
      }
      // if (name === 'effectiveTime') {
      //   const { effectiveTime } = form.getFields();
      //   if (effectiveTime) setTip(false)
      //   else setTip(true)
      // }
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
      maskClosable={appStore.HOSPITAL_ID === "lcey" ? false : true}
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
              <Col span={24}>
                <Form.Field label={`班次名称`} name="name" required>
                  <Input
                    disabled={
                      props.type && props.type == "nys" && props.identity
                    }
                  />
                </Form.Field>
              </Col>

              <Col span={24}>
                <Form.Field label={`班次类别`} name="shiftType" required>
                  <Select
                    disabled={
                      props.type && props.type == "nys" && props.identity
                    }
                  >
                    {shiftList.map((item: any, index: number) => (
                      <Select.Option key={index} value={item.code}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Field>
              </Col>
              {['whyx','whhk'].includes(appStore.HOSPITAL_ID) && (
                <Col span={24}>
                  <Form.Field label={`班次岗位系数`} name="coefficient">
                    {/* <Input/> */}
                    <InputNumber min={0} max={9.99} step={0.01} precision={2} />
                  </Form.Field>
                </Col>
              )}
              {/*<div style={tips}>例如：多个上班时间段可用;隔开，如08:00-12:00;02:00-18:00</div>*/}
              {/* 时间段1 */}
              <Col span={13}>
                <Form.Field label={appStore.HOSPITAL_ID == "lcey" ? `夏令上班时间` : '上班时间'} name="workTime1" required={(['nfzxy'].includes(appStore.HOSPITAL_ID) && holiday)?false:true}>
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
              <Col span={13} style={{ paddingLeft: "120px" }}>
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
              {appStore.HOSPITAL_ID == "lcey" &&
                <React.Fragment>
                  <Col span={13}>
                    <Form.Field label={`冬令上班时间`} name="workTime5" required>
                      <TimePicker format={"HH:mm"} />
                    </Form.Field>
                  </Col>
                  <Col span={1}>
                    <div style={{ marginLeft: '-5px', lineHeight: "32px", textAlign: "center" }}>-</div>
                  </Col>
                  <Col span={8}>
                    <Form.Field name="workTime6" required>
                      <TimePicker format={"HH:mm"} />
                    </Form.Field>
                  </Col>
                  {/* 时间段2 */}
                  <Col span={13} style={{ paddingLeft: "120px" }}>
                    <Form.Field name="workTime7" required>
                      <TimePicker format={"HH:mm"} />
                    </Form.Field>
                  </Col>
                  <Col span={1}>
                    <div style={{ marginLeft: '-5px', lineHeight: "32px", textAlign: "center" }}>-</div>
                  </Col>
                  <Col span={8}>
                    <Form.Field name="workTime8" required>
                      <TimePicker format={"HH:mm"} />
                    </Form.Field>
                  </Col>
                  {/* {tip && <Col span={24}>
                    <div style={{ fontSize: "12px", margin: '-18px 0 0 120px', color: "red" }}>*注意：夏令时和冬令时上班时长不同，需求手动填写标准工时！</div>
                  </Col>} */}
                </React.Fragment>}
              {
                appStore.hisMatch({
                  map: {
                    lcey: <div>
                      <Col span={24}>
                        <Form.Field label={`夏标准工时`} name="effectiveTime" required>
                          <Input />
                        </Form.Field>
                      </Col>
                      <Col span={24}>
                        <Form.Field label={`冬标准工时`} name="winterEffectiveTime" required>
                          <Input />
                        </Form.Field>
                      </Col>
                    </div>,
                    other: <div>
                      <Col span={24}>
                        <Form.Field label={`标准工时`} name="effectiveTime" required>
                          <Input />
                        </Form.Field>
                      </Col>
                    </div>
                  }
                })
              }
              {/* <Col span={24}>
                <Form.Field label={`夏标准工时`} name="effectiveTime" required>
                  <Input />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`冬标准工时`} name="winterEffectiveTime" required>
                  <Input />
                </Form.Field>
              </Col> */}
              <Col span={24}>
                <Form.Field label={appStore.HOSPITAL_ID == "lcey" ? '夏令白工时' : `白工时`} name="settingMorningHour">
                  <Input />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={appStore.HOSPITAL_ID == "lcey" ? '夏令夜工时' : `夜工时`} name="settingNightHour">
                  <Input />
                </Form.Field>
              </Col>
              {appStore.HOSPITAL_ID === 'lcey' && <div>
                <Col span={24}>
                  <Form.Field label={`冬令白工时`} name="settingWinMorningHour">
                    <Input />
                  </Form.Field>
                </Col>
                <Col span={24}>
                  <Form.Field label={`冬令夜工时`} name="settingWinNightHour">
                    <Input />
                  </Form.Field>
                </Col>
              </div>}
              {['whyx','whhk'].includes(appStore.HOSPITAL_ID) &&
                <Col span={24}>
                  <Form.Field label={`列入患者比`} name="npProportion">
                    <Select>
                      <Select.Option value={"1"}>是</Select.Option>
                      <Select.Option value={"0"}>否</Select.Option>
                    </Select>
                  </Form.Field>
                </Col>
              }
              {['whyx', 'fssdy','whhk'].includes(appStore.HOSPITAL_ID) &&
                <React.Fragment>
                  <Col span={12} className="color-lump">
                    <Form.Field label={`色块标记`} name="backgroundColor">
                      <Select>
                        {backgroundColorList.map((item: any, index: number) => (
                          <Select.Option key={index} value={item.code}>
                            <div
                              className="block-color"
                              style={{ ...blockColor, background: item.code }}
                            >
                              <span style={{ opacity: 0 }}>{item.name}</span>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                  <Col span={12} className="color-lump">
                    <Form.Field label={`文字颜色`} name="nameColor">
                      <Select>
                        {colorList.map((item: any, index: number) => (
                          <Select.Option key={index} value={item.code}>
                            <div
                              className="block-color"
                              style={{ ...blockColor, background: item.code }}
                            >
                              <span style={{ opacity: 0 }}>{item.name}</span>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>
                  </Col>
                </React.Fragment>
              }
              {!['whyx', 'fssdy','whhk'].includes(appStore.HOSPITAL_ID) &&
                <Col span={24}>
                  <Form.Field
                    label={`颜色标记`}
                    name="nameColor"
                    required={appStore.HOSPITAL_ID == "hj"}
                  >
                    <Select>
                      {
                        ['nfzxy'].includes(appStore.HOSPITAL_ID) && <Select.Option value="">
                          无
                        </Select.Option>
                      }
                      {colorList.map((item: any, index: number) => (
                        <Select.Option key={index} value={item.code}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Field>
                </Col>
              }
              {
                appStore.hisMatch({
                  map: {
                    'sdlj,nfsd': isSpecial && <React.Fragment>
                      <Col span={24}>
                        <Form.Field label={`扣减天数`} name="deductionDay">
                          <InputNumber min={0.5} step={0.5} precision={1} />
                        </Form.Field>
                      </Col>
                    </React.Fragment>,
                    other: ''
                  },
                  vague:true
                })
              }
              {appStore.HOSPITAL_ID == "nys" && (
                <Col span={24}>
                  <Form.Field label={`周班次数`} name="rangeLimit">
                    <Input />
                  </Form.Field>
                </Col>
              )}
              <Col span={24}>
                <Form.Field label={`启用状态`} name="status">
                  <SwitchField />
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
