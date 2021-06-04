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
  const totalHoliday = user.totalHoliday ? +user.totalHoliday : 0
  let total = list.reduce((total: any, current: ArrangeItem) => {
    if (current.schJiJias && current.schJiJias.length) {
      if (!current.schJiJias[0].id) {
        if (current.schJiJias[0].statusType == "1") {
          total += Number(current.schJiJias[0].totalHoliday);
        }
        if (current.schJiJias[0].statusType == "2") {
          total -= Number(current.schJiJias[0].totalHoliday);
        }
      }
    }
    return total;
  }, totalHoliday);

  return Number(total).toFixed(1)
}

const Wrapper = styled.div``;
