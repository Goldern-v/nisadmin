import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  DatePicker,
  Select,
  ColumnProps,
  PaginationConfig
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { observer } from "mobx-react-lite";
import { DictItem } from "src/services/api/CommonApiService";
import BaseTabs, { ConfigItem } from "src/components/BaseTabs";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import { authStore } from "src/stores";
import { arrangStatisticsService } from "./services/ArrangStatisticsService";
import BaseTable from "src/components/BaseTable";
import { arrangeService } from "../../services/ArrangeService";

export interface Props {
}

export default observer(function ArrangStatistics() {
  const [date, setDate]: any = useState(getCurrentMonth());
  const [dataSource, setDataSource] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [showType, setShowType] = useState("班次统计");
  const showTypeList: DictItem[] = [
    {
      code: "班次统计",
      name: "班次统计"
    },
    {
      code: "工时统计",
      name: "工时统计"
    }
  ];

  const columns_1: ColumnProps<any>[] | any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 60,
      fixed: 'left',
    },
    {
      title: "姓名",
      dataIndex: "姓名",
      width: 80,
      align: "center",
      fixed: 'left',
    },
    ...Object.keys(dataSource[0] || {})
      .filter(item => !(item == "姓名" || item == "合计" || item == "序列"))
      .map(item => {
        return {
          title: item,
          dataIndex: item,
          width: 50,
          align: "center"
        };
      }),
    {
      title: "工时合计",
      dataIndex: "合计",
      width: 80,
      align: "center"
    }
  ];
  const columns_2: ColumnProps<any>[] | any = [
    {
      title: "护士工号",
      width: 100,
      dataIndex: "工号",
      align: "center"
    },
    {
      title: "护士姓名",
      width: 100,
      dataIndex: "姓名",
      align: "center"
    },
    {
      title: "总小时数",
      dataIndex: "statusType",
      align: "center",
      width: 100,
      render(text: string, record: any, index: number) {
        let keys = Object.keys(record).filter(
          (item: any) =>
            item !== "工号" &&
            item !== "姓名" &&
            item !== "加班" &&
            item !== "减班" &&
            item !== "key"
        );
        let sum = keys.reduce((total: any, current: any) => {
          total += record[current];
          return total;
        }, 0);
        return Number(
          sum + Number(record["加班"]) - Number(record["减班"])
        ).toFixed(2);
      }
    },
    ...Object.keys(dataSource[0] || {})
      .filter(
        (item: any) =>
          item !== "工号" &&
          item !== "姓名" &&
          item !== "加班" &&
          item !== "减班" &&
          item !== "key"
      )
      .map(item => ({
        title: item,
        width: 100,
        dataIndex: item,
        align: "center",
        render(text: string, record: any, index: number) {
          return text || 0;
        }
      })),
    {
      title: "加班",
      dataIndex: "加班",
      align: "center",
      width: 100
    },
    {
      title: "减班",
      dataIndex: "减班",
      align: "center",
      width: 100
    }
  ];

  let columns =
    showType == "班次统计"
      ? columns_1
      : showType == "工时统计"
      ? columns_2
      : [];

  const onLoad = () => {
    if (showType == "班次统计") {
      setPageLoading(true);
      arrangStatisticsService
        .countUserAll({
          deptCode: authStore.selectedDeptCode,
          startTime: (date && date[0] && date[0].format("YYYY-MM-DD")) || "",
          endTime: (date && date[1] && date[1].format("YYYY-MM-DD")) || "",
          type: "range_name",
          status: true
        })
        .then(res => {
          setPageLoading(false);
          setDataSource(res.data || []);
        });
    }

    if (showType == "工时统计") {
      arrangeService
        .schNightHourFindBylist({
          wardCode: authStore.selectedDeptCode,
          empNo: "",
          startDate: (date && date[0] && date[0].format("YYYY-MM-DD")) || "",
          endDate: (date && date[1] && date[1].format("YYYY-MM-DD")) || ""
        })
        .then(res => {
          setDataSource(res.data);
          setPageLoading(false);
        });
    }
  };

  useEffect(() => {
    onLoad();
  }, [date, authStore.selectedDeptCode, showType]);

  useEffect(() => {
    setDataSource([]);
  }, [showType]);
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>排班统计</PageTitle>
        <Place/>
        <span className="label">日期:</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 220 }}
          value={date}
          onChange={(value: any) => setDate(value)}
        />
        <span className="label">科室:</span>
        <DeptSelect onChange={() => {
        }}/>
        <span className="label">类型:</span>
        <Select value={showType} onChange={(value: any) => setShowType(value)}>
          {showTypeList.map(item => (
            <Select.Option key={item.code} value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Button type="primary" onClick={onLoad}>
          刷新
        </Button>
      </PageHeader>
      <div style={{ margin: "0 15px" }}>
        <BaseTable
          loading={pageLoading}
          dataSource={dataSource}
          columns={columns}
          surplusHeight={180}
          surplusWidth={220}
        />
      </div>
    </Wrapper>
  );
});
const Wrapper = styled.div``;
