import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Tooltip } from "antd";
import { appStore, authStore } from "src/stores";
import TypeAddModal from "./modal/TypeAddModal";
import { typeManagementModal } from "./TypeManagementModal";
interface Props { }

export default observer(function TypeManagement(props: Props) {
  const [editVisible, setEditVisible] = useState(false); // 控制弹窗状态

  // 表格列
  const columns: any = [
    {
      title: "菜单设置",
      dataIndex: "name",
      align: "left",
      width: 180,
      onCell: (record: any) => ({
        style: {
          fontWeight: fontWeight(record.key)
        }
      })
    },
    {
      title: "类型",
      dataIndex: "teachingTypeList",
      align: "left",
      onCell: () => ({
        style: {
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          cursor: "pointer"
        }
      }),
      render(text: any) {
        return setTextData(text);
      }
    },
    {
      title: "类型数量",
      dataIndex: "teachingTypeCount",
      align: "center",
      width: 120
    },
    {
      title: "操作",
      dataIndex: "childList",
      width: 100,
      align: "center",
      render(text: any, record: any) {
        return (
          record.level !== 2 ? '' : appStore.HOSPITAL_ID !== 'hj' && record.level == 2 || (appStore.HOSPITAL_ID == 'hj' && authStore.isDepartment && record.level == 2) ? (
            <DoCon>
              <span
                onClick={() => {
                  let name =
                    typeManagementModal.tableList.find((item: any) => {
                      return (
                        item.childList &&
                        item.childList.find(
                          (child: any) => child.id == record.id
                        )
                      );
                    }).name || "";
                  appStore.history.push(
                    `/typeManagement?id=${record.id}&pName=${name}&name=${record.name
                    }`
                  );
                }}
              >
                管理
              </span>
            </DoCon>
          ) : <span>暂无操作权限</span>
        );
      }
    }
  ];

  // 初始化函数
  useLayoutEffect(() => {
    typeManagementModal.onload();
  }, []);

  //省略tip
  const setTextData = (data: any) => {
    if (data && data.length) {
      let str = "";
      data.map((item: any, i: any) => {
        let text = item.name || "";
        let semicolon = text && i !== data.length - 1 ? "、" : "";
        str += text + semicolon;
      });
      return (
        <Tooltip placement="top" title={str}>
          {str}
        </Tooltip>
      );
    } else {
      return "";
    }
  };

  // 父菜单字体加粗
  const fontWeight = (data: any) => {
    if (data) {
      return 900;
    }
  };

  //取消关闭弹窗
  const handleEditCancel = () => {
    setEditVisible(false);
  };
  const handleEditOk = () => {
    typeManagementModal.onload();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <Con>
        <TopHeader>
          <div className="topHeaderTitle">
            <div className="title">类型管理</div>
            <div className="topHeaderButton">
              {(appStore.HOSPITAL_ID !== 'hj' || (appStore.HOSPITAL_ID == 'hj' && authStore.isDepartment)) && <Button onClick={() => setEditVisible(true)}>添加类型</Button>}
            </div>
          </div>
        </TopHeader>
      </Con>
      <Content>
        <BaseTable
          rowKey={(record, index) => `complete${record.id}${index}`}
          loading={typeManagementModal.tableLoading}
          columns={columns}
          dataSource={typeManagementModal.tableList}
          childrenColumnName="childList"
          surplusWidth={300}
          surplusHeight={200}
        />
      </Content>
      <TypeAddModal
        visible={editVisible}
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
