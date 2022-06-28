import { Button, DatePicker, Icon, Input, Radio, Select } from "antd";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { PageHeader, PageTitle, Place } from "src/components/common";
import styled from "styled-components";
import moment from "moment";
import { MonthList } from "../../utils/toolCon";
import YearPicker from "src/components/YearPicker";
import { getTempName } from "../analysisWhyx/utils";
import { analysisService } from "../analysisWhyx/api";



/**
 * 三级质控问题分析改进 by亚心
 */
export default observer(function QcThreeProblem(props) {
  const [query, setQuery] = useState({
    reportYear: moment() as null | moment.Moment,
    reportMonth: moment().month() + 1 + "",
  } as Record<string, any>);

  const [loading, setLoading] = useState(false);
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [groupRoleListSelf, setGroupRoleListSelf] = useState([]);
  const [data, setData] = useState<Record<string, any>>({})
  const columns = [
    'A级质量问题及科室',
    '原因分析',
    '改进措施',
    '评价效果',
    'mainProblem1','causeAnalysis1','correctiveWay1','evaluation1',
    'B—>A级质量问题及科室',
    '原因分析',
    '改进措施',
    '评价效果',
    'mainProblem2','causeAnalysis2','correctiveWay2','evaluation2',
    '其他共性问题',
    '原因分析',
    '改进措施',
    '评价效果',
    'mainProblem3','causeAnalysis3','correctiveWay3','evaluation3',
  ]
  const handleYearClear = (e: any) => {
    console.log("test-e", e);
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
      reportLevel: 3,
      reportYear,
      templateName: getTempName(3.3),
    };
    analysisService
      .getOneReport(reqQuery)
      .then((res: any) => {
        console.log('test-res', res)
      })
      .catch(e => {})
  };
  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };
  const handleExport = () => {};


  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>三级质控问题分析改进</PageTitle>
        <Place />
        <div className="label">报告年度：</div>
        <YearPicker style={{ width: 100 }} value={query.reportYear} onChange={handleYearClear} />
        
        <div className="label">报告月份：</div>
        <Select
          style={{ width: 100 }}
          className="month-select"
          value={query.reportMonth}
          onChange={(month: any) => {
            setQuery({ ...query, reportMonth: month });
          }}
        >
          {MonthList()}
        </Select>
        
        <Button onClick={handleSearch}>查询</Button>

        <Button onClick={handleCreate} type="primary">
          创建
        </Button>
        <Button onClick={handleExport}>导出</Button>
        <Button
          disabled={groupRoleListSelf.length <= 0}
          title="推送科室未审核记录"
          type="primary"
        >
          <Icon type="bell" style={{ fontSize: "16px" }} />
        </Button>
      </PageHeader>
      {/* {!data.id && <div className="contain--empty">该月份没有报告，请创建报告</div>} */}
      {!data.id && <Main>
        <div className="contain">
          <div className="contain__title">1234</div>
          <div className="contain__main">
            {
              columns.map((v:any, i: number) => {
                if (i % 8 <= 3) {
                  return <div className="contain__main__title">{v}</div>
                }
                return <div className="contain__main__ipt">{data[v] || 'dknasrdshdjkasfvs\n健康的哈说\n过\n的话顺风车AHSK金打个就腹背受敌想见你，传达\n室\n刚恢\n复健康妇姑荷箪食进口车打法上半年的飞机撒是否\n会加快打造健康发卡机是'}</div>
              })
            }
          </div>
        </div>
      </Main>}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  .contain--empty {
    text-align: center;
    padding-top: 300px;
    font-weight: 700;
    font-size: 26px;
  }
`;
const Main = styled.div`
  height: calc(100% - 50px);
  overflow-y: auto;
  .contain {
    margin: 0px 15px 15px;
    padding: 10px;
    min-height: 100%;
    background: #fff;

    .contain__title {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .contain__main {
      display: flex;
      flex-wrap: wrap;
      .contain__main__title {
        font-size: 17px;
        line-height: 32px;
        flex-basis: 25%;
        border: 1px solid #eeeeee;
        background: rgb(242, 244, 245);
        text-align: center;
      }
      .contain__main__ipt {
        font-size: 14px;
        padding: 4px;
        line-height: 20px;
        flex-basis: 25%;  
        border: 1px solid #eeeeee;
        min-height: 128px;
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
  }
`;
