import { Button, message, Select } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { PageHeader, PageTitle, Place } from "src/components/common";
import styled from "styled-components";
import moment from "moment";
import { ColumnProps } from "antd/es/table";
import qs from 'qs'
import { MonthList } from "../../utils/toolCon";
import YearPicker from "src/components/YearPicker";
import CreateAnalysisModal from "./components/CreateAnalysisModal";
import { analysisService } from "src/modules/quality/views/analysisWhyx/api/index";
import { getSearchTempName } from "../analysisWhyx/utils";
import { appStore, authStore } from "src/stores";
import { useInstance } from "../committeeWorkReportDetail/hook/useModel";
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Obj } from "src/libs/types";

const reportLevel = 3;
const templateName = getSearchTempName(reportLevel);
/**
 * 弃用  
 * 三级质控结果汇总表 by亚心
 */
export default observer(function QcThreeResult(props) {
  const [query, setQuery] = useState({
    reportYear: moment() as null | moment.Moment,
    reportMonth: moment().month() + 1 + "",
  } as any);
  const { instance } = useInstance()

  const [tableData, setTableData] = useState<Obj[]>([])
  const [dataTotal, setDataTotal] = useState(0 as number);
  const [loading, setLoading] = useState(false);
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
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
      title: "片区",
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
      align: "center",
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
            return <span style={{ color: "rgb(74,164,234)" }}>发布</span>;
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

  const handleYearClear = (e: any) => {
    setQuery({ ...query, reportYear: e });
  };

  const handleSearch = () => {
    getData();
  };
  const getData = () => {
    setLoading(true);
    let reportYear = "";
    if (query.reportYear !== null) reportYear = query.reportYear.format("YYYY");

    let reqQuery = {
      ...query,
      reportLevel,
      reportYear,
      templateName,
    };
    analysisService.getPage(reqQuery).then(res => {
      setLoading(false);
      if (res.data.totalCount) setDataTotal(res.data.totalCount);
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
      .catch((e) => setLoading(false));
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };
  /**创建成功 */
  const handleCreateOk = (params: any) => {
    setLoading(true);
    analysisService
      .createReport({
        ...params,
        reportLevel,
        templateName,
      })
      .then(async (res) => {
        if (res.code == "200") {
          setLoading(false);
          setCreateAnalysisVisible(false)
          /**初始化 */
          const { reportTemplateDto, renderTableDataMap: renderData = {} } = res.data
          await instance.initRender(res.data.id, { renderData, tableTempList: reportTemplateDto?.reportTableFieldTemplateList || {} })
          
          appStore.history.push(`/qcThreeResultDetail?${qs.stringify({ id: res.data.id, level: reportLevel })}`)
          // setQuery({
          //   reportYear: moment(reportYear),
          //   reportMonth,
          // });
          return;
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

  }
  /**新建取消 */
  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false);
  };

  const handleReview = (record: Obj) => {
    const obj = {
      id: record.id,
      level: reportLevel
    };
    appStore.history.push(`/qcThreeResultDetail?${qs.stringify(obj)}`)
  }

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>三级质控结果汇总表</PageTitle>
        <Place />
        <div className="label">报告年度：</div>
        <YearPicker
          style={{ width: 100 }}
          value={query.reportYear}
          onChange={handleYearClear}
        />

        <div className="label">报告月份：</div>
        <Select
          className="month-select"
          value={query.reportMonth}
          onChange={(month: any) => {
            setQuery({ ...query, reportMonth: month });
          }}
        >
          {MonthList()}
        </Select>
        <Button onClick={handleSearch}>查询</Button>

        {authStore.level3Check && <Button onClick={handleCreate} type="primary">
          创建
        </Button>}
      </PageHeader>
      <Main>
        <BaseTable
          columns={columns}
          dataSource={tableData}
          loading={loading}
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
      </Main>
      <CreateAnalysisModal
        allowClear={true}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  .ant-spin-container {
    height: 100%;
  }
`;
const Main = styled.div`
  height: calc(100% - 50px);
  overflow-y: auto;
`;
