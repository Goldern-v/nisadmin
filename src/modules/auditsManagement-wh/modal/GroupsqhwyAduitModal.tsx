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
import { aMServices } from "../services/AMServices";
// import { qualityControlRecordApi } from '../../api/QualityControlRecordApi'

const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  selectedRows?: any;
  getTableData?: any;
  detail?:any;
  type?:any;
}

/** 设置规则 */
const rules: Rules = {
  publicDate: val => !!val || "请填写发表日期"
};

export default function GroupsSrAduitModal(props: Props) {
  const [title, setTitle] = useState("");

  let { visible, onCancel, selectedRows ,detail,type} = props;
  let refForm = React.createRef<Form>();

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    let data: any = { ...value }
    if(type =='audited'){
      aMServices.audit(data).then(res => {
        message.success("审核成功");
        props.getTableData && props.getTableData();
        onCancel();
      });
    } else  if(type =='batchAudited'){
      data.ids = [];
      selectedRows.map((item:any)=>{
       data.ids.push(item.othersMessage.id); 
      })
      aMServices.batchAudited(data).then(res => {
        message.success("审核成功");
        props.getTableData && props.getTableData();
        onCancel();
      });
    }
   
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    refForm.current &&
      refForm!.current!.setFields({
         flag: true,
         detail:'',
        ...detail
      });
  }, [visible]);

  return (
    <Modal
      title={"护士临时借调审核"}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
    >
      <Form ref={refForm} labelWidth={80}>
        <Row>
         {type =='audited' && (
         <React.Fragment>
            <Col span={24}>
              <Form.Field label={`原科室`} name="deptName" >
                <Input  disabled/>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`新科室`} name="deptNameTransferTo" >
                <Input  disabled/>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`借出日期`} name="startDate" >
                <Input  disabled/>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`借出说明`} name="detailTransferTo" >
                <Input.TextArea  disabled/>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`护士总数`} name="nurseNum" >
                <Input  disabled/>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`患者总数`} name="patientNum" >
                <Input  disabled/>
              </Form.Field>
            </Col>
          </React.Fragment>)}
          <Col span={24}>
            <Form.Field label={`审核结果`} name="flag">
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={true}>通过</Radio.Button>
                <Radio.Button value={false}>退回</Radio.Button>
              </Radio.Group>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`审核意见`} name="detail">
              <Input.TextArea />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
const Wrapper = styled.div``;
