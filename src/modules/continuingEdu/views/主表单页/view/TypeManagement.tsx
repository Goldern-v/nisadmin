import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { withRouter } from "react-router-dom";
import { appStore } from "src/stores/index";
import { Button, Modal, message as Message } from "antd";
import qs from "qs";
import { mainPageApi } from "../api/MainPageApi";
import { meunSettingApi } from "../../菜单设置/api/MeunSettingApi";
import TypeEditModal from "../modal/TypeEditModal"; // 一级菜单弹窗
import createModal from "src/libs/createModal";

export default withRouter(
  observer(function TypeManagement() {
    const [titleType, setTitleType] = useState({} as any); // 存放路由跳转参数
    const [loading, setLoading] = useState(false); // loading
    const [tableList, setTableList] = useState([] as any); //表格数据
    const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
    const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
    let id = qs.parse(appStore.location.search.replace("?", "")).id;
    let Pid = qs.parse(appStore.location.search.replace("?", "")).Pid;
    const { history } = appStore;
    const typeEditModal = createModal(TypeEditModal);

    const columns: any = [
      {
        title: "序号",
        width: 50,
        align: "center",
        render(text: string, record: any, index: number) {
          return index + 1;
        }
      },
      {
        title: "名称",
        dataIndex: "name",
        align: "left"
      },
      {
        title: "教学方式",
        dataIndex: "teachingMethodName",
        align: "center",
        width: 200
      },
      {
        title: "显示顺序",
        dataIndex: "sort",
        align: "center",
        width: 100
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

    // 初始化
    useEffect(() => {
      setTitleType(qs.parse(appStore.location.search.replace("?", "")));
      getTableData();
    }, []);

    // 查询表格初始化数据
    const getTableData = () => {
      setLoading(true);
      mainPageApi.getTypeData(id).then(res => {
        if (res.data) {
          setLoading(false);
          setTableList(res.data);
        }
      });
    };

    //删除
    const handleDelete = (record: any) => {
      let content = (
        <div>
          <div>删除只会将类型名称删除，原先创建的记录还保留教学方式不变</div>
          <div>您确定要删除选中的记录吗？</div>
        </div>
      );
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
    };

    // 修改一级菜单
    const saveOrUpload = (record?: any) => {
      if (record) {
        setEditParams({
          id: record.id,
          name: record.name,
          sort: record.sort
        });
      } else {
        setEditParams({
          Pid: id
        });
      }
      setEditVisible(true);
    };
    const handleEditCancel = () => {
      setEditVisible(false);
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
            <BreadcrumbBox
              style={{
                paddingLeft: 0,
                paddingTop: 10,
                paddingBottom: 2,
                background: "rgba(0, 0, 0, 0)"
              }}
              data={[
                // continuingEdu/病区培训2?Pid=23&id=25
                {
                  name: `${titleType.type}`,
                  link: `/continuingEdu/${titleType.type}?Pid=${Pid}&id=${id}`
                },
                {
                  name: "类型管理"
                }
              ]}
            />
            <div className="topHeaderTitle">
              <div className="title">类型管理</div>
              <div className="topHeaderButton">
                <Button type="primary" onClick={() => saveOrUpload()}>
                  添加类型
                </Button>
                <Button onClick={() => history.goBack()}>返回</Button>
              </div>
            </div>
          </TopHeader>
        </Con>
        <Content>
          <BaseTable
            loading={loading}
            columns={columns}
            dataSource={tableList}
            surplusWidth={300}
            surplusHeight={205}
          />
        </Content>
        <TypeEditModal
          visible={editVisible}
          params={editParams}
          onCancel={handleEditCancel}
          onOk={handleEditOk}
        />
        <typeEditModal.Component />
      </Wrapper>
    );
  })
);
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  /deep/.gWDyQg {
    background: #red !important;
  }
`;
const Content = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
`;
const Con = styled.div`
  height: 60px;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;
const TopHeader = styled.div`
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    .topHeaderButton {
      position: absolute;
      top: 68px;
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
