import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Select, message, Modal } from "antd";
import { PageTitle } from "src/components/common";
import BaseTable, {
  TabledCon,
  DoCon,
  TableHeadCon
} from "src/components/BaseTable";
import { ColumnProps } from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import YearPicker from "src/components/YearPicker";
import moment from "moment";
import qs from "qs";
import {
  starRatingReportService,
  ListQuery
} from "./api/StarRatingReportService";
import { numToChinese } from "src/utils/number/numToChinese";

import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";

import ReportCreateModal from "./components/ReportCreateModal";
import EditSchNightStandardModal from "./model/EditSchNightStandardModal";
import createModal from "src/libs/createModal";
import { approvalStatusList, IApprovalStatus } from "./types"

export interface Props {
}

const Option = Select.Option;

export default observer(function NursingWorkPlainList() {
  const { history } = appStore;

  const defaultQuery = {
    deptCode: "",
    pageIndex: 1,
    approvalStatus: "",//状态
    year: moment().format("YYYY"),
    month: "",
    pageSize: 20
  } as any;

  const [query, setQuery] = useState(defaultQuery);
  const [cacheQuery, setCacheQuery] = useState(defaultQuery);
  const [bigDeptList, setBigDeptList] = useState([] as any[]);

  const [createVisible, setCreateVisible] = useState(false);

  const [tableData, setTableData] = useState([] as any[]);

  const [loading, setLoading] = useState(false);

  const [dataTotal, setDataTotal] = useState(0);

  const [schNightStandard, setSchNightStandard] = useState(0);

  const editSchNightStandardModal = createModal(EditSchNightStandardModal);


  /**
   * 渲染状态类型
   * @param status 
   * @returns 
   */
  const renderStatus = (status: string) => {
    let newStatus = parseInt(status);
    return (
      <div className={'status' + newStatus}>{approvalStatusList[newStatus].str}</div>
    )
  }

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
      title: "标题",
      align: "left",
      render: (text: string, record: any, idx: number) => (
        <div className="ellips" title={text}>
          {text}
        </div>
      )
    },
    // {
    //   dataIndex: "deptName",
    //   key: "deptName",
    //   title: "科室",
    //   width: 180
    // },
    {
      dataIndex: "month",
      title: "月份",
      align: "center",
      width: 110,
      render: (text: string, record: any, idx: number) =>
        `${record.year}年${record.month}月`
    },
    {
      dataIndex: "deptCode",
      title: "科室",
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
      title: "创建人",
      align: "center",
      width: 100
    },
    {
      dataIndex: "createDate",
      key: "createDate",
      title: "创建时间",
      align: "center",
      width: 180
    },
    {
      dataIndex: "approvalStatus",
      title: "状态",
      align: "center",
      width: 100,
      render: (approvalStatus: string, record: any, idx: number) => {
        return (
          renderStatus(approvalStatus)
        );
      }
    },
    {
      key: "operate",
      title: "操作",
      width: 180,
      render: (text: string, record: any) => {
        return (
          <DoCon className="operate-group">
            <span onClick={() => handleEdit(record)}>查看</span>
            {record.approvalStatus == '0' || record.approvalStatus == '2' ? <span className="status2">删除</span> : ''}
            {record.approvalStatus == '3' ? <span className="status3">撤销</span> : ''}
          </DoCon>
        );
      }
    }
  ];

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current });
  };

  const handleSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 });
  };

  const handleSearch = () => {
    if (query.pageIndex == 1) getList(query);
    setQuery({ ...query, pageIndex: 1 });
  };

  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = [];
    while (currentMonth--) {
      monthArr.push(currentMonth + 1);
    }
    return monthArr;
  })();

  const getList = (query: any) => {
    setLoading(true);
    query.deptCode = query.deptCode === '全院' ? '' : query.deptCode
    starRatingReportService.getPage(query).then(
      res => {
        setLoading(false);
        if (res.data) {
          setTableData(res.data.list);
          setDataTotal(res.data.totalCount);
        }
      },
      () => setLoading(false)
    );
  };

  const handleCreate = () => {
    setCreateVisible(true);
  };

  const handleCancel = () => {
    setCreateVisible(false);
  };

  const handleOk = () => {
    handleCancel();
    getList(query);
  };

  const handleEdit = (record: any) => {
    let target = authStore.deptList.find((item: any) => item.code === record.deptCode)

    history.push(
      `/nightChargingReport?${qs.stringify({
        deptCode: record.deptCode,
        deptName: target ? target.name : record.deptCode,
        startDate: record.startDate,
        endDate: record.endDate,
        name: record.name,
        id: record.id
      })}`
    );
  };

  const handledeptCodeChange = (deptCode: string) => {
    setQuery({ ...query, deptCode });
  };

  const handleExport = (record: any) => {
    // console.log(record)
    setLoading(true);
    // starRatingReportService.exportData({
    //   deptCode: record.deptCode,
    //   year: record.year,
    //   month: record.month
    // }).
  };

  const getSchNightStandard = (deptCode: any) => {
    starRatingReportService.getSchNightStandard(deptCode).then(res => {
      setSchNightStandard(res.data && res.data.standard);
    });
  };

  useEffect(() => {
    query.deptCode && getList(query);
  }, [query]);

  useEffect(() => {
    query.deptCode && getSchNightStandard(query.deptCode);
  }, [query.deptCode]);

  // useKeepAliveEffect(() => {
  //   if (
  //     appStore.history &&
  //     (appStore.history.action === "POP" || appStore.history.action === "PUSH")
  //   ) {
  //     getList(query);

  //   }
  //   return () => {};
  // });

  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon>
          <PageTitle className="pannel-title">夜班费统计</PageTitle>
        </LeftIcon>
        <RightIcon>
          <span>状态:</span>
          <Select
            value={query.approvalStatus}
            className="approvalStatus-select"
            onChange={(approvalStatus: number) => {
              if (approvalStatus)
                setQuery({ ...query, approvalStatus: approvalStatus });
              else setQuery({ ...query, approvalStatus: "" });
            }}
          >
            <Option value="">全部</Option>
            {approvalStatusList.map((item: IApprovalStatus) => (
              <Option value={item.approvalStatus} key={item.approvalStatus}>
                {item.str}
              </Option>
            ))}
          </Select>
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
            value={query.month}
            onChange={(month: string) => setQuery({ ...query, month })}
            className="month-select"
          >
            <Option value="">全部</Option>
            {monthList.map((month: number) => (
              <Option value={`${month}`} key={month}>
                {month}
              </Option>
            ))}
          </Select>

          <span>科室:</span>
          <DeptSelect hasAllDept onChange={deptCode => setQuery({ ...query, deptCode })} />

          {/* <span>标准:</span>
          <Text
            onClick={() =>
              editSchNightStandardModal.show({
                standard: schNightStandard,
                deptCode: query.deptCode,
                onOkCallBack(standard: any) {
                  setSchNightStandard(standard);
                }
              })
            }
          >
            {schNightStandard == 0 ? 0 : schNightStandard || "--"}
          </Text> */}
          <Button onClick={handleSearch} type="primary">
            查询
          </Button>
          <Button onClick={handleCreate} type="primary">
            创建
          </Button>
        </RightIcon>
      </HeaderCon>
      <TableWrapper>
        <BaseTable
          onRow={(record: any) => {
            return {
              onDoubleClick: () => handleEdit(record)
            };
          }}
          surplusHeight={225}
          dataSource={tableData}
          loading={loading}
          columns={columns}
          pagination={{
            current: query.pageIndex,
            pageSize: query.pageSize,
            total: dataTotal || 0,
            onChange: handlePageChange,
            onShowSizeChange: handleSizeChange
          }}
        />
      </TableWrapper>
      <ReportCreateModal
        onOk={handleOk}
        deptCode={query.deptCode || authStore.defaultDeptCode}
        visible={createVisible}
        onCancel={handleCancel}
      />
      <editSchNightStandardModal.Component />
    </Wrapper>
  );
});

// @ts-ignore
const TableWrapper = styled(TabledCon)`
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
  .status0{
    font-weight: 400;
    font-style: normal;
    color: #7F7F7F;
  }
  .status1{
    font-weight: 400;
    font-style: normal;
    color: #02A7F0;
  }
  .status2{
    font-weight: 400;
    font-style: normal;
    color: #D9001B;
  }
  .status3{
    font-weight: 400;
    font-style: normal;
    color: #F59A23;
  }
`;

const HeaderCon = styled(TableHeadCon)`
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
const Wrapper = styled.div`
  .operate-group {
    .delete {
      color: red;
    }
  }
  .pannel-title {
    @media (max-width: 1480px) {
      display: none;
    }
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

const Text = styled.aside`
  cursor: pointer;
  color: ${p => p.theme.$mtc};
  font-weight: bold;
  margin-right: 15px;
  text-decoration: underline;
  padding: 5px;
  font-size: 16px;
  &:hover {
    color: ${p => p.theme.$mtdc};
  }
`;
