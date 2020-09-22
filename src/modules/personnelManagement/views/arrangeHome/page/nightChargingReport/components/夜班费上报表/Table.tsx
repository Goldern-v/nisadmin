import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
// import { TypeCompare, Report } from '../../types'
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
// import { starRatingReportEditModel } from './../../model/StarRatingReportEditModel'

export interface Props {
  list: any[];
  totalSorce: number;
}

export default observer(function Table(props: Props) {
  let { list, totalSorce } = props;
  let allMoney: any = list.reduce((total: any, current: any) => {
    return Number(total) + Number(current.totalAll);
  }, 0);
  // let report: Report = starRatingReportEditModel.getDataInAllData('report') || {}

  const formatNum = (num: number | string) => {
    num = Number(num);

    if (isNaN(num)) return "0.0";

    let numArr = num.toString().split(".");
    if (!numArr[0]) numArr[0] = "0";

    if (numArr[1]) {
      numArr[1] = numArr[1][0];
    } else {
      numArr[1] = "0";
    }

    return numArr.join(".");
  };

  const sum = (item: any) => {
    let total = 100;
    let nursingDeduct = Number(formatNum(-Number(item.nursingDeduct)));
    if (isNaN(nursingDeduct)) nursingDeduct = 0;

    let workloadDeduct = Number(formatNum(-Number(item.workloadDeduct)));
    if (isNaN(workloadDeduct)) workloadDeduct = 0;

    let satisfactionDeduct = Number(
      formatNum(-Number(item.satisfactionDeduct))
    );
    if (isNaN(satisfactionDeduct)) satisfactionDeduct = 0;

    return formatNum(
      total - nursingDeduct - workloadDeduct - satisfactionDeduct
    );
  };

  return (
    <Wrapper>
      {appStore.HOSPITAL_ID === "nys" ? (
        <table>
          <colgroup>
            <col width="80" />
            <col width="80" />
            <col width="80" />
            <col width="70" />
            <col width="70" />
            <col width="70" />
            <col width="70" />
            <col width="70" />
            <col width="70" />
            <col width="70" />
            <col width="70" />
            <col width="70" />
            <col width="70" />
            <col width="70" />
          </colgroup>
          <tbody>
            <tr className="header">
              <td rowSpan={2}>序号</td>
              <td rowSpan={2}>工号</td>
              <td rowSpan={2}>姓名</td>
              <td colSpan={2}>P班</td>
              <td colSpan={2}>N班</td>
              <td colSpan={2}>夜班</td>
              <td colSpan={2}>晚班</td>
              <td colSpan={2}>二线</td>
              <td rowSpan={2}>总金额</td>
            </tr>
            <tr className="header">
              <td>数量</td>
              <td>金额</td>
              <td>数量</td>
              <td>金额</td>
              <td>数量</td>
              <td>金额</td>
              <td>数量</td>
              <td>金额</td>
              <td>数量</td>
              <td>金额</td>
            </tr>
            {list.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td style={{ textAlign: "center" }}>{item.empNo}</td>
                <td style={{ textAlign: "center" }}>{item.empName}</td>
                <td style={{ textAlign: "center" }}>{item.numP}</td>
                <td style={{ textAlign: "center" }}>{item.totalP}</td>
                <td style={{ textAlign: "center" }}>{item.numN}</td>
                <td style={{ textAlign: "center" }}>{item.totalN}</td>
                <td style={{ textAlign: "center" }}>{item.numNight}</td>
                <td style={{ textAlign: "center" }}>{item.totalNight}</td>
                <td style={{ textAlign: "center" }}>{item.numWan}</td>
                <td style={{ textAlign: "center" }}>{item.totalWan}</td>
                <td style={{ textAlign: "center" }}>{item.numSecondLine}</td>
                <td style={{ textAlign: "center" }}>{item.totalSecondLine}</td>
                <td style={{ textAlign: "center" }}>{item.totalAll}</td>
              </tr>
            ))}
            <tr>
              <td style={{ textAlign: "center" }}>总计金额</td>
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }} />
              <td style={{ textAlign: "center" }}>{allMoney}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table>
          <colgroup>
            <col width="120" />
            <col width="120" />
          </colgroup>
          <tbody>
            <tr className="header">
              <td>工号</td>
              <td>姓名</td>
              <td>金额</td>
              <td>数量</td>
              <td>标准</td>
            </tr>
            {list.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{item.empNo}</td>
                <td style={{ textAlign: "center" }}>{item.empName}</td>
                <td style={{ textAlign: "center" }}>{item.total}</td>
                <td style={{ textAlign: "center" }}>{item.num}</td>
                <td style={{ textAlign: "center" }}>{item.standard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  margin: 5px 50px;
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    table-layout: fixed;
    tr {
      width: 100%;
    }
    .header,
    .footer {
      td {
        background: #f0f0f0;
      }
    }
    td {
      height: 30px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
      &.align-left {
        text-align: left;
      }
    }
  }
  .lm-arrow {
    height: 12px;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
`;
