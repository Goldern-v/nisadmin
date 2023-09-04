import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import {appStore, authStore} from "src/stores";
import {Button, Input, Spin} from "antd";
import BaseTable from "src/components/BaseTable";
import {QuarterlyZzwyData} from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/Data";
import {ColumnProps} from "antd/es/table";
import {qcZzwyApi} from "src/modules/quality/views/qcZzwy/qcZzwyApi";
import QcFishBone from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/qcFishBone/fish-bone";

import {Icon, message} from "src/vendors/antd";
import ChartCylindricalityMonth from "src/modules/quality/views/qcZzwy/qcMonthCheckReport/ChartCylindricalityMonth";
import AnalysisSelectReport from './components/AnalysisSelectReport';
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
    const [updateFish, setUpdateFish] = useState('');
    const [fishValue, setFishValue] = useState({} as any)
    const [summaryTable, setSummaryTable] = useState([] as any)
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
            render: (text: string, record: any, index: number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index, 'b', e.target.value)
                }}/>
            }
        },
        {
            title: '追踪者',
            dataIndex: "c",
            align: 'center',
            render: (text: string, record: any, index: number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index, 'c', e.target.value)
                }}/>
            }
        },
        {
            title: '追踪时间',
            dataIndex: "d",
            align: 'center',
            render: (text: string, record: any, index: number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index, 'd', e.target.value)
                }}/>
            }
        },
        {
            title: '追踪后得分率',
            dataIndex: "e",
            align: 'center',
            render: (text: string, record: any, index: number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index, 'e', e.target.value)
                }}/>
            }
        },
        {
            title: '追踪结果',
            dataIndex: "g",
            align: 'center',
            render: (text: string, record: any, index: number) => {
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index, 'g', e.target.value)
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
                console.log("text===", text);
                return <Input defaultValue={text} onBlur={(e: any) => {
                    // record.evalRate =e.target.value
                    QuarterlyZzwyData.updateSummaryTable(index, 'evalRate', e.target.value)
                }}/>
            }
        }
    ]

    const handleFishItem = (obj: any, index: number) => {
        console.log(obj, index);
        QuarterlyZzwyData.updateFishValueObj(obj, index)
    }
    const handleUploading = () => {
        let importElId = 'sxslrb_import_file_el'
        let lastEl = document.getElementById('importElId')
        if (lastEl) document.body.removeChild(lastEl)
        let importEl = document.createElement('input')
        importEl.id = importElId
        importEl.style.display = 'none'
        importEl.accept = 'image/jpg, image/jpeg, image/png, image/bmp'
        importEl.type = 'file'
        importEl.onchange = (e: any) => {
            let file = e.target.files[0]
            qcZzwyApi.upload({file})
                .then((res: any) => {
                    if (res.code == '200') {
                        // console.log(res.data)
                        message.success('上传成功')
                        // debugger
                        if (!QuarterlyZzwyData.analysisChartData.imgList) {
                            QuarterlyZzwyData.analysisChartData.imgList = []
                        }
                        QuarterlyZzwyData.analysisChartData.imgList.push({
                            path: res.data?.path || '',
                            name: res.data?.name || ''
                        })
                    }
                }).catch(err => {
            })
            document.body.removeChild(importEl)
        }
        document.body.appendChild(importEl)
        importEl.click()

    }
    useEffect(() => {
        if (queryObj.master) {
            QuarterlyZzwyData.resetPropertiesToDefault()
            QuarterlyZzwyData.getQcReportById(queryObj.master)
        }
    }, [queryObj.master])
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
                        {
                            name: "记录详情",
                        },
                    ]}
                />
                <div className="topHeaderTitle">
                    <div className="title">{`${QuarterlyZzwyData.reportMasterData?.reportYear}年第${QuarterlyZzwyData.reportMasterData?.reportQuarter}${QuarterlyZzwyData.reportMasterData.summaryFormName}总结`}</div>
                    <div className="topHeaderButton">
                        <Button onClick={() => QuarterlyZzwyData.saveQcReport()}>保存</Button>
                        <Button>打印</Button>
                        <Button onClick={topHeaderBack}>返回</Button>
                    </div>
                </div>
                <div className="topHeaderStatus">
                    {QuarterlyZzwyData.reportMasterData?.status == '-1' &&
                        <span style={{marginRight: '16px'}}>状态：待保存</span>}
                    {QuarterlyZzwyData.reportMasterData?.status == '0' &&
                        <span style={{marginRight: '16px'}}>状态：已保存</span>}
                    <div> 创建人:<span>{QuarterlyZzwyData.reportMasterData?.creatorName}</span></div>
                    <div> 创建时间:<span>{QuarterlyZzwyData.reportMasterData?.creatorTime}</span></div>
                </div>
            </TopHeader>
            {/*内容*/}
            {/*<Spin>*/}
            <MidCon>
                <Content>
                    <>
                        <h2 className='center-title'>{`${QuarterlyZzwyData.reportMasterData?.reportYear}年第${QuarterlyZzwyData.reportMasterData?.reportQuarter}${QuarterlyZzwyData.reportMasterData?.summaryFormName}总结`}</h2>
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
                    <Summary>
                        <h5 className='title-sty'>原因分析</h5>
                        <Button type={'primary'} onClick={() => QuarterlyZzwyData.handleAddFishValue()}>添加鱼骨图</Button>
                    </Summary>
                    {/*鱼骨图*/}
                    <div style={{margin: '20px 0'}}>
                        {
                            QuarterlyZzwyData.fishValueObj.map((item: any, index: number) => {
                                return (
                                    <QcFishBone
                                        key={`${index}+fish`}
                                        value={item}
                                        updateFish={updateFish}
                                        index={index}
                                        onChange={(obj: any) => handleFishItem(obj, index)}/>
                                )
                            })
                        }
                    </div>
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
                    </>
                    <Summary style={{height: "auto"}}>
                        <h6 className='title-sty'>五、对上季度项目得分率的条目进行效果评价（支持图片上传</h6>
                        <Button type="primary" icon="upload" onClick={handleUploading}>添加图片</Button>
                    </Summary>


                    <div style={{width: '500px', marginLeft: '150px'}}>
                        {(QuarterlyZzwyData.analysisChartData?.imgList || []).map((ii: any, inx: number) => {
                            return (<div style={{width: '100%'}}>
                                <div style={{textAlign: 'right', overflow: 'hidden'}}>
                                    {/* 删除附件 */}
                                    <Icon onClick={() => {
                                        QuarterlyZzwyData.analysisChartData.imgList.splice(inx, 1)
                                    }} className='delete-hover' type="delete"
                                          style={{fontSize: '24px', color: '#f00'}}/>
                                </div>
                                <img alt="example" style={{
                                    width: '100%',
                                    height: '300px',
                                    border: '1px solid #000',
                                    borderRadius: '8px'
                                }} src={ii.path}/>
                                <p style={{fontSize: '16px', textAlign: 'center'}}>{ii.name}</p>
                            </div>)
                        })}
                        {/*柱形图*/}
                        {(QuarterlyZzwyData.analysisChartData.devData || []).map((it: any, idx: number) => {
                            return (
                                <>
                                    <div
                                        style={{textAlign: 'right', overflow: 'hidden'}}><Icon onClick={() => {
                                        QuarterlyZzwyData.analysisChartData.devData.splice(idx, 1)
                                    }} className='delete-hover' type="delete" style={{
                                        fontSize: '24px',
                                        color: '#f00'
                                    }}/></div>
                                    <ChartCylindricalityMonth data={it}
                                                              fields={QuarterlyZzwyData.analysisChartData.fields}/>
                                </>
                            )
                        })}
                    </div>
                </Content>
            </MidCon>
            <AnalysisSelectReport
                visible={selectTableModal}
                handleOk={(value: any) => {
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
  margin: 10px 0;
`