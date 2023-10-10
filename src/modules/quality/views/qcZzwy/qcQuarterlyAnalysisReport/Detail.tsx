import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import {appStore} from "src/stores";
import {Button, Input, Spin} from "antd";
import BaseTable from "src/components/BaseTable";
import {QuarterlyZzwyData} from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/Data";
import {ColumnProps} from "antd/es/table";
import {qcZzwyApi} from "src/modules/quality/views/qcZzwy/qcZzwyApi";
import QcFishBone from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/qcFishBone/fish-bone";
import {Icon, message} from "src/vendors/antd";
import ChartCylindricalityMonth from "src/modules/quality/views/qcZzwy/qcMonthCheckReport/ChartCylindricalityMonth";
import AnalysisSelectReport from './components/AnalysisSelectReport';
import printing from "printing";
import {useRef} from "src/types/react";

const {TextArea} = Input

interface Props {
    detailData?: any;
    onload?: any;
}

export default observer(function QuarterlyAnalysisReportZzwyDetail(props: Props) {
    const {queryObj} = appStore
    const pageRef: any = useRef<HTMLElement>()
    // const {creatorName, creatorTime, summaryFormName, reportYear, reportQuarter} = QuarterlyZzwyData.reportMasterData
    const [selectTableModal, setSelectTableModal] = useState(false);
    const [canvasImgArray, setCanvasImgArray] = useState([]);
    const [isPrint, setIsPrint] = useState(false)
    const [updateFish,setUpdateFish] =useState(undefined as any)
    const topHeaderBack = () => {
        appStore.history.goBack()
    };
    const onPrint = (isPrint: boolean) => {
        setIsPrint(isPrint)
        let printFun = isPrint ? printing : printing.preview
        setTimeout(() => {
            printFun(pageRef.current, {
                // 插入所有link和style标签到打印，默认是false
                injectGlobalCss: true,
                // 指定扫描样式，默认是true（全部）
                scanStyles: false,
                css: `
           .ant-btn {
             display: none;
           }
           .print-page__ptext{
            padding:0 6px;
          }
           .print-page {
             box-shadow: none;
             -webkit-print-color-adjust: exact;
             margin: 0 auto;
           }
           .page-title {
             min-height: 20px;
             padding: 0px 30px 20px;
           }
           .page-title .title {
             text-align: center;
             margin-right: 0;
           }
           .fb-container{
            position: relative;
           }
           table, img {
             page-break-inside: avoid;
           }
           pre {
            page-break-after: avoid;
           }
           * {
             color: #000 !important;
           }
           .ant-spin-nested-loading{
             height:auto;
           }
           .footer-title {
             min-height: 0;
             margin-bottom: 0;
           }
           table { page-break-inside:auto }
           tr{ page-break-inside:avoid; page-break-after:auto }
          .chart-con>div{
            display: none;
          }
          .chart-con .chart-con-img{
            max-width: 100%;
            display: inline!important;
          }
        `
            }).then(() => {
                setIsPrint(false)
            })
        }, 500)
    }

    const columnsOne: ColumnProps<any>[] = [
        {
            title: '一级指标',
            dataIndex: "firstLevelItemName",
            align: 'center'
        },
        {
            title: '合格率(%)',
            dataIndex: "firstLevelEvalRate",
            width: 100,
            align: 'center',
            render: (text: string) => {
                return `${text}%`
            }
        }
    ]
    const columnsTwo: ColumnProps<any>[] = [
        {
            title: '质控内容',
            dataIndex: "simpleName",
            align: 'center'
        },
        {
            title: '追踪前得分率(%)',
            dataIndex: "b",
            align: 'center',
            render: (text: string, record: any, index: number) => {
                if(isPrint){
                    return  <span>{text}%</span>
                }
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
                if(isPrint){
                    return  <span>{text}</span>
                }
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
                if(isPrint){
                    return  <span>{text}</span>
                }
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
                if(isPrint){
                    return  <span>{text}%</span>
                }
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
                if(isPrint){
                    return  <span>{text}</span>
                }
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateReferredTable(index, 'g', e.target.value)
                }}/>
            }
        }
    ]
    const columnsThree: ColumnProps<any>[] = [
        {
            title: '质量内容',
            dataIndex: "qcItemName",
            align: 'center'
        },
        {
            title: '合格率(%)',
            dataIndex: "evalRate",
            width: 80,
            align: 'center',
            render: (text: string, record: any, index: number) => {
                if(isPrint){
                    return  <span>{text}%</span>
                }
                return <Input defaultValue={text} onBlur={(e: any) => {
                    QuarterlyZzwyData.updateSummaryTable(index, 'evalRate', e.target.value)
                }}/>
            }
        }
    ]

    const handleFishItem = (obj: any, index: number) => {
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
                        message.success('上传成功')
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
            setUpdateFish(Math.random())
            QuarterlyZzwyData.getQcReportById(queryObj.master)
        }
    }, [queryObj.master])
    useEffect(() => {
        // debugger
        setTimeout(() => {
            let canvasImgList: any = []
            let canvasEl2 = document.getElementsByTagName('canvas')
            for (let i = 0; i < canvasEl2.length; i++) {
                canvasImgList.push(canvasEl2[i].toDataURL())
            }
            setCanvasImgArray(canvasImgList)
        }, 1000);
    }, [QuarterlyZzwyData.analysisChartData.devData])
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
                            name: "季度质量分析报告",
                            link: `${{
                                '3': '/qcThree',
                                '2': '/qcTwo',
                                '1': '/qcOneHj'
                            }[queryObj?.qcLevel]}/季度质量分析报告?qcLevel=${queryObj?.qcLevel}`
                        },
                        {
                            name: "记录详情",
                        },
                    ]}
                />
                <div className="topHeaderTitle">
                    <div className='title'>{QuarterlyZzwyData.reportMasterData?.reportName }</div>
                    {/*<div*/}
                    {/*    className="title">{`${QuarterlyZzwyData.reportMasterData?.reportYear}年第${QuarterlyZzwyData.reportMasterData?.reportQuarter}${QuarterlyZzwyData.reportMasterData.summaryFormName}总结`}</div>*/}
                    <div className="topHeaderButton">
                        <Button onClick={() => QuarterlyZzwyData.saveQcReport()}>保存</Button>
                        <Button onClick={() => onPrint(true)}>导出</Button>
                        <Button onClick={topHeaderBack}>返回</Button>
                    </div>
                </div>
                <div className="topHeaderStatus">
                    {QuarterlyZzwyData.reportMasterData?.status == '-1' &&
                        <span style={{marginRight: '16px'}}>状态：待保存</span>}
                    {QuarterlyZzwyData.reportMasterData?.status == '0' &&
                        <span style={{marginRight: '16px'}}>状态：已保存</span>}
                    <div> 创建人:<span>{QuarterlyZzwyData.reportMasterData?.creatorName}</span></div>
                    <div> 创建时间:<span>{QuarterlyZzwyData.reportMasterData?.createTime}</span></div>
                </div>
            </TopHeader>
            {/*内容*/}
            <Spin spinning={QuarterlyZzwyData.contentLoading}>
                <MidCon ref={pageRef}>
                    <Content>
                        <>
                            <h2 className='center-title'>{QuarterlyZzwyData.reportMasterData?.reportName }</h2>
                            <TextArea placeholder='请输入总结内容'
                                      value={QuarterlyZzwyData.summarize}
                                      onChange={(e: any) => QuarterlyZzwyData.summarize = e.target.value}
                                      rows={10}/>
                        </>
                        <>
                            <h5 className='title-sty'> 一、检查总体情况(填写)</h5>
                            <TextArea placeholder='请输入检查总体情况'
                                      value={QuarterlyZzwyData.checkOverall}
                                      onChange={(e: any) => QuarterlyZzwyData.checkOverall = e.target.value}
                                      rows={10}/>
                           </>
                        <>
                            <h5 className='title-sty'>
                             <Input value={QuarterlyZzwyData.tableParams.one} placeholder='请输入'
                                 onChange={(e:any)=>QuarterlyZzwyData.tableParams.one = e.target.value}
                            />
                            </h5>
                            <BaseTable
                                dataSource={QuarterlyZzwyData.inspectTable}
                                columns={columnsOne}
                            />
                        </>
                        <>
                            <Summary>
                                <h5 className='title-sty' style={{width:'70%'}}>
                                    {/*<p>表2</p>*/}
                                    <Input value={QuarterlyZzwyData.tableParams.two} placeholder='请输入'
                                           onChange={(e:any)=>QuarterlyZzwyData.tableParams.two = e.target.value}
                                    />
                                </h5>
                                {!isPrint &&
                                    <Button type='primary' onClick={() => setSelectTableModal(true)}>添加</Button>}
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
                            {!isPrint && <Button type={'primary'}
                                                 onClick={() => QuarterlyZzwyData.handleAddFishValue()}>添加鱼骨图</Button>}
                        </Summary>
                        {/*鱼骨图*/}
                        <div style={{margin: '20px 0'}}>
                            {
                                QuarterlyZzwyData.fishValueObj.map((item: any, index: number) => {
                                    return (
                                      <>
                                          <QcFishBone
                                              key={`${index}+fish`}
                                              value={item}
                                              index={index}
                                              isPrint={isPrint}
                                              updateFish={updateFish+index}
                                              onChange={(obj: any) => handleFishItem(obj, index)}/>
                                          <div style={{height:'2px',background:"#ededed",borderBottom:"1px dashed"}}></div>
                                      </>
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
                            {!isPrint &&
                                <Button type="primary" icon="upload" onClick={handleUploading}>添加图片</Button>}
                        </Summary>

                        <div style={{display: 'flex', justifyContent: "center", alignItems: 'center'}}>
                            <div style={{width: '600px'}}>
                                {(QuarterlyZzwyData.analysisChartData?.imgList || []).map((ii: any, inx: number) => {
                                    return (<div style={{width: '100%'}}>
                                        <div style={{textAlign: 'right', overflow: 'hidden'}}>
                                            {/* 删除附件 */}
                                            {!isPrint && <Icon onClick={() => {
                                                QuarterlyZzwyData.analysisChartData.imgList.splice(inx, 1)
                                            }} className='delete-hover' type="delete"
                                                               style={{fontSize: '24px', color: '#f00'}}/>}
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
                                            {!isPrint && <div
                                                style={{textAlign: 'right', overflow: 'hidden'}}><Icon onClick={() => {
                                                QuarterlyZzwyData.analysisChartData.devData.splice(idx, 1)
                                            }} className='delete-hover' type="delete" style={{
                                                fontSize: '24px',
                                                color: '#f00'
                                            }}/></div>}
                                            {isPrint ? <img
                                                width={600}
                                                height='auto'
                                                src={canvasImgArray[idx]} alt=""/> : <ChartCylindricalityMonth data={it}
                                                                                                               fields={QuarterlyZzwyData.analysisChartData.fields}/>}
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <ContentEnd>
                            <h2>漳州市第五医院</h2>
                            <div>{QuarterlyZzwyData.reportMasterData?.creatorTime}</div>
                        </ContentEnd>
                    </Content>
                </MidCon>

            </Spin>
            <AnalysisSelectReport
                visible={selectTableModal}
                handleOk={(value: any) => {
                    setSelectTableModal(false)
                }}
                handleCancel={() => setSelectTableModal(false)}/>
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
const ContentEnd = styled.div`
  display: flex;
  justify-content: flex-end;

`