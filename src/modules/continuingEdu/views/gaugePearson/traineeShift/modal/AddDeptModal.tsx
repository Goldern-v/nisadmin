import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Modal,
  message as Message,
  Button,
  Input,
  Checkbox,
  Select
} from "antd";
import BaseTable from "src/components/BaseTable";
import { traineeShiftModal } from "../TraineeShiftModal";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function AddDeptModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [editDataList, setEditDataList]: any = useState([]);
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
      width: 300,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "isChecked",
      width: 80,
      align: "center",
      render(text: any, record: any, index: number) {
        return (
          <Checkbox
            key={record.deptCode}
            checked={!!text}
            disabled={record.sort}
            onChange={(e: any) => {
              record.isChecked = e.target.checked ? 1 : 0;
              setEditDataList(
                traineeShiftModal.deptTableCopyList.filter(
                  (item: any) => item.isChecked && !item.sort
                )
              );
              const arrOne = traineeShiftModal.deptTableCopyList;
              traineeShiftModal.deptTableCopyList = [];
              traineeShiftModal.deptTableCopyList = arrOne;
            }}
          />
        );
      }
    }
  ];

  //初始化表格数据
  useEffect(() => {
    if (visible) traineeShiftModal.deptOnload();
  }, [visible, traineeShiftModal.sheetId]);

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
    setEditLoading(true);
    traineeShiftApi
      .addRotateDepts(editDataList)
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
    setQuery({ keyWord: undefined, checkValue: "全部" });
  };

  // 关闭取消
  const handleCancel = async () => {
    if (editLoading) return;
    await (onCancel && onCancel());
    traineeShiftModal.allGroupKeyWord = "";
    setQuery({ keyWord: undefined, checkValue: "全部" });
  };

  return (
    <Modal
      width="800px"
      visible={visible}
      onCancel={handleCancel}
      title="添加实习科室"
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => handleCancel()}>取消</Button>
          <Button
            type="primary"
            loading={editLoading}
            onClick={() => checkForm()}
          >
            保存
          </Button>
        </div>
      }
    >
      <Wrapper>
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
        <BaseTable
          loading={traineeShiftModal.deptTableLoading}
          dataSource={traineeShiftModal.deptTableCopyList}
          columns={columns}
          surplusHeight={380}
        />
      </Wrapper>
    </Modal>
  );
});
const Wrapper = styled.div`
  width: 98%;
  margin: 0 auto;
`;
