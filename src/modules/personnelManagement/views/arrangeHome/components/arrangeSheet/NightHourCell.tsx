import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { observer } from "src/vendors/mobx-react-lite.ts";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import { ArrangeItem } from "../../types/Sheet";
import { cloneJson } from "src/utils/json/clone";
export interface Props {
  id: any;
}

export default observer(function NightHourCell(props: Props) {
  let list = [];
  let user = sheetViewModal.sheetTableData.find((item: any) => {
    return item.id == props.id;
  });
  if (user) {
    list = user.settingDtos;
  }
  let total = list.reduce((total: any, current: ArrangeItem) => {
    total += Number(current.settingNightHour);
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
  return <Wrapper>{Number(total).toFixed(1)}</Wrapper>;
});
const Wrapper = styled.div``;
