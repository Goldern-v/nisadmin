import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
export interface Props {}

export default function Step5() {
  return (
    <Wrapper>
      <table>
        <tr>
          <td className="key">1</td>
          <td className="value">2</td>
        </tr>
      </table>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 40px 100px 20px;
  table {
    width: 100%;
    td {
      min-height: 30px;
    }
    .key {
      width: 100px;
    }
  }
`;
