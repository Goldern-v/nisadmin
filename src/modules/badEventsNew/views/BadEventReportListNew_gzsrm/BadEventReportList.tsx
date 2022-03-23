import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { DatePicker, Select, Button, message as Message, message } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import Moment from "moment";
import { badEventReportListService as api } from "./api/BadEventReportListService";
import { numToChinese } from "src/utils/number/numToChinese";
import CreateBadEventReport from "./components/CreateBadEventReport";
import { useKeepAliveEffect } from "react-keep-alive";
import qs from "qs";
import { PageTitle } from "src/components/common";
import { authStore } from "src/stores";

const Option = Select.Option;

export default observer(function BadEventReportList() {
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false);
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const { history } = appStore;

  const [query, setQuery] = useState({
    year: Moment() as null | Moment.Moment,
    pageIndex: 1,
    pageSize: 20,
    timeSection: "",
    timeType: "month",
    status: "",
  } as any);

  useEffect(() => {
    !query.timeSection && setQuery({ ...query, timeSection: "1月" });
    getTableData();
  }, [query]);

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === "POP") {
      getTableData();
    }
    return () => {};
  });

  const monthList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const [dataTotal, setDataTotal] = useState(0 as number);

  const [tableData, setTableData] = useState([] as any);

  const [tableLoading, setTableLoading] = useState(false);

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      key: "index",
      width: 50,
      align: "center",
      render: (text: string, record: any, index: any) => index + 1,
    },
    {
      title: "报告名称",
      key: "themeName",
      dataIndex: "themeName",
      align: "center",
      width: 200,
      render: (themeName: string) => <div title={themeName}>{themeName}</div>,
    },
    {
      title: "报告年度",
      key: "reportYear",
      dataIndex: "reportYear",
      width: 90,
      align: "center",
    },
    {
      title: "汇总月份",
      key: "reportMonth",
      dataIndex: "reportMonth",
      width: 90,
      align: "center",
    },
    {
      title: "创建人",
      key: "creatorName",
      dataIndex: "creatorName",
      width: 90,
      align: "center",
    },
    {
      title: "创建时间",
      key: "createDate",
      dataIndex: "createDate",
      width: 120,
      align: "center",
    },
    {
      title: "操作",
      key: "operation",
      width: 80,
      align: "center",
      render: (text: string, record: any) => {
        return (
          <DoCon>
            <span onClick={() => handleReview(record)}>查看</span>
          </DoCon>
        );
      },
    },
  ];

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false);
    setQuery({ ...query, year: value });
  };

  const handleOpenChange = (status: boolean) => {
    setYearPickerIsOpen(status);
  };

  const handleYearClear = () => {
    setQuery({ ...query, year: null, type: "" });
  };

  const handleReview = (record: any) => {
    if(!authStore.user?.roleManageCodeList.includes('QCR0001'))return message.warning('仅护理部人员可查看！')
    // let {themeName,beginDate,endDate} = JSON.parse(JSON.stringify(record))
    // history.push(`/BadEventReportViewGzsrm?name=${themeName}&dateBegin=${beginDate}&dateEnd=${endDate}`)
    let url = "/BadEventReportViewGzsrm?";
    let parseRecord = JSON.parse(JSON.stringify(record));
    for (let key in parseRecord) {
      url += `${key}=${parseRecord[key]}&`;
    }
    history.push(url);
  };

  const handleSearch = () => {
    getTableData();
  };

  const handleCreate = () => {
    if(!authStore.user?.roleManageCodeList.includes('QCR0001'))return message.warning('仅护理部人员可创建！')
    setCreateAnalysisVisible(true);
  };

  const handleCreateOk = (info: any) => {
    setCreateAnalysisVisible(false);

    // //汇总报告创建成功
    // let {
    //   // timeType, year, timeSection,
    //   id
    // } = info
    // getTableData()
    // setCreateAnalysisVisible(false)

    // history.push(`/BadEventReportView?${qs.stringify({
    //   id,
    //   // year,
    //   // type: timeType,
    //   // indexInType: timeSection,
    //   isNew: true
    // })}`)
  };

  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false);
  };

  const getTableData = () => {
    setTableLoading(true);
    let monthFormat = (month: any) => {
      let relMonth = month.split("月")[0];
      return relMonth.length == 2 ? relMonth : `0${relMonth}`;
    };
    let year = "";
    // if (query.year !== null) year = `${query.year.format('YYYY')}年`

    // let reqQuery = {
    //   ...query,
    //   year,
    //   statuss: (() => {
    //     switch (query.status) {
    //       case '1':
    //         return ['1']
    //       case '0':
    //         return ['0']
    //       default:
    //         return ['1', '0']
    //     }
    //   })()
    // }
    query.year
      ? (year = `${query.year.format("YYYY")}`)
      : Moment().format("YYYY");
    let month = query.timeSection ? monthFormat(query.timeSection) : "01";
    let reqQuery = {
      dateBegin: `${year}-${month}-01`,
    };
    api
      .getPage(reqQuery)
      .then((res) => {
        console.log(res);

        setTableLoading(false);

        setDataTotal(res.data.length || 0);

        if (res.data instanceof Array)
          setTableData(
            res.data.map((item: any, key: number) => {
              let reportYear = Moment(item.createDate).format("YYYY");
              let reportBeginMonth = item.dateBegin
                ? Moment(item.dateBegin).format("MM")
                : "";
              let reportEndMonth = item.dateEnd
                ? Moment(item.dateEnd).format("MM")
                : "";
              let reportMonth =
                reportBeginMonth &&
                reportEndMonth &&
                reportBeginMonth != reportEndMonth
                  ? `${reportBeginMonth}-${reportEndMonth}`
                  : `${reportBeginMonth || reportEndMonth}`;
              return {
                reportYear,
                reportMonth,
                key,
                ...item,
              };
            })
          );
      })
      .catch((res) => {
        setTableLoading(false);
      });
  };

  return (
    <Wrapper>
      <div className="topbar">
        <div className="float-left">
          <PageTitle>不良事件分析报告</PageTitle>
        </div>
        <div className="float-right">
          <div className="item">
            <div className="label">报告年度：</div>
            <div className="content">
              <DatePicker
                style={{ width: 100 }}
                value={query.year}
                open={yearPickerIsOpen}
                allowClear={false}
                mode="year"
                className="year-picker"
                placeholder="全部"
                format="YYYY"
                onChange={handleYearClear}
                onOpenChange={handleOpenChange}
                onPanelChange={handlePanelChange}
              />
            </div>
          </div>
          {/* <div className='item'>
            <div className='label'>汇总类型：</div>
            <div className='content'>
              <Select
                style={{ width: 100 }}
                value={query.type}
                onChange={(type: any) => {
                  setQuery({ ...query, type })
                }}
              >
                <Option value='month'>月度报告</Option>
              </Select>
            </div>
          </div> */}
          <div className="item">
            <div className="label">月份：</div>
            <div className="content">
              <Select
                style={{ width: 100 }}
                value={query.timeSection}
                onChange={(timeSection: any) => {
                  setQuery({ ...query, timeSection });
                }}
              >
                {monthList.map((item) => (
                  <Option value={`${item}月`} key={item}>
                    {item}月
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="item">
            <div className="label">状态：</div>
            <div className="content">
              <Select
                style={{ width: 100 }}
                value={query.status}
                onChange={(status: any) => {
                  setQuery({ ...query, status });
                }}
              >
                <Option value="">全部</Option>
                <Option value="0">保存</Option>
                <Option value="1">发布</Option>
              </Select>
            </div>
          </div>
          <div className="item">
            <Button onClick={handleSearch}>查询</Button>
          </div>
          <div className="item">
            <Button onClick={handleCreate} type="primary">
              创建
            </Button>
          </div>
        </div>
      </div>
      <div className="main-contain">
        <BaseTable
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={230}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => record.name && handleReview(record),
            };
          }}
          pagination={{
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            onShowSizeChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageSize }),
            onChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageIndex }),
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex,
          }}
        />
      </div>
      <CreateBadEventReport
        // allowClear={createClear}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        // groupRoleList={groupRoleListSelf}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  padding-top: 55px;
  height: 100%;
  width: 100%;

  div.topbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 5px 10px 15px;
    box-sizing: border-box;
    height: 55px;
    overflow: hidden;
    .float-left {
      float: left;
    }

    .float-right {
      float: right;
    }

    .item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      & > div {
        display: inline-block;
        vertical-align: middle;
      }
      .label {
      }
      .content {
        .year-picker {
          width: 75px;
        }
        .recode-type-select {
          min-width: 200px;
        }
        .month-select {
          width: 72px;
        }
      }
    }
  }

  .main-contain {
    height: 100%;
    width: 100%;
    padding: 15px;
    padding-top: 0;
    .align-left {
      position: relative;
      > div {
        position: absolute;
        left: 5px;
        right: 5px;
        top: 5px;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;
