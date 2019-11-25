import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { NativeButtonProps } from "antd/es/button/button";
import { starRatingReportEditModel } from "./../../model/StarRatingReportEditModel";
import { observer } from "src/vendors/mobx-react-lite";
export interface Props extends NativeButtonProps {
  border?: boolean;
}

export default observer(function EditButton(props: Props) {
  let btnDisabled = () => {
    return false;
    // if (!starRatingReportEditModel.allData.report) return true;
    // if (starRatingReportEditModel.allData.report.status == "1") return true;
    // return false;
  };
  return (
    <ButtonStyl
      {...props}
      icon={"edit"}
      border={props.border ? 1 : 0}
      disabled={btnDisabled()}
    />
  );
});
const ButtonStyl = styled(Button)<{ border: number }>`
  &.ant-btn {
    ${p => !p.border && "border: 0"}
  }
  &.ant-btn {
    background: rgba(0, 0, 0, 0);
    box-shadow: none;
  }
  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover {
    background: rgba(0, 0, 0, 0);
  }
`;
