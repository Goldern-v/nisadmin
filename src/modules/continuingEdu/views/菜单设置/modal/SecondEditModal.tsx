import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Select } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { meunSettingApi } from "../api/MeunSettingApi";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "./modal-two/SelectPeopleModal";

export interface Props {
  secondVisible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
}

interface User {
  label?: string;
  key: string;
}

export interface CheckUserItem {
  key: string;
  userList: any[];
}

export default function SecondEditModal(props: Props) {
  const selectPeopleModal = createModal(SelectPeopleModal);
  const { secondVisible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [submitList, setSubmitList]: any = useState([]);
  const [firstList, setFirstList]: any = useState([]);
  const [secondList, setSecondList]: any = useState([]);
  const [thirdList, setThirdList]: any = useState([]);
  const [peopleVisible, setPeopleVisible] = useState(false);
  const openSelectPeopleModal = () => {
    setPeopleVisible(true);
    selectPeopleModal.show({
      checkedUserList: firstList
    });
  };
  const onOkCallBack = (firstList: CheckUserItem[]) => {
    setFirstList(firstList);
    setPeopleVisible(false);
  };
  const formRef = React.createRef<Form>();
  // 验证
  const rules: Rules = {
    name: val => !!val || "名称不能为空"
  };
  // 过滤审核人回显数据 1按人员empName、2按角色roleName
  const getData = (type: any, employees: any, setdData: any) => {
    if (type == 1) {
      setdData(
        employees.map((item: any, index: any) => {
          return {
            key: item.empName,
            userList: [item.empName]
          };
        })
      );
    } else if (type == 2) {
      setdData(
        employees.map((item: any, index: any) => {
          return {
            key: item.roleName,
            userList: [item.roleName]
          };
        })
      );
    }
  };

  useEffect(() => {
    if (secondVisible) {
      setTimeout(() => {
        let current = formRef.current;
        if (!current) return;
        const {
          name,
          submitterType,
          submitEmployees = [],
          firstAuditorType,
          firstAuditEmployees = [],
          secondAuditorType,
          secondAuditRoles = [],
          thirdAuditorType,
          thirdAuditRoles = []
        } = params;
        getData(submitterType, submitEmployees, setSubmitList);
        getData(firstAuditorType, firstAuditEmployees, setFirstList);
        getData(secondAuditorType, secondAuditRoles, setSecondList);
        getData(thirdAuditorType, thirdAuditRoles, setThirdList);
        current.setFields({
          name,
          submitList,
          firstList,
          secondList,
          thirdList
        });
      }, 100);
    }
  }, [secondVisible, params, firstList, secondList, thirdList]);

  const checkForm = () => {
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            if (params.id) {
              newParams.id = params.id;
              setEditLoading(true);
              meunSettingApi.updateFirst(newParams).then(res => {
                setEditLoading(false);
                let msg = "二级菜单修改成功";
                Message.success(msg);
                onOk();
              });
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <ModalSpin>
      <Spin>
        <Modal
          width={600}
          visible={secondVisible}
          onCancel={handleCancel}
          onOk={checkForm}
          confirmLoading={editLoading}
          title="修改二级菜单"
        >
          <Wrapper>
            <Form ref={formRef} rules={rules}>
              <Row>
                <Col span={4} className="label">
                  名称:
                </Col>
                <Col span={20}>
                  <Form.Field name="name">
                    <Input placeholder="名称" />
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label">
                  提交人:
                </Col>
                <Col span={20}>
                  <Form.Field name="submitList">
                    <div>
                      <Select
                        mode="tags"
                        placeholder="提交人"
                        value={submitList}
                        labelInValue={true}
                        style={{ width: "100%" }}
                        open={false}
                      />
                    </div>
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label">
                  审核人:
                </Col>
                <Col span={20}>
                  <Form.Field name="firstList">
                    <div onClick={openSelectPeopleModal}>
                      <Select
                        mode="tags"
                        placeholder="审核人"
                        value={firstList}
                        labelInValue={true}
                        style={{ width: "100%" }}
                        open={false}
                      />
                    </div>
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label">
                  二级审核人:
                </Col>
                <Col span={20}>
                  <Form.Field name="secondList">
                    <Select
                      mode="tags"
                      placeholder="二级审核人"
                      value={secondList}
                      labelInValue={true}
                      style={{ width: "100%" }}
                      open={false}
                    />
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label">
                  三级审核人:
                </Col>
                <Col span={20}>
                  <Form.Field name="thirdList">
                    <Select
                      mode="tags"
                      placeholder="三级审核人"
                      value={thirdList}
                      labelInValue={true}
                      style={{ width: "100%" }}
                      open={false}
                    />
                  </Form.Field>
                </Col>
              </Row>
            </Form>
          </Wrapper>
        </Modal>
      </Spin>
      <selectPeopleModal.Component
        visible={peopleVisible}
        onOkCallBack={onOkCallBack}
      />
    </ModalSpin>
  );
}
const ModalSpin = styled.div``;

const Spin = styled.div``;
const Wrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
`;
