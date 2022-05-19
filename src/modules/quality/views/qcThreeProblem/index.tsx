import { Button, DatePicker, Icon, Input, Radio, Select } from "antd";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { PageHeader, PageTitle, Place } from "src/components/common";
import styled from "styled-components";
import moment from "moment";
import { MonthList } from "../../utils/toolCon";
import YearPicker from "src/components/YearPicker";
/**
 * 三级质控问题分析改进 by亚心
 */
export default observer(function QcThreeProblem(props) {
  const [query, setQuery] = useState({
    year: moment() as null | moment.Moment,
    type: "month",
    indexInType: moment().month() + 1 + "",
    status: "",
    groupRoleCode: "",
  } as any);

  const [tableLoading, setTableLoading] = useState(false);
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [groupRoleListSelf, setGroupRoleListSelf] = useState([]);
  const handleYearClear = (e: any) => {
    console.log("test-e", e);
    setQuery({ ...query, year: e });
  };

  const handleSearch = () => {
    getTableData();
  };
  const getTableData = () => {
    setTableLoading(true);
    let year = "";
    if (query.year !== null) year = query.year.format("YYYY");

    let reqQuery = {
      ...query,
      year,
    };
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
        <YearPicker style={{ width: 100 }} value={query.year} onChange={handleYearClear} />
        
        <div className="label">报告月份：</div>
        <Select
          style={{ width: 100 }}
          className="month-select"
          value={query.indexInType}
          onChange={(month: any) => {
            setQuery({ ...query, indexInType: month });
          }}
        >
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
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="0">保存</Select.Option>
          <Select.Option value="1">发布</Select.Option>
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
      <Main className="contain">
          <div className="contain-top">
            <div className="contain-top__title">1234</div>
          </div>
      </Main>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
`;
const Main = styled.div`
  &.contain {
    height: calc(100% - 65px);
    margin: 0px 15px 15px;
    padding: 10px;
    background: #fff;

    .contain-top {
      position: relative;

      &__tabs {
        position: absolute;
      }
      &__title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
`;
