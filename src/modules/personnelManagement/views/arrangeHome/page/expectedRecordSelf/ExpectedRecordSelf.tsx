import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  DatePicker,
  ColumnProps,
  PaginationConfig,
  message
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import {appStore, authStore} from "src/stores";
import BaseTable from "src/components/BaseTable";
import { DoCon } from "src/components/BaseTable";
import { observer } from "mobx-react-lite";
import { arrangeService } from "../../services/ArrangeService";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import moment from "moment";
import createModal from "src/libs/createModal";

import { globalModal } from "src/global/globalModal";
import AddExpectedModal from "./modal/AddExpectedModal";
export interface Props {}
export default observer(function ExpectedRecord() {
  const [dataSource, setDataSource] = useState([]);
  const [date, setDate]: any = useState(getCurrentMonth());
  const selectedNurse = authStore.user && authStore.user.empNo;
  const [pageLoading, setPageLoading] = useState(false);
  const columns: ColumnProps<any>[] = [
    {
      title: "科室",
      dataIndex: "deptName",
      align: "center",
      width: 100,
      render(text: any, record: any, index: number) {
        return authStore.selectedDeptName;
      }
    },
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
      title: "期望排班日期",
      dataIndex: "startDate",
      align: "center",
      width: 100
    },
    {
      title: "期望排班班次",
      dataIndex: "rangeName",
      align: "center",
      width: 100
    },
    {
      title: "班次类别",
      dataIndex: "shiftType",
      align: "center",
      width: 100
    },
    {
      title: "备注",
      dataIndex: "detail",
      align: "center",
      width: 100
    },
    {
      title: "是否已经排入排班",
      dataIndex: "status",
      align: "center",
      width: 100,
      render(text: any, record: any, index: number) {
        return text == "1" ? "是" : "否";
      }
    },
    {
      title: "操作",
      align: "center",
      width: 100,
      render: (status: string, record: any) => {
        return (
          <DoCon>
            <span
              onClick={() =>
                addExpectedModal.show({
                  onOkCallBack: getData,
                  oldData: record
                })
              }
            >
              修改
            </span>
            <span onClick={() => handleDelete(record.id)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  });
  const [total, setTotal] = useState(0);

  const addExpectedModal = createModal(AddExpectedModal);

  const handleDelete = (id: any) => {
    globalModal.confirm("确认删除", "是否删除此期望排班").then(res => {
      arrangeService.schExpectDelete(id).then(res => {
        message.success("删除成功");
        getData();
      });
    });
  };
  const initData = () => {};

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
        empNo: selectedNurse
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

  const onDetail = (record: any) => {};
  useEffect(() => {
    getData();
  }, [pageOptions.pageIndex, pageOptions.pageSize, authStore.selectedDeptCode, date, selectedNurse]);

  useEffect(() => {
    initData();
  }, [authStore.selectedDeptCode]);
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>我的期望排班</PageTitle>
        <Place />

        <span className="label">{appStore.HOSPITAL_ID==='fssdy'?'日期':'休假日期'}:</span>
        <DatePicker.RangePicker
          value={date}
          onChange={(value: any) => setDate(value)}
        />
        <span className="label">科室:</span>
        <DeptSelect onChange={() => {}} />
        <Button onClick={() => getData()} type="primary">
          查询
        </Button>
        <Button
          onClick={() =>
            addExpectedModal.show({
              onOkCallBack: getData
            })
          }
        >
          添加
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
      <addExpectedModal.Component />
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
