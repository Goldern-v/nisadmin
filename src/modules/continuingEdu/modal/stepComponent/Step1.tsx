import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, DatePicker, Input, AutoComplete } from "antd";
import Form from "src/components/Form";
import { Rules } from "src/components/Form/interfaces";
import { to } from "src/libs/fns";
export interface Props {}

export default function Step1() {
  let refForm = React.createRef<Form>();
  /** 设置规则 */
  const rules: Rules = {
    publicDate: val => !!val || "请填写发表日期"
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
      <Form ref={refForm} rules={rules} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`类型`} name="publicDate" required>
              <AutoComplete>
                <Input.Search placeholder="请选择类型" enterButton="其他类型" />
              </AutoComplete>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`教学方式`} name="title">
              <Input />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 0 100px;
`;
