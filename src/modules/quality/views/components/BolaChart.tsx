import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components";
import EChartsReact from "echarts-for-react";

interface Props {
  list: Array<any>;
  barKey: string;
  lineKey: string;
  xKey: string;
}
export default observer(function BolaChart(props: Props) {
  let chartRef: any = React.createRef();
  const { barKey, lineKey, xKey } = props;

  useEffect(() => {
    chartRef.getEchartsInstance().setOption(getOption());
  }, [props.list]);

  const getOption = () => {
    let option = {
      legend: {
        top: 'bottom'
      },
      // tooltip: {
      //   trigger: "axis",
      // },
      xAxis: [{
        type: "category",
        data: props.list.map((v: any) => v[xKey]),
        axisLabel: {
          rotate: 45,
        },
      }],
      yAxis: [{
        type: 'value',
        name: '百分比',
        axisLabel: {
          formatter: '{value} %'
        },
      },
      {
        type: 'value',
        name: '扣分累计'
      }],
      grid: { bottom: 120, top: 30 },
      series: [
        {
          name: '百分比',
          type: 'line',
          label: {
            show: true,
            position: [-15, -15],
            formatter: '{c}%',
          },
          tooltip: {
            valueFormatter: function (value: any) {
              return value + '%';
            }
          },
          data: props.list.map((v: any) => parseFloat(v[lineKey])),
        },
        {
          type: "bar",
          name: "扣分累计",
          yAxisIndex: 1,
          barCategoryGap: '0%',
          data: props.list.map((v: any) => v[barKey]),
          label: {
            show: true,
            distance: 5,
            position: "top",
          },
          tooltip: {
            valueFormatter: function (value: any) {
              return value;
            }
          },
        },
      ],
    };
    return option;
  };
  return (
    <Wrapper>
      <div>
        <EChartsReact
          option={getOption()}
          ref={(node: EChartsReact) => (chartRef = node)}
        />
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  margin-bottom: 15px;
  .echarts-for-react {
    height: 400px !important;
  }
`;
