import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { Row, Col, Modal, message as Message, Button, Tag, Spin } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import createModal from "src/libs/createModal";
import SelectPeopleModal from "./modal-two/SelectPeopleModal";
import { meunSettingApi } from "../api/MeunSettingApi";

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export interface CheckUserItem {
  key: string;
  userList: any[];
}

export default function PermissionSettingsModal(props: Props) {
  const selectPeopleModal = createModal(SelectPeopleModal);
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [loading, setLoading] = useState(false); // 表单加载
  const [peopleData, setPeopleData]: any = useState([]); // 确定加载

  // 初始化
  useLayoutEffect(() => {
    if (visible) {
      setTimeout(() => {
        // 获取已有权限名单
        setLoading(true);
        meunSettingApi.getNursingData().then((res: any) => {
          setLoading(false);
          setPeopleData(
            res.data.authPersonList &&
              res.data.authPersonList.map((item: any) => {
                return {
                  empName: item.authPersonName,
                  empNo: item.authPerson,
                  key: item.authPerson,
                  label: item.authPersonName
                };
              })
          );
        });
      }, 100);
    }
  }, [visible]);

  //保存确认
  const checkForm = () => {
    if (peopleData && peopleData.length > 0) {
      const authPersonList: any = peopleData.map((item: any) => {
        return {
          authType: 1,
          authPersonName: item.empName,
          authPerson: item.empNo
        };
      });
      const obj: any = {
        menuCode: "nm_lat_menusetting",
        authPersonList
      };
      setEditLoading(true);
      meunSettingApi.saveNursingData(obj).then(res => {
        setEditLoading(false);
        if (res.code == 200) {
          Message.success("已成功保存");
          onOk();
          setPeopleData([]);
        }
      });
    } else {
      Message.warning("保存前请添加至少一位人员");
    }
  };

  // 添加人员弹框
  const openSelectPeopleModal = () => {
    selectPeopleModal.show({
      checkedUserList: peopleData || [],
      messageType: 2,
      type: 0,
      presentIndex: 0
    });
  };

  // 确定回显值
  const onOkCallBack = (checkedUserList: CheckUserItem[]) => {
    setPeopleData(handleParamsData(checkedUserList));
  };

  // 处理已选人员数据
  const handleParamsData = (checkedUserList: any) => {
    let newData: any = [];
    checkedUserList.map((item: any) => {
      if (item.empName && item.empNo) {
        newData.push(item);
      } else if (item.userList && item.userList.length > 0) {
        item.userList.map((o: any) => {
          let obj: any = {
            empName: o.empName ? o.empName : "",
            empNo: o.empNo ? o.empNo : ""
          };
          newData.push(obj);
        });
      }
    });
    return newData;
  };

  // 关闭标签
  const closeTag = (e: any, item: any) => {
    e.preventDefault();
    setPeopleData(peopleData.filter((o: any) => o.empNo !== item.empNo));
  };

  // 取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
    setPeopleData([]);
  };

  return (
    <AllContent>
      <Modal
        width={600}
        visible={visible}
        onCancel={handleCancel}
        onOk={checkForm}
        confirmLoading={editLoading}
        title="菜单权限设置"
        okText="保存"
      >
        <Spin spinning={loading}>
          <Wrapper>
            <Form>
              <Row>
                <Col span={4} className="label">
                  添加人员:
                </Col>
                <Col span={20}>
                  <Button
                    type="primary"
                    onClick={() => openSelectPeopleModal()}
                  >
                    + &nbsp;&nbsp;添加
                  </Button>
                  <Button
                    onClick={() => setPeopleData([])}
                    style={{ marginLeft: "15px" }}
                  >
                    置空
                  </Button>
                </Col>
              </Row>
              <Row className="row">
                <Col span={4} className="label" />
                <Col span={20}>
                  <ul className="ul">
                    {peopleData &&
                      peopleData.map((item: any, index: any) => (
                        <Tag
                          key={index}
                          className="empNames"
                          closable
                          onClose={(e: any) => {
                            closeTag(e, item);
                          }}
                        >
                          {item.empName}
                        </Tag>
                      ))}
                  </ul>
                </Col>
              </Row>
            </Form>
          </Wrapper>
        </Spin>
      </Modal>
      <selectPeopleModal.Component onOkCallBack={onOkCallBack} />
    </AllContent>
  );
}
const AllContent = styled.div``;

const Wrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  .row {
    margin-top: 15px;
  }
  .label {
    line-height: 32px;
  }
  .ul {
    min-height: 100px;
    max-height: 170px;
    overflow-y: scroll;
    margin-bottom: 30px;
    border: 1px solid #d9d9d9;
    padding: 15px 15px 5px 15px !important;
    box-sizing: border-box;
    border-radius: 5px;
    .empNames {
      display: inline-block;
      padding: 2px 10px;
      line-height: 23px;
      background: #f2f2f2;
      margin: 0 10px 10px 0;
      border-radius: 5px;
      color: #333;
    }
  }
`;
