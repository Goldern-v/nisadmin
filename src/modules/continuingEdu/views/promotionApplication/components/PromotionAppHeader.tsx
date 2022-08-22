import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import PromotionTable from './PromotionTable'
import {PromotionAppUtils} from '../PromotionAppUtils'
import printing from "printing";
import { useRef } from "src/types/react";
import { appStore,authStore } from "src/stores/index";
import { Tabs , Steps, Button,message, Empty, Modal,Icon   } from 'antd';
const { TabPane } = Tabs;
const { Step } = Steps;


export default observer(function PromotionAppHeader() {
  const [printwih ,setprintwih]  = useState('2100px')
  const printRef: any = useRef(null);
  const tabList = [
    {
      title:'NO升N1',
      key:'1',
      code:'HSJS_0001',
     
    },
    {
      title:'N1升N2',
      key:'2',
      code:'HSJS_0002',
      disabled:Number(authStore.user?.nurseHierarchy.split('N')[1]) < 1
    },
    {
      title:'N2升N3',
      key:'3',
      code:'HSJS_0003',
      disabled:Number(authStore.user?.nurseHierarchy.split('N')[1]) < 2
    },
    {
      title:'N3升N4',
      key:'4',
      code:'HSJS_0004',
      disabled:Number(authStore.user?.nurseHierarchy.split('N')[1]) < 3
    },
  ]
  
  // 编辑
  const handleEdit =(value:any)=>{
    if(value == '创建'){
      Modal.confirm({
        title: '是否确定创建晋升表？',
        onOk() {
          PromotionAppUtils.onSave()
        },
        onCancel() {
          console.log('Cancel');
        },
      });
     
    } else if(value == '编辑'){
      PromotionAppUtils.editStatus = '取消编辑';
      PromotionAppUtils.edit = true;
    }else if(value == '取消编辑'){
      PromotionAppUtils.editStatus = '编辑';
      PromotionAppUtils.edit = false;
    }
  }
  // 提交
  const handleSubmit = (value:any) =>{
    PromotionAppUtils.onSubmit() 
  }
  // 保存
  const handleSave = (value:any) =>{
    if(['编辑','创建'].includes(PromotionAppUtils.editStatus)){
      return message.warning('当前没有在编辑情况下！')
    }else{
      PromotionAppUtils.onSave()
    }
  }

  // 删除
  const handleRemove = ()=>{
    Modal.confirm({
      title: '是否确认删除晋升表?',
      onOk() {
        PromotionAppUtils.onRemove(PromotionAppUtils.master.id).then((res) => {
          message.success("删除成功！")
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 撤销
  const handlerevocation = ()=>{
    
    PromotionAppUtils.onCancelForm().then((res)=>{
      if(res.code == 200 ){
        message.success('撤销成功！')
        PromotionAppUtils.createOnload()
      }
    })
  }
  // 切换tabs触发切换
  const onTabsChange = (key: any) => {
    if(key == 1){
      PromotionAppUtils.master.formCode = "HSJS_0001"
      PromotionAppUtils.master.formName = "N0->N1"
      setprintwih('2100px')
      PromotionAppUtils.createOnload()
    }else if(key == 2){
      PromotionAppUtils.master.formCode = "HSJS_0002"
      PromotionAppUtils.master.formName = "N1->N2"
      setprintwih('3200px')
      PromotionAppUtils.createOnload()
    }else if(key == 3){
      PromotionAppUtils.master.formCode = "HSJS_0003"
      PromotionAppUtils.master.formName = "N2->N3"
      setprintwih('3200px')
      PromotionAppUtils.createOnload()
    }else if(key == 4){
      PromotionAppUtils.master.formCode = "HSJS_0004"
      PromotionAppUtils.master.formName = "N3->N4"
      setprintwih('3200px')
      PromotionAppUtils.createOnload()
    }
    PromotionAppUtils.tabsKey = key;
  };
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
            line-height: 12px;
            margin:0;
            padding:0;
          }
          .wih-300{
            width: 300px;
            line-height: 12px;
            margin:0;
            padding:0;
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

  return (
    <Header>
      <Title>晋升申请</Title>
      <div className="tabs-title">
      <Tabs defaultActiveKey={PromotionAppUtils.tabsKey} onChange={onTabsChange}>
        {
          tabList.map((tItem:any)=>{
            return (
            <TabPane tab={tItem.title} key={tItem.key} disabled={tItem.disabled}>
              <StepHeader>
                <div className="heigth-left">
                <Steps status={PromotionAppUtils.master.noPass == true ? "error" : undefined}  current={Number(PromotionAppUtils.flowStatus) != NaN ? Number(PromotionAppUtils.flowStatus) : -1} labelPlacement="vertical" size="small"  className="Steps-list">
                  <Step title="填写一到四项信息"  />
                  <Step title="资质审核"  />
                  <Step title="填写六、七项信息" />
                  <Step title="晋升审核" />
                  <Step title="晋升通过" />
                </Steps>
                </div>
                <div className="heigth-right">
                  <Button type="primary" onClick={()=>{handleEdit(PromotionAppUtils.editStatus)}} disabled={!(PromotionAppUtils.master.nextNodeCode.indexOf('commit') != -1) && PromotionAppUtils.editStatus != '创建'}>{PromotionAppUtils.editStatus}</Button>
                  <Button type="primary" onClick={handleSubmit}  disabled={(PromotionAppUtils.editStatus == '创建' || Number(PromotionAppUtils.flowStatus) == 1 || Number(PromotionAppUtils.flowStatus) == 3 || Number(PromotionAppUtils.flowStatus) == 4) && PromotionAppUtils.master.noPass== false } >提交申请</Button>
                  <Button type="primary" onClick={handleSave} disabled={PromotionAppUtils.editStatus == '编辑' || PromotionAppUtils.editStatus == '创建'} >保存</Button>
                  <Button onClick={handleRemove} style={{color:'red'}} disabled={PromotionAppUtils.editStatus == '创建'}>删除</Button>
                  <Button onClick={handlerevocation}>撤销申请</Button>
                  <Button onClick={handlePrint}>打印</Button>
                </div>
              </StepHeader>
              {/* {
                PromotionAppUtils.editStatus == '编辑' || PromotionAppUtils.editStatus == '取消编辑' ? <PromotionTable printRef={printRef}></PromotionTable>: <Empty style={{height:680,paddingTop: '152px'}}/>
              } */}
              {
                 <PromotionTable printRef={printRef}></PromotionTable>
              }
              
            </TabPane>
            )
          })
        }
      </Tabs>
      </div>
    </Header>
  )
})

const Header = styled.div`
  .tabs-title{
    background-color: #fff;
  }
`

const Title = styled.div`
  height: 40px;
  font-size: 21px;
  font-weight: bold;
`

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  .heigth-left{
    width: 72%;
    .Steps-list{
      padding-left: 100px;
      width:900px;
    }
  }
  .heigth-right{
    width: 28%;
    display: flex;
    justify-content: space-around;
  }
`