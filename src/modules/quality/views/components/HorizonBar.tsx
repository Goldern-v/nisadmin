import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EChartsReact from "echarts-for-react";

interface Props {
  list: Array<any>;
  yKey: string;
  xKey: string;
  /**是否是横向柱状图 */
  isHorizon?: boolean;
  /**s是否需要dataZoom */
  isDataZoom?: boolean;
  contentH?: number;
  name?: string;
}
export default observer(function HorizonBar(props: Props) {
  let chartRef: any = React.createRef();
  const { yKey, xKey, isHorizon = true, isDataZoom = false, contentH= 400, name = '', list = [] } = props;
  const [chartH, setChartH] = useState(contentH)
  const averTexts = ['平均分','全院']
  const [ averItem, setAverItem ] = useState<any>(undefined)
  useEffect(() => {
    setAverItem(list.find(v => averTexts.includes(v[isHorizon ? yKey : xKey])))
  },[list])
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

      grid: { left: 100, bottom: 30, top: 20 },
      series: [
        {
          type: "bar",
          id: "bar",
          name: name || '',
          barWidth: 20,
          data: isHorizon ? list.map((v: any) => v[xKey]).reverse() : list.map((v:any) => v[yKey]),
          label: {
            show: true,
            distance: 5,
            position: isHorizon ? 'right' : 'top',
          },
          itemStyle: {
            normal: {
              color: function(obj: any) {
                if (!averItem) return '#416dbb'
                let key = isHorizon ? xKey : yKey
                if (averTexts.includes(obj.name)) return 'rgb(255, 255, 0)'
                if (Number(obj.value) >= Number(averItem[key])) return '#416dbb'
                return '#f00'
              }
            }
          }
        },
      ],
    };
    // let len = list.length
    // if (isDataZoom && ((len > 10 && isHorizon) || (len > 15 && !isHorizon))) {
    //   option.dataZoom = [
    //     {
    //       // 这是滚动条插件  可以是Y轴 也可以是X轴
    //       type: 'slider',
    //       orient: isHorizon ? 'vertical' : 'horizontal',
    //     },
    //   ]
    // }
    if (isHorizon) {
      option.yAxis = {
        type: 'category',
        data: list.map((v: any) => v[yKey]).reverse(),
        axisLabel: {
          rotate: 45,
        },
      }
      option.xAxis = { gridIndex: 0 }
      let h = list.length * 30 + 50
      if (h > chartH) {
        setChartH(h)
      }
    } else {
      option.xAxis = {
        type: "category",
        data: list.map((v: any) => v[xKey]),
        axisLabel: {
          rotate: 45,
          /**间隔5个字符换行 */
          formatter: (value: string) => {
            return value.replace(/([\w\W]{1,5})/, `$1\n`)
          }
        },
      }
      option.yAxis = { gridIndex: 0 }
      option.grid = { bottom: 90, top: 30 }
    }
    return option;
  };
  return (
    <Wrapper height={chartH}>
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
