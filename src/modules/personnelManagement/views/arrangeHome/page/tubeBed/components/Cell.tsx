import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { message, Popover, Select } from "src/vendors/antd";
import { tobeBedModal } from '../viewModal/index'
import { appStore, authStore } from "../../../../../../../stores/index";
export interface Props {
  dataSource: any; //数据
  col: any; //列数
  row: any; //行数
  bedNoList: any; //床号信息
}

export default function Cell(props: Props) {
  let { dataSource, row, col, bedNoList } = props;
  let cellObj =
    col < dataSource.bedList?.length ? dataSource.bedList[col] : {};
  let defaultVal: any = cellObj.bedLabels ? cellObj.bedLabels.split(',') : [];
  const handleChange = (value: any) => {
    let cell: any = {};
    cell.deptCode = authStore.selectedDeptCode
    cell.deptName = authStore.selectedDeptName
    cell.empName = dataSource.empName
    cell.empNo = dataSource.empNo
    cell.bedLabels = value.join(',').length ? value.join(',') : ''
    cell.workDate = dataSource.bedList[col].workDate
    tobeBedModal.setAllCellData(row, col, cell)
  }
  return (
    <Wrapper>
      <Select
        mode="tags"
        size={'default'}
        placeholder="请选择床位号"
        key={defaultVal}
        defaultValue={defaultVal}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        {bedNoList && bedNoList.map((item: any, index: any) => {
          return <Select.Option value={item.bedLabel} key={index}>{item.bedLabel}</Select.Option>
        })}
      </Select>
    </Wrapper>
  );
};
const Wrapper = styled.div`
`;
