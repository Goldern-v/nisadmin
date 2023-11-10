import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message, Spin } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore, authStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { badEventReportService as api } from './services/NQreportDetailsService'
import PageContent from "./components/PageContent"
import qs from 'qs'
import { reportShatring } from '../qcThreeNQreport/reportShatring'
export interface Props extends RouteComponentProps { }

export default observer(function NursingReportDetailView() {
  const [pageData, setPageData] = useState([])
  const [queryData, setQueryData]: any = useState({})
  const [currentPage, setCurrentPage]: any = useState({})
  const pageRef: any = useRef<HTMLElement>()
  const [isPrint, setIsPrint] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [isMounted, setIsMounted] = useState(true);
  const filterObj = {
    '一、护理质量指标数据': 'qualityDataList',
    '二、护理质量管理存在的主要问题': 'nursingQualityManagement',
    '三、各护理单元质控合格率与护患比对比': 'evalRateAndNurseToPatientRatioList',
    '四、护理不良事件': 'badEventData',
    '五、敏感指标数据': 'sensitiveIndicatorData',
    '六、满意度': 'satisfaction',
    '七、护士离职率': 'nurseTurnoverRateData',
    '八、护士执业环境测评': 'nursePracticeEnvironment',
  }
  useEffect(() => {
    setSpinning(true)
    let search = appStore.location.search
    let query = qs.parse(search.replace('?', ''))
    query.reportData = reportShatring.reportData;
    query.name = query.reportData?.reportName;
    query = {...query, ...query.reportData};
    if(query.reportData?.id){
      api.getQcReport(query.reportData?.id).then((res)=>{
        if(isMounted && res.code == 200){
          let data = res.data;
          let getReportData = {};
          query = {...query, ...data.reportMasterData};
          data.qcReportItemDataList.map((item: any) => {
            getReportData[filterObj[item.itemName]] = JSON.parse(item.itemValue);
          });
          let sortedData = data.qcReportItemDataList.sort((a:any, b:any) => a.indexNo - b.indexNo);
          setPageData(sortedData);
          setQueryData(query);
          setCurrentPage(getReportData);
          setSpinning(false);
        }
      })
    }else{
      setPageData(query.reportData?.qcReportItemList)
      setQueryData(query)
      let params = {
        startDate: query.reportData.startDate,
        endDate: query.reportData.endDate,
        reportLevel: query.reportData.reportLevel,
        dataSourceType: query.reportData.dataSourceType,
      }
      Promise.all([
        api.getReport(query.reportData),
        api.getQcProblemList(params),
      ]).then((res) => {
        if (isMounted && res[0].code == 200 && res[1].code == 200) {
          res[0].data.qualityDataList.map((item:any,index:number) => item.key = index+1)
          let list:any[] = []
          let newRoleList:any[] = res[1].data;
          if(newRoleList.length){
            newRoleList.map((item:any)=>{
              item.remarks.map((childItem: any,childIndex:number)=>{
                list.push({
                  key: childIndex,
                  qcName: item.qcName,
                  qcCode: item.qcCode,
                  comePoint: childItem,
                  measure: '',
                  trace: '',
                })
              })
            })
          }
          
          setCurrentPage({...res[0].data, nursingQualityManagement: list})
          setSpinning(false)
        }
        }).catch(()=>{
          setSpinning(false)
      })

    }
    
    
    return () => {
      setIsMounted(false);
      setCurrentPage({})
    }
  }, [])


  const onPrint = (isPrint: boolean) => {
    setIsPrint(true)
    let printFun = isPrint ? printing : printing.preview
    let title = document.title
    document.title = '不良事件分析报告'
    setTimeout(() => {
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

    setTimeout(() => {
      document.title = title
    }, 800)
  }
  const onDelete = () => {
    if(!queryData.id)return message.warning('此报表尚未保存！')
    setSpinning(true)
  console.log(queryData.id);
  
    globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
      api.deleteReport(queryData.id).then((res) => {
        message.success('删除成功')
        setTimeout(() => {
          appStore.history.push('/qcThree/护理质量分析报告')
        }, 500)
      })
    })
  }
  const onSave = () => {
    setSpinning(true)
    
    let newList = pageData.map((item:any)=>{
      return {
        ...item,
        itemValue:JSON.stringify(currentPage[filterObj[item.itemName]]) 
      }
    })
    
    let saveParams = {
      ...queryData,
      qcReportItemDataList:newList,
      hospitalCode: '925',
      templateName: '护理质量分析报告'
    }
    api.saveQcReport(saveParams).then((res) => {
      message.success('保存成功')
      setSpinning(false)
      setTimeout(() => {
        appStore.history.push(`/qcThree/护理质量分析报告?qcLevel=${queryData.reportLevel}`)
      }, 500)
    }).catch(e => setSpinning(false))
  }
  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '护理质量分析报告', link: '/qcThree/护理质量分析报告' }, { name: '报告详情', link: '' }]} />
        <div className='tool-con'>
          <Button onClick={() => onPrint(true)} loading={spinning}>打印</Button>
          <Button onClick={() => onPrint(false)} loading={spinning}>导出</Button>
          <Button onClick={() => onSave()} loading={spinning}>保存</Button>
          <Button onClick={() => onDelete()} loading={spinning}>删除</Button>
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Spin spinning={spinning}>
          <Page ref={pageRef} className='print-page'>
            <div style={{ fontSize: '30px', fontWeight: 700, textAlign: 'center', lineHeight: '60px' }}>{queryData.name}</div>
            <PageContent isPrint={isPrint} queryData= {queryData} pageData={pageData} currentPage={currentPage}></PageContent>
          </Page>
        </Spin>
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
  width: 1000px;
  margin: 20px auto 20px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-height:700px;
  .print-page__ipt {
    margin: 15px 20px;
    resize: none;
    width: calc(100% - 40px);
  }
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`
