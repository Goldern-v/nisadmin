import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BaseTable, { DoCon } from "src/components/BaseTable";
import store from "src/stores";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
// import PaginationCon from './PaginationCon'
import qs from "qs";
import { qualityControlRecordApi } from "src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi";
export interface Props {
  tableData: any;
  allData: any;
  loadingGet: boolean;
  getTableData: any;
  showSelection?: boolean;
  selectionChange?: Function;
  selectedRowKeys?: any[];
}
export default observer(function qualityControlRecordTable(props: Props) {
  const {
    allData,
    tableData,
    loadingGet,
    selectedRowKeys,
    showSelection,
    selectionChange,
  } = props;
  // .list
  // const tableRowData:any[] = tableData.list
  const columns: any[] = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) =>
        (allData.pageIndex - 1) * allData.pageSize + index + 1,
      align: "center",
      width: 50,
    },
    // {
    //   title: '质控编号',
    //   dataIndex: 'zkbh',
    //
    //   width: 180,
    //   align: 'left'
    // },
    {
      title: "质控日期",
      dataIndex: "evalDate",

      width: 130,
      align: "center",
    },
    // {
    //   title: '质控病区',
    //   dataIndex: 'wardName',

    //   width: 160,
    //   align: 'left'
    // },
    ...appStore.hisMatch({
      map: {
        gzsrm: [
          {
            title: "质控病区",
            dataIndex: "wardName",

            width: 230, // gzsrm 去掉床号跟住院号，将位置留给质控病区和质控表单
            align: "left",
          },
        ],
        other: [
          {
            title: "质控病区",
            dataIndex: "wardName",

            width: 160,
            align: "left",
          },
        ],
      },
    }),
    // {
    //   title: '质控表单',
    //   // dataIndex: 'zkbq',
    //   dataIndex: 'qcName',

    //   width: 150,
    //   align: 'left'
    // },
    ...appStore.hisMatch({
      map: {
        gzsrm: [
          {
            title: "质控表单",
            // dataIndex: 'zkbq',
            dataIndex: "qcName",

            width: 230, // gzsrm 去掉床号跟住院号，将位置留给质控病区和质控表单
            align: "left",
          },
        ],
        other: [
          {
            title: "质控表单",
            // dataIndex: 'zkbq',
            dataIndex: "qcName",

            width: 150,
            align: "left",
          },
        ],
      },
    }),
    {
      title: "质控人员",
      // dataIndex: 'zkry',
      dataIndex: "creatorName",

      width: 80,
      align: "center",
    },
    // {
    //   title: '床号',
    //   // dataIndex: 'ch',
    //   dataIndex: 'bedLabel',

    //   width: 70,
    //   align: 'center'
    // },
    // {
    //   title: '住院号',
    //   // dataIndex: 'zyh',
    //   dataIndex: 'inpNo',

    //   width: 80,
    //   align: 'center'
    // },
    ...appStore.hisMatch({
      map: {
        gzsrm: [],
        other: [
          {
            title: "床号",
            // dataIndex: 'ch',
            dataIndex: "bedLabel",

            width: 70,
            align: "center",
          },
        ],
      },
    }),
    ...appStore.hisMatch({
      map: {
        gzsrm: [],
        other: [
          {
            title: "住院号",
            // dataIndex: 'zyh',
            dataIndex: "inpNo",

            width: 80,
            align: "center",
          },
        ],
      },
    }),
    // {
    //   title: '管床护士',
    //   dataIndex: '',
    //   // dataIndex: 'zkbq',
    //
    //   width: 100,
    //   align: 'center'
    // },
    // {
    //   title: '质量结果',
    //   dataIndex: 'evalRate',

    //   width: 80,
    //   align: 'center',
    //   render(text: any) {
    //     return typeof text == 'number' && text.toFixed(2) + '%'
    //   }
    // },
    ...appStore.hisMatch({
      map: {
        gzsrm: [
          {
            title: "质量结果",
            dataIndex: "netTotalScore",

            width: 80,
            align: "center",
            render(text: any) {
              // gzsrm 质量结果去掉 %
              return typeof text == "number" && text.toFixed(2);
            },
          },
        ],
        other: [
          {
            title: "质量结果",
            dataIndex: "evalRate",

            width: 80,
            align: "center",
            render(text: any) {
              return typeof text == "number" && text.toFixed(2) + "%";
            },
          },
        ],
      },
    }),
    {
      title: "状态",
      // dataIndex: 'zt',
      // dataIndex: 'currentHandledNodeName',
      dataIndex: "nextNodePendingName",

      width: 110,
      align: "center",
      render(text: any, row: any) {
        if (!text && row.status == "-1") return "待提交";
        return row.status == "1" ? "已完成" : text;
      },
    },
    {
      title: "操作",
      dataIndex: "",

      width: 80,
      align: "center",
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            <span
              onClick={() => {
                onDoubleClick(row);
              }}
            >
              查看
            </span>
          </DoCon>
        );
      },
    },
  ];

  useEffect(() => {
    // qualityControlRecordApi.instanceGetPageByCondition().then((res:any) => {
    //   let cacheData = res.data.list
    //   // let cacheData1 = [...cacheData]
    //   setTableDataApi(cacheData)
    // })
  }, []);
  const onDoubleClick = (record: any) => {
    // appStore.history.push('/continuingEduEmpDetail')
    console.log("test-record.qcCode", record.qcCode);
    appStore.history.push(
      `/qualityControlRecordDetail/${record.id}?qcCode=${record.qcCode}`
    );
    // store.appStore.history.push(`/quality/qualityControlRecord/${qs.stringify(record)}`)
  };
  const onChange = (e: any) => {
    props.getTableData({
      pageSize: e.pageSize,
      current: e.current,
    });
  };
  return (
    <Con>
      <TableScrollCon>
        <TableCon>
          {/* {JSON.stringify(tableData)} */}
          {/* {allData.pageIndex} */}
          <BaseTable
            surplusHeight={225}
            // surplusHeight={135}
            loading={loadingGet}
            dataSource={tableData}
            columns={columns}
            // surplusWidth={160}
            onRow={(record: any) => {
              return {
                onDoubleClick: () => record.id && onDoubleClick(record),
              };
            }}
            rowSelection={
              showSelection
                ? {
                    onChange: (payload: any) =>
                      selectionChange && selectionChange(payload),
                    selectedRowKeys,
                  }
                : undefined
            }
            pagination={{
              total: allData.totalCount,
              current: allData.pageIndex,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ["10", "20", "30", "40", "50"],
              pageSize: allData.pageSize,
            }}
            onChange={onChange}
          />
        </TableCon>
      </TableScrollCon>
    </Con>
  );
});

const Con = styled.div`
  height: 100%;
  width: 100%;
`;
const TableScrollCon = styled.div`
  width: 100%;
  /* overflow-x: auto; */
`;

const TableCon = styled.div`
  width: 100%;
  /* margin-bottom:20px; */
`;
