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
  const colors = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589']

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
          /**间隔5个字符换行 */
          formatter: (value: string) => {
            return value.replace(/([\w\W]{1,5})/, `$1\n`)
          }
        },
      }],
      yAxis: [{
        type: 'value',
        name: '百分比',
        axisLabel: {
          formatter: '{value} %'
        },
        splitLine: false
      },
      {
        type: 'value',
        name: '扣分累计',
        boundaryGap: [0, 0.1],
        splitLine: false
      }],
      grid: { bottom: 90, top: 30 },
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
          // barCategoryGap: '0%',
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
          itemStyle: {
            normal: {
              color: function (obj: any) {
                if (obj.dataIndex >= 0) {
                  return colors[obj.dataIndex % colors.length];
                }
              },
              // borderWidth : 1,
              // borderRadius : 2,
              label: {
                show: true,
                position: 'top'
              }
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
