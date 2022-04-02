import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components";
import EChartsReact from "echarts-for-react";

interface Props {
  list: Array<any>;
  yKey: string;
  xKey: string;
  isHorizon?: boolean;
  isDataZoom?: boolean;
  contentH?: number;
  name?: string;
}
export default observer(function HorizonBar(props: Props) {
  let chartRef: any = React.createRef();
  const { yKey, xKey, isHorizon = true, isDataZoom = false, contentH= 400 } = props;

  useEffect(() => {
    chartRef.getEchartsInstance().setOption(getOption());
  }, [props.list]);

  const getOption = () => {
    let option: any = {
      legend: {
        top: 'bottom'
      },
      tooltip: {
        trigger: "axis",
        showContent: false,
      },

      // yAxis: {
      //   type: "category",
      //   data: props.list.map((v: any) => v[yKey]).reverse(),
      //   axisLabel: {
      //     rotate: 45,
      //   },
      // },
      // xAxis: { gridIndex: 0 },
      // dataZoom: [
      //   {
      //     // 这是滚动条插件  可以是Y轴 也可以是X轴
      //     type: "slider",
      //     orient: "vertical",
      //   },
      // ],
      grid: { left: 100, bottom: 30, top: 20 },
      series: [
        {
          type: "bar",
          id: "bar",
          name: props.name || '',
          barWidth: 20,
          data: props.list.map((v: any) => v[isHorizon ? xKey : yKey]).reverse(),
          label: {
            show: true,
            distance: 5,
            position: isHorizon ? 'right' : 'top',
          },
        },
      ],
    };
    let len = props.list.length
    if (isDataZoom && ((len > 10 && isHorizon) || (len > 15 && !isHorizon))) {
      option.dataZoom = [
        {
          // 这是滚动条插件  可以是Y轴 也可以是X轴
          type: 'slider',
          orient: isHorizon ? 'vertical' : 'horizontal',
        },
      ]
    }
    if (isHorizon) {
      option.yAxis = {
        type: 'category',
        data: props.list.map((v: any) => v[yKey]).reverse(),
        axisLabel: {
          rotate: 45,
        },
      }
      option.xAxis = { gridIndex: 0 }
    } else {
      option.xAxis = {
        type: "category",
        data: props.list.map((v: any) => v[xKey]).reverse(),
        axisLabel: {
          rotate: 45,
        },
      }
      option.yAxis = { gridIndex: 0 }
      option.grid = { bottom: 130, top: 30 }
    }
    return option;
  };
  return (
    <Wrapper height={contentH}>
      <div>
        <EChartsReact
          option={getOption()}
          ref={(node: EChartsReact) => (chartRef = node)}
        />
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div<{height: number}>`
  margin-bottom: 15px;
  .echarts-for-react {
    height: ${props => props.height}px !important;
  }
`;
