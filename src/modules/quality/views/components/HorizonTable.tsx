import { observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
interface Props {
  list: any[];
  keyObj: any;
}
export default observer(function HorizonTable(props: Props) {
  useEffect(() => {}, [props.list]);
  return (
    <Wrapper>
      <table className="table-horizon" cellPadding={0} cellSpacing="1">
        {/* <colgroup>
          {["20%", "20%", "35%", "25%"].map((v: string) => (
            <col width={v} />
          ))}
        </colgroup> */}
        <tbody>
          {Object.keys(props.keyObj).map((key: string) => (
            <tr key={key}>
              <td>{props.keyObj[key]}</td>
              {props.list.map((item: any, index: number) => (
                <td key={index}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
});

const Wrapper = styled.div``;
