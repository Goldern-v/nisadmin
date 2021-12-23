import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  Select,
  ColumnProps,
  PaginationConfig,
  Input,
  message
} from "src/vendors/antd";
const { RangePicker } = DatePicker;

import DeptSelect from "src/components/DeptSelect";
import { appStore, authStore } from "src/stores";
import BaseTable from "src/components/BaseTable";

import { useCallback } from "src/types/react";
import { DoCon } from "src/components/BaseTable";
import { observer } from "mobx-react-lite";
import { DictItem } from "src/services/api/CommonApiService";
import { arrangeService } from "../../services/ArrangeService";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import service from "src/services/api";
import User from "src/models/User";
import moment from "moment";
import createModal from "src/libs/createModal";

import { globalModal } from "src/global/globalModal";
export interface Props {}
export default observer(function ExpectedRecord() {
  const [dataSource, setDataSource] = useState([]);
  const [date, setDate]: any = useState(getCurrentMonth());
  const [selectedNurse, setSelectedNurse]: any = useState("");
  const [nurseList, setNurseList]: any = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("2");
  const [mode, setMode] = useState(['month', 'month'])
  const [nameORno, setNameORno] = useState('')

  const updateDataSource = () => {
    setDataSource([...dataSource]);
  };
  const columns: ColumnProps<any>[] = [
    {
      title: "工号",
      dataIndex: "empNo",
      align: "center",
      width: 100
    },
    {
      title: "姓名",
      dataIndex: "empName",
      align: "center",
      width: 100
    },
    {
      title: "职称",
      dataIndex: "startDate",
      align: "center",
      width: 100
    },
    {
      title: "层级",
      dataIndex: "rangeName",
      align: "center",
      width: 100
    },
    {
      title: "P班",
      dataIndex: "shiftType",
      align: "center",
      width: 100
    },
    {
      title: "N班",
      dataIndex: "detail",
      align: "center",
      width: 100
    },
    {
      title: "夜班总数",
      dataIndex: "status",
      align: "center",
      width: 100,
    }
  ];

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  });
  const [total, setTotal] = useState(0);

  const initData = () => {
    service.scheduleUserApiService
      .getByDeptCode(authStore.selectedDeptCode)
      .then(res => {
        setNurseList(res.data.filter((item: any) => item.empNo));
      });
  };


  const getData = () => {
    setPageLoading(true);
    let startDate = date[0] ? moment(date[0]).format("YYYY-MM-DD") : "";
    let endDate = date[1] ? moment(date[1]).format("YYYY-MM-DD") : "";
    arrangeService
      .schExpectGetListPC({
        deptCode: authStore.selectedDeptCode,
        ...pageOptions,
        startDate,
        endDate,
        empNo: selectedNurse,
        value: nameORno
      })
      .then(res => {
        setDataSource(res.data.list);
        setPageLoading(false);
        setTotal(res.data.totalCount);
      });
    // qcOneService.qcSafetyCheckGetPage({ ...pageOptions, wardCode: authStore.selectedDeptCode }).then((res) => {
    //   setDataSource(res.data.list)
    //   setPageLoading(false)
    // })
  };
  const handlePanelChange = (value: any, mode: any) => {
    setDate(value)
    setMode([mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]])
  }

  const onDetail = (record: any) => {};
  useEffect(() => {
    getData();
  }, [pageOptions.pageIndex, pageOptions.pageSize, authStore.selectedDeptCode, date, selectedNurse, selectedStatus]);

  useEffect(() => {
    initData();
  }, [authStore.selectedDeptCode]);
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>夜班数统计</PageTitle>
        <Place />
        
        <span className="label">姓名/工号:</span>
        <Input style={{ width: 200 }} value={nameORno} onChange={e => setNameORno(e.target.value)} placeholder="请输入员工姓名或者工号" />

        <span className="label">日期:</span>
        <RangePicker
          placeholder={['Start month', 'End month']}
          format="YYYY-MM"
          style={{ width: 240 }}
          value={date}
          mode={mode}
          onChange={(value: any) => setDate(value)}
          onPanelChange={handlePanelChange}
          // renderExtraFooter={() => 'extra footer'}
          ranges={{
            本月: [moment().startOf("month"), moment().endOf("month")],
            今年至今: [moment().startOf("year"), moment()],
            最近六个月: [moment(new Date()).subtract(6, 'months'), moment().endOf("month")],
          }}
        />

        <span className="label">科室:</span>
        <DeptSelect hasAllDept onChange={() => {}} />
       
        <Button onClick={() => getData()} type="primary">
          查询
        </Button>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: "0 15px" }}
        type={["index"]}
        surplusHeight={200}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          });
        }}
        onRow={(record: any) => {
          return { onDoubleClick: () => onDetail(record) };
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  .input-cell {
    padding: 0 !important;
    input {
      border: 0;
      border-radius: 0;
      box-shadow: none;
      outline: none;
      text-align: center;
      &:focus {
        background: ${p => p.theme.$mlc};
      }
    }
  }
`;
