import styled from "styled-components";
import React,{useState} from "react";
import { Spin,Select,Radio} from 'antd'
import BaseTable, { TabledCon, DoCon } from "src/components/BaseTable";
import { observer } from "src/vendors/mobx-react-lite";
import ReactECharts from 'echarts-for-react';
import { summaryModal } from "../SummaryModal";

export interface Props {}

const mainRender = (text:any,row:any, index:any)=>{
  if(index>=1) return {
    children: <a>{text}</a>,
    props: {
      rowspan:0,
      colSpan:0
    },
  };
  return {
    children: <a>{text}</a>,
    props: {
      rowSpan: summaryModal.tableList.length,
    },
  };
}

export default observer(function Table() {

  const columns: any = [
    {
      title: "项目",
      dataIndex: "qcName",
      width: 60,
      align: "center",
      render: (text:any,row:any, index:any) => mainRender(text,row,index)
    },
    {
      title: "内容",
      dataIndex: "qcItemTypeName",
      width: 130,
      align: "center",
      render: (text:any,row:any, index:any) => {
        if(!row.markRowspan) return {
          props: {
            rowspan:0,
            colSpan:0
          },
        };
        return {
          children: <a>{text}</a>,
          props: {
            rowSpan: row.markRowspan,
          },
        };
      },
    },
    {
      title: "主要问题",
      dataIndex: "mark",
      width: 130,
      align: "center"
    },
    {
      title: "例次",
      dataIndex: "countNum",
      width: 60,
      align: "center",
      render: (text:any,row:any, index:any) => {
        if(!row.markRowspan) return {
          props: {
            rowspan:0,
            colSpan:0
          },
        };
        return {
          children: <a>{text}</a>,
          props: {
            rowSpan: row.markRowspan,
          },
        };
      },
    },
    {
      title: "发生频率",
      dataIndex: "rate",
      width: 60,
      align: "center",
      render: (text:any,row:any, index:any) => {
        if(!row.markRowspan) return {
          props: {
            rowspan:0,
            colSpan:0
          },
        };
        return {
          children: <a>{text+"%"}</a>,
          props: {
            rowSpan: row.markRowspan,
          },
        };
      },
    },
    {
      title: "原因分析",
      dataIndex: "reason",
      width: 60,
      align: "center",
      render: (text:any,row:any, index:any) => mainRender(text,row,index)
    },
    {
      title: "措施",
      dataIndex: "measure",
      width: 60,
      align: "center",
      render: (text:any,row:any, index:any) => mainRender(text,row,index)
    },
    {
      title: "追踪",
      dataIndex: "track",
      width: 60,
      align: "center",
      render: (text:any,row:any, index:any) => mainRender(text,row,index)
    },
  ];

  const chartOptions = {
    title: {
      text: "质量检查汇总" + (summaryModal.type == 1 ? "汇总":"明细"),
      left:"center"
    },
    xAxis: {
        show:true,
        type: 'category',
        data: summaryModal.plato.map(item => item.qcItemTypeName)
    },
    // tooltip: {
    //   trigger: 'axis'
    // },
    yAxis: [
      {
        type: 'value',
      },
      {
        type: 'value',
        position: 'right',
        axisLabel: {
          formatter: '{value}%', // 设置线图单位为 %
        },
        // offset: 80,   
      }
    ],
    series:[
      {
        type: 'bar',
        data: summaryModal.plato.map((item:any)=>item.countNum),
        yAxisIndex: 0,
        label:{
          show:true,
          position:'top',
        },
        itemStyle:{
          color:'#4f71be'
        }
      },
      {
        type: 'line',
        yAxisIndex: 1,
        data: summaryModal.plato.map((item:any)=>(item.rate)),
        label:{
          // show:true,
          position:'top',
        },
        itemStyle:{
          color:'grey'
        }
      },
    ],
    graphic: [
      {
        type: "group",
        left: "center",
        bottom: 10,
        children: [
          {
            type: "rect",
            shape: {
              width: 40,
              height: 12
            },
            style: {
              fill: "#4f71be"
            },
            left: -50
          },
          {
            type: "text",
            style: {
              text: "发生例次",
              textAlign: "left",
              fill: "#333"
            },
            left: -0
          },
          {
            type: "rect",
            shape: {
              width: 40,
              height: 6
            },
            style: {
              fill: "grey"
            },
            left: 60,
            top:3
          },
          {
            type: "text",
            style: {
              text: "发生频率",
              textAlign: "left",
              fill: "#333"
            },
            left: 110
          }
        ]
      }
    ]
  };

  return (
    <Wrapper>
      <Spin spinning={summaryModal.tableLoading}>
        <div className="wrapTop">
          <Select
            style={{ width: 120 }}
            value={summaryModal.showtype}
            onChange={(val: string) => {
              summaryModal.showtype = val
              val=="2" && summaryModal.initCanvasImg()
            }}
          >
            {summaryModal.typeList.map((item: any, index: number) => (
              <Select.Option value={item.code} key={index}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <div className="right-group">
            <Radio.Group
              size="small"
              buttonStyle="solid"
              value={summaryModal.type}
              onChange={(e) => {
                summaryModal.type = e.target.value
                summaryModal.onload()
              }}>
              <Radio.Button value={1}>汇总</Radio.Button>
              <Radio.Button value={2}>明细</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className="tableBox">
          {
            summaryModal.showtype == "1" ?
            <BaseTable
            loading={summaryModal.tableLoading}
            dataSource={summaryModal.tableList}
            columns={columns}
            scroll={{ y: 500 }}
          />
          :
          summaryModal.isPrint ? 
          <img className="chart-img" src={''} /> :
          <ReactECharts option={chartOptions} />
        }
        </div>
      </Spin>
    </Wrapper>
  );
});
const Wrapper = styled(TabledCon)`
  .tableBox{
    min-height:640px;
  }
  .wrapTop{
    position: relative;
    padding: 15px 15px 0;
    .right-group{
      position: absolute;
      right: 15px;
      top: 15px;
    }
  }
`;
