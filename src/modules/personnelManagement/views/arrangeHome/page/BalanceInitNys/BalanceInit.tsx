import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  DatePicker,
  Select,
  ColumnProps,
  PaginationConfig,
  message
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { authStore } from "src/stores";
import BaseTable from "src/components/BaseTable";
import { DoCon } from "src/components/BaseTable";
import { observer } from "mobx-react-lite";
import { arrangeService } from "../../services/ArrangeService";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import service from "src/services/api";
import moment from "moment";
import createModal from "src/libs/createModal";
import EditBalanceModal from "./modal/EditBalanceModal";
import { globalModal } from "src/global/globalModal";
export interface Props { }
export default observer(function FollowUpRecord() {
  const [dataSource, setDataSource] = useState([]);
  const [date, setDate]: any = useState(getCurrentMonth());
  const [selectedNurse, setSelectedNurse]: any = useState("");
  const [nurseList, setNurseList]: any = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("2");
  const editBalanceModal = createModal(EditBalanceModal);
  const columns: ColumnProps<any>[] = [
    {
      title: "日期",
      dataIndex: "workDate",
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
      title: "工号",
      dataIndex: "empNo",
      align: "center",
      width: 80
    },
    {
      title: "科室",
      dataIndex: "deptName",
      width: 150
    },
    {
      title: "累积积假（天）",
      dataIndex: "totalHoliday",
      align: "center",
      width: 100
    },
    {
      title: "备注",
      dataIndex: "remark",
      width: 200
    },
    {
      title: "操作",
      dataIndex: "",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        return (
          <DoCon>
            <span
              onClick={() => {
                editBalanceModal.show({
                  status: selectedStatus,
                  oldData: record,
                  nurseList,
                  onOkCallBack() {
                    getData();
                  }
                });
              }}
            >
              编辑
            </span>
            <span
              onClick={() => {
                globalModal
                  .confirm("删除确认", "你确定要删除改记录吗？")
                  .then(res => {
                    arrangeService.schBalanceHourDeleteNys(record.id).then(res => {
                      message.success("删除成功");
                      getData();
                    });
                  });
              }}
            >
              删除
            </span>
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

  const initData = () => {
    service.scheduleUserApiService
      .getByDeptCode(authStore.selectedDeptCode)
      .then(res => {
        setNurseList(res.data);
      });
  };

  const getData = () => {
    setPageLoading(true);
    let startDate = date[0] ? moment(date[0]).format("YYYY-MM-DD") : "";
    let endDate = date[1] ? moment(date[1]).format("YYYY-MM-DD") : "";
    arrangeService
      .schBalanceHourGetListNys({
        deptCode: authStore.selectedDeptCode,
        ...pageOptions,
        startDate,
        endDate,
        empNo: selectedNurse,
        status: selectedStatus
      })
      .then(res => {
        setDataSource(res.data.list);
        setPageLoading(false);
        setTotal(res.data.totalCount);
      });
  };

  const onDetail = (record: any) => { };
  useEffect(() => {
    getData();
  }, [pageOptions.pageIndex, pageOptions.pageSize, authStore.selectedDeptCode, date, selectedNurse, selectedStatus]);

  useEffect(() => {
    initData();
  }, [authStore.selectedDeptCode]);
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>积假设置</PageTitle>
        <Place />

        <span className="label">积假类型:</span>
        <Select
          value={selectedStatus}
          onChange={(value: any) => setSelectedStatus(value)}
        >
          <Select.Option value="2">初始积假</Select.Option>
          <Select.Option value="1">排班积假</Select.Option>
        </Select>
        <span className="label">积假日期:</span>
        <DatePicker.RangePicker
          style={{ width: 220 }}
          value={date}
          onChange={(value: any) => setDate(value)}
        />
        <span className="label">科室:</span>
        <DeptSelect onChange={() => { }} />
        <span className="label">护士:</span>
        <Select
          value={selectedNurse}
          onChange={(value: any) => setSelectedNurse(value)}
        >
          <Select.Option value="">全部</Select.Option>
          {nurseList.map((item: any, index: number) => (
            <Select.Option value={item.empName} key={index}>
              {item.empName}
            </Select.Option>
          ))}
        </Select>
        <Button onClick={() => getData()}>查询</Button>
        <Button
          type="primary"
          onClick={() => {
            editBalanceModal.show({
              nurseList,
              status: selectedStatus,
              onOkCallBack() {
                getData();
              }
            });
          }}
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
      <editBalanceModal.Component />
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
