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
  const [inputValue, setInputValue] = useState("");
  const [submitEmployees, setSubmitEmployees]: any = useState([]);
  const [firstAuditEmployees, setFirstAuditEmployees]: any = useState([]);
  const [secondAuditRoles, setSecondAuditRoles]: any = useState([]);
  const [thirdAuditRoles, setThirdAuditRoles]: any = useState([]);
  const [type, setType]: any = useState(0); // 用于区分哪一种数据类型 0-提交人 1-审核人 2-二级 3-三级
  const setArray = [
    setSubmitEmployees,
    setFirstAuditEmployees,
    setSecondAuditRoles,
    setThirdAuditRoles
  ];
  const dataArray = [
    submitEmployees,
    firstAuditEmployees,
    secondAuditRoles,
    thirdAuditRoles
  ];

  const onOkCallBack = (checkedUserList: CheckUserItem[]) => {
    setArray[type](checkedUserList);
  };

  const openSelectPeopleModal = (value: any) => {
    selectPeopleModal.show({
      checkedUserList: dataArray[value],
      type: value
    });
    setType(value);
  };
  const formRef = React.createRef<Form>();

  // 验证
  const rules: Rules = {
    name: val => !!val || "名称不能为空"
  };

  // 过滤审核人回显数据 1按人员empName、2按角色roleName
  const getData = (type: any, employees: any, setdData: any) => {
    setdData(
      employees.map((item: any, index: any) => {
        return {
          key: type == 1 ? item.empNo : item.roleCode,
          value: type == 1 ? item.empNo : item.roleCode,
          label: type == 1 ? item.empName : item.roleName
        };
      })
    );
  };

  // 取消标签审核人
  const onDeselect = (user: User | User[], number: any) => {
    let data = dataArray[number];
    let setData = setArray[number];
    if (user instanceof Array) {
      for (let i = 0; i < user.length; i++) {
        let index = data.findIndex((item: any) => item.key === user[i].key);
        if (index > -1) {
          data.splice(index, 1);
        }
      }
      setData([...data]);
    } else {
      let index = data.findIndex((item: any) => item.key === user.key);
      if (index > -1) {
        data.splice(index, 1);
        setData([...data]);
      }
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
        setInputValue(name);
        getData(submitterType, submitEmployees, setSubmitEmployees);
        getData(firstAuditorType, firstAuditEmployees, setFirstAuditEmployees);
        getData(secondAuditorType, secondAuditRoles, setSecondAuditRoles);
        getData(thirdAuditorType, thirdAuditRoles, setThirdAuditRoles);
        current.setFields({
          name,
          submitEmployees,
          firstAuditEmployees,
          secondAuditRoles,
          thirdAuditRoles
        });
      }, 100);
    }
  }, [secondVisible]);

  const setParamsData = () => {
    let nameList = [
      "submitEmployees",
      "firstAuditEmployees",
      "secondAuditRoles",
      "thirdAuditRoles"
    ];
    let obj: any = {};
    dataArray.map((item, i) => {
      let data: any = [];
      item.map((o: any) => {
        let objItem: any = {};
        let objProperty = i > 1 ? "roleCode" : "empNo";
        if (o.value) {
          objItem[objProperty] = o.value;
          data.push(objItem);
        } else {
          o.userList.map((k: any) => {
            let obj: any = {};
            obj.empNo = k.empNo;
            data.push(obj);
          });
        }
      });
      obj[nameList[i]] = data;
    });
    return obj;
  };

  const checkForm = () => {
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          let typeList = {
            submitterType: submitEmployees.length ? 1 : null,
            firstAuditorType: firstAuditEmployees.length ? 1 : null,
            secondAuditorType: secondAuditRoles.length ? 2 : null,
            thirdAuditorType: thirdAuditRoles.length ? 2 : null,
            submitEmployees: [],
            firstAuditEmployees: [],
            secondAuditRoles: [],
            thirdAuditRoles: []
          };
          let data = setParamsData();
          let newParams = {
            ...typeList,
            ...params,
            ...data
          };
          newParams.name = inputValue;
          setEditLoading(true);
          meunSettingApi
            .updateSecond(newParams)
            .then(res => {
              setEditLoading(false);
              let msg = "二级菜单修改成功";
              Message.success(msg);
              onOk();
            })
            .catch(e => {
              setEditLoading(false);
            });
        })
        .catch(e => {});
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
                    <Input
                      onBlur={(e: any) => {
                        setInputValue(e.target.value);
                      }}
                      value={inputValue}
                      placeholder="名称"
                    />
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label">
                  提交人:
                </Col>
                <Col span={20}>
                  <Form.Field name="submitEmployees">
                    <div onClick={() => openSelectPeopleModal(0)}>
                      <Select
                        mode="tags"
                        placeholder="提交人"
                        value={submitEmployees}
                        labelInValue={true}
                        style={{ width: "100%" }}
                        open={false}
                        onDeselect={(user: any) => onDeselect(user, 0)}
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
                  <Form.Field name="firstAuditEmployees">
                    <div onClick={() => openSelectPeopleModal(1)}>
                      <Select
                        mode="tags"
                        placeholder="审核人"
                        value={firstAuditEmployees}
                        labelInValue={true}
                        style={{ width: "100%" }}
                        open={false}
                        onDeselect={(user: any) => onDeselect(user, 1)}
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
                  <Form.Field name="secondAuditRoles">
                    <div onClick={() => openSelectPeopleModal(2)}>
                      <Select
                        mode="tags"
                        placeholder="二级审核人"
                        value={secondAuditRoles}
                        labelInValue={true}
                        style={{ width: "100%" }}
                        open={false}
                        onDeselect={(user: any) => onDeselect(user, 2)}
                      />
                    </div>
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label">
                  三级审核人:
                </Col>
                <Col span={20}>
                  <Form.Field name="thirdAuditRoles">
                    <div onClick={() => openSelectPeopleModal(3)}>
                      <Select
                        mode="tags"
                        placeholder="三级审核人"
                        value={thirdAuditRoles}
                        labelInValue={true}
                        style={{ width: "100%" }}
                        onDeselect={(user: any) => onDeselect(user, 3)}
                        open={false}
                      />
                    </div>
                  </Form.Field>
                </Col>
              </Row>
            </Form>
          </Wrapper>
        </Modal>
        <selectPeopleModal.Component type={type} onOkCallBack={onOkCallBack} />
      </Spin>
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
