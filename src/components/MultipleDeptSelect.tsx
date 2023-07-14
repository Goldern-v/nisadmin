/** 科室选择器全局使用  */
import styled from "styled-components";
import React, { useState, useEffect } from "react";
// import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react-lite";
import { statisticsViewModal } from "src/modules/nurseFiles/view/statistics/StatisticsViewModal";
import { Select } from "src/vendors/antd";

export interface Props {
  onChange?: (value: string[]) => void;
  deptKey?: "全部科室" | "完整科室";
  deptList?: { name: string; code: string }[]
}

export interface DeptType {
  code: string;
  name: string;
}

export default observer(function MultipleDeptSelect(props: Props) {
  const [deptList, setDeptList]: any = useState([]);

  const onChange = (value: string[]) => {
    if (props.deptList && !value.length) return
    if (value.length > 1) {
      if (value[value.length - 1] == "全院") {
        value = ["全院"];
      } else if (value.includes("全院")) {
        value = value.filter((item: any) => item != "全院");
      } else if (value[value.length - 1] == "全部") {
        value = ["全部"];
      } else if (value.includes("全部")) {
        value = value.filter((item: any) => item != "全部");
      }
    }
    // let deptCodes
    // if (value.length == 1 && value[0] == '全部') {
    //   deptCodes = statisticsViewModal
    //     .getDict('全部科室')
    //     .map((item: any) => item.code)
    //     .filter((item: any) => item != '全部')
    // } else {
    //   deptCodes = value
    // }
    statisticsViewModal.selectedDeptCode = value;
    props.onChange && props.onChange(value);
  };
  useEffect(() => {
    statisticsViewModal.init().then(res => {
      if (props.deptList) {
        setDeptList(props.deptList);
      } else {
        setDeptList(statisticsViewModal.getDict(props.deptKey || "全部科室"));
      }
      if (props.deptKey == "完整科室") {
        statisticsViewModal.selectedDeptCode = ["全院"];
      } else if (props.deptList) {
        statisticsViewModal.selectedDeptCode = [props.deptList[0].code];
      }
    });
  }, []);

  return (
    <Wrapper>
      <Select
        mode="multiple"
        value={statisticsViewModal.selectedDeptCode as any}
        showSearch
        allowClear
        style={{ width: 200 }}
        onChange={onChange}
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {/* 处理权限问题 */}
        {props.deptKey == "完整科室" && (
          <Select.Option value="全院" title="全院">全院</Select.Option>
        )}
        {deptList.map((item: DeptType) => (
          <Select.Option key={item.name} value={item.code} title={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  .ant-select {
    height: 26px;
  }
  .ant-select-selection--multiple {
    padding-bottom: 1px;
    height: 26px;
    overflow: hidden;
  }
`;
