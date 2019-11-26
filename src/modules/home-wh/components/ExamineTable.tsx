import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { appStore } from "src/stores/index";
import BaseTable from "src/components/BaseTable";
import HomeApi from "src/modules/home/api/HomeApi.ts";
import service from "src/services/api";
import { observer } from "src/vendors/mobx-react-lite";
import { ReactComponent as DWSH } from "../images/icon/DWSH.svg";

export interface Props extends RouteComponentProps {}

export default observer(function ExamineTable() {
  const [loadingTable, setLoadingTable] = useState(false);
  const [tableData, setTableData] = useState([]); //表格数据
  const [current, setCurrent] = useState(1); //页码
  const [pageSize, setPageSize] = useState(10); //条数
  const [keyword, setKeyword] = useState("");

  const columns: any = [
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: 15,
      align: "left",
      marginLeft: "20px",
      render(text: string, record: any) {
        return text == "nurseFile"
          ? "护士档案"
          : text == "qc"
          ? "三级质控"
          : text == "qcTwoLevel"
          ? "二级质控"
          : text == "sr"
          ? "特殊时段查房"
          : "";
      }
    },
    {
      title: "内容",
      dataIndex: "message",
      key: "message",
      width: 45,
      align: "left"
    },
    {
      title: "提交人",
      dataIndex: "commiterName",
      key: "commiterName",
      width: 12,
      align: "left"
    },
    {
      title: "时间",
      dataIndex: "commitTime",
      key: "commitTime",
      width: 18,
      align: "left"
    }
  ];

  const getMealList = () => {
    //质量检查和档案管理各拿10条数据
    let qualityCheck1 = HomeApi.pendingPage(current, pageSize, "qc", keyword);
    let qualityCheck2 = HomeApi.pendingPage(
      current,
      pageSize,
      "qcTwoLevel",
      keyword
    );
    let qualityCheck3 = HomeApi.pendingPage(current, pageSize, "sr", keyword);
    let nurseFileCheck = HomeApi.pendingPage(
      current,
      pageSize,
      "nurseFile",
      keyword
    );

    setLoadingTable(true);
    Promise.all([qualityCheck1, qualityCheck2, qualityCheck3, nurseFileCheck])
      .then(values => {
        setLoadingTable(false);
        let array: any = [
          ...(values[0].data.list || []),
          ...(values[1].data.list || []),
          ...(values[2].data.list || []),
          ...(values[3].data.list || [])
        ];
        console.log(array, "array");
        //按照提交时间先后排序
        array.length > 1 &&
          array.sort((a: any, b: any) => {
            return (
              Date.parse(b.commitTime.replace(/-/g, "/")) -
              Date.parse(a.commitTime.replace(/-/g, "/"))
            );
          });
        setTableData(array);
        let data: any = [];
        array.length &&
          array.map((item: any, i: any) => {
            item.key = i;
            data.push(item);
          });
        setTableData(data);
      })
      .catch(e => {
        console.log(e, "ee");
      });
  };

  useEffect(() => {
    getMealList();
  }, []);

  const selectRow = (record: any) => {
    if (record.type == "qc") {
      window.open(
        `/crNursing/manage/#/qualityControlRecordDetail/${
          record.othersMessage.id
        }`
      );
    } else if (record.type == "nurseFile") {
      service.commonApiService
        .getNurseInformation(record.commiterNo)
        .then(res => {
          window.open(`/crNursing/manage/#/nurseAudit?empNo=${res.data.empNo}`);
        });
    } else if (record.type == "sr") {
      window.open(
        `/crNursing/manage/#/qualityScheduleRecordDetails/${
          record.othersMessage.id
        }`
      );
    } else if (record.type == "qcTwoLevel") {
      window.open(
        `/crNursing/manage/#/qualityControlRecordDetail/${
          record.othersMessage.id
        }`
      );
    }
  };

  return (
    <Wrapper>
      <TableTitle>
        <I>
          <DWSH />
        </I>
        <World>待我审核</World>
        <More
          onClick={() => {
            appStore.history.push("/auditsManagement");
          }}
        >
          更多 >
        </More>
      </TableTitle>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={(appStore.wih - 262) / 2 + 262}
        loading={loadingTable}
        rowClassName={record => {
          return "cursorPointer";
        }}
        onRow={record => {
          return {
            onClick: (event: any) => {
              selectRow(record);
            }
          };
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  margin-bottom: 15px;
  #baseTable {
    padding: 0 !important;
    .ant-table-header-column {
      text-align: left;
      padding-left: 10px;
      box-sizing: border-box;
    }
    .ant-table-body {
      border-radius: 0 !important;
    }
    .ant-table-small {
      border-radius: 0 !important;
    }
  }
  .cursorPointer {
    cursor: pointer;
  }
`;
const TableTitle = styled.div`
  /* box-shadow: 0px -1px 0px 0px rgba(245, 105, 84, 1); */
  border-radius: 2px 2px 0 0;
  border: 1px solid rgba(221, 221, 221, 1);
  border-bottom: none;
  box-sizing: border-box;
  height: 45px;
  width: 100%;
  background: #5e87b0;
  padding: 0 15px;
  box-sizing: border-box;
`;
const I = styled.span`
  display: inline-block;
  margin-top: 15px;
  vertical-align: middle;
`;
const World = styled.span`
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
  font-weight: 900;
  color: #fff;
  vertical-align: middle;
  margin-bottom: -9px;
  vertical-align: middle;
`;
const More = styled.span`
  float: right;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  line-height: 17px;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
    color: #00a65a;
  }
`;
