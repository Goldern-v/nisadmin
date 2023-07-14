/** 科室选择器全局使用  */
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Select } from "antd";
import { observer } from "mobx-react-lite";
import { authStore, appStore } from "src/stores";

export interface Props {
  onChange: (value: string) => void;
  extraDept?: any[];
  style?: any;
  deptCode?: string;
  hasAllDept?: boolean;
  showSearch?: boolean;
}

export interface DeptType {
  code: string;
  name: string;
}

export default observer(function DeptSelect(props: Props) {
  const [hasAllDept, setHasAllDept] = useState(false);
  const [defaultValue, setDefaultValue] = useState(
    props.deptCode || authStore.selectedDeptCode
  );
  let deptList = authStore.deptList;
  const onChange = (value: string) => {
    authStore.selectedDeptCode = value;
    // if(authStore.deptList)
    if (!authStore.deptList) {
      authStore.deptList = [];
    }
    if (!authStore.deptList.length) {
      authStore.deptList = [{ code: "", name: "" }];
    }

    authStore.selectDeptCode(value);
    setDefaultValue(value);
    props.onChange(value);
  };

  useEffect(() => {
    if (props.deptCode) {
      setDefaultValue(props.deptCode);
    }
  }, [props.deptCode]);

  useEffect(() => {
    let hasAllDeptRouteList = [
      "/home",
      "/nurseFile/:path",
      // "/statistic/:name",统计查询科室筛选去掉全院
      "/auditsManagement",
      "/quality/:name",
    ];
    if(['925'].includes(appStore.HOSPITAL_ID)){
        hasAllDeptRouteList.push("/statistic/:name")
    }
    if (
      authStore.post === "护理部" ||
      authStore.isAdmin ||
      authStore.isDepartment
    ) {
      if (
        hasAllDeptRouteList.indexOf(appStore.match.path) > -1 ||
        props.hasAllDept
      ) {
        // alert(123)
        setHasAllDept(true);
        // if (!authStore.selectedDeptCode) {
        authStore.selectedDeptCode = props.deptCode || "全院";
        // }
      } else {
        setHasAllDept(false);
        if (authStore.selectedDeptCode === "全院") {
          authStore.selectedDeptCode = authStore.defaultDeptCode;
        }
      }
    }
    if (!props.extraDept && authStore.selectedDeptCode == "*")
      authStore.selectedDeptCode = authStore.defaultDeptCode;
    onChange(authStore.selectedDeptCode);
    return () => {
      setTimeout(() => {
        // authStore.selectedDeptCode = authStore.defaultDeptCode
      }, 0);
    };
  }, []);

  return (
    <Wrapper>
      <Select
        value={defaultValue}
        style={Object.assign({ width: 200 }, props.style)}
        onChange={onChange}
        showSearch={props.showSearch !== undefined ? props.showSearch : true}
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {hasAllDept && (
          <Select.Option key={"全院"} value={"全院"} title='全院'>
            全院
          </Select.Option>
        )}

        {props.extraDept &&
          props.extraDept.map((item: DeptType) => (
            <Select.Option key={item.name} value={item.code} title={item.name}>
              {item.name}
            </Select.Option>
          ))}

        {deptList.map((item: DeptType) => (
          <Select.Option key={item.name} value={item.code} title={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  );
});
const Wrapper = styled.div``;
