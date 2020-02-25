import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  AutoComplete,
  Select,
  Checkbox
} from "antd";
import Form from "src/components/Form";
import { Rules } from "src/components/Form/interfaces";
import { to } from "src/libs/fns";
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
            <Form.Field label={`学习名称`} name="title">
              <Input />
            </Form.Field>
          </Col>
          <Row>
            <Col span={24}>
              <Form.Field label={`学习开始时间`} name="title">
                <DatePicker />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <DateSelectCon>
              <div className="date-row">
                <span>学习开放</span>
                <Select className="select-item">
                  {typeList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <Select className="select-item">
                  {typeList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <span className="aside">即：2020-1-1</span>
              </div>
              <div className="date-row">
                <span>学习结束</span>
                <Select className="select-item">
                  {typeList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <Select className="select-item">
                  {typeList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <span className="aside">即：2020-1-1</span>
              </div>
            </DateSelectCon>
          </Row>

          <Col span={24}>
            <Form.Field label={`教学方式`} name="title">
              <Input />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`组织方式`} name="title">
              <Select>
                {typeList.map(item => (
                  <Select.Option value={item.code} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`学习地址`} name="title">
              <Input />
            </Form.Field>
          </Col>
          <Row>
            <Col span={6}>
              <Form.Field label={`学分`} name="title">
                <Select>
                  {typeList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={18}>
              <Form.Field label={``} name="title" suffix="分">
                <Select>
                  {typeList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Field label={`学时`} name="title">
              <Select>
                {typeList.map(item => (
                  <Select.Option value={item.code} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`必修`} name="title">
              <Checkbox.Group>
                <Checkbox value="A">A</Checkbox>
              </Checkbox.Group>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`通知消息`} name="title">
              <Input.TextArea />
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

const DateSelectCon = styled.div`
  .date-row {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 20px;
    padding-left: 100px;
    font-size: 14px;
    .select-item {
      width: 120px;
      margin-left: 20px;
    }
    .aside {
      margin-left: 20px;
      font-size: 12px;
      color: #666;
    }
  }
`;
