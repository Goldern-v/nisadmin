import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import {
  Modal,
  message as Message,
  Input,
  Button,
  Select,
  Checkbox
} from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "../TraineeShiftModal";

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function EditDeptModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [query, setQuery] = useState({
    keyWord: undefined,
    checkValue: "全部"
  });

  // 表格数据
  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "科室",
      dataIndex: "deptName",
      width: 250,
      align: "center"
    },
    {
      title: "排序",
      dataIndex: "sort",
      align: "center",
      width: 70,
      render(text: any, record: any, index: number) {
        return (
          <Input
            className="specialInput"
            defaultChecked={text}
            onChange={(e: any) => {
              record.sort = e.target.value;
              traineeShiftModal.deptTableList =
                traineeShiftModal.deptTableCopyList;
            }}
          />
        );
      }
    },
    {
      title: "操作",
      dataIndex: "isChecked",
      width: 100,
      align: "center",
      render(text: any, record: any, index: number) {
        return (
          <Checkbox
            key={record.deptCode}
            defaultChecked={text === 1 ? true : false}
            onChange={(e: any) => {
              record.isChecked = e.target.checked ? 1 : 0;
              traineeShiftModal.deptTableList =
                traineeShiftModal.deptTableCopyList;
            }}
          />
        );
      }
    }
  ];

  //初始化表格数据
  useEffect(() => {
    if (visible) traineeShiftModal.deptOnload();
  }, [visible]);

  // 筛选展示数据
  const showTableData = () => {
    setEditLoading(true);
    let showData: any = traineeShiftModal.deptTableList.filter((item: any) => {
      if (query.checkValue === "全部") {
        if (query.keyWord === "" || query.keyWord === undefined) {
          return true;
        }
        return item.deptName.includes(query.keyWord);
      } else {
        if (query.keyWord === "" || query.keyWord === undefined) {
          return item.isChecked === query.checkValue;
        }
        return (
          item.deptName.includes(query.keyWord) &&
          item.isChecked === query.checkValue
        );
      }
    });
    traineeShiftModal.deptTableCopyList = showData;
    setEditLoading(false);
  };
  // 保存
  const checkForm = () => {
    let dataList: any = traineeShiftModal.deptTableList.filter(
      (item: any) => item.isChecked === 1
    );
    let isOk = dataList.find((item: any) => !item.sort);
    if (isOk) {
      Message.warning("已勾选的科室请填写顺序");
      return;
    }
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      rotateDeptList: dataList
    };
    setEditLoading(true);
    traineeShiftApi
      .saveAllRotateDepts(obj)
      .then(res => {
        setEditLoading(false);
        if (res.code == 200) {
          Message.success("保存成功");
          onOk();
        } else {
          Message.error(`${res.dec}`);
        }
      })
      .catch(e => {
        setEditLoading(false);
      });
  };

  // 关闭取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      width="800px"
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title="编辑实习科室"
    >
      <Wrapper>
        <ModalHeader>
          <span style={{ marginLeft: "20px" }}>勾选筛选：</span>
          <Select
            style={{ width: 130 }}
            value={query.checkValue}
            onChange={(value: any) => {
              setQuery({ ...query, checkValue: value });
            }}
          >
            <Select.Option value="全部">全部</Select.Option>
            <Select.Option value={1}>已勾选</Select.Option>
            <Select.Option value={0}>未勾选</Select.Option>
          </Select>
          <Input
            style={{ width: 280, marginLeft: 15, marginRight: 10 }}
            placeholder="请输入科室关键字"
            value={query.keyWord}
            onChange={(e: any) => {
              setQuery({ ...query, keyWord: e.target.value });
            }}
          />
          <Button type="primary" onClick={() => showTableData()}>
            查询
          </Button>
        </ModalHeader>
        <BaseTable
          loading={traineeShiftModal.deptTableLoading}
          dataSource={traineeShiftModal.deptTableCopyList}
          columns={columns}
          surplusHeight={230}
        />
      </Wrapper>
    </Modal>
  );
});
const Wrapper = styled.div`
  width: 98%;
  margin: 0 auto;
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .specialInput {
    border: 0 !important;
    border-radius: 0 !important;
    text-align: center !important;
    outline: 0 !important;
    box-shadow: none !important;
    padding: 4px !important;
  }
`;
const ModalHeader = styled.div``;
