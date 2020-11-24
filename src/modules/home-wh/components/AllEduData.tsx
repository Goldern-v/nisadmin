import styled from "styled-components";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Select, Button, Input } from "src/vendors/antd";
import { observer } from "src/vendors/mobx-react-lite";
import { appStore } from "src/stores";
import HomeApi from "src/modules/home-wh/api/HomeApi.ts";
import OnDetailCheck from "../common/OnDetailCheck";

interface Props {
  getId: any;
  addRecordModal: any;
}

export default observer(function Table(props: Props) {
  const [tableList, setTableList] = useState([]); // 表格数据
  const [tableLoading, setTableLoading] = useState(false); // loading

  const [query, setQuery] = useState({
    readStatus: "",
    noticeType: "",
    keyWord: "", //关键字搜索
    pageIndex: 1,
    pageSize: 20
  }); // 入参

  // 初始化表格数据
  useEffect(() => {
    onload();
  }, [query]);

  const onload = () => {
    setTableLoading(true);
    HomeApi.getMyNotificationsByPageForPc(query).then(res => {
      setTableLoading(false);
      setTableList(res.data.list || []);
    });
  };

  const columns: any = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "类型",
      dataIndex: "noticeTypeName",
      align: "center",
      width: 80
    },
    {
      title: "标题",
      dataIndex: "title",
      align: "left",
      width: 150
    },
    {
      title: "通知类容",
      dataIndex: "noticeContent",
      align: "left",
      width: 250
    },
    {
      title: "通知时间",
      dataIndex: "createTime",
      align: "center",
      width: 120
    },
    {
      title: "状态",
      dataIndex: "alreadyRead",
      align: "center",
      width: 80,
      render: (text: any) => {
        return <span>{text == 1 ? "已读" : "未读"}</span>;
      }
    },
    {
      title: "操作",
      width: 100,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => OnDetailCheck(record)}>查看详情</span>
          </DoCon>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <Header>
        <LeftIcon>当前位置：首页》继续教育通知〉更多</LeftIcon>
        <RightIcon>
          <span>状态：</span>
          <Select
            style={{ width: 200, marginRight: "10px" }}
            value={query.readStatus}
            onChange={(val: string) => {
              setQuery({ ...query, readStatus: val, pageIndex: 1 });
            }}
          >
            <Select.Option value="">全部</Select.Option>
            <Select.Option value={0}>未读</Select.Option>
            <Select.Option value={1}>已读</Select.Option>
          </Select>
          <span>通知类型：</span>
          <Select
            style={{ width: 200, marginRight: "10px" }}
            value={query.noticeType}
            onChange={(val: string) => {
              setQuery({ ...query, noticeType: val, pageIndex: 1 });
            }}
          >
            <Select.Option value="">全部</Select.Option>
            <Select.Option value={1}>发布任务</Select.Option>
            <Select.Option value={2}>发布成绩</Select.Option>
          </Select>
          <Input
            style={{ width: 250, marginRight: "10px" }}
            placeholder="请输入要搜索的关键字"
            value={query.keyWord}
            onChange={e => {
              setQuery({ ...query, keyWord: e.target.value, pageIndex: 1 });
            }}
          />
          <Button
            onClick={() => onload()}
            type="primary"
            style={{ marginRight: "10px" }}
          >
            查询
          </Button>
          <Button onClick={() => appStore.history.push("/home")}>返回</Button>
        </RightIcon>
      </Header>
      <BaseTable
        loading={tableLoading}
        dataSource={tableList}
        columns={columns}
        surplusWidth={300}
        surplusHeight={250}
        pagination={{
          current: query.pageIndex,
          total: tableList.length,
          pageSize: query.pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          onShowSizeChange: (pageIndex, pageSize) =>
            setQuery({ ...query, pageSize }),
          onChange: (pageIndex, pageSize) => setQuery({ ...query, pageIndex })
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
const Header = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
  height: 80px;
`;
const LeftIcon = styled.div`
  padding: 0;
  float: left;
  margin-top: 15px;
  font-size: 15px;
  font-weight: bold;
`;
const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  margin-top: 30px;
`;
