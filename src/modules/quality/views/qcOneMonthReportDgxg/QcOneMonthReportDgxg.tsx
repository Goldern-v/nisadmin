import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { DatePicker, Select, Button, message, Icon, Modal } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import moment, { duration } from "moment";
import QualityAnalysisService from "./api/QualityAnalysisService";

import CreateAnalysisModal from "./components/CreateAnalysisModal";
import AnalysisCreateProgress from "./components/AnalysisCreateProgress";
import qs from "qs";
import { PageTitle } from "src/components/common";
import { useKeepAliveEffect } from "src/vendors/keep-alive";
import { CONFIG_TITLE } from "../../utils/enums";

const api = new QualityAnalysisService();
const Option = Select.Option;

export default observer(function QcOneMonthReportDgxg() {
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false);
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [createClear, setCreateClear] = useState(true);
  const { history } = appStore;
  const [groupRoleList, setGroupRolelist] = useState([]);
  const [groupRoleListSelf, setGroupRolelistSelf] = useState([]);

  //进度条相关
  const [createProgressVisible, setCreateProgressVisible] = useState(false);
  const [createLoading, setCreateLoading] = useState("");

  const [query, setQuery] = useState({
    year: moment() as null | moment.Moment,
    pageIndex: 1,
    pageSize: 20,
    type: "month",
    indexInType: moment().month() + 1 + "",
    status: "",
    groupRoleCode: "",
  } as any);
  const { location } = appStore;
  const [level, setLevel] = useState(3);
  const rankTextList = ["", "一", "二", "三"];
  useEffect(() => {
    if (location.search) {
      let obj = qs.parse(location.search.substring(1));
      obj.qcLevel && setLevel(obj.qcLevel);
    }
    api.qcRoleCode().then((res) => {
      if (res.data instanceof Array) setGroupRolelist(res.data);
    });
    api.qcRoleCodeSelf().then((res) => {
      if (res.data instanceof Array) setGroupRolelistSelf(res.data);
    });
  }, []);

  useEffect(() => {
    getTableData();
  }, [query]);

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === "POP") {
      getTableData();
    }
    return () => {};
  });

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
      key: "reportName",
      dataIndex: "reportName",
      className: "align-left",
      align: "left",
      width: 200,
      render: (name: string) => <div title={name}>{name}</div>,
    },
    {
      title: "报告年度",
      key: "year",
      dataIndex: "year",
      width: 90,
      align: "center",
      render: (year: string) => `${year}年`,
    },
    {
      title: "报告月份",
      key: "indexInType",
      dataIndex: "indexInType",
      width: 90,
      align: "center",
      render: (month: string) => `${month}月`,
    },
    {
      title: "质控开始日期",
      key: "beginDate",
      dataIndex: "beginDate",
      width: 90,
      align: "center",
    },
    {
      title: "质控结束日期",
      key: "endDate",
      dataIndex: "endDate",
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
      key: "createTime",
      dataIndex: "createTime",
      width: 120,
      align: "center",
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      width: 80,
      align: "center",
      render: (status: string) => {
        switch (status) {
          case "0":
            return <span style={{ color: "red" }}>保存</span>;
          case "1":
            return "发布";
          default:
            return "-";
        }
      },
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
    setQuery({ ...query, year: null, indexInType: "" });
  };

  const handleReview = (record: any) => {
    const obj = {
      type: record.type,
      year: record.year,
      indexInType: record.indexInType,
      beginDate: record.beginDate,
      endDate: record.endDate,
      groupRoleCode: record.groupRoleCode,
      reportName: record.reportName,
      qcOne:'monthReport'
    };
    // console.log(record)
    history.push(`/qualityAnalysisReport?${qs.stringify(obj)}`);
  };

  const handleSearch = () => {
    getTableData();
  };

  const handleCreate = () => {
    // history.push('/qualityAnalysisEdit')
    setCreateAnalysisVisible(true);
  };

  const handleCreateOk = (params: any) => {
    if (!params.reportName) return;

    setCreateClear(false);
    // setCreateAnalysisVisible(false)
    setCreateProgressVisible(true);
    setCreateLoading("start");

    let successCallback = () => {
      setCreateLoading("done");
      setCreateClear(true);
      message.success("创建成功", 2, () => {
        setCreateProgressVisible(false);
        setCreateClear(true);
        setCreateLoading("");
        getTableData();
      });
    };

    let failedCallback = (msg?: string) => {
      // setCreateLoading('failed')

      setCreateProgressVisible(false);
      // setCreateAnalysisVisible(true)
      setCreateClear(true);
      setCreateLoading("");
    };

    api
      .createReport({ ...params, type: "month" })
      .then((res) => {
        if (res.code == 200) {
          handleCreateCancel();
          setCreateProgressVisible(false);
          // setCreateAnalysisVisible(true)
          setCreateClear(true);
          setCreateLoading("");
          Object.assign(res.data.report,{qcOne:"monthReport"})
          appStore.history.push(
            `/qualityAnalysisReport?${qs.stringify(res.data.report)}`
          );
          // successCallback()
        } else {
          failedCallback(res.desc || "");
        }
      })
      .catch((err) => {
        failedCallback(err || "");
      });
  };

  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false);
  };

  const getTableData = () => {
    setTableLoading(true);
    let year = "";
    if (query.year !== null) year = query.year.format("YYYY");

    let reqQuery = {
      ...query,
      year,
    };
    api
      .getPage(reqQuery)
      .then((res) => {
        setTableLoading(false);

        if (res.data.totalPage) setDataTotal(res.data.totalPage);
        else setDataTotal(0);

        if (res.data.list instanceof Array)
          setTableData(
            res.data.list.map((item: any, key: number) => {
              return {
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

  const handleAlert = () => {
    // if (!query.groupRoleCode) {
    //   message.warning('未选择质控组')
    //   return
    // }
    let month = query.indexInType;
    let year = query.year.format("YYYY");
    if (month.length == 1) month = "0" + month;
    let dateStr = `${year}-${month}-01`;
    let beginDate = moment(dateStr);
    let endDate = moment(dateStr)
      .add(1, "M")
      .subtract(1, "d");
    let groupRoleCode = "";

    const content = (
      <ModalCon>
        <div>
          <span>开始时间: </span>
          <DatePicker
            allowClear={false}
            value={beginDate}
            onChange={(_moment) => (beginDate = _moment)}
          />
        </div>
        <div>
          <span>结束时间: </span>
          <DatePicker
            value={endDate}
            allowClear={false}
            onChange={(_moment) => (endDate = _moment)}
          />
        </div>
        <div>
          <span>质 控 组: </span>
          <Select
            style={{ width: "171px" }}
            onChange={(code: any) => (groupRoleCode = code)}
          >
            {groupRoleListSelf.map((item: any, idx: number) => (
              <Option value={item.code} key={idx}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      </ModalCon>
    );

    Modal.confirm({
      title: "推送科室未审核记录",
      content: content,
      onOk: () => {
        if (groupRoleCode == "") {
          message.warning("未选择质控组");
          return;
        }
        setTableLoading(true);
        api
          .push({
            beginDate: beginDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
            groupRoleCode,
          })
          .then(
            (res) => {
              setTableLoading(false);
              message.success("推送成功");
            },
            () => setTableLoading(false)
          );
      },
    });
  };

  const MonthList = () => {
    let options = [];
    for (let i = 12; i > 0; i--) {
      let month = i;
      options.push(
        <Option value={`${month}`} key={`month${month}`}>{`${month}月`}</Option>
      );
    }

    return options;
  };

  return (
    <Wrapper>
      <div className="topbar">
        <div className="float-left">
          <PageTitle>{'fqfybjy' === appStore.HOSPITAL_ID ? CONFIG_TITLE[level] : rankTextList[level] + '级质控'}月度报告</PageTitle>
        </div>
        <div className="float-right">
          <div className="item">
            <div className="label">报告年度：</div>
            <div className="content">
              <DatePicker
                style={{ width: 100 }}
                value={query.year}
                open={yearPickerIsOpen}
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
          <div className="item">
            <div className="label">报告月份：</div>
            <div className="content">
              <Select
                style={{ width: 100 }}
                className="month-select"
                value={query.indexInType}
                onChange={(month: any) => {
                  setQuery({ ...query, indexInType: month });
                }}
              >
                <Option value="">全部</Option>
                {MonthList()}
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
            <div className="label">质控组：</div>
            <div className="content">
              <Select
                value={query.groupRoleCode}
                onChange={(groupRoleCode: any) => {
                  setQuery({ ...query, groupRoleCode });
                }}
                className="recode-type-select"
              >
                <Option value="">全部</Option>
                {groupRoleList.map((item: any) => (
                  <Option value={item.code} key={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="item">
            <Button onClick={handleSearch}>查询</Button>
          </div>
          <div className="item">
            {" "}
            <Button onClick={handleCreate} type="primary">
              创建
            </Button>{" "}
          </div>
          <div className="item">
            <Button
              disabled={groupRoleListSelf.length <= 0}
              onClick={handleAlert}
              title="推送科室未审核记录"
              type="primary"
            >
              <Icon type="bell" style={{ fontSize: "16px" }} />
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
              onDoubleClick: () => record.reportName && handleReview(record),
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
      {/* <AnalysisCreateProgress visible={createProgressVisible} loading={createLoading} /> */}
      <CreateAnalysisModal
        allowClear={createClear}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        groupRoleList={groupRoleListSelf}
        loading={!!(createLoading == "start")}
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
const ModalCon = styled.div`
  & > div {
    margin-top: 15px;
  }
`;
