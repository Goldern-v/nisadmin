import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message, Tooltip } from "antd";
import { meunSettingApi } from "./api/MeunSettingApi";
import FirstEditModal from "./modal/FirstEditModal";
import SecondEditModal from "./modal/SecondEditModal";
import SecondAddModal from "./modal/SecondAddModal";
import PermissionSettingsModal from "./modal/PermissionSettingsModal"; // 菜单设置权限弹窗
import { selectPeopleViewModel } from "./modal/modal-two/SelectPeopleViewModel";
import { appStore, authStore } from "src/stores";

interface Props {
  getList: any;
}

export default observer(function MenuSettings(props: Props) {
  const [loading, setLoading] = useState(false); // loading
  const [tableList, setTableList] = useState([] as any); //表格数据
  const [editVisible, setEditVisible] = useState(false); // 控制一级弹窗状态
  const [editParams, setEditParams] = useState({} as any); //修改回显数据
  const [editSecondVisible, setEditSecondVisible] = useState(false); // 控制修改二级弹窗状态
  const [addSecondVisible, setAddSecondVisible] = useState(false); // 控制添加二级弹窗状态
  const [settingsEditVisible, setSettingsEditVisible] = useState(false); // 控制添加二级弹窗状态
  let canHandleBtn: any = appStore.HOSPITAL_ID !== 'hj' || (appStore.HOSPITAL_ID == 'hj' && authStore.isDepartment)

  // 初始化
  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    let dept = authStore.deptList.find(
      (dept: any) => dept.code == authStore.defaultDeptCode
    );
    selectPeopleViewModel.newSelectTreeDataAll[1].label = dept?.name
      || authStore.defaultDeptCodeName;
  }, [authStore.defaultDeptCode]);

  // 提交 审核 一级 二级 三级函数封装
  const setTextData = (data: any, type: any) => {
    if (data && data.length) {
      let str = "";
      let str1 = "";
      let semicolon = "";
      data.map((item: any, i: any) => {
        let text = type === 1 ? item.empName || "" : item.roleName || "";
        let semicolon1 = text && i !== data.length - 1 ? "、" : "";

        if (data.length < 4) {
          semicolon = text && i !== data.length - 1 ? "、" : "";
        } else {
          semicolon = text && i < 2 ? "、" : "";
        }
        if (i < 3) {
          str1 += text + semicolon;
        }
        str += text + semicolon1;
      });
      return data.length > 3 ? (
        <Tooltip placement="top" title={str}>
          {`${str1}...`}
        </Tooltip>
      ) : (
        str
      );
    } else {
      return "--";
    }
  };

  const fontWeight = (data: any) => {
    if (data) {
      return 900;
    }
  };

  const colorType = (data: any) => {
    if (!data) {
      return "#666";
    }
  };

  const columns: any = [
    {
      title: "菜单设置",
      dataIndex: "name",
      align: "left",
      onCell: (record: any, rowIndex: any) => ({
        style: {
          fontWeight: fontWeight(record.key)
        }
      })
    },
    {
      title: "排序",
      dataIndex: "sort",
      align: "center",
      width: 50,
      onCell: (record: any, rowIndex: any) => ({
        style: {
          fontWeight: fontWeight(record.key),
          color: colorType(record.key)
        }
      })
    },
    appStore.HOSPITAL_ID == "hj" && {
      title: "级别",
      dataIndex: "orgLevel",
      align: "center",
      width: 80,
      render: (text: any) => {
        return <span>{text == 1 ? "院级" : text == 3 ? "科级" : "无"}</span>;
      }
    },
    {
      title: "提交人",
      align: "center",
      width: 175,
      render(text: any, record: any, index: number) {
        let data: any =
          record.submitterType === 1
            ? record.submitEmployees
            : record.submitRoles;
        return setTextData(data, record.submitterType);
      }
    },
    {
      title: "一级审核",
      align: "center",
      width: 185,
      render(text: any, record: any, index: number) {
        let data: any =
          record.firstAuditorType === 1
            ? record.firstAuditEmployees
            : record.firstAuditRoles;
        return setTextData(data, record.firstAuditorType);
      }
    },
    {
      title: "二级审核",
      align: "center",
      width: 185,
      render(text: any, record: any, index: number) {
        let data: any =
          record.secondAuditorType === 1
            ? record.secondAuditEmployees
            : record.secondAuditRoles;
        return setTextData(data, record.secondAuditorType);
      }
    },
    {
      title: "三级审核",
      align: "center",
      width: 185,
      render(text: any, record: any, index: number) {
        let data: any =
          record.thirdAuditorType === 1
            ? record.thirdAuditEmployees
            : record.thirdAuditRoles;
        return setTextData(data, record.thirdAuditorType);
      }
    },
    {
      title: "操作",
      dataIndex: "",
      width: 120,
      align: "center",
      render(text: any, record: any, index: number) {
        return (
          canHandleBtn ?
            (<DoCon>
              <span onClick={() => saveOrUpload(record)}>修改</span>
              <span onClick={() => handleDelete(record)}>删除</span>
            </DoCon>) : <span>暂无操作权限</span>
        );
      }
    }
  ];

  // 查询
  const getTableData = () => {
    setLoading(true);
    meunSettingApi.getGetData().then((res: any) => {
      setLoading(false);
      if (res.data) {
        setTableList(res.data || []);
      }
    }).catch((err: any) => { });
    props.getList();
  };

  //删除
  const handleDelete = (record: any) => {
    meunSettingApi.whetherPlan(record.id).then(res => {
      if (res.data.flag === "1") {
        Modal.warning({
          title: "提示",
          content: `【${record.name}】已创建教学记录，无法删除`
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
        <div> 是否确定删除【{record.name}】? 删除后无法恢复。</div>
      </div>
    );
  };

  // 保存
  const saveOrUpload = (record?: any) => {
    if (record) {
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
    } else {
      setEditParams({
        sort: 1
      });
      setEditVisible(true);
    }
  };

  const handleEditCancel = () => {
    setEditVisible(false);
    setEditSecondVisible(false);
    setAddSecondVisible(false);
    setSettingsEditVisible(false);
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
              {authStore.isDepartment && (
                <Button onClick={() => setSettingsEditVisible(true)}>
                  菜单权限设置
                </Button>
              )}
              <Button onClick={getTableData}>刷新</Button>
              {canHandleBtn && (
                <span>
                  <Button type="primary" onClick={() => saveOrUpload()}>
                    添加一级菜单
              </Button>
                  <Button type="primary" onClick={() => setAddSecondVisible(true)}>
                    添加二级菜单
              </Button>
                </span>
              )}
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
        secondVisible={editSecondVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <SecondAddModal
        visible={addSecondVisible}
        params={tableList}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <PermissionSettingsModal
        visible={settingsEditVisible}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  .gWDyQg {
    background: red !important;
  }
`;
const Content = styled.div`
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
