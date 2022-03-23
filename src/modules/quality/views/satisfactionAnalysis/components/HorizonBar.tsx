import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components";
import EChartsReact from "echarts-for-react";

interface Props {
  list: Array<any>;
  yKey: string;
  xKey: string;
}
export default observer(function HorizonBar(props: Props) {
  let chartRef: any = React.createRef();
  const { yKey, xKey } = props;

  useEffect(() => {
    chartRef.getEchartsInstance().setOption(getOption());
  }, [props.list]);

  const getOption = () => {
    let option = {
      legend: {},
      tooltip: {
        trigger: "axis",
        showContent: false,
      },

      yAxis: {
        type: "category",
        data: props.list.map((v: any) => v[yKey]).reverse(),
        axisLabel: {
          rotate: 45,
        },
      },
      dataZoom: [
        {
          // 这是滚动条插件  可以是Y轴 也可以是X轴
          type: "slider",
          orient: "vertical",
        },
      ],
      xAxis: { gridIndex: 0 },
      grid: { left: 100, bottom: 30, top: 20 },
      series: [
        {
          type: "bar",
          id: "bar",
          barWidth: 20,
          data: props.list.map((v: any) => v[xKey]).reverse(),
          label: {
            show: true,
            distance: 5,
            position: "right",
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
  .echarts-for-react {
    height: 400px !important;
  }
`;
