import styled from "styled-components";
import React, { useState, useEffect } from "react";
import qs from "qs";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { Button, Select, message, Modal, Table, Tag } from "antd";
import BaseTable, {
  TabledCon,
  DoCon,
  TableHeadCon
} from "src/components/BaseTable";
import moment from "moment";
import YearPicker from "src/components/YearPicker";

import { ColumnProps } from "src/vendors/antd";
import { starRatingReportService } from "../nightChargingReport/api/StarRatingReportService";

const { Column, ColumnGroup } = Table;

const Option = Select.Option;

export default observer(function nightChargingTotleList() {
  const { history } = appStore;
  const defaultQuery = {
    year: moment().format("YYYY"),
    month: "9",
  } as any;

  const [query, setQuery] = useState(defaultQuery);
  const [cacheQuery, setCacheQuery] = useState(defaultQuery);
  const [bigDeptList, setBigDeptList] = useState([] as any[]);

  const [createVisible, setCreateVisible] = useState(false);

  const [tableData, setTableData] = useState([] as any[]);

  const [loading, setLoading] = useState(false);

  const [dataTotal, setDataTotal] = useState(0);


  //获取月份
  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = [];
    while (currentMonth--) {
      monthArr.push(currentMonth + 1);
    }
    return monthArr;
  })();


  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current });
  };

  const handleSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 });
  };

  const columns: ColumnProps<any>[] = [
    {
      key: "index",
      title: "序号",
      width: 80,
      align: "center",
      render: (text: string, record: any, idx: number) =>
        (query.pageIndex - 1) * query.pageSize + idx + 1
    },
    {
      dataIndex: "name",
      title: "科室",
      align: "left",
      render: (text: string, record: any, idx: number) => (
        <div className="ellips" title={text}>
          {text}
        </div>
      )
    },
    {
      dataIndex: "month",
      title: "护士",
      align: "center",
      width: 110,
      render: (text: string, record: any, idx: number) =>
        `${record.year}年${record.month}月`
    },
    {
      dataIndex: "deptCode",
      title: "主管护师",
      width: 200,
      render(text: any, record: any) {
        const target = authStore.deptList.find((item: any) => text === item.code)

        return target ? target.name : record.deptCode
        // return authStore.selectedDeptName;
      }
    },
    {
      dataIndex: "creatorName",
      key: "creatorName",
      title: "副主任护师",
      align: "center",
      width: 100
    },
    {
      dataIndex: "createDate",
      key: "createDate",
      title: "早晚助班",
      align: "center",
      width: 180
    },
    {
      dataIndex: "createDate",
      key: "createDate",
      title: "护工/工人",
      align: "center",
      width: 180
    },
    {
      dataIndex: "createDate",
      key: "createDate",
      title: "金额（元）",
      align: "center",
      width: 180
    },
  ];

  useEffect(() => {
    starRatingReportService.sgyGetListTwol(query).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
  })


  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon />
        <RightIcon>
          <span>年份:</span>
          <span className="year-select">
            <YearPicker
              allowClear={false}
              value={moment(`${query.year}-01-01`) || undefined}
              onChange={(newMoment: any) => {
                if (newMoment)
                  setQuery({ ...query, year: newMoment.format("YYYY") });
                else setQuery({ ...query, year: "" });
              }}
            />
          </span>
          <span>月份:</span>
          <Select
            className="month-select"
            onChange={(month: string) => setQuery({ ...query, month })}
          >
            <Option value="">全部</Option>
            {monthList.map((month: number) => (
              <Option value={`${month}`} key={month}>
                {month}
              </Option>
            ))}
          </Select>
          <Button type="primary">
            导出
          </Button>
          <Button type="primary">
            打印
          </Button>
        </RightIcon>
      </HeaderCon>
      <TableWrapper>
        <h3 className="table-wrapper-title">护理系统夜班绩效统计汇总表</h3>
        {/* <BaseTable
          className="table-wrapper-body"
          onRow={(record: any) => {
            return {
              onDoubleClick: () => { }
            };
          }}
          // surplusHeight={400}
          surplusHeight={100}
          dataSource={tableData}
          loading={loading}
          columns={columns}
          pagination={false}
        // pagination={{
        //   current: query.pageIndex,
        //   pageSize: query.pageSize,
        //   total: 0,
        //   onChange: handlePageChange,
        //   onShowSizeChange: handleSizeChange
        // }}
        /> */}
        <Table dataSource={tableData} columns={columns} />;
        <div className="night-other">
          <div className="night-tabel-make-user">制 表  人：张震</div>
          <div className="night-tabel-make-time">制表时间：2021-05-20</div>
          <div className="night-tabel-make-audit">审核人签字：赤道</div>
          <div className="night-tabel-make-accraditation">院领导审批：张学友</div>
        </div>
      </TableWrapper>
    </Wrapper>
  );
});

// @ts-ignore
const Wrapper = styled.div`
 position: relative;
`;
// @ts-ignore
const TableWrapper = styled(TabledCon)`
  padding: 0 115px;
  min-height: 600px;
  .table-wrapper-body{
    height: 300px !important;
  }
  td {
    position: relative;
    word-break: break-all;
    .ellips {
      position: absolute;
      left: 0;
      top: 0;
      height: 30px;
      line-height: 30px;
      right: 0;
      padding: 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .table-wrapper-title{
    padding-top: 50px;
    position: relative;
    text-align: center;
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
  }
  .night-other{
    .night-tabel-make-user,.night-tabel-make-time, 
    .night-tabel-make-audit,.night-tabel-make-accraditation{
      font-weight: 700;
      font-style: normal;
      font-size: 18px;
    }
   .night-tabel-make-user,.night-tabel-make-time{
      text-align: left;
      padding-left: 76%;
   }
   .night-tabel-make-accraditation{
     padding: 10px 0;
   }
  }
`;

const HeaderCon = styled.div`
  display: flex;
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .month-select {
    width: 70px;
  }
  .year-select {
    width: 100px;
    display: inline-block;
  }
  .approvalStatus-select{
    width:180px;
  }
`;
const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  /* padding: 0 0 0 15px; */
  display: flex;
  align-items: center;
`;
const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`;
const ExportCon = styled.div`
  & > div {
    margin-top: 15px;
  }
`;
