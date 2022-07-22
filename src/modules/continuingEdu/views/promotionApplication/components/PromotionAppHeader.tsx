import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import PromotionTable from './PromotionTable'
import {PromotionAppUtils} from '../PromotionAppUtils'
import printing from "printing";
import { useRef } from "src/types/react";
import { appStore,authStore } from "src/stores/index";
import { Tabs , Steps, Button,message as Message, Empty   } from 'antd';


const { TabPane } = Tabs;
const { Step } = Steps;


export default observer(function PromotionAppHeader() {
  const printRef: any = useRef(null);
  useEffect(()=>{
    if(PromotionAppUtils.editStatus == '编辑'){
      PromotionAppUtils.status = '0'
    }
  },[])
  const tabList = [
    {
      title:'NO升N1',
      key:'1',
     
    },
    {
      title:'N1升N2',
      key:'2',
      disabled:Number(authStore.user?.currentLevel.split('N')[1]) >= 1 ||  authStore.user?.currentLevel == ''
    },
    {
      title:'N2升N3',
      key:'3',
      disabled:Number(authStore.user?.currentLevel.split('N')[1]) >= 2 ||  authStore.user?.currentLevel == ''
    },
    {
      title:'N3升N4',
      key:'4',
      disabled:Number(authStore.user?.currentLevel.split('N')[1]) >= 3 ||  authStore.user?.currentLevel == ''
    },
  ]
  
  // 
  const handleEdit =(value:any)=>{
    if(value == '创建'){
      PromotionAppUtils.onSave()
      PromotionAppUtils.editStatus = '编辑'
      PromotionAppUtils.status = '0'
    }
    
  }
  // 切换tabs触发切换
  const onTabsChange = (key: any) => {
    console.log(authStore.user?.currentLevel);
    if(authStore.user?.currentLevel == '' || authStore.user?.currentLevel == 'N0'){
      console.log(key);
      
      if(key > 1){
        Message.warning('当前晋升职位和点击晋升表不符合！');
      }else{
        PromotionAppUtils.tabsKey = key;
      }
    }
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
            height:2100px;
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
          .mar-btom{
           margin-bottom: -1px;
          }
          .acc-time{
            width:60px !important;
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
                <Steps current={Number(PromotionAppUtils.status)} labelPlacement="vertical" size="small"  className="Steps-list">
                  <Step title="填写一到四项信息"  />
                  <Step title="资质审核"  />
                  <Step title="填写六、七项信息" />
                  <Step title="晋升审核" />
                  <Step title="晋升通过" />
                </Steps>
                </div>
                <div className="heigth-right">
                  <Button type="primary" onClick={()=>{handleEdit(PromotionAppUtils.editStatus)}}>{PromotionAppUtils.editStatus}</Button>
                  <Button type="primary">提交申请</Button>
                  <Button type="primary">保存</Button>
                  <Button>撤销申请</Button>
                  <Button onClick={handlePrint}>打印</Button>
                </div>
              </StepHeader>
              {
                PromotionAppUtils.editStatus == '编辑' ? <PromotionTable printRef={printRef}></PromotionTable>: <Empty style={{height:680,paddingTop: '152px'}}/>
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
    width: 60%;
    .Steps-list{
      padding-left: 100px;
    }
  }
  .heigth-right{
    width: 40%;
    display: flex;
    justify-content: space-around;
  }
`