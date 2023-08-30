import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import {navTitle} from "src/modules/quality/data/qcTitle";
import {appStore, authStore} from "src/stores";
import {Button, Input, Spin} from "antd";
import BaseTable from "src/components/BaseTable";
import {QuarterlyZzwyData} from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/Data";
import {ColumnProps} from "antd/es/table";
import MultipleImageUploader from "src/components/ImageUploader/MultipleImageUploader";
import {trainingResultModel} from "src/modules/continuingEdu/views/trainingResult/models/TrainingResultModel";
import MultiFileUploader from "src/components/MultiFileUploader";
import {qcZzwyApi} from "src/modules/quality/views/qcZzwy/qcZzwyApi";
import QcFishBone from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/qcFishBone/fish-bone";
import ChartCylindricality
    from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/components/ChartCylindricality";
import SelectReport from '../qcMonthCheckReport/SelectReport';
import {qcMonthCheckData} from "src/modules/quality/views/qcZzwy/qcMonthCheckReport/qcMonthCheckData";

const {TextArea} = Input

interface Props {
    detailData?: any;
    onload?: any;
}

export default observer(function QuarterlyAnalysisReportZzwyDetail(props: Props) {
    const {queryObj} = appStore
    const {creatorName, creatorTime, summaryFormName, reportYear, reportQuarter} = QuarterlyZzwyData.reportMasterData
    const [selectTableModal, setSelectTableModal] = useState(false);
    const [fishValue,setFishValue]=useState({} as any)
    const [summaryTable,setSummaryTable] =useState([] as any)
    const topHeaderBack = () => {
        // appStore.history.push(
        //   props.detailData.master.qcLevel == '3'
        //     ? `/qcThree?noRefresh=1`
        //     : props.detailData.master.qcLevel == '2'
        //       ? `/qcTwo?noRefresh=1`
        //       : `/qcThree?noRefresh=1`
        // )
        appStore.history.goBack()
    };
    const columnsOne: ColumnProps<any>[] = [
        {
            title: '一级指标',
            dataIndex: "firstLevelItemName",
            align: 'center'
        },
        {
            title: '合格率(%)',
            dataIndex: "firstlevelEvalRate",
            width: 80,
            align: 'center',
            render: (text: string) => {
                return `${text}%`
            }
        }
    ]
    const columnsTwo: ColumnProps<any>[] = [
        {
            title: '项目',
            dataIndex: "simpleName",
            align: 'center'
        },
        {
            title: '追踪前得分率(%)',
            dataIndex: "b",
            align: 'center',
            render: (text: string, record: any,index:number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index,'b',e.target.value)
                }}/>
            }
        },
        {
            title: '追踪者',
            dataIndex: "c",
            align: 'center',
            render: (text: string, record: any,index:number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index,'c',e.target.value)
                }}/>
            }
        },
        {
            title: '追踪时间',
            dataIndex: "d",
            align: 'center',
            render: (text: string, record: any,index:number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index,'d',e.target.value)
                }}/>
            }
        },
        {
            title: '追踪后得分率',
            dataIndex: "e",
            align: 'center',
            render: (text: string, record: any,index:number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index,'e',e.target.value)
                }}/>
            }
        },
        {
            title: '追踪结果',
            dataIndex: "g",
            align: 'center',
            render: (text: string, record: any,index:number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index,'g',e.target.value)
                }}/>
            }
        }
    ]
    const columnsThree: ColumnProps<any>[] = [
        {
            title: '质量内容',
            dataIndex: "label",
            align: 'center'
        },
        {
            title: '合格率(%)',
            dataIndex: "evalRate",
            width: 80,
            align: 'center',
            render: (text: string, record: any, index: number) => {
                console.log("text===",text);
                return <Input defaultValue={text}  onBlur={(e: any) => {
                       // record.evalRate =e.target.value
                    QuarterlyZzwyData.updateSummaryTable(index,'evalRate',e.target.value)
                }}/>
            }
        }
    ]
    useEffect(() => {
        if (queryObj.master) {
            QuarterlyZzwyData.getQcReportById(queryObj.master)
        }
    }, [queryObj.master])
    const handleFishItem = (obj: any) => {
        console.log(obj);
        QuarterlyZzwyData.updateFishValueObj(obj)
    }
    return (
        <Con>
            <TopHeader>
                <BreadcrumbBox
                    style={{
                        paddingLeft: 0,
                        paddingTop: 10,
                        paddingBottom: 2,
                    }}
                    data={[
                        {
                            name: "质控检查反馈整改单",
                            link: '/qcOneHj'
                        },
                        // {
                        //     name: navTitle(master.qcLevel),
                        //     link:
                        //         master.qcLevel == "护理部职能督导"
                        //             ? "/qcFun"
                        //             :master.qcLevel == "3"
                        //                 ? "/qcThree"
                        //                 : master.qcLevel == "2"
                        //                     ? "/qcTwo"
                        //                     : ["hj", "gxjb", 'nfsd', 'qzde','zzwy'].includes(appStore.HOSPITAL_ID)
                        //                         ? "/qcOneHj"
                        //                         : appStore.HOSPITAL_ID == "nys"
                        //                             ? "/qcOneNys"
                        //                             : "/qcOne",
                        // },
                        {
                            name: "记录详情",
                        },
                    ]}
                />
                <div className="topHeaderTitle">
                    <div className="title">{`${reportYear}年第${reportQuarter}${summaryFormName}总结`}</div>
                    <div className="topHeaderButton">
                        <Button onClick={() => QuarterlyZzwyData.saveQcReport()}>保存</Button>
                        <Button>打印</Button>
                        <Button onClick={topHeaderBack}>返回</Button>
                    </div>
                </div>
                <div className="topHeaderStatus">
                    <div> 状态：<span style={{color: "#6767ff"}}>待提交</span></div>
                    <div> 创建人：<span>{creatorName}</span></div>
                    <div> 创建时间：<span>{creatorTime}</span></div>
                </div>
            </TopHeader>
            {/*内容*/}
            {/*<Spin>*/}
            <MidCon>
                <Content>

                    <>
                        <h2 className='center-title'>{`${reportYear}年第${reportQuarter}${summaryFormName}总结`}</h2>
                        <TextArea placeholder='请输入总结内容'
                                  value={QuarterlyZzwyData.summarize}
                                  onChange={(e: any) => QuarterlyZzwyData.summarize = e.target.value}
                                  rows={10}/>
                    </>
                    <>
                        <h5 className='title-sty'>检查情况表</h5>
                        <BaseTable
                            dataSource={QuarterlyZzwyData.inspectTable}
                            columns={columnsOne}
                        />
                    </>
                    <>
                        <Summary>
                            <h5 className='title-sty'>条目汇总表</h5>
                            <Button type='primary' onClick={() => setSelectTableModal(true)}>添加</Button>
                        </Summary>
                        <BaseTable
                            style={{padding: 0}}
                            // dataSource={summaryTable}
                            dataSource={QuarterlyZzwyData.summaryTable}
                            columns={columnsThree}
                        />
                    </>
                    <>
                        <h6 className='title-sty'>检查中发现存在主要内容</h6>
                        <TextArea placeholder='请输入检查中发现存在主要内容'
                                  value={QuarterlyZzwyData.contentValue}
                                  onChange={(e: any) => QuarterlyZzwyData.contentValue = e.target.value}
                                  rows={7}/>
                    </>
                    <>
                        <h6 className='title-sty'>三、整改措施</h6>
                        <TextArea placeholder='请输入整改措施内容'
                                  onChange={(e: any) => QuarterlyZzwyData.rectification = e.target.value}
                                  value={QuarterlyZzwyData.rectification} rows={7}/>
                    </>
                    <>
                        <h6 className='title-sty'>四、追踪评价</h6>
                        <BaseTable
                            style={{padding: 0}}
                            dataSource={QuarterlyZzwyData.referredTable}
                            columns={columnsTwo}
                        />
                        <div style={{margin: '20px 0'}}>
                            {/*QuarterlyZzwyData.fishValueObj*/}
                            <QcFishBone value={QuarterlyZzwyData.fishValueObj}  onChange={handleFishItem}/>
                        </div>
                        {/*<QcFishBone/>*/}
                    </>
                    <Summary style={{height: "auto"}}>
                        <h6 className='title-sty'>五、对上季度项目得分率的条目进行效果评价（支持图片上传</h6>
                        <MultiFileUploader
                            accept={'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg'}
                            size={1}
                            maxSize={2097152}
                        />
                    </Summary>

                    {/*柱形图*/}
                    <ChartCylindricality/>
                </Content>
            </MidCon>
            <SelectReport
                visible={selectTableModal}
                handleOk={(value: any) => {
                  //   setSummaryTable([])
                  //   let list:any =[]
                  //    qcMonthCheckData.templateData.itemCodeObj.map((item:any)=>{
                  //        list.push({
                  //           label: item.label,
                  //           code: item.qcItemCode,
                  //           evalRate: undefined,
                  //       })
                  //   })
                  // setSummaryTable(list)
                  //   QuarterlyZzwyData.handleSelectReport(qcMonthCheckData.templateData.itemCodeObj)
                    setSelectTableModal(false)
                }}
                handleCancel={() => setSelectTableModal(false)}/>
            {/*</Spin>*/}
        </Con>
    )
})
const Con = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;
  background: #fff;
`;
const TopHeader = styled.div`
  height: 95px;
  padding-left: 20px;

  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;

    .topHeaderSpan1 {
      cursor: pointer;
    }

    .topHeaderSpan1:hover {
      color: #00a680;
    }

    .topHeaderSpan2 {
      cursor: pointer;
    }

    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }

  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    /* font-weight: bold; */

    .topHeaderButton {
      position: absolute;
      top: 45px;
      right: 20px;

      button {
        margin-left: 10px;
      }
    }

    .title {
      font-weight: bold;
      min-height: 30px;
    }
  }

  .topHeaderStatus {
    display: flex;
    justify-content: space-between;
    width: 500px;
    height: 25px;
    line-height: 25px;
    color: #999;
    font-size: 14px;
  }
`;
const MidCon = styled.div`
  display: flex;
  justify-content: center;
  //height: calc(100vh - 145px);
  overflow: auto;
  box-sizing: border-box;
  padding: 20px 0px;
  flex: 1 1 0%;
  background-color: rgb(238, 238, 238);
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 1000px;
  padding: 20px 50px;
  background: #FFFFFF;
  flex-direction: column;

  .center-title {
    margin: 10px 0;
    text-align: center;
  }

  #baseTable {
    padding: 0 !important;
  }

  .title-sty {
    margin: 20px 0;
    font-size: 16px;
  }
`
const Summary = styled.div`
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
`