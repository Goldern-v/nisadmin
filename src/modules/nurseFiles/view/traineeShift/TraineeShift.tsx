import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TabledCon } from "src/components/BaseTable";
import {
  Input,
  Button,
  message as Message,
  Modal,
  Tooltip,
  DatePicker
} from "src/vendors/antd";
import moment from "moment";

import { PageTitle, Place } from "src/components/common";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeShiftApi } from "./api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "./TraineeShiftModal"; // 仓库数据
import EditDeptModal from "./modal/EditDeptModal"; // 添加修改弹窗
import EditGroupModal from "./modal/EditGroupModal"; // 添加修改弹窗

interface Props {
  getTitle: any;
  getId: any;
}
export default observer(function TraineeShift(props: Props) {
  const { getTitle, getId } = props; //获取当前页面标题
  const [tableList, setTableList] = useState(new Array()); //保存轮科时间表单入参
  const [showWeek, setShowWeek] = useState(false); //保存轮科时间表单入参
  const [editDeptBtn, setEditDeptBtn] = useState(false); //科室弹窗
  const [editGroupBtn, setEditGroupBtn] = useState(false); //小组弹窗

  // 初始化数据
  useEffect(() => {
    traineeShiftModal.sheetId = getId;
    traineeShiftModal.onload();
  }, [getId]);

  // 表格姓名函数分装
  const setTextData = (data: any) => {
    if (data && data.length) {
      let str = "";
      let str1 = "";
      let semicolon = "";
      data.map((item: any, i: any) => {
        let text = item.empName || "";
        let semicolon1 = text && i !== data.length - 1 ? "、" : "";
        if (data.length < 4) {
          semicolon = text && i !== data.length - 1 ? "、" : "";
        } else {
          semicolon = text && i < 2 ? "、" : "";
        }
        if (i < 3) {
          str1 += text + semicolon;
        }
        str += text + semicolon1;
      });
      return data.length > 3 ? (
        <Tooltip placement="top" title={str}>
          {`${str1}...`}
        </Tooltip>
      ) : (
        str
      );
    } else {
      return "";
    }
  };

  // 动态科室对应的列
  const rotateList = [] as any;
  if (traineeShiftModal.tableDeptList.length) {
    let tableDeptList = traineeShiftModal.tableDeptList;
    tableDeptList.map((item: any, index: number) => {
      rotateList.push({
        title: item.deptName,
        dataIndex: "rotateGroupsList",
        width: 250,
        align: "center",
        render: (text: any, record: any, idx: any) => {
          const rotateTimesList: any = record.rotateTimesList || [];
          const dataIndex = rotateTimesList.findIndex(
            (obj: any) => obj.deptCode === item.deptCode
          );
          const { beginTime = "", endTime = "", intervalOfWeeks = "" } =
            rotateTimesList[dataIndex] || {};
          return !showWeek ? (
            <DatePicker.RangePicker
              allowClear={false}
              style={{ width: 220 }}
              value={beginTime ? [moment(beginTime), moment(endTime)] : []}
              onChange={(date: any) => {
                if (dataIndex >= 0) {
                  record.rotateTimesList[dataIndex].beginTime = date[0].format(
                    "YYYY-MM-DD"
                  );
                  record.rotateTimesList[dataIndex].endTime = date[1].format(
                    "YYYY-MM-DD"
                  );
                } else {
                  const { deptCode, sheetId, deptName } = item;
                  rotateTimesList.push({
                    beginTime: date[0].format("YYYY-MM-DD"),
                    endTime: date[1].format("YYYY-MM-DD"),
                    deptCode,
                    sheetId,
                    deptName
                  });
                }
                setTableList(traineeShiftModal.tableList);
                const arrOne = traineeShiftModal.tableList.slice();
                traineeShiftModal.tableList = [];
                traineeShiftModal.tableList = arrOne;
              }}
            />
          ) : (
            <Input
              style={{ background: "#fff", color: "#000" }}
              disabled
              value={intervalOfWeeks ? intervalOfWeeks : "-- --"}
            />
          );
        }
      });
    });
  }
  // input输入
  // if (traineeShiftModal.tableDeptList.length) {
  //   let tableDeptList = traineeShiftModal.tableDeptList;
  //   tableDeptList.map((item: any, index: number) => {
  //     rotateList.push({
  //       title: item.deptName,
  //       dataIndex: "rotateGroupsList",
  //       width: 120,
  //       align: "center",
  //       render: (text: any, record: any) => {
  //         const rotateTimesList: any = record.rotateTimesList || [];
  //         let dataIndex = rotateTimesList.findIndex(
  //           (obj: any) => item.deptCode === obj.deptCode
  //         );
  //         const { beginTime = "", endTime = "" } =
  //           rotateTimesList[dataIndex] || {};
  //         return (
  //           <Input
  //             defaultValue={beginTime ? `${beginTime} ~ ${endTime}` : ""}
  //             onChange={(e: any) => {
  //               const time = e.target.value;
  //               if (!time.trim()) return;
  //               const rotateTimesList: any = record.rotateTimesList || [];
  //               let dataIndex = rotateTimesList.findIndex(
  //                 (obj: any) => item.deptCode === obj.deptCode
  //               );
  //               const beginTime = time.substring(0, time.indexOf("~")).trim();
  //               const endTime = time.substring(time.indexOf("~") + 1).trim();
  //               if (dataIndex >= 0) {
  //                 record.rotateTimesList[dataIndex].beginTime = beginTime;
  //                 record.rotateTimesList[dataIndex].endTime = endTime;
  //               } else {
  //                 const { deptCode, sheetId, deptName } = item;
  //                 record.rotateTimesList.push({
  //                   deptCode,
  //                   sheetId,
  //                   beginTime,
  //                   endTime,
  //                   deptName,
  //                 });
  //               }
  //               const recordIndex = traineeShiftModal.tableList.findIndex(
  //                 (o: any) => record.id === o.id
  //               );
  //               traineeShiftModal.tableList[recordIndex] = record;
  //               setTableList(traineeShiftModal.tableList);
  //             }}
  //           />
  //         );
  //       },
  //     });
  //   });
  // }

  //表格数据
  const columns: any = [
    {
      title: "组别",
      dataIndex: "groupNum",
      width: 60,
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "rotatePersonsList",
      width: 180,
      align: "center",
      render(text: any) {
        return setTextData(text);
      }
    },
    ...rotateList,
    {
      title: "教学查房时间",
      key: "teachingRoundTime",
      width: 150,
      align: "center"
    },
    {
      title: "操作",
      key: "cz",
      width: 80,
      render(text: any, record: any) {
        return (
          <DoCon>
            <span onClick={() => handleDelete(record)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  //删除计划表单条数据
  const handleDelete = (record: any) => {
    let content = (
      <div>
        <div>您确定要删除选中的记录吗？</div>
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
          .deleteGroup(record.id)
          .then(res => {
            if (res.code == 200) {
              Message.success("删除成功");
              traineeShiftModal.onload();
            } else {
              Message.error(`${res.dec}`);
            }
          })
          .catch(e => {});
      }
    });
  };

  // 保存轮科时间
  const saveAllRotateTimes = () => {
    let obj: any = {
      sheetId: getId,
      rotateGroupList: tableList
    };
    traineeShiftApi
      .saveAllRotateTimes(obj)
      .then(res => {
        if (res.code == 200) {
          Message.success("保存成功");
          traineeShiftModal.onload();
        } else {
          Message.error(`${res.dec}`);
        }
      })
      .catch(e => {});
  };

  // 创建实习生轮科弹窗
  const handleEditCancel = () => {
    setEditDeptBtn(false);
    setEditGroupBtn(false);
  };
  const handleEditOk = () => {
    traineeShiftModal.onload();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <PageHeader>
        <LeftIcon>
          <PageTitle maxWidth={1300}>{getTitle}</PageTitle>
        </LeftIcon>
        <RightIcon>
          <Input
            style={{ width: 280, marginLeft: 5, marginRight: -5 }}
            placeholder="请输入姓名、电话或编号关键字进行检索"
            value={traineeShiftModal.keyWord}
            onChange={e => {
              traineeShiftModal.keyWord = e.target.value;
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              traineeShiftModal.onload();
            }}
          >
            查询
          </Button>
          <Button onClick={() => setEditGroupBtn(true)}>编辑实习小组</Button>
          <Button onClick={() => setEditDeptBtn(true)}>添加实习科室</Button>
          <Button
            onClick={() => {
              traineeShiftModal.export();
            }}
          >
            导出
          </Button>
          {showWeek ? (
            <Button onClick={() => setShowWeek(false)}>显示日期</Button>
          ) : (
            <Button onClick={() => setShowWeek(true)}>显示周数</Button>
          )}
          <Button type="primary" onClick={() => saveAllRotateTimes()}>
            保存
          </Button>
        </RightIcon>
      </PageHeader>
      <Content>
        <BaseTable
          loading={traineeShiftModal.tableLoading}
          dataSource={traineeShiftModal.tableList}
          columns={columns}
          surplusWidth={300}
          surplusHeight={230}
        />
      </Content>
      <EditDeptModal
        visible={editDeptBtn}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
      <EditGroupModal
        visible={editGroupBtn}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const PageHeader = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 20px 0 20px;
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
const LeftIcon = styled.div`
  padding: 0;
  float: left;
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
`;

const Content = styled(TabledCon)`
  box-sizing: border-box;
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .ant-input {
    border: 0;
    border-radius: 0;
    text-align: center;
    outline: 0;
    box-shadow: none !important;
    padding: 4px;
  }
`;
