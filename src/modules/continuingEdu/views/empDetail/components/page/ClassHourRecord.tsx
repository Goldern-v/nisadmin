import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { empDetailModel } from "../../models/EmpDetailModel";
export default observer(function TableView(props: any) {
  const { classHourRecordList } = props;
  const { classHoursDesc } = empDetailModel;
  const [emptyList, setEmptyList] = useState<number[]>([]);
  let tableRef: any = React.createRef<HTMLDivElement>();
  useEffect(() => {
    if (classHourRecordList.length !== 0) {
      setEmptyList(empDetailModel.getReserve(tableRef));
    } else {
      const list = new Array(25).fill(1);
      setEmptyList(list);
    }
  }, []);
  return (
    <Wrapper>
      <div className="title">学时记录</div>
      <table className="table" ref={tableRef}>
        <tbody>
          <tr className="head">
            <td>序号</td>
            <td>项目</td>
            <td>培训类型</td>
            <td>日期</td>
            <td>学时</td>
            <td>备注</td>
          </tr>
          {classHourRecordList.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.index}</td>
              <td>{item.title}</td>
              <td>{item.teachingMethodName}</td>
              <td>{item.startTime}</td>
              <td>{item.classHoursDesc}</td>
              <td>{item.remark}</td>
            </tr>
          ))}
          {emptyList.map((item: any, index: number) => (
            <tr key={index}>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer">{classHoursDesc}</div>
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
