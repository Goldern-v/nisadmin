import styled from "styled-components";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { Modal, Input, Radio, Row, Col, Icon, message } from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import service from "src/services/api";
import { Rules } from "src/components/Form/interfaces";

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any;
  aduitData?: any;
  type?: any;
  identity?: any;
}

export default function AduitModal(props: Props) {
  const { visible, onCancel, aduitData } = props;
  // let newAduitData:any[] = aduitData || [];
  const [newAduitData, setNewAduitData] = useState<any[]>([]);

  let refForm = React.createRef<Form>();
  let rules: Rules;
  rules = {
    handleContent: (val, list) => { 
      if(!list.isPass){
        return(!!val || "请填写班次名称") 
      }
    },
  };

  useEffect(() => {
    setNewAduitData(aduitData);
    return () => {
      setNewAduitData([]);
    };
  }, [aduitData]);

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    if (refForm.current && visible) {
      let from = refForm.current;
      from!.setFields(
        Object.assign(
          {
            ids: aduitData.map((item: any) => item.id),
            isPass: true,
            handleContent: "",
            nodeCode: aduitData[0].nextNode
          },
          {}
        )
      );
    }
  }, [visible]);

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    service.scheduleShiftApiService.getHandNode(value).then((res)=>{
      message.success("保存成功");
      props.onOkCallBack && props.onOkCallBack();
      onCancel()
    })
  };
  const deleteAduitItem = (id: number) => {
    if (refForm.current) {
      const { values } = refForm.current.state;
      if (values.ids.length >= 1) return;
      const list = values.ids.filter((item: number) => item != id);
      setNewAduitData(list);
      refForm.current.setField("ids", list);
    }
  };
  return (
    <Modal
      title={"审核"}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
      maskClosable={true}
    >
      <Wrapper>
        <Form ref={refForm} rules={rules}>
          <Row>
            <Col span={24}>
              <Form.Field label={`审核内容`} name="ids">
                {newAduitData &&
                  newAduitData.map((item: any) => {
                    return (
                      <div className="item-aduit" key={item.id}>
                        <div className="item-list">
                          {`${item.deptName}: ${item.name}`}
                        </div>
                        <Icon
                          type="close"
                          className="item-icon"
                          onClick={() => {
                            deleteAduitItem(item.id);
                          }}
                        />
                      </div>
                    );
                  })}
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`审核结果`} name="isPass">
                <Radio.Group>
                  <Radio.Button value={true}>通过</Radio.Button>
                  <Radio.Button value={false}>退回</Radio.Button>
                </Radio.Group>
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`审核意见`} name="handleContent">
                <Input.TextArea />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  .color-lump {
    .ant-select-selection__rendered {
      margin-left: 0;
    }
    .ant-select-selection-selected-value {
      width: 100%;
      padding-right: 28px;
    }
  }
  .ant-radio-button-wrapper-checked {
    background-color: #00a680;
    color: #fff;
  }
  .item-aduit {
    display: flex;
    align-items: center;
    height: 30px;
    .item-list {
      background-color: #f9f9f9;
      border: 1px solid #d9d9d9;
      color: #999999;
    }
    .item-icon {
      padding: 3.5px;
      background-color: #f9f9f9;
      border: 1px solid #d9d9d9;
      border-left: 0;
      color: #999999;
    }
  }
`;
