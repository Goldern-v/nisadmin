import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { DatePicker, Select, Button, message, Icon, Modal } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import moment, { duration } from "moment";
import AnalysisService from "./api";

import CreateAnalysisModal from "./components/CreateAnalysisModal";
import qs from "qs";
import { PageHeader, PageTitle, Place } from "src/components/common";
import service from "src/services/api";
import { getTempName } from "./utils";
import { MonthList } from "../../utils/toolCon";
import YearPicker from "src/components/YearPicker";
import useLevel from "./utils/useLevel";
import { analysisModal } from './AnalysisModal'

const api = new AnalysisService();
const Option = Select.Option;
const rankTextList = ["", "一", "二", "三"];

export default observer(function Analysis() {
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [createClear, setCreateClear] = useState(true);
  const { history } = appStore;
  // 科室列表
  const [wardList, setWardList] = useState([]);
  // 默认科室
  const [defDept, setDefDept] = useState('');

  //进度条相关
  const [createProgressVisible, setCreateProgressVisible] = useState(false);
  const [createLoading, setCreateLoading] = useState("");

  const [query, setQuery] = useState({
    reportYear: moment() as null | moment.Moment,
    reportMonth: moment().month() + 1 + "",
    pageIndex: 1,
    pageSize: 20,
    status: "",
    wardCode: "",
    groupRoleCode: "",
  } as any);
  // 质控等级
  const level = useLevel();

  useEffect(() => {
    service.commonApiService.getNursingUnitSelf().then((res) => {
      if (res.data.deptList instanceof Array) setWardList(res.data.deptList);
      setDefDept(res.data.defaultDept)
    });
  }, []);

  useEffect(() => {
    getTableData();
  }, [query]);

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
      align: "left",
      width: 200,
      render: (name: string) => <div title={name}>{name}</div>,
    },
    {
      title: "科室",
      key: "wardName",
      dataIndex: 'wardName',
      align: "left",
      width: 120,
    },

    {
      title: "质控开始日期",
      key: "startDate",
      dataIndex: "startDate",
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
      title: '发布人',
      key: 'publisherName',
      dataIndex: 'publisherName',
      width: 120,
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      width: 80,
      align: "center",
      render: (status: any) => {
        switch (status) {
          case 0:
            return <span style={{ color: "red" }}>保存</span>;
          case 1:
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

  const handleYearClear = () => {
    setQuery({ ...query, reportYear: null, reportMonth: "" });
  };

  const handleReview = (record: any) => {
    const obj = {
      deptName: getTempName(level, record.wardCode),
      level,
      id: record.id
    };
    history.push(`/qualityAnalysisReport?${qs.stringify(obj)}`);
  };

  const handleSearch = () => {
    getTableData();
  };

  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };

  const handleCreateOk = (params: any) => {
    if (!params.reportName) return;

    setCreateClear(false);
    // setCreateAnalysisVisible(false)
    setCreateProgressVisible(true);
    setCreateLoading("start");

    let failedCallback = (msg?: string) => {
      // setCreateLoading('failed')

      setCreateProgressVisible(false);
      // setCreateAnalysisVisible(true)
      setCreateClear(true);
      setCreateLoading("");
    };

    api
      .createReport({
        ...params,
        reportLevel: level,
        templateName: getTempName(level, params.wardCode),
      })
      .then((res) => {
        if (res.code == '200') {
          handleCreateCancel();
          setCreateProgressVisible(false);
          // setCreateAnalysisVisible(true)
          setCreateClear(true);
          setCreateLoading("");
          const params: Record<string, any> = {
            id: res.data.id || '',
            level,
            deptName: getTempName(level, res.data.wardCode)
          }
          const {reportTemplateDto, renderTableDataMap} = res.data
          analysisModal.setRenderData({ renderTableDataMap, reportTableFieldTemplateList: reportTemplateDto.reportTableFieldTemplateList || {} })

          appStore.history.push(
            `/qualityAnalysisReport?${qs.stringify(params)}`
          );
        } else {
          failedCallback(res.desc || "");
        }
      })
      .catch((err) => {
        console.log('test-only-4', err)
        failedCallback(err || "");
      });
  };

  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false);
  };

  const getTableData = () => {
    setTableLoading(true);
    let reportYear = "";
    if (query.reportYear !== null) reportYear = query.reportYear.format("YYYY");

    let reqQuery = {
      ...query,
      reportLevel: level,
      reportYear,
      templateName: getTempName(level),
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
  /**推送 */
  const handleAlert = () => {
    let month = query.reportMonth;
    let year = query.reportYear.format("YYYY");
    if (month.length == 1) month = "0" + month;
    let dateStr = `${year}-${month}-01`;
    let beginDate = moment(dateStr);
    let endDate = moment(dateStr)
      .add(1, "M")
      .subtract(1, "d");
    let wardCode = "";

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
          <span>科 室: </span>
          <Select
            style={{ width: "171px" }}
            onChange={(code: any) => (wardCode = code)}
          >
            {wardList.map((item: any, idx: number) => (
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
        if (wardCode == "") {
          message.warning("未选择科室");
          return;
        }
        setTableLoading(true);
        api
          .push({
            beginDate: beginDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
            wardCode,
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

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>{rankTextList[level]}级质控月度报告</PageTitle>
        <Place />
        <div className="label">报告年度：</div>
        <YearPicker
          style={{ width: 100 }}
          value={query.reportYear}
          onChange={handleYearClear}
        />
        <div className="label">报告月份：</div>
        <Select
          style={{ width: 100 }}
          className="month-select"
          value={query.reportMonth}
          onChange={(month: any) => {
            setQuery({ ...query, reportMonth: month });
          }}
        >
          <Option value="">全部</Option>
          {MonthList()}
        </Select>
        <div className="label">状态：</div>
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
        <div className="label">科室：</div>
        <Select
          value={query.wardCode}
          onChange={(wardCode: any) => {
            setQuery({ ...query, wardCode });
          }}
          className="recode-type-select"
        >
          {wardList.map((item: any) => (
            <Option value={item.code} key={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Button onClick={handleSearch}>查询</Button>

        <Button onClick={handleCreate} type="primary">
          创建
        </Button>
        <Button
          disabled={wardList.length <= 0}
          onClick={handleAlert}
          title="推送科室未审核记录"
          type="primary"
        >
          <Icon type="bell" style={{ fontSize: "16px" }} />
        </Button>
      </PageHeader>
      <div className="main-contain">
        <BaseTable
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={230}
          surplusWidth={30}
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
      <CreateAnalysisModal
        allowClear={true}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        wardList={wardList.filter((item: any) => item.code)}
        loading={!!(createLoading == "start")}
        defDept={defDept}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .main-contain {
    margin: 0 15px 5px 15px;
    flex: 1;
  }
`;
const ModalCon = styled.div`
  & > div {
    margin-top: 15px;
  }
`;
