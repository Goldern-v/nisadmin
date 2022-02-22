import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";

import { trainingChartAnalysisModal } from "./trainingChartAnalysisModal";
import AnalysisChart from "./components/AnalysisChart";

export interface Props {}

export default observer(function TrainingChartAnalysis(props: Props) {
  const contentRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    trainingChartAnalysisModal.init();
    trainingChartAnalysisModal.chartRef = contentRef;
  }, []);

  return (
    <Wrapper>
      <Header />
      <Content ref={contentRef}>
        <AnalysisChart
          title={trainingChartAnalysisModal.chartTitle.t1}
          data={trainingChartAnalysisModal.chartData1}
          img={trainingChartAnalysisModal.chartImg1}
        />
        {["all", "department"].includes(
          trainingChartAnalysisModal.selectedTab
        ) ? (
          <AnalysisChart
            title={trainingChartAnalysisModal.chartTitle.t2}
            data={trainingChartAnalysisModal.chartData2}
            img={trainingChartAnalysisModal.chartImg2}
          />
        ) : (
          ""
        )}
      </Content>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 12px 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #fff;
`;
