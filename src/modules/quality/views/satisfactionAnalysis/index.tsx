import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "./api/index";

import Table2_1 from "./components/Table2_1";
import HorizonBar from "./components/HorizonBar";
import Table2_3 from "./components/Table2_3";
import VerticalTable from "./components/VerticalTable";
import Pie from "./components/Pie";

// 满意度调查分析
export default observer(function SatisfactionAnalysis(props) {
  const [params, setParams] = useState({
    startDate: "",
    endDate: "",
  });
  const [wardCode, setWardCode] = useState("");

  const [investigationCount, setInvestigationCount] = useState<any>({});
  const [deptScoreList, setDeptScoreList] = useState<any>([]);
  const [praiseSituation, setPraiseSituation] = useState<any>([]);
  const [deptPopulation, setDeptPopulation] = useState<any>([]);
  const [variousIndicators, setVariousIndicators] = useState<any>([]);

  const setDataList: Array<Function> = [
    setInvestigationCount,
    setDeptScoreList,
    setPraiseSituation,
    setDeptPopulation,
    setVariousIndicators,
  ];
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const res = await Promise.all([
      getInvestigationCount(),
      getDeptScoreList(),
      getPraiseSituationList(),
      getDeptPopulationList(),
      getVariousIndicatorsList(),
    ]);
    res.map((item: any, i: number) => {
      if (item.code == 200) {
        setDataList[i](item.data);
      }
    });
    console.log("test-res", res);
  };

  const getInvestigationCount = async () => {
    return await api.getInvestigationCount(params);
  };
  const getDeptScoreList = async () => {
    return await api.getDeptScoreList({ ...params, wardCode });
  };
  const getPraiseSituationList = async () => {
    return await api.getPraiseSituationList(params);
  };
  const getDeptPopulationList = async () => {
    return await api.getDeptPopulationList(params);
  };
  const getVariousIndicatorsList = async () => {
    return await api.getVariousIndicatorsList(params);
  };

  return (
    <Wrapper>
      <div className="satisfaction-analysis">
        <h2>一、基本调查情况</h2>
        <h3>1.1调查数量</h3>
        <table
          className="table-1_1 table-horizon"
          cellPadding={0}
          cellSpacing="1"
        >
          <colgroup>
            {["19%", "19%", "19%", "19%"].map((v: string) => (
              <col width={v} />
            ))}
            <col width={"24%"} />
          </colgroup>
          <tbody>
            <tr>
              {[
                "病房单元数",
                "发出问卷",
                "回收问卷",
                "有效问卷",
                "有效问卷回收率",
              ].map((v: string) => (
                <td>{v}</td>
              ))}
            </tr>
            <tr>
              <td>{investigationCount.deptCount}</td>
              <td>{investigationCount.sendCount}</td>
              <td>{investigationCount.recoveryCount}</td>
              <td>{investigationCount.validCount}</td>
              <td>{investigationCount.validPercent}</td>
            </tr>
          </tbody>
        </table>
        <h2>二、调查结果</h2>
        <h3>2.1全院各科室满意度得分汇总(表格) </h3>
        <Table2_1 list={deptScoreList} />
        <h3>2.2全院个科室满意度得分汇总(图表-条形)</h3>
        <HorizonBar list={deptScoreList} yKey="wardName" xKey="averageScore" />
        <h3>2.3表扬情况</h3>
        <Table2_3 list={praiseSituation} />
        <h3>2.4各病房护理单元总体满意度</h3>
        <h4>2.4.1各病房护理单元总体满意度(表格)</h4>
        <VerticalTable
          list={deptPopulation}
          keyObj={{
            scoreRange: "满意度得分",
            deptCount: "护理单元数（个）",
            percent: "百分比",
          }}
        />
        <h4>2.4.2各病房护理单元总体满意度(图表-饼状)</h4>
        <Pie list={deptPopulation} nameKey="scoreRange" valKey="deptCount" />
        <h2>三、住院患者满意度情况分析</h2>
        <h3>3.1各指标总体满意度</h3>
        {/* <VerticalTable
          list={variousIndicators}
          keyObj={{
            scoreRange: "满意度得分",
            deptCount: "护理单元数（个）",
          }}
        /> */}
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  overflow: auto;
  h2,
  h3,
  h4,
  table {
    margin-bottom: 15px;
  }
  .satisfaction-analysis {
    background: #fff;
    padding: 10px;
    margin: 20px;
  }
  table {
    width: 100%;
    text-align: center;
    &.table-horizon {
      tr:first-child {
        font-weight: bold;
      }
    }
    &.table-vertical {
      td:first-child {
        font-weight: bold;
      }
    }
    td,
    tr {
      border: 1px solid #000;
    }
  }
`;
