import styled from "styled-components";
import React, { useState, useEffect } from "react";
// import SelectDepartment from '../common/SelectDepartment'
import DeptSelect from "src/components/DeptSelect";
import SelectData from "src/modules/statistic/common/SelectData";
import StatisticsApi from "src/modules/statistic/api/StatisticsApi";
import statisticViewModel from "src/modules/statistic/StatisticViewModel";
import { Button, message,Select } from "antd";
import emitter from "src/libs/ev";
// import { observer } from 'mobx-react-lite'

const typeList = [
  {code:"班次",name:"班次"},
  {code:"工时",name:"工时"},
]
export default function BedSituation() {
  const [statisticType, setStatisticType] = useState(statisticViewModel.statisticType)
  const onChange = (value: string) => {
    // nurseFilesListViewModel.loadNursingList()
  };
  function searchButtonClick() {
    emitter.emit("护士排班按班次");
  }
  // 导出文件
  const fileDownload = (res: any) => {
    let filename = res.headers["content-disposition"]
      ? decodeURIComponent(
          res.headers["content-disposition"].replace("attachment;filename=", "")
        )
      : "导出文件";
    // decodeURIComponent
    // "attachment;filename=????2019-3-18-2019-3-24??.xls"
    // "application/json"
    let blob = new Blob([res.data], {
      type: res.data.type, // 'application/vnd.ms-excel;charset=utf-8'
    });

    if (res.data.type.indexOf("excel") > -1) {
      let a = document.createElement("a");
      let href = window.URL.createObjectURL(blob); // 创建链接对象
      a.href = href;
      a.download = filename; // 自定义文件名
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(href);
      document.body.removeChild(a); // 移除a元素
    } else {
      let reader = new FileReader();
      reader.addEventListener("loadend", function(data: any) {
        // reader.result 包含转化为类型数组的blob
        message.error(`${reader.result}`);
      });
      reader.readAsText(blob);
    }
  };
  const exportButtonClick = () => {
    // showType: any, data: any, exportData: any = true
    StatisticsApi.postNurseByShiftView(
      statisticViewModel.classDiff,
      statisticViewModel.classItem,
      false
    ).then((res) => {
      fileDownload(res);
    });
  };

  return (
    <Con>
      <DeptSelect onChange={onChange} hasAllDept />
      {/* <SelectDepartment /> */}
      <Spacing />
      <SelectData />
      {statisticViewModel.useStatisticTypeList && 
        <div style={{marginLeft:"20px"}}>
          统计类型：
          <Select
					style={{ width: 160 }}
					value={statisticType}
					onChange={(val: string) => {
            setStatisticType(val)
            statisticViewModel.setStatisticType(val)
					}}
					>
					{typeList.map((item:any,index:number)=>{
						return <Select.Option value={item.code} key={index}>{item.name}</Select.Option>
					})}
					</Select>
        </div>
      }
      <Button
        type="primary"
        style={{ margin: "0 0 0 60px", width: "90px" }}
        onClick={searchButtonClick}
      >
        查询
      </Button>
      <Button
        style={{ margin: "0 10px", width: "90px" }}
        onClick={exportButtonClick}
      >
        导出Excel
      </Button>
    </Con>
  );
}

const Con = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  line-height: 45px;
  padding-left: 14px;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
`;
const Spacing = styled.div`
  width: 20px;
`;
