import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Modal, message as Message, Input, Button, Select } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "../TraineeShiftModal";
import AddTraineeModal from "./AddTraineeModal"; // 添加修改弹窗

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function EditGroupModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [groupStype, setGroupStype] = useState("全部");
  const [groupName, setGroupName] = useState("全部");
  const [editLoading, setEditLoading] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [tableCopyList, setTableCopyList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [editTraineeBtn, setEditTraineeBtn] = useState(false); //科室弹窗

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
      title: "姓名",
      dataIndex: "empName",
      width: 120,
      align: "center"
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: 60,
      align: "center"
    },
    {
      title: "分组",
      dataIndex: "groupNum",
      align: "center",
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <Input
            className="specialInput"
            defaultValue={text}
            key={record.empNo}
            onChange={(e: any) => {
              record.groupNum = e.target.value;
              traineeShiftModal.groupTableList = [
                ...traineeShiftModal.groupTableCopyList
              ];
            }}
          />
        );
      }
    }
  ];

  //初始化表格数据
  useEffect(() => {
    if (visible) {
      traineeShiftModal.groupOnload();
    }
  }, [visible, traineeShiftModal.sheetId]);

  // 筛选展示数据
  const showTableData = () => {
    setEditLoading(true);
    let showData: any = traineeShiftModal.groupTableList.filter((item: any) => {
      if (groupStype === "全部") {
        if (groupName === "全部") {
          return true;
        }
        return item.groupNum == groupName;
      } else if (groupStype === "已分组") {
        if (groupName === "全部") {
          return item.groupNum;
        }
        return item.groupNum && item.groupNum == groupName;
      } else {
        if (groupName === "全部") {
          return !item.groupNum;
        }
        return !item.groupNum && item.groupNum == groupName;
      }
    });
    traineeShiftModal.groupTableCopyList = showData;
    setEditLoading(false);
  };

  // 保存
  const checkForm = () => {
    const realData: any = traineeShiftModal.groupTableList.filter(
      (item: any) => item.groupNum
    );
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      rotatePersonsList: realData
    };
    setEditLoading(true);
    traineeShiftApi
      .saveAllRotatePersons(obj)
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

  // 创建实习生轮科弹窗
  const handleEditCancel = () => {
    setEditTraineeBtn(false);
  };
  const handleEditOk = () => {
    handleEditCancel();
  };

  return (
    <Modal
      width="700px"
      visible={visible}
      onCancel={handleCancel}
      forceRender={true}
      onOk={checkForm}
      confirmLoading={editLoading}
      title="编辑实习科室"
    >
      <Wrapper>
        <ModalHeader>
          <span style={{ marginLeft: "20px" }}>分组情况：</span>
          <Select
            style={{ width: 100 }}
            value={groupStype}
            onChange={(value: any) => {
              setGroupStype(value);
            }}
          >
            <Select.Option value="全部">全部</Select.Option>
            <Select.Option value="已分组">已分组</Select.Option>
            <Select.Option value="未分组">未分组</Select.Option>
          </Select>
          {groupStype !== "未分组" && (
            <span>
              <span style={{ marginLeft: "20px" }}>小组：</span>
              <Select
                style={{ width: 80 }}
                value={groupName}
                onChange={(value: any) => {
                  setGroupName(value);
                }}
              >
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
                <Select.Option value={5}>5</Select.Option>
                <Select.Option value={6}>6</Select.Option>
                <Select.Option value={7}>7</Select.Option>
                <Select.Option value={8}>8</Select.Option>
                <Select.Option value={9}>9</Select.Option>
                <Select.Option value={10}>10</Select.Option>
              </Select>
            </span>
          )}
          <Button
            type="primary"
            style={{ marginLeft: "15px" }}
            onClick={() => showTableData()}
          >
            查询
          </Button>
          <Button
            className={
              groupStype === "未分组" ? "specialMargin" : "normalMargin"
            }
            onClick={() => setEditTraineeBtn(true)}
          >
            添加实习生
          </Button>
        </ModalHeader>
        <BaseTable
          loading={traineeShiftModal.groupTableLoading}
          dataSource={traineeShiftModal.groupTableCopyList}
          columns={columns}
          surplusHeight={230}
        />
        <AddTraineeModal
          visible={editTraineeBtn}
          onCancel={handleEditCancel}
          onOk={handleEditOk}
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
  .specialMargin {
    margin-left: 255px;
  }
  .normalMargin {
    margin-left: 115px;
  }
`;
const ModalHeader = styled.div``;
