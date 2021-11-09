import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
export default observer(function TableView(props: any) {
  const { examRecordList } = props;
  const emptyList = new Array(25).fill(1);
  return (
    <Wrapper>
      <div className="title">考试记录</div>
      <table>
        <tbody>
          <tr className="head">
            <td>序号</td>
            <td>类型</td>
            <td>项目</td>
            <td>时间</td>
            <td>成绩</td>
            <td>是否及格</td>
            <td>学分</td>
            <td>学时</td>
          </tr>
          {examRecordList.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.index}</td>
              <td>{item.firstLevelMenuName}</td>
              <td>{item.title}</td>
              <td>{item.startTime}</td>
              <td>{item.gainScores}</td>
              <td>{item.passedDesc}</td>
              <td>{item.creditDesc}</td>
              <td>{item.classHoursDesc}</td>
            </tr>
          ))}
          {examRecordList.length == 0
            ? emptyList.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.index}</td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .title {
    font-size: 30px;
    text-align: center;
    font-weight: 600;
    font-family: "黑体" !important;
    margin-bottom: 15px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    td {
      border: 1px solid #000;
      height: 32px;
      text-align: center;
    }
  }
  .footer {
    margin-top: 5px;
    font-weight: bold;
    font-family: "黑体" !important;
    color: #444;
    font-size: 12px;
  }
`;
