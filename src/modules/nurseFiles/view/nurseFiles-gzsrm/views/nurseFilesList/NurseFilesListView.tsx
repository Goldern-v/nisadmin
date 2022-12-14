import BaseTable from "src/components/BaseTable";
import store from "src/stores";
import styled from "styled-components";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react-lite";
import { ColumnProps } from "antd/lib/table";
import { theme } from "src/styles/theme";

import FilterCon from "./components/FilterCon";
import PaginationCon from "./components/PaginationCon";
import SelectCon from "./components/SelectCon";
import { nurseFilesListViewModel } from "./NurseFilesListViewModel";
import { Obj } from "src/libs/types";
import DeptModal from "./components/deptModal";

export interface Props extends RouteComponentProps { }
/** 一行的列数 */
let rowNum: number = 5;

const onDoubleClick = (record: any) => {
  store.appStore.history.push(
    `/nurseFileDetail/baseInfo?empNo=${record.empNo}`
  );
};

export default observer(function NurseFilesListView() {
  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, row: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "科室",
      dataIndex: "deptName",
      key: "deptName",
      width: 120,
      align: "center"
    },
    {
      title: "员工号",
      dataIndex: "empNo",
      key: "empNo",
      width: 70,
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "empName",
      key: "empName",
      width: 70,
      align: "center"
    },
  
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      width: 50,
      align: "center",
      render(sex: any) {
        return sex === "0" ? "男" : sex === "1" ? "女" : "";
      }
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      width: 50,
      align: "center"
    },
    {
      title: "职称",
      dataIndex: "newTitle",
      key: "newTitle",
      width: 90,
      align: "center"
    },
    {
      title: "层级",
      dataIndex: "nurseHierarchy",
      key: "nurseHierarchy",
      width: 70,
      align: "center"
    },
    {
      title: "职务",
      dataIndex: "job",
      key: "job",
      width: 120,
      align: "center"
    },
    {
      title: "最高学历",
      dataIndex: "highestEducation",
      key: "highestEducation",
      width: 80,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: 70,
      align: "center"
    },
    {
      title: "籍贯",
      dataIndex: "nativePlace",
      key: "nativePlace",
      width: 100,
      align: "center"
    },
    {
      title: "民族",
      dataIndex: "nation",
      key: "nation",
      width: 70,
      align: "center"
    },
    {
      title: "执业证书编号",
      dataIndex: "zyzsNumber",
      key: "zyzsNumber",
      width: 120,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "auditedStatusName",
      key: "6",
      width: 130,
      align: "center",
      render(text: any, row: any) {
        return (
        <DoCon>
          <span onClick={() => onDoubleClick(row)}>查看</span>
          <span onClick={() => openDeptModal(row)}>护理单元配置</span>
        </DoCon>
        );
      }
    }
  ];
  const [deptModalVis, setDeptModalVis] = useState<boolean>(false)
  const [curItem, setCurItem] = useState<Obj>({})
  const openDeptModal = (record: Obj) => {
    setDeptModalVis(true)
    setCurItem(record)
  }
  const onDeptModalOk = () => {
    setDeptModalVis(false)
    nurseFilesListViewModel.loadNursingList();
  }
  return (
    <Wrapper>
      <SelectCon />
      <FilterCon />
      <div style={{ height: 10 }} />
      <BaseTable
        wrapperStyle={{
          boxShadow: theme.$shadow
        }}
        dataSource={nurseFilesListViewModel.nurseList}
        columns={columns}
        surplusHeight={nurseFilesListViewModel.isOpenFilter ? 450 : 270}
        surplusWidth={80}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => onDoubleClick(record)
          };
        }}
        loading={nurseFilesListViewModel.listSpinning}
      />
      <PaginationCon rowNum={rowNum} />
      <DeptModal
        visible={deptModalVis}
        handleOk={onDeptModalOk}
        handleCancel={() => { setDeptModalVis(false) }}
        curItem={curItem} />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 15px 15px 0;
  /* 全局背景色 */
  background-color: ${p => p.theme.$bgBody};
`;

export const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${p => p.theme.$mtc};
  span {
    cursor: pointer;
  }
`;
