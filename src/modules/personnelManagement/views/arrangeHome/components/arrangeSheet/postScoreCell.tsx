import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import { ArrangeItem } from "../../types/Sheet";
import { cloneJson } from "src/utils/json/clone";
export interface Props {
  id: any;
}

export default observer(function PostScoreCell(props: Props) {
  let total = postScoreCell(props.id)
  return <Wrapper>{total}</Wrapper>;
});

export const postScoreCell = (id: any) => {
  let list = [];
  let user = sheetViewModal.sheetTableData.find((item: any) => {
    return item.id == id;
  });
  if (user) {
    list = user.settingDtos;
  }
  let total = list.reduce((total: any, current: ArrangeItem) => {
    total += Number(current.coefficient || 0);
    return total;
  }, 0);

  return Number(total).toFixed(2)
}

const Wrapper = styled.div``;
