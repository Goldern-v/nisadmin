import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Modal, message as Message, Button, Icon } from "antd";
import update from "immutability-helper";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "../TraineeShiftModal";
import AddDeptModal from "./AddDeptModal"; // 添加修改弹窗

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function EditDeptModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [editDeptBtn, setEditDeptBtn] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中的KEY值
  const [idArr, setIdArr]: any = useState([]); // 选中id
  // const [query, setQuery] = useState({
  //   keyWord: undefined,
  //   checkValue: "全部"
  // });

  // 表格数据
  const columns: any = [
    {
      title: "排序",
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
      key: "cz",
      width: 80,
      render(text: any, record: any) {
        return (
          <DoCon>
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

  //初始化表格数据
  useEffect(() => {
    if (visible) traineeShiftModal.queryAllRorateDepts();
  }, [visible]);

  // 拖拽排序
  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = traineeShiftModal.existingDeptTableList[dragIndex];
    if (!dragRow) return;
    traineeShiftModal.existingDeptTableList = update(
      traineeShiftModal.existingDeptTableList,
      {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
      }
    );
  };

  // 表格选中操作
  const rowSelection: any = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys);
      let arr: any = [];
      selectedRows.map((item: any) => {
        arr.push(item.deptCode);
      });
      setIdArr(arr);
    }
  };

  // 删除 current---1删除单条  2批量删除
  const handleDel = (current: any, record?: any) => {
    let empNoList: any = [];
    if (current === 1) {
      empNoList = [record.deptCode];
    } else if (current === 2) {
      empNoList = idArr.slice();
    }
    traineeShiftApi
      .deleteRotateDepts(empNoList)
      .then((res: any) => {
        if (res.code == 200) {
          Message.success("删除成功！");
          traineeShiftModal.queryAllRorateDepts();
          setSelectedRowKeys([]);
        } else {
          Message.error(`${res.dec}`);
        }
      })
      .catch(e => {});
  };

  // 保存
  const checkForm = () => {
    let deptSortList: any = traineeShiftModal.existingDeptTableList.slice();
    deptSortList.map((item: any, idx: any) => (item.sort = idx + 1));
    setEditLoading(true);
    traineeShiftApi
      .saveRotateDeptSorts(deptSortList)
      .then(res => {
        setEditLoading(false);
        if (res.code == 200) {
          Message.success("科室排序保存成功！");
          onOk();
        } else {
          Message.error(`${res.dec}`);
        }
      })
      .catch(e => {
        setEditLoading(false);
      });
    // setQuery({ keyWord: undefined, checkValue: "全部" });
  };

  // 关闭取消
  const handleCancel = async () => {
    if (editLoading) return;
    await (onCancel && onCancel());
    onOk();
    // setQuery({ keyWord: undefined, checkValue: "全部" });
  };

  // 取消实习生轮科弹窗
  const handleEditOk = () => {
    setEditDeptBtn(false);
    traineeShiftModal.queryAllRorateDepts();
  };

  return (
    <Modal
      width="800px"
      visible={visible}
      onCancel={handleCancel}
      title="编辑实习科室"
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => handleCancel()}>取消</Button>
          <Button
            type="primary"
            loading={editLoading}
            onClick={() => checkForm()}
          >
            保存科室排序
          </Button>
        </div>
      }
    >
      <Wrapper>
        <ModalHeader>
          <Button
            style={{ marginLeft: "15px", float: "left" }}
            onClick={() => setEditDeptBtn(true)}
          >
            + 添加科室
          </Button>
          <Button
            className="checkButton"
            onClick={() => {
              handleDel(2);
            }}
            disabled={idArr && idArr.length === 0}
          >
            删除
          </Button>
        </ModalHeader>
        <BaseTable
          loading={traineeShiftModal.existingDeptTableLoading}
          dataSource={traineeShiftModal.existingDeptTableList}
          columns={columns}
          // surplusHeight={446}
          moveRow={moveRow}
          rowSelection={rowSelection}
          type={["diagRow"]}
          footer={() => (
            <span>
              <Icon
                type="info-circle"
                style={{ color: "#fa8c16", marginRight: "5px" }}
              />
              可以通过拖拽排序,修改数据后需保存!
            </span>
          )}
        />
        <AddDeptModal
          visible={editDeptBtn}
          onCancel={() => setEditDeptBtn(false)}
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
  .ant-input-number-input {
    text-align: center !important;
    height: 25px;
  }

  .ant-input-number-handler-up:hover {
    height: 50% !important;
  }
  .checkButton {
    margin-right: 15px;
    float: right;
  }
`;
const ModalHeader = styled.div`
  height: 35px;
`;
