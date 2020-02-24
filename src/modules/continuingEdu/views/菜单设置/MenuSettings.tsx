import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import { Button, Modal, message as Message } from "antd";
import { meunSettingApi } from "./api/MeunSettingApi";
import FirstEditModal from "./modal/FirstEditModal"; // 一级菜单弹窗
import SecondEditModal from "./modal/SecondEditModal"; // 二级菜单弹窗

export default observer(function MenuSettings() {
  const [effect, setEffect] = useState(true);
  const [loading, setLoading] = useState(false); // loading
  const [tableList, setTableList] = useState([] as any); //表格数据
  const [submit, setSubmit] = useState(String); // 提交人
  const [first, setFrist] = useState(String); //一级审核
  const [second, setSecond] = useState(String); // 二级审核
  const [third, setThird] = useState(String); // 三级审核
  const [editVisible, setEditVisible] = useState(false); // 控制弹窗状态
  const [editParams, setEditParams] = useState({} as any); //修改回显数据
  const [editSecondVisible, setEditSecondVisible] = useState(false); // 控制弹窗状态

  useLayoutEffect(() => {
    setEffect(false);
  }, []);

  // 初始化
  useEffect(() => {
    setEffect(true);
    getTableData();
  }, []);

  const columns: any = [
    {
      title: "菜单设置",
      dataIndex: "name",
      align: "left"
    },
    {
      title: "排序",
      dataIndex: "sort",
      align: "center",
      width: 50
    },
    {
      title: "提交人",
      dataIndex: "submitEmployees",
      align: "center",
      width: 175,
      render(text: any, record: any, index: number) {
        if (record.submitEmployees) {
          let str = "";
          for (let i = 0; i < record.submitEmployees.length; i++) {
            if (i === record.submitEmployees.length - 1) {
              str += record.submitEmployees[i].empName;
            } else {
              str += record.submitEmployees[i].empName + "、";
            }
            setSubmit(str);
          }
          return submit;
        } else {
          return "--";
        }
      }
    },
    {
      title: "一级审核",
      dataIndex: "firstAuditEmployees",
      align: "center",
      width: 175,
      render(text: any, record: any, index: number) {
        if (record.firstAuditEmployees) {
          let str = "";
          for (let i = 0; i < record.firstAuditEmployees.length; i++) {
            if (i === record.firstAuditEmployees.length - 1) {
              str += record.firstAuditEmployees[i].empName;
            } else {
              str += record.firstAuditEmployees[i].empName + "、";
            }
            setFrist(str);
          }
          return first;
        } else {
          return "--";
        }
      }
    },
    {
      title: "二级审核",
      dataIndex: "secondAuditRoles",
      align: "center",
      width: 175,
      render(text: any, record: any, index: number) {
        if (record.secondAuditRoles) {
          let str = "";
          for (let i = 0; i < record.secondAuditRoles.length; i++) {
            if (i === record.secondAuditRoles.length - 1) {
              str += record.secondAuditRoles[i].roleName;
            } else {
              str += record.secondAuditRoles[i].roleName + "、";
            }
            setSecond(str);
          }
          return second;
        } else {
          return "--";
        }
      }
    },
    {
      title: "三级审核",
      dataIndex: "thirdAuditRoles",
      align: "center",
      width: 175,
      render(text: any, record: any, index: number) {
        if (record.thirdAuditRoles) {
          let str = "";
          for (let i = 0; i < record.thirdAuditRoles.length; i++) {
            if (i === record.thirdAuditRoles.length - 1) {
              str += record.thirdAuditRoles[i].roleName;
            } else {
              str += record.thirdAuditRoles[i].roleName + "、";
            }
            setThird(str);
          }
          return third;
        } else {
          return "--";
        }
      }
    },
    {
      title: "操作",
      dataIndex: "",
      width: 120,
      align: "center",
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => saveOrUpload(record)}>修改</span>
            <span onClick={() => handleDelete(record)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  // 查询
  const getTableData = () => {
    if (effect) {
      setLoading(true);
      meunSettingApi.getGetData().then((res: any) => {
        setLoading(false);
        if (res.data) {
          setTableList(res.data || []);
        }
      });
    }
  };

  //删除
  const handleDelete = (record: any) => {
    meunSettingApi.whetherPlan(record.id).then(res => {
      if (!res.data.flag) {
        Modal.confirm({
          title: "提示",
          content: "【新护士培训】已创建教学记录，无法删除",
          okText: "确定",
          onOk: () => {}
        });
      } else {
        Modal.confirm({
          title: "提示",
          content,
          okText: "确定",
          okType: "danger",
          cancelText: "取消",
          onOk: () => {
            meunSettingApi
              .del(record.id)
              .then(res => {
                if (res.code == 200) {
                  Message.success("文件删除成功");
                  getTableData();
                } else {
                  Message.error("文件删除失败");
                }
              })
              .catch(err => {
                Message.error("文件删除失败");
              });
          }
        });
      }
    });
    let content = (
      <div>
        <div>【操作培训】没有创建教学记录，确定是否删除？</div>
        <div> 删除后无法恢复。</div>
      </div>
    );
  };

  // 修改一级菜单
  const saveOrUpload = (record: any) => {
    if (record.key) {
      setEditParams({
        id: record.id,
        name: record.name,
        sort: record.sort
      });
      setEditVisible(true);
    } else {
      setEditParams(record);
      setEditSecondVisible(true);
    }
  };
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditSecondVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    getTableData();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <Con>
        <TopHeader>
          <div className="topHeaderTitle">
            <div className="title">菜单设置</div>
            <div className="topHeaderButton">
              <Button type="primary" onClick={() => setEditVisible(true)}>
                添加一级菜单
              </Button>
              <Button type="primary">添加二级菜单</Button>
            </div>
          </div>
        </TopHeader>
      </Con>
      <Content>
        <BaseTable
          rowKey={(record, index) => `complete${record.id}${index}`}
          loading={loading}
          columns={columns}
          dataSource={tableList}
          childrenColumnName="childList"
          type={[]}
          surplusWidth={300}
          surplusHeight={200}
        />
      </Content>
      <FirstEditModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <SecondEditModal
        visible={editSecondVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  /deep/.gWDyQg {
    background: #red !important;
  }
`;
const Content = styled(TabledCon)`
  padding: 0 15px;
  box-sizing: border-box;
`;
const Con = styled.div`
  height: 50px;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
  line-height: 50px;
`;
const TopHeader = styled.div`
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    .topHeaderButton {
      position: absolute;
      top: 5px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`;
