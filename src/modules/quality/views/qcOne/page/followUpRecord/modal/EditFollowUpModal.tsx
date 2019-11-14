import styled from "styled-components";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from "react";
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
import { Drawer, Checkbox, CheckboxChangeEvent } from "src/vendors/antd";
import service from "src/services/api";
import { authStore } from "src/stores";
import User from "src/models/User";
import moment from "moment";
import { qcOneService } from "../../../services/QcOneService";
import { globalModal } from "src/global/globalModal";
import { DictItem } from "src/services/api/CommonApiService";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => void;
  /** 编辑的数据- 如果没，即新建 */
  data?: any;
}

/** 设置规则 */
const rules: Rules = {
  recordDate: val => !!val || "请填写随访日期"
};

interface selectedNurseItem {
  key: string;
  value: User;
}

export const jdList: any = [
  {
    code: 1,
    name: "第一季度"
  },
  {
    code: 2,
    name: "第二季度"
  },
  {
    code: 3,
    name: "第三季度"
  },
  {
    code: 4,
    name: "第四季度"
  }
];
export default function EditFollowUpModal(props: Props) {
  const [title, setTitle] = useState("创建/编辑随访记录");
  const [showDraWer, setShowDraWer] = useState(false);
  const [nurseList, setNurseList]: any = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedNurse, setSelectedNurse]: any = useState([]);
  let { visible, onCancel, data } = props;

  let refForm = React.createRef<Form>();
  const canEdit: boolean = data
    ? authStore.isRoleManage || authStore.user!.empNo === data.creatorNo
      ? true
      : false
    : true;
  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    /** 保存接口 */
    let data = { ...value };
    data.recordDate = data.admissionDate
      ? moment(data.recordDate).format("YYYY-MM-DD HH:mm")
      : "";
    data.admissionDate = data.admissionDate
      ? moment(data.admissionDate).format("YYYY-MM-DD")
      : "";
    data.dischargeDate = data.dischargeDate
      ? moment(data.dischargeDate).format("YYYY-MM-DD")
      : "";
    // data.participantsList = selectedNurse.map((item: selectedNurseItem) => item.value)
    data.wardCode = authStore.selectedDeptCode;
    data.wardName = authStore.selectedDeptName;
    qcOneService
      .qcPatientVisitSaveOrUpdate(Object.assign({}, props.data || {}, data))
      .then((res: any) => {
        message.success("保存成功");
        props.onOkCallBack && props.onOkCallBack();
        setShowDraWer(false);
        setTimeout(onCancel);
      });
  };

  const addNurse = (nurse: User) => {
    if (
      selectedNurse.find(
        (item: selectedNurseItem) => item.value.empNo == nurse.empNo
      )
    ) {
    } else {
      setSelectedNurse([
        ...selectedNurse,
        { label: nurse.empName, value: nurse, key: nurse.empNo }
      ]);
      if (refForm.current) {
        // refForm.current.setField('participantsList', [
        //   ...selectedNurse,
        //   { label: nurse.empName, value: nurse, key: nurse.empNo }
        // ])
        let empNames =
          refForm.current.getField("empNames") +
          (refForm.current.getField("empNames") ? "、" : "") +
          nurse.empName;
        refForm.current.setField("empNames", empNames);
      }
    }
  };
  const delNurse = (nurse: User) => {
    let index = selectedNurse.findIndex(
      (item: selectedNurseItem) => item.value.empNo == nurse.empNo
    );
    if (index !== -1) {
      selectedNurse.splice(index, 1);
      setSelectedNurse([...selectedNurse]);
      if (refForm.current) {
        // refForm.current.setField('participantsList', [...selectedNurse])
        let empNames = refForm.current
          .getField("empNames")
          .replace(new RegExp(nurse!.empName, "gm"), "");
        empNames = empNames.replace(new RegExp("、、", "gm"), "、");
        if (empNames[0] == "、") empNames = empNames.slice(1);
        if (empNames[empNames.length - 1] == "、")
          empNames = empNames.slice(0, empNames.length - 1);
        refForm.current.setField("empNames", empNames);
      }
    }
  };
  const nurseInSelected = (nurse: User) => {
    let index = selectedNurse.findIndex(
      (item: selectedNurseItem) => item.value.empNo == nurse.empNo
    );
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const onFormChange = (name: string, value: any, form: Form<any>) => {
    if (name == "recordDate" && value) {
      form.setField("quarter", value.quarter());
    }
  };
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      let form = refForm.current;
      setModalLoading(true);
      service.commonApiService
        .userDictInfo(authStore.selectedDeptCode)
        .then(res => {
          let nurseList = res.data.map((item: any) => ({
            empNo: item.code,
            empName: item.name
          }));
          setNurseList(nurseList);
          setModalLoading(false);

          if (data) {
            setTitle("编辑随访记录");
            /** 表单数据初始化 */
            form.setFields({
              recordDate: data.recordDate ? moment(data.recordDate) : null,
              patientName: data.patientName,
              address: data.address,
              quarter: data.quarter,
              diagnosis: data.diagnosis,
              contactInformation: data.contactInformation,
              admissionDate: data.admissionDate
                ? moment(data.admissionDate)
                : null,
              dischargeDate: data.dischargeDate
                ? moment(data.dischargeDate)
                : null,
              accessContent: data.accessContent,
              feedBack: data.feedBack,
              empNames: data.empNames
              // participantsList: data.participantsList
              //   ? data.participantsList.map((item: any) => ({ key: item.empNo, label: item.empName }))
              //   : []
            });
            // setSelectedNurse(
            //   data.participantsList
            //     ? data.participantsList.map((item: any) => ({ key: item.empNo, label: item.empName, value: item }))
            //     : []
            // )
            setSelectedNurse([]);
            if (data.empNames) {
              let _nurseList: any = [];
              data.empNames.split("、").forEach((name: string) => {
                let nurse = nurseList.find(
                  (item: User) => item.empName == name
                );
                console.log(nurse, "nurse");
                if (nurse) {
                  _nurseList.push(nurse);
                }
              });
              setSelectedNurse(
                _nurseList.map((item: any) => ({
                  key: item.empNo,
                  label: item.empName,
                  value: item
                }))
              );
            }
          } else {
            setTitle("创建随访记录");
            /** 表单数据初始化 */
            form.setFields({
              recordDate: moment(),
              // quarter: '',
              patientName: "",
              address: "",
              contactInformation: "",
              admissionDate: null,
              dischargeDate: null,
              accessContent: "",
              feedBack: "",
              diagnosis: "",
              // participantsList: []
              empNames: ""
            });
            setSelectedNurse([]);
          }
        });
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => {
        onCancel();
        setShowDraWer(false);
      }}
      onOk={onSave}
      okText="保存"
      forceRender
      centered
      footer={
        <React.Fragment>
          <Button onClick={onCancel}>取消</Button>
          {data && canEdit && (
            <Button
              type="danger"
              onClick={() => {
                globalModal
                  .confirm("删除确认", "你确定要删除该记录吗？")
                  .then(res => {
                    qcOneService.qcPatientVisitDelete(data.id).then(res => {
                      message.success("删除成功");
                      props.onOkCallBack && props.onOkCallBack();
                      setShowDraWer(false);
                      onCancel();
                    });
                  });
              }}
            >
              删除
            </Button>
          )}
          <Button type="primary" onClick={onSave}>
            确认
          </Button>
        </React.Fragment>
      }
    >
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFormChange}>
        <Row>
          <Col span={24}>
            <Form.Field label={`随访日期`} name="recordDate" required>
              <DatePicker disabled={!canEdit} allowClear={false} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`季度`} name="quarter">
              <Select placeholder="请选择季度" disabled>
                {jdList.map((item: DictItem, index: number) => (
                  <Select.Option value={item.code} key={index}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`患者姓名`} name="patientName">
              <Input placeholder="请输入患者姓名" disabled={!canEdit} />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`疾病诊断`} name="diagnosis">
              <Input placeholder="请输入诊断" disabled={!canEdit} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`家庭住址`} name="address">
              <Input placeholder="请输入地址" disabled={!canEdit} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`联系方式`} name="contactInformation">
              <Input placeholder="请输入联系方式" disabled={!canEdit} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`住院时间`} name="admissionDate">
              <DatePicker disabled={!canEdit} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`出院时间`} name="dischargeDate">
              <DatePicker disabled={!canEdit} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`随访内容`} name="accessContent">
              <Input placeholder="请输入随访内容" disabled={!canEdit} />
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`反馈意见`} name="feedBack">
              <Input placeholder="请输入反馈意见" disabled={!canEdit} />
            </Form.Field>
          </Col>
          {/* <Col span={24}>
            <Form.Field
              label={`随访护士`}
              name='participantsList'
              suffix={<MoreBox onClick={() => canEdit && setShowDraWer(!showDraWer)} />}
            >
              <Select
                disabled={!canEdit}
                mode='multiple'
                open={false}
                placeholder='请选择护士'
                labelInValue={true}
                onDeselect={(value: any) => {
                  delNurse(undefined, value.key)
                }}
              />
            </Form.Field>
          </Col> */}
          <Col span={24}>
            <Form.Field
              label={`随访护士`}
              name="empNames"
              suffix={
                <MoreBox
                  onClick={() => canEdit && setShowDraWer(!showDraWer)}
                />
              }
            >
              <Input.TextArea autosize={true} style={{ resize: "none" }} />
            </Form.Field>
          </Col>
        </Row>
      </Form>
      <Drawer
        title="科室护士"
        placement="right"
        closable={true}
        visible={showDraWer}
        onClose={() => setShowDraWer(false)}
        mask={false}
      >
        <DrawerCon>
          {nurseList.map((nurse: User, index: number) => (
            <NursingItem
              key={index}
              onClick={() => {
                if (!nurseInSelected(nurse)) {
                  addNurse(nurse);
                } else {
                  delNurse(nurse);
                }
              }}
            >
              <div className="nis-name">
                {nurse.empNo} {nurse.empName}
              </div>
              <Checkbox
                checked={nurseInSelected(nurse)}
                // onChange={(e: CheckboxChangeEvent) => {
                //   if (e.target.checked) {
                //     addNurse(nurse);
                //   } else {
                //     delNurse(nurse);
                //   }
                // }}
              />
            </NursingItem>
          ))}
        </DrawerCon>
      </Drawer>
    </Modal>
  );
}
const Wrapper = styled.div``;
const DrawerCon = styled.div`
  margin: -24px;
`;
const NursingItem = styled.div`
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 24px;
  .nis-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function MoreBox(props: any) {
  const { onClick } = props;
  const Wrapper = styled.div`
    width: 32px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    &:hover {
      border-color: #1db38b;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(0, 166, 128, 0.2);
    }
  `;
  return <Wrapper onClick={onClick}>...</Wrapper>;
}
