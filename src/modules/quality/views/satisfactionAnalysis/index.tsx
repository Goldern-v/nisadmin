import { observer } from "mobx-react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { api } from "./api/index";
import { Button, DatePicker, Input, message, Spin, Table } from 'antd'

import Table2_1 from "./components/Table2_1";
import HorizonBar from "../components/HorizonBar";
import Table2_3 from "./components/Table2_3";
import VerticalTable from "../components/VerticalTable";
import Pie from "../components/Pie";
import BolaChart from "../components/BolaChart";
import { PageTitle, Place } from "src/components/common";
import printing from 'printing'
import moment from 'moment'
import { getCurrentMonth } from "src/utils/date/currentMonth";
// 满意度调查分析
export default observer(function SatisfactionAnalysis(props) {
  const dateFormat = 'YYYY-MM-DD'
  const [params, setParams] = useState(() => {
    let [m1, m2] = getCurrentMonth()
    return {
      startDate: m1.format(dateFormat),
      endDate: m2.format(dateFormat),
    }
  });

  const [wardCode, setWardCode] = useState("");

  const [investigationCount, setInvestigationCount] = useState<any>({});
  const [deptScoreList, setDeptScoreList] = useState<any>([]);
  const [praiseSituation, setPraiseSituation] = useState<any>([]);
  const [deptPopulation, setDeptPopulation] = useState<any>([]);
  const [variousIndicators, setVariousIndicators] = useState<any>([]);
  const [eachVariousIndicators, setEachVariousIndicators] = useState<any>([]);
  const [dissatisfied, setDissatisfied] = useState<any>([]);
  const [deptSatisfaction1, setDeptSatisfaction1] = useState<any>([])
  const [deptSatisfaction2, setDeptSatisfaction2] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const setDataList: Array<Function> = [
    setInvestigationCount,
    setDeptScoreList,
    setPraiseSituation,
    setDeptPopulation,
    setVariousIndicators,
    setEachVariousIndicators,
    setDissatisfied,
    setDeptSatisfaction1,
    setDeptSatisfaction2,
  ];

  const columns4_1: any = [
    {
      title: '影响因素',
      dataIndex: 'influenceFactor',
      key: 'influenceFactor',
      width: 100,
      align: "center",
    },
    {
      title: '扣分累计',
      dataIndex: 'deductedPoints',
      key: 'deductedPoints',
      width: 70,
      align: "center",
    },
    {
      title: '百分比',
      dataIndex: 'percentage',
      key: 'percentage',
      width: 70,
      align: "center",
    },
    {
      title: '累计百分比',
      dataIndex: 'cumulativePercentage',
      key: 'cumulativePercentage',
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
        getInvestigationCount(),
        getDeptScoreList(),
        getPraiseSituationList(),
        getDeptPopulationList(),
        getVariousIndicatorsList(),
        getEachVariousIndicatorsList(),
        getDissatisfiedList(),
        getDeptSatisfactionList(1),
        getDeptSatisfactionList(2)
      ]);
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

  const getInvestigationCount = async () => {
    return await api.getInvestigationCount(params);
  };
  const getDeptScoreList = async () => {
    return await api.getDeptScoreList({ ...params, wardCode });
  };
  const getPraiseSituationList = async () => {
    return await api.getPraiseSituationList(params);
  };
  const getDeptPopulationList = async () => {
    return await api.getDeptPopulationList(params);
  };
  const getVariousIndicatorsList = async () => {
    return await api.getVariousIndicatorsList(params);
  };
  const getEachVariousIndicatorsList = async () => {
    return await api.getEachVariousIndicatorsList({...params, typeList: [1,2,3,4,5,6,7,8,9,10]});
  };
  const getDissatisfiedList = async () => {
    return await api.getDissatisfiedList(params);
  };
  const getDeptSatisfactionList = async (deptType: 1 | 2) => {
    return await api.getDeptSatisfactionList({...params, deptType});
  };
  // 设置回收和有效问卷
  const handleKeyUp = async (e: any) => {  
    try {
      const {recoveryCount, validCount} = investigationCount
      setLoading(true)
      const res = await api.setInvestigationCount({ ...params, recoveryCount, validCount})
      message.success(res.desc)
      setLoading(false)
      if (res.code == 200) {
        init()
      }
    } catch (e) {
      setLoading(false)
    }
  }

  const pageRef: any = useRef<HTMLElement>()
  const [isPrint, setIsPrint] = useState(false)
  const handlePrint = () => {
    setIsPrint(true)
    setTimeout(() => {

      printing(pageRef.current, {
        injectGlobalCss: true,
        scanStyles: false,
        css: `
          .satisfaction-analysis {
            margin: 0;
            padding: 20px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }
          .ant-input {
            border: none;
            background: transparent;
          }
          table {
            width: 100%;
            text-align: center;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 15px;
          }
          tr {
            background:rgba(108, 183, 252,.3);
            border-bottom: 1px solid #e8e8e8;
          }
          td {
            padding: 8px;
            line-height: 21px;
          }
          .table-horizon tr:first-child {
            font-weight: bold;
            background:rgba(37, 143, 241,.7);
            color: #fff;
          }
          .table-vertical td:first-child {
            font-weight: bold;
            background:rgba(37, 143, 241,.7);
            color: #fff;
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
      }, 500)
    // }
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <div className="satisfaction-analysis-title">
          <PageTitle>满意度调查分析</PageTitle>
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
        <div className="satisfaction-analysis-layer">
          <div ref={pageRef} className="satisfaction-analysis">
            <h2>一、基本调查情况</h2>
            <h3>1.1调查数量</h3>
            <table
              className="table-1_1 table-horizon"
              cellPadding={0}
              cellSpacing="1"
            >
              <colgroup>
                {["19%", "19%", "19%", "19%"].map((v: string) => (
                  <col width={v} />
                ))}
                <col width={"24%"} />
              </colgroup>
              <tbody>
                <tr>
                  {[
                    "病房单元数",
                    "发出问卷",
                    "回收问卷",
                    "有效问卷",
                    "有效问卷回收率",
                  ].map((v: string) => (
                    <td>{v}</td>
                  ))}
                </tr>
                <tr>
                  <td>{investigationCount.deptCount}</td>
                  <td>{investigationCount.sendCount}</td>
                  <td><Input value={investigationCount.recoveryCount} 
                  onChange={(e:any) => setInvestigationCount({ ...investigationCount, recoveryCount: e.target.value})}
                  onPressEnter={e => handleKeyUp(e)}/></td>
                  <td><Input value={investigationCount.validCount}onChange={(e:any) => setInvestigationCount({ ...investigationCount, validCount: e.target.value})}
                  onPressEnter={e => handleKeyUp(e)}/></td>
                  <td>{investigationCount.validPercent}</td>
                </tr>
              </tbody>
            </table>
            <h2>二、调查结果</h2>
            <h3>2.1全院各科室满意度得分汇总(表格) </h3>
            <Table2_1 list={deptScoreList} />
            <h3>2.2全院各科室满意度得分汇总(图表-条形)</h3>
            {
              isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[0]}/>
            }
            {
              !isPrint && <HorizonBar list={deptScoreList} yKey="wardName" xKey="averageScore" isDataZoom={true} />
            }
            <h3>2.3表扬情况</h3>
            <Table2_3 list={praiseSituation} />
            <h3>2.4各病房护理单元总体满意度</h3>
            <h3>2.4.1各病房护理单元总体满意度(表格)</h3>
            <VerticalTable
              list={deptPopulation}
              keyObj={{
                scoreRange: "满意度得分",
                deptCount: "护理单元数（个）",
                percent: "百分比",
              }}
            />
            <h3>2.4.2各病房护理单元总体满意度(图表-饼状)</h3>
            {
              isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[1]}/>
            }
            {
              !isPrint &&
              <Pie list={deptPopulation} nameKey="scoreRange" valKey="deptCount" />
            }
            <h2>三、住院患者满意度情况分析</h2>
            <h3>3.1各指标总体满意度</h3>
            <VerticalTable
              list={variousIndicators}
              keyObj={{
                name: '科室',
                value: '平均分'
              }}
            />
            <h3>3.1.1各指标总体满意度(图表-条形)</h3>
            {
              isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[2]}/>
            }
            {
              !isPrint &&
              <HorizonBar list={variousIndicators} yKey="name" xKey="value"/>
            }
            <h3>3.2各指标分数段分布</h3>
            {eachVariousIndicators.map((item: any, index: number) => (
              <Fragment>
                <h3>3.2.{index + 1}指标“{item.name}”满意度</h3>
                <h3>3.2.{index + 1}.1指标“{item.name}”满意度(表格)</h3>
                <VerticalTable
                  list={item.dataList}
                  keyObj={{
                    scoreRange: "满意度得分",
                    deptCount: "科室总数",
                    percent: "百分比",
                  }}
                />
                <h3>3.2.{index + 1}.2指标“优质护理病房知晓情况”满意度(图表-饼状)</h3>
                {
                  isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[3 + index]}/>
                }
                {
                  !isPrint &&
                  <Pie list={item.dataList} nameKey="scoreRange" valKey="deptCount" />
                }
              </Fragment>
            ))}
            <h2>四、不满意指标柏拉图分析</h2>
            <h3>4.1不满意指标柏拉图分析(表格)</h3>
            <Table columns={columns4_1} dataSource={dissatisfied} pagination={false}/>
            <h3>4.2不满意指标柏拉图分析(图表-柏拉图)</h3>
            {
              isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[13]}/>
            }
            {
              !isPrint &&
              <BolaChart list={dissatisfied} xKey="influenceFactor" barKey="deductedPoints" lineKey="cumulativePercentage"/>
            }
            <h2>五、门诊科室满意度情况分析</h2>
            {
              isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[14]}/>
            }
            {
              !isPrint &&
              <HorizonBar list={deptSatisfaction1} yKey="wardName" xKey="averageScore" isDataZoom={true}/>
            }
            <h2>六、特殊科室满意度情况分析</h2>
            {
              isPrint && chartsImg.length && <img className="chart-img" src={chartsImg[15]}/>
            }
            {
              !isPrint &&
              <HorizonBar list={deptSatisfaction2} xKey="wardName" yKey="averageScore" isDataZoom={true} isHorizon={false}/>
            }
          </div>
        </div>
      </Spin>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  .satisfaction-analysis-layer {
    .ant-input {
      height: 24px;
      text-align: center;
    }
  }
  h2,
  h3,
  table {
    margin-bottom: 15px;
  }
  .satisfaction-analysis-title {
    display: flex;
    padding: 20px;
    background: #fff;
  }
  .satisfaction-analysis-layer {
    height: calc(100vh - 122px);
    overflow: auto;
  }
  .satisfaction-analysis {
    background: #fff;
    padding: 20px;
    width: 720px;
    margin: 20px auto;
  }
  table {
    width: 100%;
    text-align: center;
    border-radius: 4px;
    overflow: hidden;
    tr {
      background:rgba(108, 183, 252,.3);
      border-bottom: 1px solid #e8e8e8;
    }
    &.table-horizon {
      tr:first-child {
        font-weight: bold;
        background:rgba(37, 143, 241,.7);
        color: #fff;
      }
    }
    &.table-vertical {
      td:first-child {
        font-weight: bold;
        background:rgba(37, 143, 241,.7);
        color: #fff;
      }
    }
    td {
      padding: 8px;
      line-height: 21px;
    }
  }
  .ant-table-content {
    th, td {
      /* border: 1px solid #000; */
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
