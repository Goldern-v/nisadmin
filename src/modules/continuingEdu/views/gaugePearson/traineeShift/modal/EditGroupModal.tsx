import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Modal, message as Message, InputNumber, Button, Select,Input } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "../TraineeShiftModal";
import AddTraineeModal from "./AddTraineeModal"; // 添加修改弹窗
import { nonsense } from "antd-mobile/lib/picker";

export interface Props {
  groupNum: any;
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function EditGroupModal(props: Props) {
  const { visible, onCancel, onOk, groupNum } = props;
  const [groupStype, setGroupStype] = useState("全部"); //分组情况
  const [groupName, setGroupName] = useState("全部"); //小组
  const [editLoading, setEditLoading] = useState(false);
  const [editTraineeBtn, setEditTraineeBtn] = useState(false); //添加实习生弹窗
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中的KEY值
  const [idArr, setIdArr]: any = useState([]); // 选中id
  const groupTypeList = [
    { name: "全部", code: "全部" },
    { name: 1, code: 1 },
    { name: 2, code: 2 },
    { name: 3, code: 3 },
    { name: 4, code: 4 },
    { name: 5, code: 5 },
    { name: 6, code: 6 },
    { name: 7, code: 7 },
    { name: 8, code: 8 },
    { name: 9, code: 9 },
    { name: 10, code: 10 },
    { name: 11, code: 11 },
    { name: 12, code: 12 },
    { name: 13, code: 13 },
    { name: 13, code: 13 },
    { name: 14, code: 14 },
    { name: 15, code: 15 },
    { name: 16, code: 16 },
    { name: 17, code: 17 },
    { name: 18, code: 18 },
    { name: 19, code: 19 },
    { name: 20, code: 20 },
    { name: 21, code: 21 },
    { name: 22, code: 22 },
    { name: 23, code: 23 },
    { name: 24, code: 24 },
    { name: 25, code: 25 },
    { name: 26, code: 26 },
    { name: 27, code: 27 },
    { name: 28, code: 28 },
    { name: 29, code: 29 },
    { name: 30, code: 30 }
  ]; //小组下拉选项

  // 表格数据
  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    // {
    //   title: "实习编号",
    //   dataIndex: "empNo",
    //   width: 90,
    //   align: "center"
    // },
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
      title: "备注",
      dataIndex: "remark",
      width: 60, 
      align: "center",
      render:(text:any,record:any) => {
        return(
          <Input  value={text} style={{border:'none',resize:'none',outline:'none'}}  onChange={(val: any) => {
            let values = val.target
            
            record.remark = values.value;
            updateData(record)
          }}/>
        )
      }
    },
    // {
    //   title: "分组",
    //   dataIndex: "groupNum",
    //   align: "center",
    //   width: 80
    //   render(text: any, record: any, index: number) {
    //     return (
    //       <InputNumber
    //         className="specialInput"
    //         min={1}
    //         value={text}
    //         key={record.empNo}
    //         onChange={(val: any) => {
    //           record.groupNum = val;
    //           updateData(record);
    //         }}
    //       />
    //     );
    //   }
    // },
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
    if (visible) traineeShiftModal.groupOnload();
  }, [visible]);

  //初始化筛选条件
  const initValue = () => {
    setGroupStype("全部"); //分组情况
    setGroupName("全部");
    setSelectedRowKeys([]);
  };
  //保存备注
  const handleSave = ()=>{
    traineeShiftApi.saveOrUpDateByGroupYaXin(traineeShiftModal.groupTableCopyList).then((res)=>{
      console.log(res);
      if(res.code == 200){
        Message.success(res.desc)
        handleCancel()
      }
    })
  }
  // 筛选展示数据
  // const showTableData = () => {
  //   setEditLoading(true);
  //   let showData: any = traineeShiftModal.groupTableList.filter((item: any) => {
  //     if (groupStype === "全部") {
  //       if (groupName === "全部") {
  //         return true;
  //       }
  //       return item.groupNum == groupName;
  //     } else if (groupStype === "已分组") {
  //       if (groupName === "全部") {
  //         return item.groupNum;
  //       }
  //       return item.groupNum && item.groupNum == groupName;
  //     } else {
  //       if (groupName === "全部") {
  //         return !item.groupNum;
  //       }
  //       return !item.groupNum && item.groupNum == groupName;
  //     }
  //   });
  //   traineeShiftModal.groupTableCopyList = showData;
  //   setEditLoading(false);
  // };

  // 函数
  const updateData = (record: any) => {
    const dataIndexOne: any = traineeShiftModal.groupTableCopyList.findIndex(
      (obj: any) => record.empNo === obj.empNo
    );
    traineeShiftModal.groupTableCopyList[dataIndexOne] = record;
    const arrOne = traineeShiftModal.groupTableCopyList.slice();
    traineeShiftModal.groupTableCopyList = [];
    traineeShiftModal.groupTableCopyList = arrOne;
  };

  // 表格选中操作
  const rowSelection: any = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys);
      let arr: any = [];
      selectedRows.map((item: any) => {
        arr.push(item.empNo);
      });
      setIdArr(arr);
    }
  };

  // 删除 current---1删除单条  2批量删除
  const handleDel = (current: any, record?: any) => {
    let empNoList: any = [];
    if (current === 1) {
      empNoList = [record.empNo];
    } else if (current === 2) {
      empNoList = idArr.slice();
    }
    let content = (
      <div>
        <div>删除数据后将无法恢复</div>确认删除选中数据吗？
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        traineeShiftApi
          .deleteRotatePersonsFromRotateGroup(empNoList)
          .then((res: any) => {
            if (res.code == 200) {
              Message.success("删除成功！");
              traineeShiftModal.groupOnload();
              setSelectedRowKeys([]);
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => {});
      }
    });
  };

  // 保存
  // const checkForm = async () => {
  //   // let content = (
  //   //   <div>
  //   //     <div> 未进行分组的实习生将不存入轮科小组</div>确认保存吗？
  //   //   </div>
  //   // );
  //   // let isHaveNoGroup: any = traineeShiftModal.groupTableList.find(
  //   //   (item: any) => !item.groupNum
  //   // );
  //   // if (isHaveNoGroup) {
  //   //   Modal.confirm({
  //   //     title: "提示",
  //   //     content,
  //   //     okText: "确定",
  //   //     okType: "danger",
  //   //     cancelText: "取消",
  //   //     onOk: () => saveData()
  //   //   });
  //   // } else {
  //   //   saveData();
  //   // }
  //   saveData();
  //   initValue();
  // };
  // 保存接口
  // const saveData = () => {
  //   const realData: any = traineeShiftModal.groupTableList.filter(
  //     (item: any) => item.groupNum
  //   );
  //   console.log(
  //     traineeShiftModal.groupTableList,
  //     "traineeShiftModal.groupTableList"
  //   );
  //   let obj: any = {
  //     groupId,
  //     sheetId: traineeShiftModal.sheetId,
  //     rotatePersonsList: traineeShiftModal.groupTableList
  //   };
  //   setEditLoading(true);
  //   traineeShiftApi
  //     .saveAllRotatePersons(obj)
  //     .then(res => {
  //       setEditLoading(false);
  //       if (res.code == 200) {
  //         Message.success("保存成功");
  //         onOk();
  //         setSelectedRowKeys([]);
  //       } else {
  //         Message.error(`${res.dec}`);
  //       }
  //     })
  //     .catch(e => {
  //       setEditLoading(false);
  //     });
  // };

  // 关闭取消
  const handleCancel = async () => {
    if (editLoading) return;
    await (onCancel && onCancel());
    initValue();
    onOk();
  };

  // 取消实习生轮科弹窗
  const handleEditOk = () => {
    setEditTraineeBtn(false);
    traineeShiftModal.groupOnload();
  };

  return (
    <Modal
      width="600px"
      visible={visible}
      onCancel={handleCancel}
      forceRender={true}
      title={
        <span>
          编辑实习小组
          <span style={{ color: "blue", fontSize: "12px" }}>
            （目前所在组别：{groupNum}）
          </span>
        </span>
      }
      footer={
        <div style={{ textAlign: "center" }}>
          {/* <Button onClick={() => handleCancel()}>关闭</Button> */}
          {/* <Button
            type="primary"
            loading={editLoading}
            onClick={() => checkForm()}
          >
            保存
          </Button> */}
        </div>
      }
    >
      <Wrapper>
        <ModalHeader>
          {/* <LeftIcon>
            <span style={{ marginLeft: "15px" }}>分组情况：</span>
            <Select
              style={{ width: 90 }}
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
              <div style={{ display: "inline-block" }}>
                <span style={{ marginLeft: "15px" }}>小组：</span>
                <Select
                  style={{ width: 80 }}
                  value={groupName}
                  onChange={(value: any) => {
                    setGroupName(value);
                  }}
                >
                  {groupTypeList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )}
            <Button
              type="primary"
              style={{ marginLeft: "10px" }}
              onClick={() => showTableData()}
            >
              查询
            </Button>
          </LeftIcon> */}
          {/* <RightIcon> */}
          <Button
            style={{ marginLeft: "15px", float: "left" }}
            onClick={() => setEditTraineeBtn(true)}
          >
            + 添加实习生
          </Button>
          {/* <Button
            className="checkButton"
            onClick={() => {
              handleDel(2);
            }}
            disabled={idArr && idArr.length === 0}
          >
            删除
          </Button> */}
          <Button
            className="checkButton"
            type="primary"
            onClick={handleSave}
          >
            保存
          </Button>

          {/* </RightIcon> */}
        </ModalHeader>
        <BaseTable
          loading={traineeShiftModal.groupTableLoading}
          dataSource={traineeShiftModal.groupTableCopyList}
          columns={columns}
          surplusHeight={420}
          rowSelection={rowSelection}
        />
        <AddTraineeModal
          visible={editTraineeBtn}
          onCancel={() => setEditTraineeBtn(false)}
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
const LeftIcon = styled.div`
  float: left;
`;
const RightIcon = styled.div`
  float: right;
`;
