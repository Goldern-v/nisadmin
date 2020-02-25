import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  AutoComplete,
  Select
} from "antd";
import Form from "src/components/Form";
import { Rules } from "src/components/Form/interfaces";
import { to } from "src/libs/fns";
import { stepServices } from "./services/stepServices";
export interface Props {}

export default function Step1() {
  const [typeList, setTypeList] = useState([
    { name: "1", code: "1" },
    { name: "2", code: "2" },
    { name: "3", code: "3" }
  ]);
  let refForm = React.createRef<Form>();
  /** 设置规则 */
  const rules: Rules = {
    publicDate: val => !!val || "请填写发表日期"
  };

  useEffect(() => {
    stepServices.getMenuListByPId().then(res => {
      setTypeList(res.data);
    });
  }, []);

  const onFormChange = (name: string, value: any, form: Form) => {
    if (name == "id") {
      let obj: any = typeList.find((item: any) => item.id == value);
      if (obj) {
        form.setField("teachingMethodName", obj.teachingMethodName);
      }
    }
  };

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;

    /** 保存接口 */
    // service(value).then((res: any) => {
    //   message.success('保存成功')
    //   props.onOkCallBack && props.onOkCallBack()
    //   onCancel()
    // })
  };

  return (
    <Wrapper>
      <Form ref={refForm} rules={rules} labelWidth={80} onChange={onFormChange}>
        <Row>
          <Row>
            <Col span={20}>
              <Form.Field label={`类型`} name="id" required>
                <Select>
                  {typeList.map((item: any) => (
                    <Select.Option value={item.id} key={item.id}>
                      {item.typeName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              <Button style={{ marginLeft: 10 }} type="primary">
                其他类型
              </Button>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Field label={`教学方式`} name="teachingMethodName">
              <Input disabled />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 40px 100px 20px;
`;
