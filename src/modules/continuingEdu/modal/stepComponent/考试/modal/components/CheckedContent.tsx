import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { quesBankView } from "../QuesBankView";
import { observer } from "mobx-react-lite";
import { TableHeadCon } from "src/components/BaseTable";
import { Select, Input, Button, message as Message } from "antd";
import ResultModal from "./modal/ResultModal";

export default observer(function CheckedContent() {
  const [selectedList, setSelectedList] = useState([]); // 筛选出的数据集合
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中的KEY值
  const [idArr, setIdArr]: any = useState([]); // 选中id
  const [query, setQuery] = useState({
    keyWord: "", //关键字搜索
    pageIndex: 1,
    pageSize: 20
  });
  const [type, setType] = useState("全部"); //题目类型
  const [loading, setLoading] = useState(false); // 表格loading
  const [visible, setVisible] = useState(false); // 控制弹窗
  const [params, setParams] = useState(""); // 弹窗参数

  // 初始化
  useLayoutEffect(() => {
    setSelectedList(quesBankView.questionList);
    getData();
  }, [quesBankView.questionList]);

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
                resultLook(record);
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
      setSelectedRowKeys(selectedRowKeys);
      let arr: any = [];
      selectedRows.map((item: any) => {
        arr.push(item.id);
      });
      setIdArr(arr);
    }
  };

  // 初始化函数
  const getData = (val?: any) => {
    setLoading(true);
    let value = val || type;
    setTimeout(() => {
      // 过略题目类型
      let data: any = [];
      if (value === "全部") {
        data = quesBankView.questionList;
      } else {
        data = quesBankView.questionList.filter((item: any) => {
          return item.questionType === value;
        });
      }
      // 过略关键字
      if (query.keyWord !== "") {
        data = data.filter(
          (item: any) => item.questionContent.indexOf(query.keyWord) > -1
        );
      }
      setSelectedList(data);
      setQuery({ ...query, pageIndex: 1 });
      setLoading(false);
      setIdArr([]);
      quesBankView.onload();
    }, 500);
  };

  // 删除 current---1删除单条  2批量删除
  const handleDel = (current: any, record?: any) => {
    if (current === 1) {
      quesBankView.questionList = quesBankView.questionList.filter(
        (item: any) => item.id !== record.id
      );
    } else if (current === 2) {
      quesBankView.questionList = quesBankView.questionList.filter(
        (item: any) => idArr.indexOf(item.id) === -1
      );
    }
    quesBankView.questionIdList = quesBankView.questionList.map(
      (o: any) => o.id
    );
    quesBankView.questionNum();
    setSelectedRowKeys([]);
    getData();
    Message.success("已成功删除");
  };

  //查看弹窗
  const resultLook = (record: any) => {
    setParams(record);
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
            disabled={idArr && idArr.length === 0}
          >
            删除
          </Button>
        </div>
        <div>
          <span>类型：</span>
          <Select
            style={{ width: 120 }}
            value={type}
            onChange={(val: string) => {
              setType(val);
              console.log(val, type);
              query.pageIndex = 1;
              getData(val);
            }}
          >
            <Select.Option value="全部">全部</Select.Option>
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
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              getData();
            }}
          >
            查询
          </Button>
        </div>
      </TopBar>
      <Content>
        <BaseTable
          loading={loading}
          dataSource={selectedList}
          rowSelection={rowSelection}
          columns={columns}
          surplusHeight={410}
          pagination={{
            current: query.pageIndex,
            total: selectedList.length,
            pageSize: query.pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            onShowSizeChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageSize }),
            onChange: (pageIndex, pageSize) => setQuery({ ...query, pageIndex })
          }}
        />
      </Content>
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
const Content = styled.div``;
