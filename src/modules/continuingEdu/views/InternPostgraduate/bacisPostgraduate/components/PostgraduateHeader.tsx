import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Select, Input, Button, DatePicker,message } from "antd";
import { PageTitle } from "src/components/common";
import moment, { duration } from 'moment'
import { bacisPostgraduateData } from "../bacisPostgraduate"; // 仓库数据
import {internPostgraduateApi} from "../../api/InternPostgraduate"

import AddPostgraduateModal from "../model/AddPostgraduateModal"; // 新建弹窗
import { appStore,authStore } from "src/stores";

const Option = Select.Option;

interface Props {}

export default observer(function ApplyHeader(props: Props) {
  const [query, setQuery] = useState({
    year: moment() as null | moment.Moment,
    deucValue:'',
    deptCodes:'',
    sexValue:'',
    keyWord:'',
  } as any) //初始化默认值
  const [createClear, setCreateClear] = useState(true)
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false); // 控制年份下拉打开
  const [deucOption, setdeucOption] = useState([]); // 科室信息
  const [isAdd,setIsAdd] = useState(false) //权限仅护理部主任和肖瑞芬护士长拥有

  const [deptDefault,setDeptDefault] = useState({key: '', label: '全部'})//科室选择，select用labelInValue，所以value为key:value格式

  



  useEffect(()=>{
    // 获取科室
    internPostgraduateApi.getnursingDeptRole().then((res)=>{
      let deptListall = [];
      deptListall = res.data.deptList
      deptListall.unshift({code:'',name:'全部'})
      setdeucOption(deptListall)
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  useEffect(()=>{
    if(!authStore.isXiaoRuiFen && !authStore.isHoundSing && !authStore.isSuperAdmin){
      setIsAdd(true)
    }
  },[isAdd])


  const handleEditOk = () => {
    // formApplyModal.onload();
    setEditVisible(false);
    setCreateClear(false);
    message.success('添加成功', 2, () => {
      setCreateClear(true)
      bacisPostgraduateData.onload()
    })
  };
  const handlePanelChange = (value: any) => {
    setyearPickerIsOpen(false)
    bacisPostgraduateData.year = value
    bacisPostgraduateData.onload()
  }

  const handleOpenChange = (status: boolean) => {
    setyearPickerIsOpen(status)
  }

  const handleYearClear = () => {
    bacisPostgraduateData.year = undefined
  }
  // 查询
  const handelInquire = ()=>{
    bacisPostgraduateData.onload()
  }

  return (
    <Wrapper>
      <RightIcon>
        <span>年份</span>
        <DatePicker
          style={{ width: 100 }}
          value={bacisPostgraduateData.year}
          open={yearPickerIsOpen}
          mode='year'
          className='year-picker'
          placeholder='全部'
          format='YYYY'
          onChange={handleYearClear}
          onOpenChange={handleOpenChange}
          onPanelChange={handlePanelChange}
        />
        <span className="span">进修科室：</span>
        <Select
          style={{ width: 180 }}
          labelInValue
          value={deptDefault}
          onChange={(val: any) => {
            bacisPostgraduateData.deptCodes = val.key
            bacisPostgraduateData.deucValue = val.label
            setDeptDefault(val)
            bacisPostgraduateData.onload()
          }}
        >
          {deucOption.map((item:any)=>{
            return <Option value={item.code} key={item.code}>{item.name}</Option>
          })}
        </Select>
        
        <Input
          style={{ width: 200, marginLeft: 15, marginRight: 5 }}
          placeholder="请输入要搜索的关键字"
          value={bacisPostgraduateData.keyWord}
          onChange={e => {
            bacisPostgraduateData.keyWord = e.target.value
            bacisPostgraduateData.onload()
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
          onClick={()=>{bacisPostgraduateData.export()}}
        >
          导出
        </Button>
        <Button
          className="span"
          onClick={() => setEditVisible(true)}
          disabled={isAdd}
        >
          添加进修生
        </Button>
      </RightIcon>
      <AddPostgraduateModal
        visible={editVisible}
        allowClear={createClear}
        onCancel={() => setEditVisible(false)}
        onOk={handleEditOk}
      />
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

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    margin-left: 15px;
  }
`;
