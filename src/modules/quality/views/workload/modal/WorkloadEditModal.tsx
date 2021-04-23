import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Modal,
  message as Message,
  Select,
} from "antd";
import DeptSelect from "src/components/DeptSelect";
import YearPicker from "src/components/YearPicker";
import Form from "src/components/Form/Form";
import moment from "moment";
import { workloadApi } from "../api/WorkloadApi";
import { workloadModal } from "../WorkloadModal";
export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function WorkloadEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(currentMonth + 1)
    }
    return monthArr
  })(); //月份

  // 初始化
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current: any = formRef.current;
        if (!current) return;
        // 修改数据回显
        if (params.id) {
          current.clear();
          let data: any = { ...params };
          const {
            标题,
            病区,
            科室,
            年份,
            月份,
            姓名
          } = data;
          current.setFields({
            标题,
            病区,
            科室,
            年份,
            月份,
            姓名
          });
        } else {
          current.clear();
        }
      }, 100);
    }
  }, [visible]);

  // 保存
  const checkForm = () => {
    let current: any = formRef.current;
    if (current) {
      current
        .validateFields()
        .then((res: any) => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            let msg = '添加成功！'
            //修改
            if (params.id) {
              newParams.id = params.id;
              msg = '修改成功！'
            };
            let ajaxMap: any = {
              1: "saveOrUpdateFwzx",
              2: "saveOrUpdateJsns",
              3: "saveOrUpdateGzltj"
            };
            (workloadApi as any)[ajaxMap[workloadModal.indexKey as any] as any](newParams).then((res: any) => {
              // if (res.code == 200) {
              //   Message.success(msg);
              //   workloadModal.pageIndex = 1;
              //   onOk();
              // } else {
              //   Message.error(`${res.dec}`);
              // }
            }).catch((e: any) => { });
          }
        })
        .catch((e: any) => {
          console.log(e);
          setEditLoading(false);
        });
    }
  };

  // 关闭取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.id ? "修改" : "添加"}
    >
      <Wrapper>
        <Form ref={formRef}>
          <Row>
            <Col span={3} className="label">
              标题:
            </Col>
            <Col span={19}>
              <Form.Field name="标题">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              病区:
            </Col>
            <Col span={19}>
              <Form.Field name="病区">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              科室:
            </Col>
            <Col span={19}>
              <Form.Field name="科室">
                <DeptSelect onChange={(value: string) => { }} />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              年份:
            </Col>
            <Col span={19}>
              <Form.Field name="年份">
                <YearPicker />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              月份:
            </Col>
            <Col span={19}>
              <Form.Field name="月份">
                <Select>
                  {monthList.map((month: number) =>
                    <Select.Option value={`${month}`} key={month}>{month}</Select.Option>
                  )}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              姓名:
            </Col>
            <Col span={19}>
              <Form.Field name="姓名">
                <Input />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  .label {
    line-height: 32px;
    text-align: right !important;
    margin-right: 10px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
  .mustWrite {
    color: red !important;
    margin-top: 2px;
  }
  .displayNone {
    display: none;
  }
`;
