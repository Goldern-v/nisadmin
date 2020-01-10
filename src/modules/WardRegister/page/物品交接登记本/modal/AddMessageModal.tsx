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
import moment from "moment";
import { wardRegisterService } from "src/modules/WardRegister/services/WardRegisterService";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {};
  record: any;
}

/** 设置规则 */
const rules: Rules = {
  publicDate: val => !!val || "请填写发表日期"
};

export default function AddMessageModal(props: Props) {
  const [title, setTitle] = useState("添加提醒");
  const [rangeDictMap, setRangeDictMap]: any = useState([]);
  let { visible, onCancel } = props;
  let refForm = React.createRef<Form>();

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

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (refForm.current && visible) {
      /** 表单数据初始化 */
      refForm!.current!.setFields({
        publicDate: "",
        title: ""
      });

      wardRegisterService.getArrangeMenu().then(res => {
        // let map = _.groupBy(res.data, (item: any) => item.shiftType);
        let map = res.data.filter(
          (item: any) => !(item.name.includes("休") || item.name.includes("假"))
        );
        // console.log(map, "map");
        setRangeDictMap(map);
      });
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
    >
      <Form ref={refForm} rules={rules} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`登记内容`} name="publicDate" required>
              <Input.TextArea style={{ resize: "none", height: 80 }} />
            </Form.Field>
          </Col>

          <Col span={12}>
            <Form.Field label={`提醒时间`} name="title">
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={moment().format("YYYY-MM-DD")}>
                  今天
                </Radio.Button>
                <Radio.Button
                  value={moment()
                    .add(1, "d")
                    .format("YYYY-MM-DD")}
                >
                  明天
                </Radio.Button>
              </Radio.Group>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={``} name="title" labelWidth={1}>
              <ShowDate />
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`提醒班次`} name="title">
              <Select>
                {rangeDictMap.map((item: any) => (
                  <Select.Option value={item.name} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={24}>
            <Form.Field label={`提醒护士`} name="title">
              <Select
                mode="tags"
                style={{ width: "100%" }}
                // onChange={(value: any) => {
                //   record.vsRange = value.join(";");
                //   updateDataSource();
                // }}
                // value={text ? text.split(";") : []}
                tokenSeparators={[";"]}
              >
                {/* {(rangeDictMap || []).map((item: any) => {
                  return (
                    <Select.Option key={item.id}>{item.name}</Select.Option>
                  );
                })} */}
              </Select>
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

const ShowDate = (props: any) => {
  const Wrapper = styled.div`
    font-size: 14px;
    color: #999;
    height: 32px;
    line-height: 32px;
    position: relative;
    left: -20px;
  `;
  return <Wrapper>(即为{props.value})</Wrapper>;
};

const Wrapper = styled.div``;
