import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components";
import EChartsReact from "echarts-for-react";

interface Props {
  list: Array<any>;
  valKey: string;
  nameKey: string;
}
export default observer(function Pie(props: Props) {
  let chartRef: any = React.createRef();
  const { valKey, nameKey } = props;

  useEffect(() => {
    chartRef.getEchartsInstance().setOption(getOption());
  }, [props.list]);

  const getOption = () => {
    let option = {
      legend: {
        orient: "horizontal",
        top: "bottom",
      },
      tooltip: {
        trigger: "item",
        formatter: '{b} : {c} ({d}%)'
      },
      series: [
        {
          type: "pie",
          id: "pie",
          radius: "60%",
          center: ["50%", "50%"],
          emphasis: {
            focus: "self",
          },
          data: props.list.map((v: any) => ({
            name: v[nameKey],
            value: v[valKey],
          })),
          label: {
            show: true,
            formatter: '{b} : {c} ({d}%)',
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
    height: 300px !important;
  }
`;
