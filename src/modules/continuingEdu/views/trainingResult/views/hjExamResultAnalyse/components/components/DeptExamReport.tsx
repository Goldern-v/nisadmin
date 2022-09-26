import React, { useEffect } from "react";
import { Chart, Tooltip, Axis, Bar, Legend } from "viser-react";
import { observer } from "mobx-react-lite";
import BaseTable from "src/components/BaseTable";
import { hjExamModal } from "../../HjExamModal";
import { Content, Title, TableTitle, ChartCon } from "./styleCss";
export interface Props {}

export default observer(function DeptExamReport() {
  const DataSet = require("@antv/data-set");

  //初始化数据
  useEffect(() => {
    hjExamModal.excelOnloadByDept();
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl = document.querySelector(
        ".hj-exam-report-dept canvas"
      ) as HTMLCanvasElement;
      if (canvasEl) hjExamModal.deptImg = canvasEl.toDataURL();
    }, 500);
    return () => clearTimeout(timer);
  }, [hjExamModal.excelTableListByDept.length]);

  const columns: any = [
    {
      title: "科室",
      dataIndex: "deptName",
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
        return <span>{(text * 100).toFixed(2)}%</span>
      },
    },
    {
      title: "未参与率",
      dataIndex: "unParticipateRate",
      width: 80,
      align: "center",
      render: (text: any) => {
        return <span>{(text * 100).toFixed(2)}%</span>
      },
    },
    {
      title: "科室平均正确率",
      dataIndex: "avgCorrectRate",
      width: 100,
      align: "center",
      render: (text: any) => {
        return <span>{(text * 100).toFixed(2)}%</span>
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
  let chartData = [
    { name: "应参与人数" },
    { name: "实际参与人数" },
    { name: "参与率" },
  ] as any[];
  let fields = [];
  for (let i = 0; i < hjExamModal.excelTableListByDept.length; i++) {
    let item: any = hjExamModal.excelTableListByDept[i];
    fields.push(item.deptName);
    chartData[0][item.deptName] = item.totalPersonCount || 0;
    chartData[1][item.deptName] = item.finishedPersonCount || 0;
    chartData[2][item.deptName] = item.participateRate || 0;
  }
  if (hjExamModal.excelTableListByDept.length <= 0) chartData = [];
  const dv = new DataSet.View().source(chartData);
  dv.transform({
    type: "fold",
    fields,
    key: "deptName",
    value: "participateRate",
  });
  const data = dv.rows;

  return (
    <Content>
      <Title>《科室参与人数柱状图》</Title>
      <ChartCon className="hj-exam-report-dept">
        <Chart forceFit data={data} height={400}>
          <Tooltip />
          <Legend />
          <Axis />
          <Bar
            color="name"
            position="deptName*participateRate"
            adjust={[{ type: "dodge", marginRatio: 1 / 32 }]}
          />
        </Chart>
      </ChartCon>
      <TableTitle>科室维度分析</TableTitle>
      <BaseTable
        dataSource={hjExamModal.excelTableListByDept}
        columns={columns}
      />
    </Content>
  );
});
