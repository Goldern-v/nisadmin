import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Input, Select } from "antd";
import { observer } from "src/vendors/mobx-react-lite";
import { PageTitle, Place, PageHeader } from "src/components/common";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps,} from "src/vendors/antd";
import { nqreportService as api } from "./api/NQreportApi";
import { appStore, authStore } from "src/stores";
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import { qualityControlRecordApi } from "../qualityControlRecord/api/QualityControlRecordApi";
import service from "src/services/api";
import CreateNQReport from './components/createNQReport'
import qs from "qs";
// 工具函数
import { handleStartEenDate } from './utils'
import { reportShatring } from './reportShatring'

const Option = Select.Option;

export interface Props { }

export default observer(function qcThreeNQreport() {
  const { queryObj } = appStore;
  const { history, location } = appStore;

  const typeList = ['月度','季度','半年度','年度'];
  const reportList = {
    '月度': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    '季度': ['1季度', '2季度', '3季度', '4季度'],
    '半年度': ['上半年', '下半年']
  }


  const [report, setReport] = useState({
    reportType: "", // 报告类型
    reportYear: moment(), // 报告年度
    qcTime: '', // 选择时间
    reportLevel: queryObj.qcLevel || "3",
    reportName: '',
    hospitalCode: "925",
    templateName: "护理质量分析报告",
    startDate: moment().startOf('year').format('YYYY-MM-DD'),
    endDate: moment().endOf('year').format('YYYY-MM-DD'),
    pageSize: 20 ,
    pageIndex: 1 ,
  });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([] as any[]);
  const [formListLoading, setFormListLoaindg] = useState(false);
  const [dataTotal, setDataTotal] = useState(0 as number);

  // 打开创建弹窗
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);

  // 表单内容结构
  const columns: ColumnProps<any>[] = [
    {
      title: "报告类型",
      dataIndex: "reportType",
      align: "center",
      width: 120,
    },
    {
      title: "年份",
      dataIndex: "reportYear",
      align: "center",
      width: 100,
    },
    {
      title: "时间",
      dataIndex: "qcTime",
      align: "center",
      width: 80,
    },
    {
      title: "报告标题",
      dataIndex: "reportName",
      align: "center",
      width: 250,
    },
    {
      title: "创建人",
      dataIndex: "creatorName",
      align: "center",
      width: 100,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      width: 180,
    },
    {
      title: "操作",
      dataIndex: "evalDate",
      align: "center",
      width: 100,
      render: (text: string, record: any) => {
        return (
          <DoCon>
            <span onClick={() => handleReview(record)}>查看</span>
          </DoCon>
        );
      },
    },
  ];

  const handleReview = (recrod: any) => {
    reportShatring.reportData = {...recrod}
    history.push(
      `/NQreportDetails?${qs.stringify({reportLevel:report.reportLevel})}`
    );
  }

  const getTableData = () => {
    let reportYear = "";
    if (report.reportYear !== null) reportYear = report.reportYear.format("YYYY");
    let reportParams = {
      ...report,
      reportYear
    };
    setLoading(true);
    api.getPage(reportParams).then(
      (res) => {
        let data = res.data.list;
        if (res.data.totalPage) setDataTotal(res.data.totalPage);
        else setDataTotal(0);

        setTableData(data);
        setLoading(false);
      },
      (err) => {
        setLoading(false)
      }
    );
  };

  // const handleExport = () =>
  //   api.problemCauseMeasureSummaryExport(report);

  //汇总报告创建成功
  const handleCreateOk = (info: any) => {
    reportShatring.reportData = {...info}
    setCreateAnalysisVisible(false);
    history.push(
      `/NQreportDetails?${qs.stringify({reportLevel:report.reportLevel})}`
    );
  };

  // 打开新建弹窗
  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };

  // 弹窗回调关闭
  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false);
  };
  // 设置报告标题
  const setReportName = (pms: any) => {
    let reportYear = ''
    if (!pms.reportYear) return ''
    reportYear = pms.reportYear.format('YYYY')
    
    return `${reportYear}年${pms.qcTime}全院质控组护理质量分析`
  }

  useEffect(() => {
    getTableData();
    return()=>{
      return setTableData([])
    }
  }, [report]);
  
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>护理质量分析报告</PageTitle>
        <Place />
        <span>报告类型：</span>
        <Select
          value={report.reportType}
          loading={formListLoading}
          style={{ width: 220, marginRight: 15 }}
          onChange={(reportType: string) =>{
            let {startDate,endDate } = handleStartEenDate(reportType || report.reportType, report.qcTime, report.reportYear)
            let newReport = { ...report, reportType, startDate,endDate }
            const newReportName = setReportName(newReport)
            newReport.reportName = newReportName
            setReport(newReport)
          }}
        >
          <Option value="">全部</Option>
          {typeList.map((item: any, index: number) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
        </Select>
        <span>报告年度：</span>
        <YearPicker
          allowClear={false}
          style={{ width: 100 }}
          value={report.reportYear || undefined}
          onChange={(value: any) =>{
            let {startDate,endDate } = handleStartEenDate(report.reportType, report.qcTime, value || report.reportYear)
            let newReport = { ...report, reportYear: value, startDate,endDate }
            const newReportName = setReportName(newReport)
            newReport.reportName = newReportName
            setReport(newReport)
            }
          }
        />
        <span>时间：</span>
        <Select
          value={report.qcTime}
          loading={formListLoading}
          style={{ width: 220, marginRight: 15 }}
          onChange={(qcTime: string) =>{
            let {startDate,endDate } = handleStartEenDate(report.reportType, qcTime || report.qcTime, report.reportYear)
            let newReport = { ...report, qcTime, startDate,endDate }
            const newReportName = setReportName(newReport)
            newReport.reportName = newReportName
            setReport(newReport)
          }}
        >
          <Option value="">全部</Option>
          {reportList[report.reportType]&& reportList[report.reportType].map((item: any, index: number) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
        </Select>
        <Button onClick={() => getTableData()} type="primary">
          查询
        </Button>
        <Button onClick={() => handleCreate()} type="primary" >新建</Button>
      </PageHeader>
      <TableCon>
        <BaseTable
          loading={loading}
          surplusWidth={1000}
          surplusHeight={185}
          dataSource={tableData}
          columns={columns}
          pagination={{
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            onShowSizeChange: (pageIndex, pageSize) =>
              setReport({ ...report, pageSize }),
            onChange: (pageIndex, pageSize) =>
              setReport({ ...report, pageIndex }),
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: report.pageSize,
            current: report.pageIndex,
          }}
        />
      </TableCon>
      <CreateNQReport
        // allowClear={createClear}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        groupRoleList={{typeList, reportList}}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div``;

const TableCon = styled.div`
  /* width: 700px; */
  margin: 0 auto;
  padding: 0 15px;
`;

const PreCon = styled.pre`
  padding-top: 2px;
  word-wrap: break-word;
  white-space: pre-wrap;
`;
