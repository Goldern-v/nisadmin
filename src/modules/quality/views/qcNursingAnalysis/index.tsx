import { observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "./api/index";
import { message, Spin, Table } from 'antd'

import HorizonBar from "../components/HorizonBar";
import Pie from "../components/Pie";
import BolaChart from "../components/BolaChart"
import { ColumnProps } from "antd/lib/table";

// 满意度调查分析
export default observer(function QcNursingAnalysis(props) {
  const [params, setParams] = useState({
    startDate: "",
    endDate: "",
  });

  const [allQualityScore, setAllQualityScore] = useState<any>([]);
  const [fullScoreDeptList, setFullScoreDeptList] = useState<any>([]);
  const [deptAverageScoreList, setDeptAverageScoreList] = useState<any>([]);
  const [areaDeptAverageScoreList, setAreaDeptAverageScoreList] = useState<any>([]);
  const [specificDeductionList, setSpecificDeductionList] = useState<any>([]);
  const [evaluationRate, setEvaluationRate] = useState<Record<string, any>>([])
  const [loading, setLoading] = useState(false)

  const setDataList: Array<Function> = [
    setAllQualityScore,
    setFullScoreDeptList,
    setDeptAverageScoreList,
    setAreaDeptAverageScoreList,
    setSpecificDeductionList,
    setEvaluationRate,
  ];

  const columns1_1: ColumnProps<any>[] = [
    {
      title: '检查内容',
      dataIndex: 'checkContent',
      width: 130,
      align: "center",
    },
    
    {
      title: '护理单元数',
      dataIndex: 'deptCount',
      width: 70,
      align: "center",
    },
    {
      title: '平均分',
      dataIndex: 'averageScore',
      width: 70,
      align: "center",
    },
    {
      title: '达标分',
      dataIndex: 'standardScore',
      width: 70,
      align: "center",
    },
    {
      title: '合格率',
      dataIndex: 'qualifiedRate',
      width: 70,
      align: "center",
    },
  ]

  const classRiskRender = (arr: any[]) => {
    return arr.length > 0
      ? arr.join(',')
      : '无'
  }
  const columns1_2: ColumnProps<any>[] = [
    {
      title: '检查内容',
      dataIndex: 'checkContent',
      align: "center",
    },
    {
      title: '护理单元',
      align: "center",
      children: [
        {
          title: '一类风险',
          dataIndex: 'oneClassRisk',
          align: "center",
          render: classRiskRender,  
        },
        {
          title: '二类风险',
          dataIndex: 'twoClassRisk',
          align: "center",
          render: classRiskRender,  
        },
        {
          title: '三类风险',
          dataIndex: 'threeClassRisk',
          align: "center",
          render: classRiskRender,  
        },
      ]
    },
  ]

  const columns2To7: ColumnProps<any>[] = [
    {
      title: '扣分项目',
      dataIndex: 'deductionItem',
      width: 130,
      align: "center",
    },
    
    {
      title: '扣分频次',
      dataIndex: 'deductionTimes',
      width: 70,
      align: "center",
    },
    {
      title: '百分比(%)',
      dataIndex: 'percentage',
      width: 70,
      align: "center",
    },
    {
      title: '累计百分比(%)',
      dataIndex: 'cumulativePercentage',
      width: 70,
      align: "center",
    },
  ]

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setLoading(true)
      const res = await Promise.all([
        getAllQualityScore(),
        getFullScoreDeptList(),
        getDeptAverageScoreList(),
        getAreaDeptAverageScoreList(),
        getSpecificDeductionList(),
        getEvaluationRate(),
      ]);
      // const res1 = await getEvaluationRate()
      res.map((item: any, i: number) => {
        if (item.code == 200) {
          setDataList[i](item.data);
        }
      });
      setLoading(false)
    } catch (e) {
      setLoading(false)      
    }
  };

  const getAllQualityScore = async () => {
    return await api.getAllQualityScore(params);
  };
  const getFullScoreDeptList = async () => {
    return await api.getFullScoreDeptList(params);
  };
  const getDeptAverageScoreList = async () => {
    return await api.getDeptAverageScoreList({ ...params, typeList: [1,2,3,4,5,6] });
  };
  const getAreaDeptAverageScoreList = async () => {
    return await api.getAreaDeptAverageScoreList({ ...params, typeList: [1,2,3,4,5,6] });
  };
  const getSpecificDeductionList = async () => {
    return await api.getSpecificDeductionList({ ...params, typeList: [1,2,3,4,5,6] });
  };
  const getEvaluationRate = async () => {
    return await api.getEvaluationRate({ ...params, typeList: [1,2,3,4,5,6,7,8,9,10] });
  };
  const numArr = [
    '二', '三', '四','五', '六', '七'
  ]

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <div className="satisfaction-analysis">
          <h2>一、全院护理质量检查分析报告</h2>
          <h3>1.1全院护理质量检查总体得分(表格)</h3>
          <Table columns={columns1_1} dataSource={allQualityScore} pagination={false}/>
          <h3>1.2满分科室分布（表格）</h3>
          <Table dataSource={fullScoreDeptList} pagination={false} columns={columns1_2} />
          {deptAverageScoreList.map((item: any, index: number) => {
            return (
              <Fragment key={index}>
                <h2>{`${numArr[index]}、${item.name}检查分析报告`}</h2>
                <h3>{`${index + 2}.1${item.name}得分`}</h3>
                {
                  index > 0
                    ? <>
                        <HorizonBar list={item.dataList} xKey="averageScore" yKey="wardName" isDataZoom={true} isHorizon={true}/>
                        <h3>{`${index + 2}.2${item.name}-片区得分比较（图表-柱状）)`}</h3>
                        {
                          (areaDeptAverageScoreList[index]?.areaDataList || []).map((val: any, i:number) =>(
                            <HorizonBar key={i} name={val.areaName} list={val.dataList} xKey="wardName" yKey="averageScore" isDataZoom={true} isHorizon={false}/>
                          ))
                        }
                      </>
                    : <HorizonBar list={item.dataList} xKey="wardName" yKey="averageScore" isDataZoom={true} isHorizon={false}/>
                }
                {
                  index < 5 && <>
                    <h3>{`${index + 2}.${index > 0 ? 3 : 2}主要扣分项目(表格)`}</h3>
                    <Table dataSource={specificDeductionList[index]?.dataList || []} pagination={false} columns={columns2To7} />
                    <h3>{`${index + 2}.${index > 0 ? 4 : 3}主要扣分项目(图表-柏拉图)`}</h3>
                    <BolaChart list={specificDeductionList[index]?.dataList || []} xKey="deductionItem" barKey="deductionTimes" lineKey="cumulativePercentage"/>
                  </>
                }
              </Fragment>)
          })}
          <h3>7.3重点环节各评估率及执行率全院得分分析</h3>
          {
            evaluationRate.map((item: Record<string, any>, index: number) => (
              <Fragment key={index}>
                <h4>{`7.3.${index + 1}${item.name}`}</h4>
                <Pie list={[{name: '合格率',value: item.qualifiedRate},{name: '不合格率',value: item.unQualifiedRate}]} nameKey="name" valKey="value" />
              </Fragment>
            ))
          }

        </div>
      </Spin>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  overflow: auto;
  position: relative;
  .ant-input {
    height: 24px;
    text-align: center;
  }
  h2,
  h3,
  h4,
  h5,
  table,
  .ant-table-wrapper {
    margin-bottom: 15px;
  }
  .satisfaction-analysis {
    background: #fff;
    padding: 10px;
    margin: 20px;
  }
  table {
    width: 100%;
    text-align: center;
    &.table-horizon {
      tr:first-child {
        font-weight: bold;
      }
    }
    &.table-vertical {
      td:first-child {
        font-weight: bold;
      }
    }
    td,
    tr {
      border: 1px solid #000;
    }
    td {
      line-height: 24px;
    }
  }
  .ant-table-content {
    th, td {
      border: 1px solid #000;
      padding: 0px;
      line-height: 24px;
      background-color: transparent;
    }
    tr:hover {
      background: transparent;
    }
  }
`;
