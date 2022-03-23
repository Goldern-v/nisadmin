import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import BaseLayout from "../components/BaseLayout";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { ColumnProps } from "antd/lib/table";
import createModal from "src/libs/createModal";
import EditRotatingDeptModal from "../modal/EditRotatingDeptModal";
import { nurseFilesService } from "../../../services/NurseFilesService";
import { auditedStatusEnum } from "src/libs/enum/common";
import { globalModal } from "src/global/globalModal";
import limitUtils from "../utils/limit";

export interface Props extends RouteComponentProps {}

export default observer(function RotationExperience() {
  const [getId, setGetId] = useState(0);
  const editRotatingDeptModal = createModal(EditRotatingDeptModal);

  const btnList = [
    {
      label: "添加",
      onClick: () =>
        editRotatingDeptModal.show({
          signShow: "添加",
        }),
    },
  ];
  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 60,
    },
    {
      title: "开始年月",
      dataIndex: "startTime",
      width: 100,
      align: "center",
    },
    {
      title: "结束年月",
      dataIndex: "endTime",
      width: 100,
      align: "center",
    },
    {
      title: "科室",
      dataIndex: "department",
      width: 200,
      align: "center",
    },
    {
      title: "职称",
      dataIndex: "title",
      width: 100,
      align: "center",
    },
    {
      title: "职务",
      dataIndex: "post",
      width: 100,
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "auditedStatusName",
      align: "center",
      width: 120,
      // render: (text: any, item: any, index: any) => {
      //   return <span>{item && auditedStatusEnum[item.auditedStatus]}</span>
      // }
    },
    {
      title: "操作",
      width: 100,
      align: "center",
      render: (text: any, row: any, index: any) => {
        if (Object.keys(row).length === 0) return <span />;
        return (
          <DoCon>
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  editRotatingDeptModal.show({ data: row, signShow: "修改" });
                }}
              >
                修改
              </span>
            ) : (
              ""
            )}

            <span
              onClick={() => {
                globalModal.auditModal.show({
                  getTableData: getTableData,
                  id: row.id,
                  type: "NurseJMFYRotatingDepartment",
                  title: "审核轮科经历",
                  tableFormat: [
                    {
                      起始时间: `startTime`,
                      结束时间: `endTime`,
                    },
                    {
                      科室: `department`,
                      职称: "title",
                    },
                    {
                      职务: "post",
                    },
                  ],
                  allData: row,
                });
              }}
            >
              {limitUtils(row) ? "审核" : "查看"}
            </span>
          </DoCon>
        );
      },
    },
  ];

  const [tableData, setTableData] = useState([]);
  const getTableData = () => {
    nurseFilesService
      .rotatingDepartmentFind(appStore.queryObj.empNo)
      .then((res) => {
        setTableData(res.data);
        // setGetId(res.data)
      });
  };
  useEffect(() => {
    getTableData();
  }, []);

  return (
    <BaseLayout title="轮科经历" btnList={btnList}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        surplusWidth={20}
        nohorizontalScroll={false}
        type={["fixedWidth"]}
      />
      <editRotatingDeptModal.Component getTableData={getTableData} />
    </BaseLayout>
  );
});
const Wrapper = styled.div``;
