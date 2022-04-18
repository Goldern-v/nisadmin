import { observer } from "mobx-react";
import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { api } from "./api/index";
import { Button, DatePicker, message, Spin, Table } from 'antd'

import HorizonBar from "../components/HorizonBar";
import Pie from "../components/Pie";
import BolaChart from "../components/BolaChart"
import { ColumnProps } from "antd/lib/table";
import printing from 'printing'
import { PageTitle, Place } from "src/components/common";
import moment from 'moment'
import { getCurrentMonth } from "src/utils/date/currentMonth";

// 满意度调查分析
export default observer(function QcNursingAnalysis(props) {
  const dateFormat = 'YYYY-MM-DD'
  const [params, setParams] = useState(() => {
    let [m1, m2] = getCurrentMonth()
    return {
      startDate: m1.format(dateFormat),
      endDate: m2.format(dateFormat),
    }
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
  }, [params]);

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
  const pageRef: any = useRef<HTMLElement>()
  const [isPrint, setIsPrint] = useState(false)
  const setImg = () => {
    let imgEl = document.querySelectorAll('.chart-img') as any
    if (imgEl.length) {
      for (let i = 0; i < imgEl.length; i++) {
        chartsImg[i] && (imgEl[i].src = chartsImg[i])
      }
    }
  }
  // useLayoutEffect(() => {
  //   if (isPrint) {
  //     setImg()
  //   }
  // }, [isPrint])
  const handlePrint = async() => {
    await setIsPrint(true)
    setImg()
    setTimeout(() => {
      printing(pageRef.current, {
        injectGlobalCss: true,
        scanStyles: false,
        css: `
          .qcNursing-analysis {
            margin: 0;
            padding: 20px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }
          .ant-table-content th, .ant-table-content td {
            padding: 8px;
            line-height: 21px;
          }
          th {
            background:rgba(37, 143, 241,.7) !important;
          }
          .ant-table-thead .ant-table-column-title{
            color:#fff;
          }
          .ant-table-row{
            background:rgba(108, 183, 252,.3);
          }
          .chart-img {
            max-height: 260mm;
            width: 100%;
            object-fit: cover
          }
        `
      }).then(() => {
        setIsPrint(false)
      })
    }, 500)
  }
  const [chartsImg, setChartsImg] = useState<any[]>([])
  useEffect(() => {
    let timer: any = null
    // if (!loading) {
      timer =  setTimeout(() => {
        let canvasEl = document.querySelectorAll('canvas') as any
        if (canvasEl.length) {
          let arr = []
          for (let i = 0; i < canvasEl.length; i++) {
            arr.push(canvasEl[i].toDataURL())
          }
          setChartsImg(arr)
        }
      }, 1000)
    // }
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <div className="qcNursing-analysis-title">
          <PageTitle>三级护理分析</PageTitle>
          <Place/>
          <DatePicker.RangePicker
            value={[moment(params.startDate), moment(params.endDate)]}
            format={dateFormat}
            allowClear={false}
            onChange={(m: any) => {
              setParams({
                startDate: m[0]?.format(dateFormat) || '',
                endDate: m[1]?.format(dateFormat) || ''
              })
          }}/>
          <Button style={{margin: '0 4px'}} type="primary" onClick={init}>查询</Button>
          <Button onClick={handlePrint}>打印</Button>
        </div>
        <div className="qcNursing-analysis-layer">
          <div ref={pageRef} className="qcNursing-analysis">
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
                          {
                            isPrint && chartsImg.length && <img className="chart-img" src={''}/>
                          }
                          {
                            !isPrint &&
                            <HorizonBar list={item.dataList} xKey="averageScore" yKey="wardName" isDataZoom={true} isHorizon={true}/>
                          }
                          <h3>{`${index + 2}.2${item.name}-片区得分比较（图表-柱状）)`}</h3>
                          {
                            (areaDeptAverageScoreList[index]?.areaDataList || []).map((val: any, i:number) =>(
                              <Fragment key={i}>
                                {
                                  isPrint && chartsImg.length && <img className="chart-img" src={''}/>
                                }
                                {
                                  !isPrint &&
                                  <HorizonBar key={i} name={val.areaName} list={val.dataList} xKey="wardName" yKey="averageScore" isDataZoom={true} isHorizon={false}/>
                                }
                              </Fragment>
                            ))
                          }
                        </>
                      : <Fragment>
                        {
                          isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[0]}/>
                        }
                        {
                          !isPrint &&
                          <HorizonBar list={item.dataList} xKey="wardName" yKey="averageScore" isDataZoom={true} isHorizon={false}/>
                        }
                      </Fragment>
                  }
                  {
                    index < 5 && <>
                      <h3>{`${index + 2}.${index > 0 ? 3 : 2}主要扣分项目(表格)`}</h3>
                      <Table dataSource={specificDeductionList[index]?.dataList || []} pagination={false} columns={columns2To7} />
                      <h3>{`${index + 2}.${index > 0 ? 4 : 3}主要扣分项目(图表-柏拉图)`}</h3>
                      {
                        isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[0]}/>
                      }
                      {
                        !isPrint &&
                        <BolaChart list={specificDeductionList[index]?.dataList || []} xKey="deductionItem" barKey="deductionTimes" lineKey="cumulativePercentage"/>
                      }
                    </>
                  }
                </Fragment>)
            })}
            <h3>7.3重点环节各评估率及执行率全院得分分析</h3>
            {
              evaluationRate.map((item: Record<string, any>, index: number) => (
                <Fragment key={index}>
                  <h3>{`7.3.${index + 1}${item.name}`}</h3>
                  {
                    isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[0]}/>
                  }
                  {
                    !isPrint &&
                    <Pie list={[{name: '合格率',value: item.qualifiedRate},{name: '不合格率',value: item.unQualifiedRate}]} nameKey="name" valKey="value" />
                  }
                </Fragment>
              ))
            }

          </div>
        </div>
      </Spin>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  overflow: auto;
  position: relative;
  h2,
  h3,
  .ant-table-wrapper {
    margin-bottom: 15px;
  }
  .qcNursing-analysis-title {
    display: flex;
    padding: 20px;
    background: #fff;
  }
  .qcNursing-analysis-layer {
    height: calc(100vh - 122px);
    overflow: auto;
  }
  .qcNursing-analysis {
    background: #fff;
    padding: 20px;
    width: 720px;
    margin: 20px auto;
  }
  .ant-table-content {
    th, td {
      padding: 8px;
      line-height: 21px;
    }
  }
  th{
    background:rgba(37, 143, 241,.7) !important;
    .ant-table-column-title{
      color:#fff;
    }
  }
  .ant-table-row{
    background:rgba(108, 183, 252,.3);
  }
`;
