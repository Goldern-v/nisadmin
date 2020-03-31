import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { appStore } from "src/stores/index";
import { Button, Modal, message as Message, Tabs } from "antd";
import qs from "qs";
import { notificationApi } from "../api/NotificationApi";
const { TabPane } = Tabs;

export default function TypeManagement() {
  const { history } = appStore;
  let title = qs.parse(appStore.location.search.replace("?", "")).title; // 标题
  let cetpId = Number(
    qs.parse(appStore.location.search.replace("?", "")).cetpId
  ); // 标题
  const [loading, setLoading] = useState(false); // loading
  const [tableList, setTableList] = useState([] as any); // 表格数据
  const [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  } as any); // 页码 ，每页条数
  const [dataTotal, setDataTotal] = useState(0 as number); // 总条数
  const [isReady, setIsReady] = useState([]); // 已读名单
  const [noReady, setNoReady] = useState([]); // 未读名单
  const [allEmpNos, setAllEmpNos] = useState([]); // 当页所有工号
  const [selectedRows, setSelectedRows] = useState([]); // 选中数据全部信息
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中的KEY值
  const [empNos, setEmpNos] = useState([]); // 选中的工号

  const columns: any = [
    {
      title: "序号",
      key: "序号",
      width: 50,
      align: "center",
      render(text: string, record: any, index: number) {
        return index + 1;
      }
    },
    {
      title: "姓名",
      dataIndex: "empName",
      key: "empName",
      width: 80,
      align: "center"
    },
    {
      title: "病区",
      dataIndex: "deptName",
      key: "deptName",
      width: 200,
      align: "center"
    },
    {
      title: "消息推送",
      dataIndex: "alReadysendedMessage",
      key: "alReadysendedMessage",
      align: "center",
      width: 90,
      render: (text: any) => {
        let color = "";
        let content = "未推送";
        switch (text) {
          case 1:
            color = "#284fc2";
            content = "已推送";
            break;
          case 0:
            color = "#E63122";
            break;
          default:
        }
        return <span style={{ color }}>{content}</span>;
      }
    },
    {
      title: "阅读时间",
      dataIndex: "readMessageTime",
      key: "readMessageTime",
      width: 140,
      align: "center"
    },
    {
      title: "是否已读",
      dataIndex: "alReadyreadMessage",
      key: "alReadyreadMessage",
      align: "center",
      width: 80,
      render: (text: any, record: any) => {
        return <span>{text === null ? "" : text === 1 ? "已读" : "未读"}</span>;
      }
    },
    {
      title: "操作",
      dataIndex: "empNo",
      key: "empNo",
      width: 120,
      align: "center",
      render(text: any) {
        return (
          <DoCon>
            <span onClick={() => pushData(1, text)}>重新推送</span>
          </DoCon>
        );
      }
    }
  ];

  // 初始化
  useLayoutEffect(() => {
    init();
  }, [query]);

  // 查询表格初始化数据
  const getTableData = () => {
    setLoading(true);
    let obj = {
      cetpId,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize
    };
    notificationApi.getResultData(obj).then(res => {
      setLoading(false);
      setTableList(res.data.list || []);
      setDataTotal(res.data.totalCount || 0);
      let arr: any = [];
      res.data.list.map((item: any) => {
        arr.push(item.empNo);
      });
      setAllEmpNos(arr);
    });
  };

  // 获取是否已读人员名单
  const readyPeople = () => {
    notificationApi.getReadMsgTaskList(cetpId).then(res => {
      setIsReady(
        res.data.filter((item: any, index: any) => item.alreadyReadMessage == 1)
      );
      setNoReady(
        res.data.filter((item: any, index: any) => item.alreadyReadMessage == 0)
      );
    });
  };

  // 初始化函数
  const init = () => {
    getTableData();
    readyPeople();
  };

  // 表格选中操作
  const rowSelection: any = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      let arr1: any = [];
      selectedRowKeys.map((item: any) => {
        arr1.push(selectedRows.filter((a: any) => a.key === item));
      });
      setSelectedRows(arr1);
      setSelectedRowKeys(selectedRowKeys);
      let arr: any = [];
      selectedRows.map((item: any) => {
        arr.push(item.empNo);
      });
      setEmpNos(arr);
    },
    hideDefaultSelections: false,
    selections: [
      {
        key: "allNo",
        text: "全部不选",
        onSelect: (changableRowKeys: any) => {
          setEmpNos([]);
          setSelectedRows([]);
          setSelectedRowKeys([]);
        }
      }
    ]
  };

  // 推送 ---current：1单条 2全部 3选中
  const pushData = (current: any, record?: any) => {
    let obj: any = { cetpId };
    let world: any = "您确定要重新推送该条消息吗？";
    if (current === 1) {
      obj.empNos = [record];
    } else if (current === 2) {
      world = "您确定要全部重新推送吗？";
      notificationApi.getResultData({ cetpId }).then(res => {
        let arr: any = [];
        res.data.list.map((item: any) => {
          arr.push(item.empNo);
        });
        obj.empNos = arr.slice();
      });
    } else if (current === 3) {
      world = "您确定要重新推送选中消息吗？";
      if (empNos.length > 0) {
        obj.empNos = empNos.slice();
      } else {
        Message.warning("推送前请至少选择一名员工");
        return;
      }
    }
    let content = (
      <div>
        <div>{world}</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        notificationApi.pushData(obj).then(res => {
          let success = res.data.successList.length;
          let fail = res.data.failureList.length;
          let total = success + fail;
          let content = (
            <div>
              <div>
                总共推送{total}人，异常{fail}人，完成推送{success}人！
              </div>
            </div>
          );
          Modal.warning({
            title: res.data.resultCode === "fail" ? "推送失败" : "推送成功",
            content,
            okText: "确定",
            onOk: () => {}
          });
        });
      }
    });
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
              <Button type="primary" onClick={() => pushData(2)}>
                全部重新推送
              </Button>
              <Button onClick={() => history.goBack()}>返回</Button>
            </div>
          </div>
        </TopHeader>
      </Con>
      <Content>
        <Table>
          <BaseTable
            loading={loading}
            columns={columns}
            dataSource={tableList}
            rowSelection={rowSelection}
            surplusHeight={245}
            pagination={{
              onChange: (pageIndex, pageSize) =>
                setQuery({ ...query, pageIndex }),
              total: dataTotal,
              pageSize: query.pageSize,
              current: query.pageIndex
            }}
          />
        </Table>
        <People>
          <Tabs defaultActiveKey="1">
            <TabPane tab={`已读（${isReady.length}）`} key="1">
              {isReady && isReady.length > 0 ? (
                <div>youshuju</div>
              ) : (
                <div className="noData">暂无数据</div>
              )}
            </TabPane>
            <TabPane tab={`未读（${noReady.length}）`} key="2">
              {noReady && noReady.length > 0 ? (
                <ul>
                  {noReady.map((item: any, index: any) => (
                    <li key={index}>
                      <img
                        className="head-img"
                        src={require("../images/护士默认头像.png")}
                        alt=""
                      />
                      <p>{item.empName}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="noData">暂无数据</div>
              )}
            </TabPane>
          </Tabs>
        </People>
        <div className="btn">
          <Button onClick={() => pushData(3)}>推送选中</Button>
        </div>
      </Content>
    </Wrapper>
  );
}
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
  display: flex;
  position: relative;
  .btn {
    position: absolute;
    bottom: 10px;
    left: 30px;
  }
`;
const Table = styled.div`
  width: calc(100% - 400px);
`;
const People = styled.div`
  width: 500px;
  height: calc(100vh - 132px);
  border-left: 3px solid #fafafa;
  box-sizing: border-box;
  background: white;
  padding: 0 15px;
  /deep/ .ant-tabs-nav .ant-tabs-tab {
    width: 200px;
    text-align: center;
  }
  ul {
    padding: 0 0 0 15px !important;
    height: calc(100vh - 195px);
    overflow-y: auto;
  }
  li {
    display: inline-block;
    height: 90px;
    width: 90px;
    margin-right: 15px;
    margin-bottom: 10px;
    text-align: center;
    .head-img {
      width: 60px;
      height: 60px;
      margin: auto;
      display: block;
      object-fit: contain;
      margin-bottom: 10px;
    }
  }
  .noData {
    text-align: center;
    line-height: calc(100vh - 190px);
    font-size: 25px;
    color: #ccc;
  }
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
