import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import PromotionTable from './PromotionTable'
import { Tabs , Steps, Button  } from 'antd';
const { TabPane } = Tabs;
const { Step } = Steps;

export default observer(function PromotionAppHeader() {

  const tabList = [
    {
      title:'NO升N1',
      key:'1'
    },
    {
      title:'N1升N2',
      key:'2'
    },
    {
      title:'N2升N3',
      key:'3'
    },
    {
      title:'N3升N4',
      key:'4'
    },
  ]

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <Header>
      <Title>晋升申请</Title>
      <div className="tabs-title">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        {
          tabList.map((tItem:any)=>{
            return (
            <TabPane tab={tItem.title} key={tItem.key}>
              <StepHeader>
                <div className="heigth-left">
                <Steps current={1} status="error" labelPlacement="vertical" size="small"  className="Steps-list">
                  <Step title="填写一到四项信息"  />
                  <Step title="资质审核"  />
                  <Step title="填写六、七项信息" />
                  <Step title="晋升审核" />
                  <Step title="晋升通过" />
                </Steps>
                </div>
                <div className="heigth-right">
                  <Button type="primary">创建</Button>
                  <Button type="primary">提交申请</Button>
                  <Button type="primary">保存</Button>
                  <Button>撤销申请</Button>
                  <Button>打印</Button>
                </div>
              </StepHeader>
              <PromotionTable></PromotionTable>
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