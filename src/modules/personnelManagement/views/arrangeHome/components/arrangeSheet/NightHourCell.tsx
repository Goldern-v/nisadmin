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

export default observer(function NightHourCell(props: Props) {
  let total = nightHourCellContent(props.id)
  return <Wrapper>{total}</Wrapper>;
});

export const nightHourCellContent = (id: any) => {
  let list = [];
  let user = sheetViewModal.sheetTableData.find((item: any) => {
    return item.id == id;
  });
  if (user) {
    list = user.settingDtos;
  }
  let total = list.reduce((total: any, current: ArrangeItem) => {
    total += Number(current.settingNightHour || 0);
    if (current.schAddOrSubs && current.schAddOrSubs.length) {
      if (current.schAddOrSubs[0].statusType == "1") {
        total += Number(current.schAddOrSubs[0].settingNightHour);
      }
      if (current.schAddOrSubs[0].statusType == "2") {
        total -= Number(current.schAddOrSubs[0].settingNightHour);
      }
    }
    return total;
  }, 0);
  return Number(total).toFixed(1)
}

const Wrapper = styled.div``;
