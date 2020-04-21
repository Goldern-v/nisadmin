import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { quesBankView } from "../QuesBankView";
import { observer } from "mobx-react-lite";
import { TableHeadCon } from "src/components/BaseTable";
import { Radio, Select, Input, Button, Modal, message as Message } from "antd";
import ResultModal from "./modal/ResultModal";

export default observer(function CheckedContent() {
  const [selectedRows, setSelectedRows] = useState([]); // 选中数据全部信息
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中的KEY值
  const [idArr, setIdArr]: any = useState([]); // 选中id
  const [query, setQuery] = useState({
    type: "单选题", //题目类型
    keyWord: "", //关键字搜索
    pageIndex: 1,
    pageSize: 20
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [params, setParams] = useState("");

  useLayoutEffect(() => {
    getData();
  }, [query]);

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "题目",
      dataIndex: "questionContent",
      key: "questionContent",
      align: "left",
      render: (text: any) => {
        return <span>{text.replace(/##/g, "____")}</span>;
      }
    },
    {
      title: "类型",
      dataIndex: "questionType",
      key: "questionType",
      align: "center",
      width: 120
    },
    {
      title: "操作",
      dataIndex: "cz",
      key: "8",
      width: 150,
      align: "center",
      render: (text: any, record: any) => {
        return (
          <DoCon>
            <span
              onClick={() => {
                resultLook(record.id);
              }}
            >
              查看
            </span>
            <span
              onClick={() => {
                handleDel(1, record);
              }}
            >
              删除
            </span>
          </DoCon>
        );
      }
    }
  ];

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
        arr.push(item.id);
      });
      setIdArr(arr);
    }
  };

  // 初始化函数
  const getData = () => {};

  // 删除 current---1删除单条  2批量删除
  const handleDel = (current: any, record?: any) => {
    let content = (
      <div>
        <div>您确定要删除选中的题目吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        if (current === 1) {
          console.log(current, "current");
          quesBankView.questionList = quesBankView.questionList.filter(
            (item: any) => item.id !== record.id
          );
          quesBankView.questionList.map((item: any) => {
            quesBankView.questionIdList.push(item.id);
          });
        } else if (current === 2) {
          quesBankView.questionList = quesBankView.questionList.filter(
            (item: any) => idArr.indexOf(item.id) === -1
          );
          quesBankView.questionList.map((item: any) => {
            quesBankView.questionIdList.push(item.id);
          });
        }

        setLoading(true);
        setTimeout(() => {
          setSelectedRows([]);
          setSelectedRowKeys([]);
          setLoading(false);
          getData();
        }, 1000);
        Message.success("已成功删除");
      }
    });
  };

  //查看弹窗
  const resultLook = (id: any) => {
    setParams(id.toString());
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
  };
  const handleEditOk = () => {
    onCancel();
  };

  return (
    <Wrapper>
      <TopBar>
        <div>
          <Button
            className="checkButton"
            onClick={() => {
              handleDel(2);
            }}
          >
            删除
          </Button>
        </div>
        <div>
          <span>类型：</span>
          <Select
            style={{ width: 120 }}
            value={query.type}
            onChange={(val: string) => {
              setQuery({ ...query, type: val });
              query.pageIndex = 1;
              getData();
            }}
          >
            <Select.Option value="单选题">单选题</Select.Option>
            <Select.Option value="多选题">多选题</Select.Option>
            <Select.Option value="填空题">填空题</Select.Option>
            <Select.Option value="问答题">问答题</Select.Option>
          </Select>
          <Input
            style={{ width: 150, marginLeft: 5, marginRight: -5 }}
            placeholder="请输入要搜索的关键字"
            value={query.keyWord}
            onChange={e => {
              setQuery({ ...query, keyWord: e.target.value });
              getData();
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              quesBankView.onload();
            }}
          >
            查询
          </Button>
        </div>
      </TopBar>
      <BaseTable
        loading={loading}
        dataSource={quesBankView.questionList}
        rowSelection={rowSelection}
        columns={columns}
        surplusHeight={480}
        pagination={{
          current: query.pageIndex,
          total: quesBankView.questionList.length,
          pageSize: query.pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          onShowSizeChange: (pageIndex, pageSize) =>
            setQuery({ ...query, pageSize }),
          onChange: (pageIndex, pageSize) => setQuery({ ...query, pageIndex })
        }}
      />
      <ResultModal
        visible={visible}
        onCancel={onCancel}
        onOk={handleEditOk}
        params={params}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
const TopBar = styled(TableHeadCon)`
  height: 31px !important;
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 15px;
  }
  .ant-calendar-picker {
    margin-right: 15px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .ant-select-selection-selected-value span {
    color: #000 !important;
  }
`;
