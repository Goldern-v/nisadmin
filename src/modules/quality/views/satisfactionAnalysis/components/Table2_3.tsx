import { observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
interface Props {
  list: any[];
}
export default observer(function Table2_3(props: Props) {
  useEffect(() => {}, [props.list]);
  return (
    <Wrapper>
      <table
        className="table-2_3 table-horizon"
        cellPadding={0}
        cellSpacing="1"
      >
        <colgroup>
          {["20%", "20%", "35%", "25%"].map((v: string) => (
            <col width={v} />
          ))}
        </colgroup>
        <tbody>
          <tr>
            {["片区", "科室", "最满意的护士", "最满意护士长"].map(
              (v: string, i: number) => (
                <td key={i}>{v}</td>
              )
            )}
          </tr>
          {props.list.map((item: any, index: number) => {
            return item.wardList.map((v: any, i: number) => (
              <tr key={index + i}>
                {i === 0 && (
                  <td rowSpan={item.wardList.length}>{item.areaName}</td>
                )}
                <td>{v.wardName}</td>
                <td>{v.nurseList ? v.nurseList.join(",") : "---"}</td>
                <td>{v.headNurseList ? v.headNurseList.join(",") : "---"}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </Wrapper>
  );
});

const Wrapper = styled.div``;
