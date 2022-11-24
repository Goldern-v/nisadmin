import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Select, Input, Button, DatePicker,Modal,message } from "antd";
import { PageTitle } from "src/components/common";
import {PromotionUtils} from "../PromotionUtils"
import {PromotionManagementApi} from "../api/PromotionManagement";
const Option = Select.Option;

interface Props {}

export default observer(function ApplyHeader(props: Props) {
  const [deucOption, setdeucOption] = useState([]); // 科室信息
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false); // 控制年份下拉打开

  useEffect(()=>{
    PromotionManagementApi.getnursingAll().then((res)=>{
      let deptListall = [];
      deptListall = res.data.deptList
      deptListall.unshift({code:'',name:'全部'})
      setdeucOption(deptListall)
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  const promotionLevelList = [
    {name:'全部',value:''},
    {name:'N0->N1',value:'N0->N1'},
    {name:'N1->N2',value:'N1->N2'},
    {name:'N2->N3',value:'N2->N3'},
    {name:'N3->N4',value:'N3->N4'},
  ]

  // 查询
  const handelInquire = ()=>{
    PromotionUtils.onload()
  }
  const handlePanelChange = (value: any) => {
    setyearPickerIsOpen(false)
    PromotionUtils.year = value
    PromotionUtils.onload()
  }
  const handleExport = () => {
    PromotionUtils.handleExport()
  }

  return (
    <Wrapper>
      <LeftIcon>
        <PageTitle>晋升管理</PageTitle>
      </LeftIcon>
      <RightIcon>
      <span style={{marginRight:'10px'}}>年份</span>
        <DatePicker
          style={{ width: 100 }}
          value={PromotionUtils.year}
          open={yearPickerIsOpen}
          mode='year'
          className='year-picker'
          placeholder='全部'
          format='YYYY'
          onChange={() => PromotionUtils.year = undefined}
          onOpenChange={(status: boolean) => setyearPickerIsOpen(status)}
          onPanelChange={handlePanelChange}
        />
        <span style={{marginRight:'10px'}}>科室</span>
        <Select
          style={{ width: 180 }}
          value={PromotionUtils.deptCode}
          onChange={(val: string) => {
            PromotionUtils.deptCode = val
            PromotionUtils.onload()
          }}
        >
          {deucOption.map((item:any)=>{
            return <Option value={item.code} key={item.code}>{item.name}</Option>
          })}
        </Select>
        <span style={{marginRight:'10px'}}>晋升等级：</span>
        <Select
          style={{ width: 180 }}
          value={PromotionUtils.promotionLevel}
          onChange={(val: string) => {
            PromotionUtils.promotionLevel = val
            PromotionUtils.onload()
          }}
        >
          {promotionLevelList.map((item:any)=>{
            return <Option value={item.value} key={item.name}>{item.name}</Option>
          })}
        </Select>
        <span style={{marginLeft:'10px'}}>关键字：</span>
        <Input
          style={{ width: 300, marginLeft: 15, marginRight: 5 }}
          placeholder="请输入要搜索的姓名/工号"
          value={PromotionUtils.keyWord}
          onChange={e => {
            PromotionUtils.keyWord = e.target.value;
            PromotionUtils.onload()
          }}
        />
        <Button
         type="primary"
         className="span"
          onClick={handelInquire}
        >
          查询
        </Button>
        <Button
         className="span"
          onClick={handleExport}
        >
          导出
        </Button>
      </RightIcon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 15px 0 15px;
`;
const LeftIcon = styled.div`
  padding: 0;
  float: left;
`;
const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    font-size:16px;
    margin-left: 15px;
  }
`;
const FileBox = styled.div`
  .file-box__item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top:30px;
    .type-img {
      width: 30px;
    }
    .name {
      flex: 1;
      padding: 0 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .delete {
      width: 20px;
      height: 20px;
      font-size: 18px;
      background: #ccc;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      line-height: 20px;
      margin: 0 4px;
      cursor: pointer;
    }
    .ant-btn + .ant-btn {
      margin-left: 40px;
    }
    .butName{
      width:100%;
      display: flex;
      justify-content: center;
    }
  }
  .tip {
    font-size: 13px;
    color: #999;
    margin-top: 6px;
  }
`;

