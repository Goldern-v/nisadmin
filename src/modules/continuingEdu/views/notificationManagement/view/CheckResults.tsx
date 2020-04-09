import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { appStore } from "src/stores/index";
import { Button, Modal, message as Message, Tabs } from "antd";
import qs from "qs";
import { notificationApi } from "../api/NotificationApi";
const { TabPane } = Tabs;
import PushModal from "../modal/PushModal"; // 一级菜单弹窗

export default function TypeManagement() {
  const { history } = appStore;
  let title = qs.parse(appStore.location.search.replace("?", "")).title; // 标题
  let cetpId = Number(
    qs.parse(appStore.location.search.replace("?", "")).cetpId
  ); // 标题
  let noticeContent =
    qs.parse(appStore.location.search.replace("?", "")).noticeContent || ""; // 内容
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
  const [empNames, setEmpNames] = useState([]); // 选中的员工名
  const [arrEmpNos, setArrEmpNos] = useState([]); // 所有工号
  const [arrEmpNames, setArrEmpNames] = useState([]); // 所有员工名
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [historyData, setHistoryData] = useState([]); // 历史推动消息

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
      render(text: any, record: any) {
        return (
          <DoCon>
            <span onClick={() => pushData(1, record)}>重新推送</span>
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
    // 获取当页数据
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
    // 获取全部数据
    let arrEmpNo: any = [];
    let arrEmpName: any = [];
    notificationApi.getResultData({ cetpId }).then(res => {
      res.data.list.map((item: any) => {
        arrEmpNo.push(item.empNo);
        arrEmpName.push(item.empName);
      });
    });
    setArrEmpNos(arrEmpNo);
    setArrEmpNames(arrEmpName);
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

  // 获取消息发送历史
  const historyMessage = () => {
    notificationApi.getHistoryData(cetpId).then(res => {
      if (res.data) {
        setHistoryData(res.data);
      }
    });
  };

  // 初始化函数
  const init = () => {
    getTableData();
    readyPeople();
    historyMessage();
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
      let arrEmpNo: any = [];
      let arrEmpName: any = [];
      selectedRows.map((item: any) => {
        arrEmpNo.push(item.empNo);
        arrEmpName.push(item.empName);
      });
      setEmpNos(arrEmpNo);
      setEmpNames(arrEmpName);
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
  const pushData = (current: any, record?: any, data?: any) => {
    if (current === 1 && typeof record !== "number") {
      setEditParams({
        cetpId,
        noticeContent,
        id: 1,
        empNos: [record.empNo],
        empNames: [record.empName]
      });
    } else if (current === 2) {
      setEditParams({
        cetpId,
        noticeContent,
        id: 1,
        empNos: arrEmpNos.slice(),
        empNames: arrEmpNames.slice()
      });
    } else if (current === 3) {
      if (empNos.length > 0) {
        setEditParams({
          cetpId,
          noticeContent,
          id: 1,
          empNos: empNos.slice(),
          empNames: empNames.slice()
        });
      } else {
        Message.warning("推送前请至少选择一名员工");
        return;
      }
    } else if (typeof current === "string" && typeof record === "number") {
      let arr: any = [];
      data.map((item: any) => {
        arr.push(item.empName);
      });
      setEditParams({
        noticeContent: current,
        empNames: arr
      });
    }
    setEditVisible(true);
  };

  // const pushData = (current: any, record?: any) => {
  //   let obj: any = { cetpId };
  //   // let world: any = "您确定要重新推送该条消息吗？";
  //   if (current === 1) {
  //     obj.empNos = [record];
  //   } else if (current === 2) {
  //     // world = "您确定要全部重新推送吗？";
  //     notificationApi.getResultData({ cetpId }).then(res => {
  //       let arr: any = [];
  //       res.data.list.map((item: any) => {
  //         arr.push(item.empNo);
  //       });
  //       obj.empNos = arr.slice();
  //     });
  //   } else if (current === 3) {
  //     // world = "您确定要重新推送选中消息吗？";
  //     if (empNos.length > 0) {
  //       obj.empNos = empNos.slice();
  //     } else {
  //       Message.warning("推送前请至少选择一名员工");
  //       return;
  //     }
  //   }
  //   let content = (
  //     <div>
  //       <div>您确定要重新推送“{noticeContent}”吗</div>
  //     </div>
  //   );
  //   Modal.confirm({
  //     title: "提示",
  //     content,
  //     okText: "确定",
  //     cancelText: "取消",
  //     onOk: () => {
  //       notificationApi.pushData(obj).then(res => {
  //         let success = res.data.successList.length;
  //         let fail = res.data.failureList.length;
  //         let total = success + fail;
  //         let content = (
  //           <div>
  //             总共推送{total}人，异常{fail}人，完成推送{success}人！
  //           </div>
  //         );
  //         Modal.warning({
  //           title: res.data.resultCode === "fail" ? "推送失败" : "推送成功",
  //           content,
  //           okText: "确定",
  //           onOk: () => {}
  //         });
  //       });
  //     }
  //   });
  // };

  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    init();
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
          <Tabs defaultActiveKey="3">
            <TabPane tab={`推送（${historyData.length}）`} key="3">
              {historyData && historyData.length > 0 ? (
                <ul className="ul1">
                  {historyData.map((item: any, index: any) => (
                    <li
                      key={index}
                      className="li1"
                      onClick={() =>
                        pushData(
                          item.noticeContent,
                          5,
                          item.messageRecipientList
                        )
                      }
                    >
                      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                        {item.noticeContent}
                      </div>
                      <div className="messageName">
                        <span>
                          {item.messageRecipientList.length > 1
                            ? `${item.messageRecipientList[0].empName}等${
                                item.messageRecipientList.length
                              }人`
                            : item.messageRecipientList[0].empName}
                        </span>
                        <span>{item.sendTime}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="noData">暂无推送</div>
              )}
            </TabPane>
            <TabPane tab={`已读（${isReady.length}）`} key="1">
              {isReady && isReady.length > 0 ? (
                <ul className="ul2">
                  {isReady.map((item: any, index: any) => (
                    <li key={index} className="li2">
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
            <TabPane tab={`未读（${noReady.length}）`} key="2">
              {noReady && noReady.length > 0 ? (
                <ul className="ul2">
                  {noReady.map((item: any, index: any) => (
                    <li key={index} className="li2">
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
      <PushModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
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
    width: 123px;
    text-align: center;
  }
  ul {
    padding: 0 0 0 15px !important;
    height: calc(100vh - 195px);
    overflow-y: auto;
  }
  .li2 {
    display: inline-block;
    height: 90px;
    width: 90px;
    margin-right: 14px;
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
  .ul1 {
    padding: 5px 10px !important;
  }
  .li1 {
    width: 100%;
    height: 80px;
    cursor: pointer;
    list-style-type: none;
    padding: 15px 20px;
    border-bottom: 1px dashed #eee;
    .messageName {
      display: flex;
      justify-content: space-between;
      color: #a3a3a3;
    }
  }
  .li1: hover {
    background: rgba(245, 245, 245, 1);
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
