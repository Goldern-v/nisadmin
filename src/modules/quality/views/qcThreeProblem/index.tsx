import moment from 'moment'
import YearPicker from 'src/components/YearPicker'
import styled from 'styled-components'
import React, { useState } from 'react'
import { Button, DatePicker, Icon, Input, Radio, Select } from 'antd'
import { observer } from 'mobx-react'
import { PageHeader, PageTitle, Place } from 'src/components/common'

import CreateAnalysisModal from './components/CreateAnalysisModal'
import { MonthList } from '../../utils/toolCon'
import { getTempName } from '../analysisWhyx/utils'
import { analysisService } from '../analysisWhyx/api'

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
  const [data, setData] = useState<Record<string, any>>({});
  const columns = [
    "A级质量问题及科室",
    "原因分析",
    "改进措施",
    "评价效果",
    "mainProblem1",
    "causeAnalysis1",
    "correctiveWay1",
    "evaluation1",
    "B—>A级质量问题及科室",
    "原因分析",
    "改进措施",
    "评价效果",
    "mainProblem2",
    "causeAnalysis2",
    "correctiveWay2",
    "evaluation2",
    "其他共性问题",
    "原因分析",
    "改进措施",
    "评价效果",
    "mainProblem3",
    "causeAnalysis3",
    "correctiveWay3",
    "evaluation3",
  ];
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
        console.log("test-res", res);
        setLoading(false)
      })
      .catch((e) => setLoading(false));
  };
  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };
  const handleExport = () => {};

  const handleCreateOk = (params: any) => {
    if (!params.reportName) return
    console.log('test-params', params)
    setLoading(true)
    analysisService
      .createReport({
        ...params,
        reportLevel: 3,
        templateName: getTempName(3.3),
      })
      .then((res) => {
        if (res.code == '200') {
          let { reportYear, reportMonth } = params
          setLoading(false)

          setQuery({
            reportYear,
            reportMonth
          })
          return
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      });
  };

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>三级质控问题分析改进</PageTitle>
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
      {!data.id && (
        <Main>
          <div className="contain">
            <div className="contain__title">1234</div>
            <div className="contain__main">
              {columns.map((v: any, i: number) => {
                if (i % 8 <= 3) {
                  return (
                    <div className="contain__main__title" key={i}>
                      {v}
                    </div>
                  );
                }
                return (
                  <div className="contain__main__ipt" key={i}>
                    {data[v]}
                  </div>
                );
              })}
            </div>
            <div>整改方式选项：①发放纠正预防措施报告     ②下月再次跟进     ③现场立即纠正 （填写说明：针对问题选择相应整改方式，注明跟进内容。）</div>
          </div>
        </Main>
      )}
      <CreateAnalysisModal
        allowClear={true}
        visible={createAnalysisVisible}
        loading={loading}
        onCancel={() => setCreateAnalysisVisible(false)}
        onOk={handleCreateOk}
      />
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
    min-height: calc(100% - 15px);
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
        min-height: 148px;
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
  }
`;
