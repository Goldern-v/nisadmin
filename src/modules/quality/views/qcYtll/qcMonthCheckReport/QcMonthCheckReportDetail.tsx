import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Button, message, Spin } from 'src/vendors/antd'
import { useRef } from 'src/types/react'
import printing from 'printing'
import moment from 'moment'
import styled from 'styled-components'
import { ScrollBox } from 'src/components/common'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { appStore } from 'src/stores'
import { qcMonthCheckData } from './qcMonthCheckData'
import QcMonthCheckThree from "./QcMonthCheckThree"
import QcMonthCheckTwo from "./QcMonthCheckTwo"
import QcMonthCheckOne from "./QcMonthCheckOne"
import {qcYtllApi}  from '../qcYtllApi'

export default observer(function QcMonthCheckReportDetail() {
  const pageRef: any = useRef<HTMLElement>()
  const [isPrint, setIsPrint] = useState(false)
  const {id,qcLevel} = appStore.queryObj
  const [chartsImg, setChartsImg] = useState<any[]>([])
  const [spinning, setSpinning] = useState(true);
  const exatOne = qcLevel != "1"

  /**保存 */
  const onSave = ()=>{
    if(spinning){
      message.warning('努力加载中，请稍后操作')
      return false
    }
    let qcReportItemDtoList = qcMonthCheckData.qcReportItemDtoList || []
    let qcReportItemDataList:any = []
    
    qcReportItemDtoList.map((it:any)=>{
      qcReportItemDataList.push({
        itemCode:it.itemCode,
        itemValue:JSON.stringify(qcMonthCheckData[it.itemCode]),
        reportItemId:it.id,
        reportMasterId:qcMonthCheckData.reportMasterData.id || null,
        id:it.qcReportItemDataListId?it.qcReportItemDataListId:null,
      })
    })

    let paramter = {
      ...qcMonthCheckData.reportMasterData,
      hospitalCode:'ytll',
      templateName:'月度汇总分析报告',
      qcReportItemDataList
    }
    
    qcYtllApi.saveQcReport(paramter).then(res=>{
      console.log("保存");
      
      message.success('保存成功')
      appStore.history.goBack()
    }).catch(err=>{

    })
  }

  const setImg = () => {
    let imgEl = document.querySelectorAll('.chart-img') as any
    if (imgEl.length) {
      for (let i = 0; i < imgEl.length; i++) {
        chartsImg[i] && (imgEl[i].src = chartsImg[i])
      }
    }
  }

  const initCanvasImg = ()=>{
    let timer: any = null
    timer = setTimeout(() => {
      let canvasEl = document.querySelectorAll('canvas') as any
      if (canvasEl.length) {
        let arr = []
        for (let i = 0; i < canvasEl.length; i++) {
          arr.push(canvasEl[i].toDataURL())
        }
        setChartsImg(arr)
      }
    }, 1000)
  }

  const onPrint = (isPrint: boolean) => {
    if(spinning){
      message.warning('努力加载中，请稍后操作')
      return false
    }
    setIsPrint(isPrint)
  }

const toPrint = ()=>{
  let printFun = printing
    setTimeout(() => {
      printFun(pageRef.current, {
        // 插入所有link和style标签到打印，默认是false
        injectGlobalCss: true,
        // 指定扫描样式，默认是true（全部）
        scanStyles: false,
        css: `
          .chart-img {
            max-height: 260mm;
            width: 100%;
            object-fit: cover
          }
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

  useEffect(() => {
    if(id){
      // 有id，就调查看接口
      getQcReportById()
    }else{
      qcMonthCheckData.createModalData = appStore.queryObj
      console.log(appStore.queryObj)
      /**创建分析报告 */
      createQcReport()
    }
    initCanvasImg()
    
  }, [])

  useEffect(() => {
    if(isPrint){
      setImg()
      toPrint()
    }
  }, [isPrint])

  /**创建分析报告 */
  const createQcReport = ()=>{
    let paramter = {
      "hospitalCode":"ytll",
      "templateName":"月度汇总分析报告",
      "reportName":qcMonthCheckData.createModalData.name,
      "reportLevel":qcLevel,
      "reportYear":moment(qcMonthCheckData.createModalData.month).year(),
      "reportMonth":moment(qcMonthCheckData.createModalData.month).month()+1,
      "startDate":moment(qcMonthCheckData.createModalData.month).startOf('month').format('YYYY-MM-DD'),
      "endDate":moment(qcMonthCheckData.createModalData.month).endOf('month').format('YYYY-MM-DD'),
      ...[exatOne ? {} : {"wardCode":qcMonthCheckData.createModalData.deptCode.key}],
      ...[exatOne ? {} : {"wardName":qcMonthCheckData.createModalData.deptCode.label}],
      "summaryFormCode":qcMonthCheckData.createModalData.summaryFormCode,
      "summaryFormName":qcMonthCheckData.createModalData.summaryFormName,
    }
    qcYtllApi.createQcReport(paramter).then(res=>{
      setSpinning(false)
      qcMonthCheckData.reportMasterData = res.data.reportMasterData || {}
      qcMonthCheckData.qcReportItemDtoList = res.data.qcReportItemList || []
      qcMonthCheckData.qcReportItemDtoList.map((it:any)=>{
        qcMonthCheckData[it.itemCode] = {...qcMonthCheckData.sourceMap[it.itemCode]}
      })
      // 新建的时候需要
      qcMonthCheckData.getQcReportDetail()
    }).catch(err=>{

    })
  }

  const lastPewView = (()=>{
    if(appStore?.queryObj?.qcLevel == 3) return { name: '三级质控报告', link: 'qcThree/checkReport?qcLevel='+qcLevel }
    else if(appStore?.queryObj?.qcLevel == 2) return { name: '二级质控报告', link: 'qcTwo/checkReport?qcLevel='+qcLevel }
    else return { name: '一级质控报告', link: 'qcOneDghl/checkReport?qcLevel='+qcLevel }
  })()
  /**查看报告 */
  const getQcReportById = ()=>{
    qcYtllApi.getQcReportById(id).then(res=>{
      setSpinning(false)
      qcMonthCheckData.reportMasterData = res.data.reportMasterData || {}
      qcMonthCheckData.qcReportItemDtoList = res.data.qcReportItemDataList.map((li:any)=>({
        ...li,
        qcReportItemDataListId:li.id
      })) || []

      qcMonthCheckData.qcReportItemDtoList.map((it:any,inde:any)=>{
        qcMonthCheckData[it.itemCode] = it.itemValue ? JSON.parse(it.itemValue) : {...qcMonthCheckData.sourceMap[it.itemCode]}
      })
    }).catch(err=>{

    })
  }

  const masterBody = ()=>{
    return appStore?.queryObj?.qcLevel == 3 ? <QcMonthCheckThree isPrint={isPrint}></QcMonthCheckThree> :
          appStore?.queryObj?.qcLevel == 2 ? <QcMonthCheckTwo isPrint={isPrint}></QcMonthCheckTwo> : 
          <QcMonthCheckOne isPrint={isPrint}></QcMonthCheckOne> 
  }

  const is_creator = ()=>{
		return JSON.parse(sessionStorage.getItem('user') || "")?.empName === qcMonthCheckData?.reportMasterData?.creatorName
	}
  
  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[lastPewView, { name: '记录详情', link: '' }]} />
        <div className='title'>
          {qcMonthCheckData.reportMasterData?.reportName || ''}
        </div>
        <div className='aside'>
          <span>
            {qcMonthCheckData.reportMasterData?.status=='-1' && <span style={{marginRight:'16px'}}>状态：待保存</span>}
            {qcMonthCheckData.reportMasterData?.status=='0' && <span style={{marginRight:'16px'}}>状态：已保存</span>}
            <span style={{marginRight:'16px'}}>创建人：{qcMonthCheckData.reportMasterData?.creatorName || ''}</span>
            <span>创建时间：{qcMonthCheckData.reportMasterData?.createTime || ''}</span>
          </span>
        </div>
        <div className='tool-con'>
          {is_creator() && <Button onClick={() => onSave()} >保存</Button>}
          <Button onClick={() => onPrint(true)} >导出</Button>
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Spin spinning={spinning} > 
          <Page ref={pageRef} className='print-txt-indent-40'>
            <div style={{ fontSize: '30px', fontWeight: 700, textAlign: 'center', lineHeight: '60px',marginTop:"20px" }}>
            {qcMonthCheckData.reportMasterData?.reportName || ''}
              </div>
            { masterBody() }
          </Page>
        </Spin>
      </ScrollCon>
    </Wrapper>
  )
})
const Wrapper = styled.div``
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
  // padding-bottom: 10px;
  padding:0 40px 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-height:700px;
  
  /* 打印的p标签 */
  .print-page_pipt{
		white-space:normal; 
		word-break:break-all;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		padding: 2px;
		min-height: 60px;
		/* word-wrap: break-word; */
	}
  .print-page__ipt {
    /* margin: 0px 60px 15px; */
    resize: none;
    /* width: calc(100% - 120px); */
		line-height: 1.5;
  }
  p{
    margin-bottom:0px;
  }
  .first-title{
    font-weight:bold;
    line-height:30px;
    // text-indent:40px;
  }
  .p-txt{
    line-height: 20px;
  }
  .txt-indent-40{
    text-indent: 40px;
  }
  .mg-bt-20{
    margin-bottom:20px;
  }
  .no-data{
    text-align:center;
    cursor: default;
    color: #999;
    i{
      font-size: 44px;
      transform: scaleX(1.2);
    }
    span{
      font-size:20px;
    color: #aaa;
    }
  }
  .ant-input-number{
    vertical-align: middle;
    .ant-input-number-input{
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .second-title{
    font-size: 15px;
    font-weight: bold;
  }
}
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
    font-family: STHeiti !important;
    font-size:16px;
`