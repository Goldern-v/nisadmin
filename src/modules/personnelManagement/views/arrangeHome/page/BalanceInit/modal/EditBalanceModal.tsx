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
import { DictItem } from "src/services/api/CommonApiService";
import { InputNumber } from "src/vendors/antd";
import { arrangeService } from "../../../services/ArrangeService";
import moment from "moment";
import { appStore, authStore } from "src/stores";

const Option = Select.Option;

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  nurseList: any[];
  oldData?: any;
  status?: any;
}

/** 设置规则 */
const rules: Rules = {
  // publicDate: (val) => !!val || '请填写发表日期'
  // publicDate: (val) => !!val || '请填写发表日期'
  empName: val => !!val || "请选择护士",
  endDate: val => !!val || "请填写结余日期"
};

export default function EditBalanceModal(props: Props) {
  const [title, setTitle] = useState("新建结余工时");

  let { visible, onCancel, nurseList, status } = props;
  let refForm = React.createRef<Form>();

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    let data = { ...(props.oldData || {}), ...value };
    data.endDate = data.endDate.format("YYYY-MM-DD");
    data.workDate = data.endDate;
    data.startDate = moment(data.endDate)
      .startOf("week")
      .format("YYYY-MM-DD");
    const current = nurseList.find((item: any) => item.empName ==data.empName)
    data.empNo = current ? current.empNo : "";
    data.empName = current ? current.empName : "";
    data.deptCode = authStore.selectedDeptCode;
    data.deptName = authStore.selectedDeptName;

    data.publicHourNow = Number(data.publicHourNow) || 0;
    data.holidayHourNow = Number(data.holidayHourNow) || 0;
    data.balanceHourNow = Number(data.balanceHourNow) || 0;
    data.totalHoliday = Number(data.totalHoliday) || 0;

    data.maternityHourNow = Number(data.maternityHourNow) || 0;
    data.homeHourNow = Number(data.homeHourNow) || 0;
    data.toleranceHourNow = Number(data.toleranceHourNow) || 0;
    /** 保存接口 */
    arrangeService.schBalanceHourSaveOrUpdate(data).then((res: any) => {
      message.success("保存成功");
      props.onOkCallBack && props.onOkCallBack();
      onCancel();
    });
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current.weekday() != 6;
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      if (props.oldData) {
        console.log(props.oldData)
        setTitle("编辑结余工时");
        refForm!.current!.setFields({
          empName: props.oldData.empName,
          endDate: moment(props.oldData.endDate),
          publicHourNow: props.oldData.publicHourNow,
          holidayHourNow: props.oldData.holidayHourNow,
          balanceHourNow: props.oldData.balanceHourNow,
          maternityHourNow: props.oldData.maternityHourNow,
          homeHourNow: props.oldData.homeHourNow,
          toleranceHourNow: props.oldData.toleranceHourNow,
          totalHoliday: props.oldData.totalHoliday,
          periodHourNow: props.oldData.periodHourNow,
          remark: props.oldData.remark,
          status: "2" || props.oldData.status
        });
      } else {
        setTitle("新建结余工时");
        /** 表单数据初始化 */
        refForm!.current!.setFields({
          empName: "",
          endDate: null,
          publicHourNow: 0,
          holidayHourNow: 0,
          balanceHourNow: 0,
          maternityHourNow: 0,
          homeHourNow: 0,
          toleranceHourNow: 0,
          totalHoliday: 0,
          periodHourNow: 0,
          remark: "",
          status: status
        });
      }
    }
  }, [visible]);
  const onChangeSelect = (value: any) => {
    if (!!value) {
      refForm!.current!.setFields({ empName: value })
    }
  };

  const onSearchSelect = (value: any) => {
    if (!!value) {
      refForm!.current!.setFields({ empName: value })
    }
  };

  const onBlurSelect = () => {
  };
  const onFormChange = (name: string, value: any, form: Form<any>) => { 
    if (name == 'periodHourNow') {
      let num = (value || 0) / 0.5
      if (num.toString().indexOf('.') != -1) {
        form.setField('periodHourNow',Math.floor(num)*0.5)
      }
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
      centered
    >
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFormChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`护士姓名`} name="empName" required>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(e) => onChangeSelect(e)}
                onSearch={(value) => onSearchSelect(value)}
                onBlur={() => onBlurSelect()}
                disabled={props.oldData}
              >
                {(nurseList || []).map((item: any, index: number) => (
                  <Select.Option value={item.empName} key={index}>
                    {item.empName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`结余日期`} name="endDate" required>
              <DatePicker disabledDate={disabledDate}/>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`工时结余`} name="balanceHourNow">
              <InputNumber/>
            </Form.Field>
          </Col>
         
          {
            appStore.HOSPITAL_ID === 'jmfy' && (
              <Col span={24}>
                <Form.Field label={`积假结余`} name="totalHoliday">
                  <InputNumber/>
                </Form.Field>
              </Col>
            )
          }
          <Col span={24}>
            <Form.Field label={['sdlj', 'nfsd'].includes(appStore.HOSPITAL_ID)?'工休结余':`公休结余`} name="publicHourNow">
              <InputNumber/>
            </Form.Field>
          </Col>
          {
            appStore.hisMatch({
              map: {
                'sdlj,nfsd': <React.Fragment>
                        <Col span={24}>
                          <Form.Field label={`例假结余`} name="periodHourNow">
                            <InputNumber min={0} step={0.5} precision={1} />
                          </Form.Field>
                        </Col>
                </React.Fragment>,
                default: <React.Fragment>
                  <Col span={24}>
                    <Form.Field label={`节休结余`} name="holidayHourNow">
                      <InputNumber/>
                    </Form.Field>
                  </Col>
                </React.Fragment>, 
              },
              vague:true
            })
          }
          {
            appStore.HOSPITAL_ID === 'qhwy' && (
              <React.Fragment>
                <Col span={24}>
                  <Form.Field label={`产假结余`} name="maternityHourNow">
                    <InputNumber/>
                  </Form.Field>
                </Col>
                <Col span={24}>
                  <Form.Field label={`探亲假`} name="homeHourNow">
                    <InputNumber/>
                  </Form.Field>
                </Col>
                <Col span={24}>
                  <Form.Field label={`公差结余`} name="toleranceHourNow">
                    <InputNumber/>
                  </Form.Field>
                </Col>
              </React.Fragment>
            )
          }
          <Col span={24}>
            <Form.Field label={`结余类型`} name="status">
              <Select disabled={props.oldData}>
                <Select.Option value="2">初始结余</Select.Option>
                <Select.Option value="1">排班结余</Select.Option>
              </Select>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`备注`} name="remark">
              <Input.TextArea
                style={{ resize: "none", minHeight: 60 }}
                autosize={true}
              />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
