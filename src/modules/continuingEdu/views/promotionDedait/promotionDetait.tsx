import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message, Spin, Select, Empty } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import {PromotionDetaitUtils} from './promotionDedait'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore, authStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { badEventReportService } from './services/BadEventReportService'
import PromotionTable from './PromotionTable'
import qs from 'qs'
export interface Props extends RouteComponentProps { }

export default observer(function NursingReportDetailView() {
  const printRef: any = useRef(null);
  const [printwih ,setprintwih]  = useState('2100px')
  const [currentPage, setCurrentPage]: any = useState({})
  const [spinning, setSpinning] = useState(false)
  const showText = ['gzsrm'].includes(appStore.HOSPITAL_ID)

  useEffect(() => {
    let search = appStore.location.search
    let query = qs.parse(search.replace('?', ''))
    setCurrentPage(query)
    PromotionDetaitUtils.master.id = query.id
    PromotionDetaitUtils.createOnload()
  }, [])
  // 切换表
  const handletabsList = (value:string)=>{
    console.log(value);
    PromotionDetaitUtils.master.formName = value
    if(value == "N0->N1"){
      PromotionDetaitUtils.master.formCode = "HSJS_0001"
      PromotionDetaitUtils.master.formName = value
      setprintwih('2100px')
      PromotionDetaitUtils.getUesrPromotionList()
    }else if(value == "N1->N2"){
      PromotionDetaitUtils.master.formCode = "HSJS_0002"
      PromotionDetaitUtils.master.formName = value
      setprintwih('3200px')
      PromotionDetaitUtils.getUesrPromotionList()
    }else if(value == "N2->N3"){
      PromotionDetaitUtils.master.formCode = "HSJS_0003"
      PromotionDetaitUtils.master.formName = value
      setprintwih('3200px')
      PromotionDetaitUtils.getUesrPromotionList()
    }else if(value == "N3->N4"){
      PromotionDetaitUtils.master.formCode = "HSJS_0004"
      PromotionDetaitUtils.master.formName = value
      setprintwih('3200px')
      PromotionDetaitUtils.getUesrPromotionList()
    }
  }
   // 打印
   const handlePrint = async ()=>{
    await printing(printRef.current, {
      scanStyles: false,
      injectGlobalCss: true,
      css: `
           @page {
            size: A4;
            margin: 0mm 0mm 0mm 0mm;
           }
           * {
           -webkit-print-color-adjust: exact !important;   /* Chrome, Safari */
           color-adjust: exact !important;                 /*Firefox*/
           font-size:12px  !important;
           }
           #formPrintPage {
            height:${printwih};
            overflow: hidden;
            display: inline-bolck !important;
            margin: 0;
            border: 0;
          }
          .form-title{
             font-size:20px  !important;
           }
          .textarea-summarize{
           width: 700px;
           height: 350px;
           line-height:24px;
           white-space: pre-wrap;
          word-wrap: break-word; 
            word-break: break-all;
          }
          .wih-150{
            width: 150px;
          }
          .acc-time{
            width:38px !important;
            text-align:center;
            margin:0;
            padding:0;
            line-height: 12px;
          }
          .mar-btom{
            width:100px !important;
            text-align:center;
            margin:0;
            padding:0;
            line-height: 12px;
          }
          .textarea{
            width: 405px;
            white-space: pre-wrap;
            word-wrap: break-word; 
            word-break: break-all;
          }
        `
    });
  }
  // 保存
  const handleSave = ()=>{
    PromotionDetaitUtils.onSave()
  }
  // 编辑
  const handleEdit =(value:any)=>{
    if(value == '编辑'){
      PromotionDetaitUtils.editStatus = '取消编辑';
      PromotionDetaitUtils.edit = true;
    }else if(value == '取消编辑'){
      PromotionDetaitUtils.editStatus = '编辑';
      PromotionDetaitUtils.edit = false;
    }
  }

  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '晋升管理', link: '/continuingEdu/PromotionManagement' }, { name: '晋升详情', link: '' }]} />
        <div className='title'>{currentPage.empName}临床护理人员晋升申请表记录</div>
        <div className='aside'>
          <span>
          提交时间:{currentPage.lastCommitTime}
          </span>
        </div>
        <div className='tool-con'>
          <Button loading={spinning} onClick={handlePrint}>打印</Button>
          <Button  type="primary" loading={spinning} onClick={()=>{handleEdit(PromotionDetaitUtils.editStatus)}}>{PromotionDetaitUtils.editStatus}</Button>
          <Button  type="primary" loading={spinning} onClick={handleSave}>保存</Button>
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
          <Select defaultValue={PromotionDetaitUtils.master.formName} style={{ width: 200 }} onChange={handletabsList}>
            <Select.Option value="N0->N1">{'N0->N1'}</Select.Option>
            <Select.Option value="N1->N2">{'N1->N2'}</Select.Option>
            <Select.Option value="N2->N3">{'N2->N3'}</Select.Option>
            <Select.Option value="N3->N4">{'N3->N4'}</Select.Option>
          </Select>
        </div>
      </HeadCon>
      <ScrollCon>
        <Spin spinning={spinning} >
       { PromotionDetaitUtils.isEditList  ? <PromotionTable printRef={printRef}></PromotionTable>: <Empty style={{height:680,paddingTop: '152px'}}/>}
        </Spin>
      </ScrollCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
 
`

const HeadCon = styled.div`
  height: 100px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 16px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }
  .aside {
    font-size: 14px;
    color: #8c8c8c;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 100px;
    width: 400px;
    height: 63px;
    display: flex;
    align-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    button {
      margin-left: 15px;
      margin-bottom: 10px;
    }
  }
`
const Page = styled.div`
  width: 780px;
  margin: 20px auto 20px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-height:700px;
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`
