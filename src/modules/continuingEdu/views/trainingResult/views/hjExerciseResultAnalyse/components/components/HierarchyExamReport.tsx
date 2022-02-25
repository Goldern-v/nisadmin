import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable from "src/components/BaseTable";
import { hjExerciseModal } from "../../HjExerciseModal";
import { Chart, Tooltip, Axis, Bar, Legend, Coord, Pie } from "viser-react";
import {
  Content,
  Title,
  TableTitle,
  ChartCon,
  Part,
  PartOne,
} from "./styleCss";
import { appStore } from "src/stores";
export interface Props {}

export default observer(function HierarchyExamReport() {
  const DataSet = require("@antv/data-set");

  //初始化数据
  useEffect(() => {
    hjExerciseModal.excelOnloadByHierarchy();
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl = document.querySelector(
        ".hj-exam-report-hierarchy1 canvas"
      ) as HTMLCanvasElement;
      if (canvasEl) hjExerciseModal.hierarchyImgZhu = canvasEl.toDataURL();
      let canvasEl2 = document.querySelector(
        ".hj-exam-report-hierarchy2 canvas"
      ) as HTMLCanvasElement;
      if (canvasEl2) hjExerciseModal.hierarchyImgYuan = canvasEl2.toDataURL();
    }, 500);
    return () => clearTimeout(timer);
  }, [hjExerciseModal.excelTableListByHierarchy.length]);

  const columns: any = [
    {
      title: "层级",
      dataIndex: "nurseHierarchy",
      width: 160,
      align: "center",
    },
    {
      title: "应参与人数",
      dataIndex: "totalPersonCount",
      width: 80,
      align: "center",
    },
    {
      title: "已参与人数",
      dataIndex: "finishedPersonCount",
      width: 80,
      align: "center",
    },
    {
      title: "未参与人数",
      dataIndex: "unFinishedPersonCount",
      width: 80,
      align: "center",
    },
    {
      title: "参与率",
      dataIndex: "participateRate",
      width: 80,
      align: "center",
      render: (text: any) => {
        return <span>{text * 100}%</span>;
      },
    },
    {
      title: "未参与率",
      dataIndex: "unParticipateRate",
      width: 80,
      align: "center",
      render: (text: any) => {
        return <span>{text * 100}%</span>;
      },
    },
    {
      title: "科室平均正确率",
      dataIndex: "avgCorrectRate",
      width: 100,
      align: "center",
      render: (text: any) => {
        return <span>{text * 100}%</span>;
      },
    },
    {
      title: "科室平均分",
      dataIndex: "avgScores",
      width: 80,
      align: "center",
    },
  ];

  // 数据可视化柱状图设置
  // 数据可视化柱状图设置
  let chartData = [{ name: "参与人数" }] as any[];
  let fields = [];
  for (let i = 0; i < hjExerciseModal.excelTableListByHierarchy.length; i++) {
    let item: any = hjExerciseModal.excelTableListByHierarchy[i];
    fields.push(item.nurseHierarchy);
    chartData[0][item.nurseHierarchy] = item.personCount || 0;
  }
  if (hjExerciseModal.excelTableListByHierarchy.length <= 0) chartData = [];
  const dvZhu = new DataSet.View().source(chartData);
  dvZhu.transform({
    type: "fold",
    fields,
    key: "nurseHierarchy",
    value: "personCount",
  });
  const dataZhu = dvZhu.rows;

  // 数据可视化饼状图设置
  const scaleTheta = [
    {
      dataKey: "percent",
      min: 0,
      formatter: ".0%",
    },
  ];
  const dv = new DataSet.View().source(
    hjExerciseModal.excelTableListByHierarchy
  );
  dv.transform({
    type: "percent",
    field: ["hj"].includes(appStore.HOSPITAL_ID)
      ? "participateRate"
      : "personCount",
    dimension: "nurseHierarchy",
    as: "percent",
  });
  const data = dv.rows;

  return (
    <Content>
      <Title>《层级参与人数柱状图》</Title>
      <ChartCon>
        <PartOne className="hj-exam-report-hierarchy1">
          <Chart forceFit data={dataZhu} height={500}>
            <Tooltip />
            <Legend />
            <Axis />
            <Bar
              color="name"
              position="nurseHierarchy*personCount"
              adjust={[{ type: "dodge", marginRatio: 1 / 32 }]}
            />
          </Chart>
        </PartOne>
        <Part className="hj-exam-report-hierarchy2">
          <Chart forceFit height={300} data={data} scale={scaleTheta}>
            <Tooltip showTitle={false} />
            <Axis />
            <Legend dataKey="nurseHierarchy" />
            <Coord type="theta" />
            <Pie
              position="percent"
              color="nurseHierarchy"
              style={{ stroke: "#fff", lineWidth: 1 }}
              label={[
                "percent",
                {
                  offset: -40,
                  textStyle: {
                    rotate: 0,
                    textAlign: "center",
                    shadowBlur: 2,
                    shadowColor: "rgba(0, 0, 0, .45)",
                  },
                },
              ]}
            />
          </Chart>
        </Part>
      </ChartCon>
      <TableTitle>层级维度分析</TableTitle>
      <BaseTable
        dataSource={hjExerciseModal.excelTableListByHierarchy}
        columns={columns}
      />
    </Content>
  );
});
