import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import qs from 'qs';
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import {Button, message} from 'src/vendors/antd'
import {qualityAnalysisReportViewModal as model} from './QualityAnalysisReportViewModal'
import {observer} from 'src/vendors/mobx-react-lite'
import {ScrollBox} from 'src/components/common'
import {Report} from './types'
import printing from 'printing'
import {useRef} from 'src/types/react'
import {appStore} from 'src/stores'
import {globalModal} from 'src/global/globalModal'
import {qualityAnalysisReportService} from './services/QualityAnalysisReportService'
import JmFyChart from "src/modules/quality/views/analysis/components/JmFyChart";
import {Empty} from "antd";
import BolaChart from "src/modules/quality/views/components/BolaChart";
import QualityAnalysisService from "src/modules/quality/views/analysis/api/QualityAnalysisService";

export interface Props extends RouteComponentProps {
}

const api = new QualityAnalysisService();

export default observer(function QualityAnalysisReportView() {
    const pageRef: any = useRef<HTMLElement>()
    const [mzData, setMzData] = useState([] as any)
    const [zyData, setZyData] = useState([] as any)
    const [specificDeductionList, setSpecificDeductionList] = useState<any>([]);
    // const searchParams = new URLSearchParams(location.search);

    // const url = window.location.href
    // const parameters = url.split('?')[1];

    useEffect(() => {
        model.init()
        initChart()
        // console.log('hhhh',parameters)
        // console.log(qs.parse(parameters))
    }, [])
    const initChart = async () => {
        try {
            // let year = query.year.format("YYYY")
            // let params: any = {}
            // if (query.indexInType) {
            //   params = {
            //     beginDate: `${year}-${query.indexInType}-01 00:00:00`,
            //     endDate: `${year}-${query.indexInType}-${getMonthStartAndEnd()} 23:59:59`,
            //   }
            // }else{
            //   params = {
            //     beginDate: `${year}-01-01 00:00:00`,
            //     endDate: `${year}-12-30 23:59:59`,
            //   }
            // }
            //
            // const res = await Promise.all([
            //   getMZData({...params, flag: 'mz'}),
            //   getZYData({...params, flag: 'zy'}),
            //   getSpecificDeductionList(params)
            // ])
            // setMzData(res[0].data || [])
            // setZyData(res[1].data || [])
            // setSpecificDeductionList(res[2].data || [])
        } catch (e) {
            // return message.error('系统出小差~')
        }
    }
    const toBack = () => {
        if (appStore.queryObj.qcOne == 'monthReport') {
            appStore.history.goBack()
        } else {
            appStore.history.push('/qcThree/analysis')
        }

    }
    let report: Report = model.getDataInAllData('report')
    const onPrint = (isPrint: boolean) => {
        let printFun = isPrint ? printing : printing.preview
        let title = document.title
        document.title = report.reportName
        printFun(pageRef.current, {
            injectGlobalCss: true,
            scanStyles: false,
            css: `
         .ant-btn {
           display: none;
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
         table, img {
           page-break-inside: avoid;
         }
         pre {
          page-break-after: avoid;
         }
         * {
           color: #000 !important;
         }
         .footer-title {
           min-height: 0;
           margin-bottom: 0;
         }
         table { page-break-inside:auto }
         tr{ page-break-inside:avoid; page-break-after:auto }
      `
        })
        setTimeout(() => {
            document.title = title
        }, 500)
    }
    const onDelete = () => {
        globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
            qualityAnalysisReportService.deleteReport().then((res) => {
                message.success('删除成功')
                setTimeout(() => {
                    toBack()
                    // appStore.history.push('/qcThree/analysis')
                }, 500)
            })
        })
    }

    const onPublish = () => {
        globalModal.confirm('发布确认', '你确定要发布该报告吗？').then((res) => {
            qualityAnalysisReportService.publishReport().then((res) => {
                message.success('发布成功')
                setTimeout(() => {
                    toBack()
                    // appStore.history.push('/qcThree/analysis')


                }, 500)
            })
        })
    }
    const onCancelPublish = () => {
        globalModal.confirm('撤销发布确认', '你确定要撤销发布该报告吗？').then((res) => {
            qualityAnalysisReportService.cancelPublishReport().then((res) => {
                message.success('撤销成功')
                setTimeout(() => {
                    toBack()
                    // appStore.history.push('/qcThree/analysis')
                }, 500)
            })
        })
    }
    // const getMZData = async (params: any) => {
    //   return await api.countDeptQc(params)
    // }
    //
    // const getZYData = async (params: any) => {
    //   return await api.countDeptQc(params)
    // }
    // const getSpecificDeductionList = async (params: any) => {
    //   return await api.getSpecificDeductionList({...params, typeList: [1, 2, 3, 4, 5, 6]});
    // };
    return (
        <Wrapper>
            <HeadCon>
                <BaseBreadcrumb data={[{
                    name: '分析报告',
                    link: appStore.queryObj.qcOne == 'monthReport' ? '/qcOneHj/qcFirstMQSummary?qcLevel=1' : '/qcThree/analysis'
                }, {name: '报告详情', link: ''}]}/>
                <div className='title'>{report.reportName}</div>
                <div className='aside'>
          <span>
            由{report.creatorName}创建{report.updateTime && <span>，最后修改于{report.updateTime}</span>}
          </span>
                </div>
                <div className='tool-con'>
                    <Button onClick={onDelete}>删除</Button>
                    {/* <Button onClick={() => onPrint(false)}>预览</Button> */}
                    {report.status == '1' ? (
                        <Button onClick={onCancelPublish}>撤销</Button>
                    ) : (
                        <Button onClick={onPublish}>发布</Button>
                    )}

                    <Button onClick={() => onPrint(true)}>打印</Button>
                    <Button onClick={() => appStore.history.goBack()}>返回</Button>
                </div>
            </HeadCon>
            <ScrollCon>
                <Page ref={pageRef} className='print-page'>
                    {model.sectionList.map((item, index) => {
                        if (item.sectionId) {
                            let Components = model.getSection(item.sectionId)
                            if (Components && Components.section) {
                                return (
                                    <Components.section
                                        key={index}
                                        sectionId={item.sectionId}
                                        modalTitle={item.modalTitle}
                                        sectionTitle={item.sectionTitle}
                                    />
                                )
                            }
                        }
                    })}
                    {/*  江门妇幼 ---增加图表 */}
                    {/*门诊柱状图*/}
                    {
                        appStore.HOSPITAL_ID === 'jmfy' && <div className='chartDiv'>
                            {Array.isArray(model.mzData) && model.mzData.length >= 1 && <div className='chartBox'>
                                <h3>门诊质控分数</h3>
                                {model.mzData.length >= 1 ? <JmFyChart data={model.mzData}/> : <Empty/>}
                            </div>}
                            {Array.isArray(model.zyData) && model.zyData.length >= 1 && <div className='chartBox'>
                                <h3>住院部质控分数</h3>
                                {model.zyData.length >= 1 ? <JmFyChart data={model.zyData}/> : <Empty/>}
                            </div>}
                            {Array.isArray(model.specificDeductionList?.dataList) && model.specificDeductionList?.dataList.length >= 1 &&
                                <div className='chartBox'>
                                    <h3>柏拉图</h3>
                                    <BolaChart list={model.specificDeductionList?.dataList || []} xKey="deductionItem"
                                               barKey="deductionTimes"
                                               lineKey="cumulativePercentage"/>
                                </div>}
                        </div>

                    }
                </Page>
                {model.baseModal && <model.baseModal.Component/>}
            </ScrollCon>
        </Wrapper>
    )
})
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }
`

const HeadCon = styled.div`
  height: 100px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;

  .title {
    font-size: 20px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }

  .aside {
    font-size: 12px;
    margin: 0 0 0 20px;
  }

  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 20px;

    button {
      margin-left: 15px;
    }
  }
`
const Page = styled.div`
  width: 720px;
  margin: 20px auto 20px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  img {
    max-width: 200px;
    max-height: 200px;
  }

  .chartDiv {
    display: flex;
    width: 100%;
    margin: 0 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;

    .chartBox {
      min-width: 600px;
      //height: 400px;
      border: 1px dashed #e9e9e9;
      margin-bottom: 40px;
      margin-top: 10px;

      > h3 {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`
