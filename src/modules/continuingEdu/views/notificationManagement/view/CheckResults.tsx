import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { withRouter } from "react-router-dom";
import { appStore } from "src/stores/index";
import { Button, Modal, message as Message } from "antd";
import qs from "qs";
import { notificationApi } from "../api/NotificationApi";

export default withRouter(
  observer(function TypeManagement() {
    let title = qs.parse(appStore.location.search.replace("?", "")).title; // 标题
    const [loading, setLoading] = useState(false); // loading
    const [tableList, setTableList] = useState([] as any); //表格数据
    const { history } = appStore;
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
        title: "姓名",
        dataIndex: "",
        width: 80,
        align: "left"
      },
      {
        title: "病区",
        dataIndex: "",
        width: 120,
        align: "center"
      },
      {
        title: "消息推送",
        dataIndex: "",
        align: "center",
        width: 90
      },
      {
        title: "阅读时间",
        dataIndex: "",
        width: 140,
        align: "center"
      },
      {
        title: "是否已读",
        dataIndex: "",
        align: "center",
        width: 80
      },
      {
        title: "操作",
        dataIndex: "",
        width: 120,
        align: "center",
        render(text: any, record: any, index: number) {
          return (
            <DoCon>
              <span>修改</span>
              <span>删除</span>
            </DoCon>
          );
        }
      }
    ];

    // 初始化
    useEffect(() => {
      getTableData();
    }, []);

    // 查询表格初始化数据
    const getTableData = () => {};

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
                {
                  name: "通知管理",
                  link: `/continuingEdu/通知管理`
                },
                {
                  name: `${title}`
                }
              ]}
            />
            <div className="topHeaderTitle">
              <div className="title">{title}</div>
              <div className="topHeaderButton">
                <Button type="primary">重新推送</Button>
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
