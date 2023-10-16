import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Button, message, Spin,Table,InputNumber,Input,DatePicker,Icon } from 'src/vendors/antd'
import { useRef } from 'src/types/react'
import printing from 'printing'
import moment from 'moment'
import service from 'src/services/api'
import { to } from 'src/libs/fns'
import MultiFileUploader from "src/components/MultiFileUploader";
import styled from 'styled-components'
import { ScrollBox } from 'src/components/common'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { appStore } from 'src/stores'
import { qcMonthCheckData } from './qcMonthCheckData'
import {qcYtllApi}  from '../qcYtllApi'
import QcFishBoneMonth from './qcFishBoneMonth/fish-bone'
import ChartCylindricalityMonth from './ChartCylindricalityMonth'


export default observer(function QcMonthCheckReportDetail() {
  const pageRef: any = useRef<HTMLElement>()
  const [isPrint, setIsPrint] = useState(false)
  const {id,qcLevel} = appStore.queryObj
  const [canvasImgArry, setCanvasImgArry] = useState([]);
  const [spinning, setSpinning] = useState(true);

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
        id:it.qcReportItemDataList?it.qcReportItemDataList[0].id:null,
      })
    })

    let paramter = {
      ...qcMonthCheckData.reportMasterData,
      hospitalCode:'zzwy',
      templateName:'月度质控检查总结报告',
      qcReportItemDataList
    }
    qcYtllApi.saveQcReport(paramter).then(res=>{
      message.success('保存成功')
      appStore.history.goBack()
    }).catch(err=>{

    })
  }
  const onPrint = (isPrint: boolean) => {
    if(spinning){
      message.warning('努力加载中，请稍后操作')
      return false
    }
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

  }, [])

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
      "wardCode":qcMonthCheckData.createModalData.deptCode.key,
      "wardName":qcMonthCheckData.createModalData.deptCode.label,
      "summaryFormCode":qcMonthCheckData.createModalData.summaryFormCode,
      "summaryFormName":qcMonthCheckData.createModalData.summaryFormName,
    }
    qcYtllApi.createQcReport(paramter).then(res=>{
      setSpinning(false)
      qcMonthCheckData.reportMasterData = res.data.reportMasterData || {}
      qcMonthCheckData.qcReportItemDtoList = res.data.qcReportItemDtoList || []
      qcMonthCheckData.qcReportItemDtoList.map((it:any)=>{
        qcMonthCheckData[it.itemCode] = qcMonthCheckData.sourceMap[it.itemCode]
      })
      // 新建的时候需要
      qcMonthCheckData.getQcReportDetail()
    }).catch(err=>{

    })
  }

  /**查看报告 */
  const getQcReportById = ()=>{
    // console.log(id)
    qcYtllApi.getQcReportById(id).then(res=>{
      setSpinning(false)
      qcMonthCheckData.reportMasterData = res.data.reportMasterData || {}
      qcMonthCheckData.qcReportItemDtoList = res.data.qcReportItemDtoList || []
      qcMonthCheckData.qcReportItemDtoList.map((it:any)=>{
        qcMonthCheckData[it.itemCode] = it.qcReportItemDataList[0].itemValue?
          JSON.parse(it.qcReportItemDataList[0].itemValue):
          qcMonthCheckData.sourceMap[it.itemCode]
      })
      // 更新鱼骨图
    }).catch(err=>{

    })
    
  }

  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '三级质控报告', link: 'qcThree/checkReport?qcLevel='+qcLevel }, { name: '记录详情', link: '' }]} />
        <div className='title'>
        {qcMonthCheckData.reportMasterData?.reportName || ''}
        {/* {'2023年消化内科5月护理质量检查总结'} */}
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
          <Button onClick={() => onSave()} >保存</Button>
          <Button onClick={() => onPrint(true)} >导出</Button>
          {/* <Button onClick={() => setIsPrint(true)} >导出222</Button> */}
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Spin spinning={spinning} > 
          <Page ref={pageRef} className='print-page'>
            <div style={{ fontSize: '30px', fontWeight: 700, textAlign: 'center', lineHeight: '60px',marginTop:"20px" }}>
            {qcMonthCheckData.reportMasterData?.reportName || ''}
              {/* {'5月护理质量检查总结'} */}
              </div>
            <div className='first-content-box'>
              <div className='first-title'>{`一、质控人员`}</div>
                <p className="p-txt">{qcMonthCheckData.YTLL_YDHZFX_L3_001.qcPersonName}</p>
            </div>
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
  padding-bottom: 10px;
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
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);

  .first-title{
    font-size:20px;
    font-weight:bold;
    line-height:30px;
    font-family: STHeiti !important;
    text-indent:20px;
    margin-bottom:20px;
    font-size:16px;
  }

  /* 二级题目 */
  .second-box{
    /* border: 1px solid; */
    /* margin-top: 20px; */
    /* padding: 20px 14px; */
    p,h4{
      line-height: 1;
      margin-bottom: 0;
    }
    p{
      margin: 12px 0;
    }
  }
  .second-title{
    font-size: 14px;
    font-weight: bold;
  }
  /* 输入框样式 */
  .ant-input-number-handler-wrap {
    display: none;
  }

  }

  
  
`