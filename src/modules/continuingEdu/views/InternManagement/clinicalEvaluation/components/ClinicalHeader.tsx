import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { Select, Input, Button, DatePicker,message,Modal } from "antd";
import { PageTitle } from "src/components/common";
import moment, { duration } from 'moment'
import { clinicalManagData } from "../ClinicalPostgraduate";
import { appStore,authStore } from "src/stores";

const Option = Select.Option;

interface Props {}
export default observer(function ClinicalHeader(props: Props) {
  const [query, setQuery] = useState({
    year: moment() as null | moment.Moment,
    deucValue:'',
    sexValue:'',
    keyWord:'',
  } as any) //初始化默认值
  const [createClear, setCreateClear] = useState(true)
  // const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [exportVisible, setExportVisible] = useState(false); // 控制导入弹窗状态
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false); // 控制年份下拉打开
  const [yearImportIsOpen, setyearImportIsOpen] = useState(false); // 控制导入年份下拉打开
  // const [isAdd,setIsAdd] = useState(false) //权限仅护理部主任和肖瑞芬护士长拥有
  const [mode, setMode] = useState(['month', 'month']) //控制展示的面板

  // useEffect(()=>{
  //   if(!authStore.isXiaoRuiFen && !authStore.isHoundSing && !authStore.isSuperAdmin){
  //     setIsAdd(true)
  //   }
  // },[isAdd])

  // 查询
  const handelInquire = ()=>{
    clinicalManagData.onload()
  }

  const handleChange = (val: any) => {   
    let deptCodes: any[] = []
    if(val && val.length > 0) {
      if (val[0] !== '全院' && val.includes('全院') && val.length > 1) {
        deptCodes = ["全院"]
      } else if (val[0] === '全院' && val.length > 1) {
        deptCodes = val.filter((item: any) => item != "全院")
      } else {
        deptCodes = val
      }
    }
    clinicalManagData.deptCodeMultiple = deptCodes;
    clinicalManagData.onload()
  }

  const handleOpenChange = (status: boolean) => {
    setyearPickerIsOpen(status)
  }

  const handlePanelChangeYear = (value: any) => {
    setyearPickerIsOpen(false)
    clinicalManagData.selectedYearDate = value
    clinicalManagData.onload()
  }

  const handlePanelChangeMonth = (value: any, mode: any) => {
    clinicalManagData.selectedDate = value;
    setMode([mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]])
  };

  return (
    <Wrapper>
      <RightIcon>
        <span style={{lineHeight:'32px'}}>{authStore.isDepartmentYaXin ? '年份：' : '月份：'}</span>
        {authStore.isDepartmentYaXin ? 
        <DatePicker
        format="YYYY"
        mode='year'
        open={yearPickerIsOpen}
        style={{ width: 220 }}
        value={clinicalManagData.selectedYearDate}
        onChange={date => {
          clinicalManagData.selectedYearDate = date;
          clinicalManagData.onload();
        }}
        onOpenChange={handleOpenChange}
        onPanelChange={handlePanelChangeYear}
      />
         : 
        <DatePicker.RangePicker
          format="YYYY-MM"
          mode={mode}
          allowClear={false}
          style={{ width: 220 }}
          value={clinicalManagData.selectedDate}
          onChange={date => { 
            clinicalManagData.selectedDate = date;
            clinicalManagData.onload();
          }}
          onPanelChange={handlePanelChangeMonth}
        />}
        {authStore.isDepartmentYaXin &&
          <div>
          <span className="span">实习科室：</span>
          <Select
            value={clinicalManagData.deptCodeMultiple}
            mode="multiple"
            style={{ width: 250 }}
            onChange={handleChange}
          >
            <Option value="全院">全院</Option>
            {clinicalManagData.headerTableList.map((item: any) => {
              return <Option value={item.code} key={item.code}>{item.name}</Option>
            })}
          </Select>
        </div>}
        <Input
          style={{ width: 200, marginLeft: 15, marginRight: 5 }}
          placeholder="请输入要搜索的关键字"
          value={clinicalManagData.keyWord}
          onChange={e => {
            clinicalManagData.keyWord = e.target.value
            clinicalManagData.onload()
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
          // disabled={isAdd}
          onClick={()=>{clinicalManagData.export()}}
        >
          导出
        </Button>
        <Button
          className="span"
          type="primary"
          onClick={()=>{clinicalManagData.handleSave()}}
        >
          保存
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

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  display: flex;
  float: right;
  .span {
    margin-left: 15px;
  }
`;
