import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { quesBankView } from "../QuesBankView";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import ResultModal from "./modal/ResultModal";

export default observer(function Table() {
  const [selectedRows, setSelectedRows] = useState([]); // 选中数据全部信息
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中的KEY值
  const [visible, setVisible] = useState(false); // 查看弹窗控制
  const [params, setParams] = useState(""); // 查看弹窗传参

  // 初始化
  useLayoutEffect(() => {
    quesBankView.init();
  }, []);

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
      width: 100,
      align: "center",
      render: (text: any, record: any, c: any) => {
        return (
          <DoCon>
            <span
              onClick={() => {
                resultLook(record.id);
              }}
            >
              查看
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
      quesBankView.selectedRows = selectedRows;
      setSelectedRows(arr1);
      setSelectedRowKeys(selectedRowKeys);
    }
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
      <BaseTable
        loading={quesBankView.tableLoading}
        dataSource={quesBankView.tableList}
        rowSelection={rowSelection}
        columns={columns}
        surplusHeight={480}
        pagination={{
          current: quesBankView.pageIndex,
          total: quesBankView.total,
          pageSize: quesBankView.pageSize
        }}
        onChange={pagination => {
          quesBankView.pageIndex = pagination.current;
          quesBankView.total = pagination.total;
          quesBankView.pageSize = pagination.pageSize;
          quesBankView.onload();
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
