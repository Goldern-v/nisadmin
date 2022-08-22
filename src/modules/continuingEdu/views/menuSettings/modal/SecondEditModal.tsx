import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Input, Row, Button, Col, Modal, message as Message, Select } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { meunSettingApi } from "../api/MeunSettingApi";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "./modal-two/SelectPeopleModal";
import { appStore } from "src/stores";
import BulkImportModal from './bulkImportModal'

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
  const [effect, setEffect] = useState(true);
  const [editVisible, setEditVisible] = useState(false)
  const selectPeopleModal = createModal(SelectPeopleModal);
  const { secondVisible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [orgLevelName, setOrgLevelName] = useState("");
  const [sortValue, setSortValue] = useState(Number);
  const [errorMessage, setErrorMessage]: any = useState("");
  const [isThirdAudit, setIsThirdAudit]: any = useState(false);
  const [isSecondAudit, setIsSecondAudit]: any = useState(false);
  const [submit, setSubmit]: any = useState([]);
  const [firstAudit, setFirstAudit]: any = useState([]);
  const [secondAudit, setSecondAudit]: any = useState([]);
  const [thirdAudit, setThirdAudit]: any = useState([]);
  const setArray = [setSubmit, setFirstAudit, setSecondAudit, setThirdAudit];
  const dataArray = [submit, firstAudit, secondAudit, thirdAudit];
  // const setArray = [setFirstAudit, setSecondAudit, setThirdAudit];
  // const dataArray = [firstAudit, secondAudit, thirdAudit];

  const onOkCallBack = (
    checkedUserList: CheckUserItem[],
    type: any,
    presentIndex: any
  ) => {
    setArray[type](checkedUserList);
  };

  // 判断当前选择的是哪种类型 1-人员 2-角色
  const judgeTypeItem = (value: any) => {
    let data = dataArray[value];
    if (data && data.length === 0) {
      return 1;
    } else {
      if (data[0].userList) {
        return data[0].userList[0].empNo ? 2 : 3;
      } else {
        return data[0].type === 1 ? 2 : 3;
      }
    }
  };

  // 添加二级审核人
  const editSecondAudit = () => {
    setIsSecondAudit(true);
  };

  // 添加三级审核人
  const editThirdAudit = () => {
    if (secondAudit.length === 0) {
      setErrorMessage("请先选择二级审核人!");
    } else {
      setErrorMessage("");
      setIsThirdAudit(true);
    }
  };

  const openSelectPeopleModal = (value: any) => {
    // value 用于区分哪一种数据类型 0-提交人 1-审核人 2-二级 3-三级
    selectPeopleModal.show({
      checkedUserList: dataArray[value],
      messageType: judgeTypeItem(value),
      type: value,
      presentIndex: 0 // 这个数据没用
    });
  };
  const formRef = React.createRef<Form>();

  // 验证
  const rules: Rules = {
    name: val => !!val || "名称不能为空",
    sort: val =>
      isNaN(Number(val)) || val === "" || Number(val) < 0
        ? "排序必填且为正整数"
        : ""
  };

  // 过滤审核人回显数据 1按人员empName、2按角色roleName
  const getData = (type: any, employees: any, setdData: any) => {
    setdData(
      employees
        ? employees.map((item: any, index: any) => {
          return {
            key: type == 1 ? item.empNo : item.roleCode,
            value: type == 1 ? item.empNo : item.roleCode,
            type: type,
            label: type == 1 ? item.empName : item.roleName
          };
        })
        : []
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

  useLayoutEffect(() => {
    setEffect(false);
  }, []);

  useEffect(() => {
    setEffect(true);
    if (effect) {
      if (secondVisible) {
        setTimeout(() => {
          let current = formRef.current;
          if (!current) return;
          // 初始化数据
          setIsSecondAudit(false);
          setIsThirdAudit(false);
          setErrorMessage("");
          const {
            name,
            orgLevel,
            submitterType,
            firstAuditorType,
            secondAuditorType,
            thirdAuditorType,
            sort
          } = params;
          setInputValue(name);
          setSortValue(sort);
          setOrgLevelName(orgLevel);
          let submit = submitterType
            ? submitterType === 1
              ? params.submitEmployees
              : params.submitRoles
            : [];
          let firstAudit = firstAuditorType
            ? firstAuditorType === 1
              ? params.firstAuditEmployees
              : params.firstAuditRoles
            : [];
          let secondAudit = secondAuditorType
            ? secondAuditorType === 1
              ? params.secondAuditEmployees
              : params.secondAuditRoles
            : [];
          let thirdAudit = thirdAuditorType
            ? thirdAuditorType === 1
              ? params.thirdAuditEmployees
              : params.thirdAuditRoles
            : [];
          if (secondAudit && secondAudit.length > 0) {
            setIsSecondAudit(true);
          }
          if (thirdAudit && thirdAudit.length > 0) {
            setIsThirdAudit(true);
          }
          getData(submitterType, submit, setSubmit);
          getData(firstAuditorType, firstAudit, setFirstAudit);
          getData(secondAuditorType, secondAudit, setSecondAudit);
          getData(thirdAuditorType, thirdAudit, setThirdAudit);
          current.setFields({
            name,
            orgLevel,
            submit,
            firstAudit,
            secondAudit,
            thirdAudit,
            sort
          });
        }, 100);
      }
    }
  }, [secondVisible]);

  const setParamsData = () => {
    let nameList = ["submit", "firstAudit", "secondAudit", "thirdAudit"];
    // let nameList = ["firstAudit", "secondAudit", "thirdAudit"];
    let obj: any = {};
    dataArray.map((item, i) => {
      let data: any = [];
      item.map((o: any) => {
        let objItem: any = {};
        if (o.value && !o.userList) {
          let objProperty = o.type === 1 ? "empNo" : "roleCode";
          objItem[objProperty] = o.value;
          data.push(objItem);
        } else {
          o.userList.map((k: any) => {
            let obj: any = {};
            let type = k.empNo ? "empNo" : "roleCode";
            obj[type] = k[type];
            data.push(obj);
          });
        }
      });
      obj[nameList[i]] = data;
    });
    return obj;
  };

  // 判断是哪种类型 1-人员 2-角色
  const judgeType = (data: any) => {
    if (data && data.length > 0) {
      return data[0].empNo ? 1 : 2;
    } else {
      return null;
    }
  };

  const setParamsProperty = (typeList: any, a: any, b: any) => {
    if (typeList[b]) {
      typeList[`${a}${typeList[b] === 1 ? "Employees" : "Roles"}`] =
        typeList[a];
    }
    delete typeList[a];
  };

  const checkForm = () => {
    console.log(submit);
    
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          if (submit.length === 0 || firstAudit.length === 0) {
            // if (firstAudit.length === 0) {
            setErrorMessage("审核人必填！");
            return;
          } else {
            setErrorMessage("");
          }
          let data = setParamsData();
          let typeList = {
            submitterType: judgeType(data.submit),
            firstAuditorType: judgeType(data.firstAudit),
            secondAuditorType: judgeType(data.secondAudit),
            thirdAuditorType: judgeType(data.thirdAudit),
            ...data
          };
          setParamsProperty(typeList, "submit", "submitterType");
          setParamsProperty(typeList, "firstAudit", "firstAuditorType");
          setParamsProperty(typeList, "secondAudit", "secondAuditorType");
          setParamsProperty(typeList, "thirdAudit", "thirdAuditorType");
          let newParams = {
            orgLevel: orgLevelName,
            name: inputValue,
            id: params.id,
            sort: sortValue,
            ...typeList
          };
          setEditLoading(true);
          meunSettingApi
            .updateSecond(newParams)
            .then(res => {
              setEditLoading(false);
              let msg = "二级菜单修改成功";
              Message.success(msg);
              onOk();
              clearData()
            })
            .catch(e => {
              Message.warning("修改失败！添加三级审核人，请先添加二级审核人");
              setEditLoading(false);
            });
        })
        .catch(e => { });
    }
  };
  
  const bulkImport =() => {
    setEditVisible(true)
  }
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
    clearData()
  };

  const clearData = () => {
    setSubmit([]);
    setFirstAudit([]);
    setSecondAudit([]);
    setThirdAudit([]);
    setInputValue('');
    setOrgLevelName('');
  }

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
          footer={[
            <Button key="bulkImport" onClick={bulkImport}>
              批量导入
            </Button>,
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary"  onClick={checkForm}>
              确定
            </Button>,
          ]}
        >
          <Wrapper>
            <Form ref={formRef} rules={rules}>
              <Row>
                <Col span={4} className="label required-label">
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
              {appStore.HOSPITAL_ID == "hj" && (
                <Row>
                  <Col span={4} className="label required-label">
                    级别:
                  </Col>
                  <Col span={20}>
                    <Form.Field name="orgLevel">
                      <Select
                        placeholder="选择级别"
                        value={orgLevelName}
                        onBlur={(val: any) => {
                          console.log(val, "val222222222222");
                          setOrgLevelName(val);
                        }}
                      >
                        <Select.Option value={""}>无</Select.Option>
                        <Select.Option value={1}>院级</Select.Option>
                        <Select.Option value={3}>科级</Select.Option>
                      </Select>
                    </Form.Field>
                  </Col>
                </Row>
              )}
              <Row>
                <Col span={4} className="label required-label">
                  提交人:
                </Col>
                <Col span={20}>
                  <Form.Field name="submit">
                    <div className="divStyle">
                      <Select
                        mode="tags"
                        placeholder="提交人"
                        value={submit}
                        labelInValue={true}
                        style={{ width: "95% !important" }}
                        open={false}
                        onDeselect={(user: any) => onDeselect(user, 0)}
                      />
                      <ClickBtn onClick={() => openSelectPeopleModal(0)}>
                        ...
                      </ClickBtn>
                    </div>
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label required-label">
                  审核人:
                </Col>
                <Col span={20}>
                  <Form.Field name="firstAudit">
                    <div className="divStyle">
                      <Select
                        mode="tags"
                        placeholder="审核人"
                        value={firstAudit}
                        labelInValue={true}
                        style={{ width: "100%" }}
                        open={false}
                        onDeselect={(user: any) => onDeselect(user, 1)}
                      />
                      <ClickBtn onClick={() => openSelectPeopleModal(1)}>
                        ...
                      </ClickBtn>
                    </div>
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label">
                  二级审核人:
                </Col>
                <Col span={20}>
                  <Form.Field name="secondAudit">
                    {/* {isSecondAudit ? ( */}
                      <div className="divStyle">
                        <Select
                          mode="tags"
                          placeholder="二级审核人"
                          value={secondAudit}
                          labelInValue={true}
                          style={{ width: "100%" }}
                          open={false}
                          onDeselect={(user: any) => onDeselect(user, 2)}
                        />
                        <ClickBtn onClick={() => openSelectPeopleModal(2)}>
                          ...
                        </ClickBtn>
                      </div>
                    {/* )  */}
                    {/* : (
                      <EditClickBtn onClick={editSecondAudit}>
                        + 添加二级审核人
                      </EditClickBtn>
                    )} */}
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label">
                  三级审核人:
                </Col>
                <Col span={20}>
                  <Form.Field name="thirdAudit">
                    {/* {isThirdAudit ? ( */}
                      <div className="divStyle">
                        <Select
                          mode="tags"
                          placeholder="三级审核人"
                          value={thirdAudit}
                          labelInValue={true}
                          style={{ width: "100%" }}
                          onDeselect={(user: any) => onDeselect(user, 3)}
                          open={false}
                        />
                        <ClickBtn onClick={() => openSelectPeopleModal(3)}>
                          ...
                        </ClickBtn>
                      </div>
                    {/* ) : (
                      <EditClickBtn onClick={editThirdAudit}>
                        + 添加三级审核人
                      </EditClickBtn>
                    )} */}
                  </Form.Field>
                </Col>
              </Row>
              <Row>
                <Col span={4} className="label">
                  排序:
                </Col>
                <Col span={20}>
                  <Form.Field name="sort">
                    <Input
                      placeholder="排序"
                      value={sortValue}
                      onBlur={(e: any) => {
                        setSortValue(e.target.value);
                      }}
                    />
                  </Form.Field>
                </Col>
              </Row>
            </Form>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Wrapper>
        </Modal>
        <selectPeopleModal.Component onOkCallBack={onOkCallBack} />
        <BulkImportModal
          visible={editVisible}
          onOk={(list:any) => {
            setEditVisible(false)
            setSubmit(list?.submitEmployees)
            setFirstAudit(list?.firstAuditEmployees)
            setSecondAudit(list?.secondAuditEmployees)
            setThirdAudit(list?.thirdAuditEmployees)
          }}
          onCancel={() => {
            setEditVisible(false)
          }} />
      </Spin>
    </ModalSpin>
  );
}
const ModalSpin = styled.div``;

const Spin = styled.div``;
const Wrapper = styled.div`
  width: 85%;
  margin: 0 auto;
   .ant-select {
    width: 87% !important;
  }
   .ant-select-selection {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
  .divStyle {
    position: relative;
    width: 100%;
  }
  .required-label {
    position: relative;
    &::before {
      content: "*";
      color: red;
      position: absolute;
      left: -10px;
      top: 0;
    }
  }
`;
const ClickBtn = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid #ccc;
  border-left: none;
  width: 50px;
  height: 100%;
  line-height: 28px;
  cursor: pointer;
  text-align: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
} 
`;

const EditClickBtn = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
  height: 30px;
  line-height: 28px;
  cursor: pointer;
  text-align: center;
`;

const ErrorMessage = styled.div`
  padding-left: 80px;
  color: red;
`;
