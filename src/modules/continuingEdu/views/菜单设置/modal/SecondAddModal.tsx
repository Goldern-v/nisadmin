import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  message as Message,
  Steps,
  Input,
  Select
} from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import { meunSettingApi } from "../api/MeunSettingApi";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "./modal-two/SelectPeopleModal";

export interface Props {
  visible: boolean;
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

const { Step } = Steps;

export default function SecondAddModal(props: Props) {
  const selectPeopleModal = createModal(SelectPeopleModal);
  const { visible, params = [], onCancel, onOk } = props;
  const [addLoading, setAddLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [addVisible, setAddVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [allDataList, setAllDataList] = useState([]);
  const [checkedId, setCheckedId] = useState("");
  const [isErrorText, setIsErrorText] = useState("");
  const [chilrenList, setChilrenList] = useState([]);
  const formRef = React.createRef<Form>();
  const checkForm = () => {};
  let nameList: any = ["submit", "firstAudit", "secondAudit", "thirdAudit"];
  const onOkCallBack = (
    checkedUserList: CheckUserItem[],
    type: any,
    presentIndex: any
  ) => {
    let data: any = allDataList.slice();
    data[presentIndex][nameList[type]] = checkedUserList;
    setAllDataList(data);
  };

  // 判断当前选择的是哪种类型 1-人员 2-角色
  const judgeTypeItem = (data: any) => {
    if (data.length === 0) {
      return 1;
    } else {
      if (data[0].userList) {
        return data[0].userList[0].empNo ? 2 : 3;
      } else {
        return data[0].type === 1 ? 2 : 3;
      }
    }
  };

  // 打开弹框
  const openSelectPeopleModal = (value: any, index: any) => {
    // value 用于区分哪一种数据类型 0-提交人 1-审核人 2-二级 3-三级; index 用于区分当前操作的索引
    let data: any = allDataList[index]
      ? allDataList[index][nameList[value]]
      : [];
    selectPeopleModal.show({
      checkedUserList: data || [],
      messageType: judgeTypeItem(data || []),
      type: value,
      presentIndex: index
    });
  };

  // 取消标签审核人
  const onDeselect = (user: any, number: any, index: any) => {
    let data: any = allDataList.slice();
    let dataItem: any = data[index][nameList[number]];
    let i: any = dataItem.findIndex((item: any) => item.key === user.key);
    if (i > -1) {
      dataItem.splice(index, 1);
    }
    setAllDataList(data);
  };

  // 取消关闭函数
  const handleCancel = () => {
    if (addLoading) return;
    setChilrenList([]);
    setCurrent(0);
    onCancel && onCancel();
  };

  // 点击一级菜单函数
  const onClickParent = (id: any) => {
    let data: any = params.find((item: any) => item.id === id);
    setCheckedId(data.id);
    setChilrenList([]);
  };

  // 删除二级菜单函数
  const deteleSonData = (name: any) => {
    let index = 0;
    chilrenList.map((item: any, i: any) => {
      if (item.name === name) {
        index = i;
      }
    });
    let newChildList = chilrenList.slice();
    newChildList.splice(index, 1);
    setChilrenList(newChildList);
  };

  // 添加二级函数数据
  const addSonData = () => {
    if (!inputValue) {
      setIsErrorText("名称为必填!");
      return;
    }
    let isRepetition: any = chilrenList.find(
      (item: any) => item.name === inputValue
    );
    if (isRepetition) {
      setIsErrorText("二级菜单不能重复!");
      return;
    } else {
      let data: any = chilrenList.slice();
      data.push({ name: inputValue });
      setChilrenList(data);
      setInputValue("");
      setAddVisible(false);
      setIsErrorText("");
    }
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

  // 处理入参数据
  const setParamsData = () => {
    let newData = allDataList.map((item: any) => {
      let objItem: any = {};
      nameList.map((o: any, i: any) => {
        let setItem: any = item[o];
        if (setItem && setItem.length) {
          let data: any = [];
          setItem.map((k: any) => {
            let objItem: any = {};
            if (k.value) {
              let objProperty = k.type === 1 ? "empNo" : "roleCode";
              objItem[objProperty] = k.value;
              data.push(objItem);
            } else {
              k.userList.map((j: any) => {
                let obj: any = {};
                let type = j.empNo ? "empNo" : "roleCode";
                obj[type] = j[type];
                data.push(obj);
              });
            }
          });
          objItem[o] = data;
        }
      });
      let typeList = {
        submitterType: judgeType(objItem.submit),
        firstAuditorType: judgeType(objItem.firstAudit),
        secondAuditorType: judgeType(objItem.secondAudit),
        thirdAuditorType: judgeType(objItem.thirdAudit),
        ...objItem
      };
      setParamsProperty(typeList, "submit", "submitterType");
      setParamsProperty(typeList, "firstAudit", "firstAuditorType");
      setParamsProperty(typeList, "secondAudit", "secondAuditorType");
      setParamsProperty(typeList, "thirdAudit", "thirdAuditorType");
      return {
        ...typeList,
        name: item.childrenName,
        pId: item.id
      };
    });
    let obj: any = { pId: newData[0].pId, menuItemList: newData };
    return obj;
  };

  // 确定函数
  const confirm = () => {
    let params = setParamsData();
    setAddLoading(true);
    meunSettingApi
      .saveSecond(params)
      .then(res => {
        setAddLoading(false);
        Message.success("保存成功！");
        setAddVisible(false);
        setChilrenList([]);
        setCurrent(0);
        onOk();
      })
      .catch(e => {
        setAddLoading(false);
      });
  };

  // 下一步函数
  const toNext = () => {
    if (current === 0) {
      if (!chilrenList.length) {
        Message.warning("请至少添加一项二级菜单");
      } else {
        let typeList = {
          submitterType: null,
          firstAuditorType: null,
          secondAuditorType: null,
          thirdAuditorType: null,
          submit: [],
          firstAudit: [],
          secondAudit: [],
          thirdAudit: []
        };
        let obj = params.find((o: any) => o.id === checkedId);
        let array: any = chilrenList.map((item: any) => ({
          id: checkedId,
          parentName: obj.name,
          childrenName: item.name,
          ...typeList
        }));
        setAllDataList(array);
        setCurrent(current + 1);
      }
    } else {
      setCurrent(current + 1);
    }
  };

  // 初始化
  useEffect(() => {
    if (params.length) {
      setCheckedId(params[0].id);
    }
  }, [params]);

  return (
    <Spin>
      <Modal
        className="modal"
        width={800}
        visible={visible}
        onCancel={handleCancel}
        onOk={checkForm}
        confirmLoading={addLoading}
        title="添加二级菜单"
        footer={
          <div style={{ textAlign: "center" }}>
            {current !== 0 && (
              <Button
                onClick={() => {
                  setCurrent(current - 1);
                }}
              >
                上一步
              </Button>
            )}
            <Button onClick={handleCancel}>取消</Button>
            {current !== 2 && <Button onClick={toNext}>下一步</Button>}
            {current === 2 && (
              <Button onClick={confirm} type="primary">
                保存
              </Button>
            )}
          </div>
        }
      >
        <Wrapper>
          <Steps size="small" current={current}>
            <Step title="菜单设置" />
            <Step title="提交审核设置" />
            <Step title="完成" />
          </Steps>
          <div />
        </Wrapper>
        {current === 0 && (
          <NavOne>
            <div>
              <div className="header">
                <span>一级菜单</span>
              </div>
              <ul>
                {props.params.map((item: any, index: any) => (
                  <li
                    className={item.id === checkedId ? "is-check" : ""}
                    onClick={() => onClickParent(item.id)}
                    key={item.id}
                  >
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="header">
                <span>二级菜单</span>
                <Button
                  size="small"
                  className="botton"
                  onClick={() => {
                    setAddVisible(true);
                  }}
                >
                  <i>添加</i>
                </Button>
              </div>
              <ul>
                {chilrenList.map((item: any, index: any) => (
                  <li key={index}>
                    <span>{item.name}</span>
                    <span
                      className="to-detele"
                      onClick={() => deteleSonData(item.name)}
                    >
                      ×
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </NavOne>
        )}

        {current === 1 && (
          <NavTwo>
            {allDataList.map((item: any, index: any) => (
              <Form key={index} ref={formRef}>
                <Row>
                  <Col span={4} className="label">
                    添加:
                  </Col>
                  <Col span={20}>
                    <Form.Field>
                      <span>
                        {item.parentName}/{item.childrenName}
                      </span>
                    </Form.Field>
                  </Col>
                </Row>
                <Row>
                  <Col span={4} className="label">
                    提交人:
                  </Col>
                  <Col span={20}>
                    <Form.Field name="submit">
                      <div onClick={() => openSelectPeopleModal(0, index)}>
                        <Select
                          mode="tags"
                          placeholder="提交人"
                          value={item.submit}
                          labelInValue={true}
                          style={{ width: "100%" }}
                          open={false}
                          onDeselect={(user: any) => onDeselect(user, 0, index)}
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
                    <Form.Field name="firstAudit">
                      <div onClick={() => openSelectPeopleModal(1, index)}>
                        <Select
                          mode="tags"
                          placeholder="审核人"
                          value={item.firstAudit}
                          labelInValue={true}
                          style={{ width: "100%" }}
                          open={false}
                          onDeselect={(user: any) => onDeselect(user, 1, index)}
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
                    <Form.Field name="secondAudit">
                      <div onClick={() => openSelectPeopleModal(2, index)}>
                        <Select
                          mode="tags"
                          placeholder="二级审核人"
                          value={item.secondAudit}
                          labelInValue={true}
                          style={{ width: "100%" }}
                          open={false}
                          onDeselect={(user: any) => onDeselect(user, 2, index)}
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
                    <Form.Field name="thirdAudit">
                      <div onClick={() => openSelectPeopleModal(3, index)}>
                        <Select
                          mode="tags"
                          placeholder="三级审核人"
                          value={item.thirdAudit}
                          labelInValue={true}
                          style={{ width: "100%" }}
                          onDeselect={(user: any) => onDeselect(user, 3, index)}
                          open={false}
                        />
                      </div>
                    </Form.Field>
                  </Col>
                </Row>
              </Form>
            ))}
          </NavTwo>
        )}
        {current === 2 && (
          <NavThree>
            {allDataList.map((item: any, index: any) => (
              <Form key={index} ref={formRef}>
                <Row>
                  <Col span={4} className="label">
                    一级菜单添加:
                  </Col>
                  <Col span={20}>
                    <Form.Field>
                      <span>{item.parentName}</span>
                    </Form.Field>
                  </Col>
                </Row>
                <Row>
                  <Col span={4} className="label">
                    二级菜单添加:
                  </Col>
                  <Col span={20}>
                    <Form.Field name="submit">
                      <div>{item.childrenName}</div>
                      {item.submit.length !== 0 && (
                        <div>
                          <span>提交人:</span>
                          {item.submit.map((o: any, index: any) => (
                            <span key={index}>{o.label}</span>
                          ))}
                        </div>
                      )}
                      {item.firstAudit.length !== 0 && (
                        <div>
                          <span>审核人:</span>
                          {item.firstAudit.map((o: any, index: any) => (
                            <span key={index}>{o.label}</span>
                          ))}
                        </div>
                      )}
                      {item.secondAudit.length !== 0 && (
                        <div>
                          <span>二级审核人:</span>
                          {item.secondAudit.map((o: any, index: any) => (
                            <span key={index}>{o.label}</span>
                          ))}
                        </div>
                      )}
                      {item.thirdAudit.length !== 0 && (
                        <div>
                          <span>三级审核人:</span>
                          {item.thirdAudit.map((o: any, index: any) => (
                            <span key={index}>{o.label}</span>
                          ))}
                        </div>
                      )}
                    </Form.Field>
                  </Col>
                </Row>
              </Form>
            ))}
          </NavThree>
        )}
      </Modal>
      <Modal
        width={400}
        visible={addVisible}
        onCancel={() => {
          setAddVisible(false);
          setInputValue("");
        }}
        onOk={addSonData}
        title="添加二级菜单"
      >
        <Input
          placeholder="请输入名称"
          value={inputValue}
          onChange={(e: any) => {
            setInputValue(e.target.value);
          }}
        />
        {isErrorText && (
          <span style={{ color: "red", display: "block", marginTop: "5px" }}>
            {isErrorText}
          </span>
        )}
      </Modal>
      <selectPeopleModal.Component onOkCallBack={onOkCallBack} />
    </Spin>
  );
}

const Spin = styled.div``;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const NavOne = styled.div`
  margin: 15px 20px;
  height: 400px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.25);
  font-size: 14px;

  div {
    width: 50%;
    box-sizing: border-box;
  }
  div:nth-child(1) {
    border-right: 1px solid #ccc;
  }

  .header {
    width: 100%;
    padding: 0 5px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: #ccc;

    .botton {
      margin: 8px 10px 0 0;
      i {
        font-style: normal;
      }
    }

    span {
      margin: 0 15px;
      // color: #fff;
    }
  }

  ul {
    padding: 0 !important;
    li {
      list-style-type: none;
      padding-left: 15px;
      box-sizing: border-box;
      line-height: 32px;
    }
    li: hover {
      cursor: pointer;
    }
  }

  .to-detele {
    display: block;
    float: right;
    margin-right: 10px;
    font-size: 20px;
  }

  .to-detele:hover {
    color: red;
  }

  .is-check {
    color: #00a680;
  }
`;

const NavTwo = styled.div`
  form {
    margin: 20px 37px;
    line-height: 32px;
  }
`;

const NavThree = styled.div`
  padding: 20px 30px;
  form {
    line-height: 25px;
  }
`;
