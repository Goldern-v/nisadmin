import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

import { trainingChartAnalysisModal } from "../trainingChartAnalysisModal";
import { Title, Content } from "./styleCss";
import EChartsReact from "echarts-for-react";

export interface Props {
  title: string;
  data: any;
}
const monthList = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
export default observer(function AnalysisChart(props: Props) {
  const { title, data } = props;

  const getOption = () => {
    const { teachingMethodList, selectedDate } = trainingChartAnalysisModal;
    let [m1, m2] = selectedDate;
    let M1 = Number(m1.format("M"));
    let Y1 = Number(m1.format("YYYY"));

    const mList = monthList.map((i, v) => {
      let m = M1 + v > 12 ? M1 + v - 12 : M1 + v;
      let y = "";
      M1 + v > 12 && (y = Y1 + 1 + "");
      return `${y ? y + "年" : ""}${m}月`;
    });
    console.log("test-mList", mList);
    const seriesList = teachingMethodList.map(() => ({
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    }));
    let option = {
      legend: {},
      tooltip: {
        trigger: "axis",
        showContent: false,
      },
      dataset: {
        source: [["月份", ...mList], ...data],
      },
      xAxis: { type: "category" },
      yAxis: { gridIndex: 0 },
      grid: { top: "55%" },
      series: [
        ...seriesList,
        {
          type: "pie",
          id: "pie",
          radius: "30%",
          center: ["50%", "25%"],
          emphasis: {
            focus: "self",
          },
          label: {
            formatter: "{b}: {@1月} ({d}%)",
          },
          encode: {
            itemName: "月份",
            value: M1 + "月",
            tooltip: M1 + "月",
          },
        },
      ],
    };
    return option;
  };

  let chartRef: any = React.createRef();

  useEffect(() => {
    chartRef.getEchartsInstance().setOption(getOption());
  }, [props.data]);

  const updateOption = (dimension: string) => {
    chartRef.getEchartsInstance().setOption({
      series: {
        type: "pie",
        id: "pie",
        label: {
          formatter: "{b}: {@[" + dimension + "]} ({d}%)",
        },
        encode: {
          itemName: "月份",
          value: dimension,
          tooltip: dimension,
        },
      },
    });
  };

  const updateAxisPointer = (e: any) => {
    const xAxisInfo = e.axesInfo[0];
    if (!xAxisInfo) return;
    const dimension = xAxisInfo.value + 1;
    updateOption(dimension);
  };

  const onEvents = {
    updateAxisPointer: updateAxisPointer,
  };

  return (
    <Content>
      <Title>《{title}》</Title>
      <div className="echarts-body">
        <ReactEcharts
          option={getOption()}
          onEvents={onEvents}
          ref={(node: EChartsReact) => (chartRef = node)}
        />
      </div>
    </Content>
  );
});
