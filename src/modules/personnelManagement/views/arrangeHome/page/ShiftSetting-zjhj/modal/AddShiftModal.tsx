import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import {
  Modal,
  Input,
  Select,
  Row,
  Col,
  TimePicker,
  message,
  Icon,
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import service from "src/services/api";
import { Spin } from "src/vendors/antd";
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
  clickType: string;
}

export default function AddShiftModal(props: Props) {
  const [title, setTitle] = useState("添加班次");
  const [shiftList, setShiftList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [nodeList, setNodeList] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const pathName:boolean = appStore.location.pathname.includes('/ShiftSettingViewNewZJHJ')
  /** 设置规则 */
  let rules: Rules;
  rules = {
    name: (val) => !!val || "请填写班次名称",
    shiftType: (val) => !!val || "请填写班次类别",
    // workTime: val => !!val || "请填写上班时间",
    workTime1: (val) => !!val || "请填写上班开始时间",
    workTime2: (val) => !!val || "请填写上班结束时间",
    effectiveTime: (val) => (!!val || val == "0" ? "" : "请填写标准工时"),
  };

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
  const getTimeStr = (
    time1?: moment.Moment,
    time2?: moment.Moment,
    time3?: moment.Moment,
    time4?: moment.Moment
  ) => {
    let str = "";
    if (time1 && time2) {
      str = time1.format("HH:mm") + "-" + time2.format("HH:mm");
    }
    if (time3 && time4) {
      str += ";" + time3.format("HH:mm") + "-" + time4.format("HH:mm");
    }
    return str;
  };

  const onSave = async () => {
    if(props.editData?.auditStatus == 1 && pathName){
      service.scheduleShiftApiService.cancelZJHJ(props.editData.id)
      .then(res => {
        message.success(`撤销${props.editData.name}成功`);
        props.onOkCallBack && props.onOkCallBack();
        onCancel();
      });
    }else{
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
      data.workTime = getTimeStr(
        data.workTime1,
        data.workTime2,
        data.workTime3,
        data.workTime4
      );
      data.moduleCode = "RANGE_SETTING";
      data.auditStatus = 1;
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
    }
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (props.clickType === "editForm") setTitle("查看编辑"); //同步更改弹窗标题
    if (refForm.current && visible) {
      setModalLoading(true);
      let from = refForm.current;
      service.commonApiService
        .multiDictInfo([
          "sch_range_shift_type",
          "sch_range_color",
          "sch_background_color",
        ])
        .then((res) => {
          setShiftList(res.data.sch_range_shift_type);
          setColorList(res.data.sch_range_color);
          setModalLoading(false);
          if (props.editData) {
            from!.setFields(
              Object.assign(
                {
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
                  npProportion: props.editData.npProportion == 1 ? "1" : "0",
                  deductionDay: props.editData.deductionDay,
                  days: props.editData.days /*925天数**/,
                },
                {}
              )
            );
          } else {
            /** 表单数据初始化 */
            from!.setFields(
              Object.assign(
                {
                  name: "",
                  shiftType: "",
                  workTime1: moment("8:00", "HH:mm"),
                  workTime2: moment("12:00", "HH:mm"),
                  workTime3: moment("14:00", "HH:mm"),
                  workTime4: moment("18:00", "HH:mm"),
                  effectiveTime: "8",
                  winterEffectiveTime: "8",
                  nameColor: "",
                  status: true,
                  rangeLimit: "",
                  settingNightHour: "0",
                  settingMorningHour: "0",
                  coefficient: "",
                  backgroundColor: "#ffffff",
                  npProportion: "0",
                  deductionDay: "0",
                  days: 1 /*925天数**/,
                },
                {}
              )
            );
          }
        });
      if (props.clickType === "editForm" && props.editData?.auditStatus != 0) {
        service.scheduleShiftApiService.getDetailZJHJ(props.editData.id).then((res)=>{
          if(res.code == 200){
            setNodeList(res.data.nodeList)
          }
        })
      }
      
    }

    return ()=>{
      setNodeList([])
    }
  }, [visible]);
  const onFormChange = (name: string, value: any, form: Form<any>) => {
    if (name == "shiftType") {
      let num = form.getField("deductionDay");
      form.setField("deductionDay", value == "例假" && num == 0 ? 1.5 : 0);
    }
    if (name == "deductionDay") {
      let num = (value || 0) / 0.5;
      if (num.toString().indexOf(".") != -1) {
        form.setField("deductionDay", Math.floor(num) * 0.5);
      }
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okButtonProps={{ disabled: pathName && props.editData?.auditStatus != 2 ?  false : true}}
      okText={props.editData?.auditStatus == 1 ? "撤销" : "提交审核" }
      forceRender
      maskClosable={true}
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
              {/* 天数 */}
              <Col span={13}>
                <Form.Field label={"上班时间"} name="workTime1" required>
                  <TimePicker format={"HH:mm"} />
                </Form.Field>
              </Col>
              <Col span={1}>
                <div
                  style={{
                    marginLeft: "-5px",
                    lineHeight: "32px",
                    textAlign: "center",
                  }}
                >
                  -
                </div>
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
                <div
                  style={{
                    marginLeft: "-5px",
                    lineHeight: "32px",
                    textAlign: "center",
                  }}
                >
                  -
                </div>
              </Col>
              <Col span={8}>
                <Form.Field name="workTime4" required>
                  <TimePicker format={"HH:mm"} />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={`标准工时`} name="effectiveTime" required>
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
              <Col span={24}>
                <Form.Field label={`启用状态`} name="status">
                  <SwitchField />
                </Form.Field>
              </Col>
              {
                props.clickType === "editForm" && nodeList.length &&
                <Col span={24}>
                  <div className="audit-title">审核流程</div>
                  <div>
                    {
                       nodeList.map((item:any)=>{
                        if(props.editData?.auditStatus != '1' && item.state == '0') return ''
                        else return(
                          <div className="audit-item" key={item.id}>
                            <div className="emp-img">
                              <img src={item.imgUrl} alt="" />
                              {
                                item.state == '1' &&(
                                  item.nodeCode == 'commit' || props.editData?.auditStatus == 2 ? <Icon
                                    type="check-circle"
                                    theme="filled"
                                    className="step-status success"
                                  /> : item.nodeCode == 'minister_nurse_audit' ? <Icon
                                    type="close-circle"
                                    theme="filled"
                                    className="step-status error"
                                  /> : item.nodeCode == 'withdraw' ?  <Icon
                                    type="reload"
                                    className="step-status error"
                                  />: ''
                                )
                              }
                              
                            </div>
                              <div className="info">
                                <div className="step-title">
                                  <span>{item.nodeName}</span>
                                </div>
                                {
                                  ['commit','minister_nurse_audit','withdraw'].includes(item.nodeCode) && item.state == '1' &&(
                                    <div>
                                      <div className="emp-name">{item.empName}</div>
                                      <div className="emp-name">{`
                                          ${item.handleTime}
                                        (${moment(item.handleTime).format("dddd")})`}</div>
                                    </div>
                                  )
                                }
                              </div>
                          </div>
                          )
                      })
                    }
                  </div>
                </Col>
              }
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
  .audit-title{
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 35px;
      font-weight: bold;
      ::before{
        content: '';
        margin-left: 20px ;
        display: block;
        width: 6px;
        height: 18px;
        background-color: #00a680;
      }
    }
    .audit-item{
      color: #666;
      padding-top: 40px;
      position: relative;
      &::before{
        position: absolute;
        content: '';
        width:1px;
        height: 100%;
        background: #ddd;
        top: 0;
        left: 20px;
      }
      &:first-of-type{
        padding-top:0;
      }
      &:last-of-type{
        &::before{
          height:40px;
        }
      }
      .emp-img{
        width: 40px;
        position: relative;
        float: left;
        img{
          height: 40px;
          width: 40px;
          background: #ddd;
          border-radius: 50%;
          object-fit: cover;
          display:inline-block;
          background: url('${require("src/assets/护士默认头像.png")}');
          background-size: 100%;
        }
        .step-status{
          position:absolute;
          right: 0;
          bottom: 0;
          background: #fff;
          border-radius: 50%;
          &.error{
            color: red;
          }
          &.success{
            color: rgb(2, 159, 123);
          }
        }
      }
      .info{
        font-size: 13px;
        padding-left: 45px;
        .desc{
          padding: 5px;
          border-radius: 3px;
          background: #eee;
        }
      }
    }
`;
