import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  Input,
  Row,
  Col,
  message,
  Spin,
  Button,
  Radio
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import { aMServices } from "../services/AMServices";
import { appStore, authStore } from "src/stores/index";
export interface Props extends ModalComponentProps {
  info: any;
  callback?: () => void;
  needAudit: boolean;
}
const rules: Rules = {
  status: (val) => !!val || "审核结果不能为空",
};
export default function NursingConsultationModal(props: Props) {
  const [title, setTitle] = useState("护理会诊单");
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [dataInfo, setDataInfo] = useState<any>({});
  let { visible, onCancel, onOk, info ,needAudit} = props;
  let refForm = React.createRef<Form>();

  const onFieldChange = () => {};

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    let data ={
      consultationId:dataInfo.consultationId,
      auditEmpNo: authStore.user?.empNo,
      operationType: "1",
      auditStatus: value.status,
      auditNode:"head_nurse_audit",
    }
    
    aMServices.auditNursingConsultation(data).then((res: any) => {
      message.success("提交成功");
      props.callback && props.callback();
      onCancel();
    });
  };
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (info && refForm.current && visible) {
      setIsSpinning(true);
      let from = refForm.current;
      
      aMServices
      .nursingConsultationDetail(info.othersMessage.auditedUrl)
      .then((res) => {
        setIsSpinning(false);
        setDataInfo(res.data.nursingConsultation|| {})
        let nursingConsultation = res.data.nursingConsultation || {}
        let members = res.data.members || []
          from!.setFields({
            deptName: (authStore.deptList.find((item)=>item.code == nursingConsultation.deptCode) || {}).name,
            consultationObject: nursingConsultation.consultationObject,
            consultationTime: nursingConsultation.consultationTime,
            consultationPurposes: nursingConsultation.consultationPurposes,
            creator: nursingConsultation.creator,
            nursingDiagnosis: nursingConsultation.nursingDiagnosis,
            createTime: nursingConsultation.createTime,
            status: nursingConsultation.status == 0 ? '' : nursingConsultation.status,
            memberList: members.reduce((current:string,item:any) => {
              current += item.empName + '、'
              return current.replace('、','') 
            },'')
          });
        });
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onSave}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      forceRender
      maskClosable
      footer={
        needAudit ? 
        [
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={onSave}>
          确定
        </Button>
        ] : []
      }
    >
      <Spin spinning={isSpinning}>
      <Wrapper>
        <Form
          ref={refForm}
          rules={rules}
          labelWidth={120}
          onChange={onFieldChange}
        >
          <Row>
            <Col span={24}>
              <Form.Field label={`病区`} name="deptName">
                <Input disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`患者姓名`} name="consultationObject">
                <Input disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`会诊时间`} name="consultationTime">
                <Input disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`会诊目的`} name="consultationPurposes">
                <Input disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`创建人`} name="creator">
                <Input disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`护理诊断`} name="nursingDiagnosis">
                <Input.TextArea  disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`护理措施`} name="">
                <Input.TextArea  disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`参与人`} name="memberList">
                {/* <Input disabled /> */}
                <Input.TextArea  disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`审核结果`} name="status" required>
                {/* <Input disabled /> */}
                <Radio.Group buttonStyle="solid" disabled={!needAudit}>
                  <Radio.Button value="1">通过</Radio.Button>
                  <Radio.Button value="2">退回</Radio.Button>
              </Radio.Group>
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
      </Spin>
    </Modal>
  );
}
const Wrapper = styled.div`
  .ant-radio-button-wrapper-checked {
    color: #fff;
    background: #00A680;
    border-color: #00A680;
  }
`;
