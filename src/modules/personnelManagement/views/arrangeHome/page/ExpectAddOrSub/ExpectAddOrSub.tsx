import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  DatePicker,
  Select,
  ColumnProps,
  PaginationConfig,
  Input,
  message
} from "src/vendors/antd";
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
import ExpectAddOrSubModal from "./modal/AddSubClassModal";
export interface Props { }
export default observer(function ExpectAddOrSub() {
  const [dataSource, setDataSource] = useState([]);
  const [date, setDate]: any = useState(getCurrentMonth());
  const selectedNurse = authStore.user && authStore.user.empNo;

  const [pageLoading, setPageLoading] = useState(false);

  const updateDataSource = () => {
    setDataSource([...dataSource]);
  };
  const columns: ColumnProps<any>[] = [
    {
      title: "科室",
      dataIndex: "deptName"
    },
    {
      title: "护士工号",
      width: 100,
      dataIndex: "empNo",
      align: "center"
    },
    {
      title: "护士姓名",
      width: 100,
      dataIndex: "empName",
      align: "center"
    },
    {
      title: "类型",
      dataIndex: "statusType",
      align: "center",
      width: 100,
      render(text: string, record: any, index: number) {
        return text == "1" ? "加班" : "减班";
      }
    },
    {
      title: "加/减班日期",
      dataIndex: "workDate",
      align: "center",
      width: 120
    },

    {
      title: "开始时间",
      dataIndex: "startDate",
      align: "center",
      render(text: string, record: any, index: number) {
        return moment(text).isValid() ? moment(text).format("HH:mm") : text;
      }
    },
    {
      title: "结束时间",
      dataIndex: "endDate",
      align: "center",
      render(text: string, record: any, index: number) {
        return moment(text).isValid() ? moment(text).format("HH:mm") : text;
      }
    },
    {
      title: "夜小时数",
      dataIndex: "settingNightHour",
      align: "center"
    },
    {
      title: "备注",
      dataIndex: "remark"
    },
    {
      title: "合计小时数",
      width: 100,
      dataIndex: "hour",
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "publishType",
      align: "center",
      render(text: string) {
        return text === "1" ? "已填入" : "未填入";
      }
    },
    {
      title: "操作",
      align: "center",
      render(text: string, record: any) {
        return <DoCon>
          <span onClick={(e: any) => {
            addExpectedModal.show({
              editData: record,
              onOkCallBack: () => {
                getData();
              }
            });
          }}>编辑</span>
          <span onClick={() => {
            deleteOrSub(record.id)
          }}>删除</span>
        </DoCon>
      }
    }
  ];

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  });
  const [total, setTotal] = useState(0);

  const addExpectedModal = createModal(ExpectAddOrSubModal);

  const deleteOrSub = (id: any) => {
    globalModal.confirm("确认删除", "是否删除此记录吗").then(res => {
      arrangeService.deleteOrSub(id).then(res => {
        message.success("删除成功");
        getData();
      })
    });
  }
  const initData = () => { };

  const getData = () => {
    setPageLoading(true);
    let startDate = date[0] ? moment(date[0]).format("YYYY-MM-DD") : "";
    let endDate = date[1] ? moment(date[1]).format("YYYY-MM-DD") : "";
    let data = {
      startDate,
      endDate,
      empNo: selectedNurse,
      deptCode: authStore.selectedDeptCode,
      ...pageOptions,
    }
    arrangeService
      .findBylist(data)
      .then(res => {
        setDataSource(res.data.list);
        setPageLoading(false);
        setTotal(res.data.totalCount);
      });
    // arrangeService
    //   .schExpectGetListPC({
    //     deptCode: authStore.selectedDeptCode,
    //     ...pageOptions,
    //     startDate,
    //     endDate,
    //     empNo: selectedNurse
    //   })
    //   .then(res => {
    //     setDataSource(res.data.list);
    //     setPageLoading(false);
    //     setTotal(res.data.totalCount);
    //   });
    // qcOneService.qcSafetyCheckGetPage({ ...pageOptions, wardCode: authStore.selectedDeptCode }).then((res) => {
    //   setDataSource(res.data.list)
    //   setPageLoading(false)
    // })
  };

  const onDetail = (record: any) => { };
  useEffect(() => {
    getData();
  }, [pageOptions.pageIndex, pageOptions.pageSize, authStore.selectedDeptCode, date, selectedNurse]);

  useEffect(() => {
    initData();
  }, [authStore.selectedDeptCode]);
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>我的加减班</PageTitle>
        <Place />

        <span className="label">加/减班日期:</span>
        <DatePicker.RangePicker
          value={date}
          onChange={(value: any) => setDate(value)}
        />
        {/* <span className="label">科室:</span>
        <DeptSelect onChange={() => { }} /> */}
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
