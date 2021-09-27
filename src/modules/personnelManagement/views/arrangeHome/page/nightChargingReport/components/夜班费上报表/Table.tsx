import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import configDefault from './config/default'
import configNys from './config/nys'
import configDghl from './config/dghl'
import configGzsrm from './config/gzsrm'
import { starRatingReportEditModel } from "src/modules/personnelManagement/views/arrangeHome/page/nightChargingReport/model/StarRatingReportEditModel";

export interface Props {
  sectionId: string,
  list?: any[];
  otherObj?: any;
  totalSorce?: number;
}

export default observer(function Table(props: Props) {
  let { sectionId, totalSorce } = props;
  const data = starRatingReportEditModel.getSectionData(sectionId);
  const list = data.list || []
  const otherObj = data.list2 || {}

  const updateOtherObj = (key: string, value: any) => {
    if (otherObj[key] === value) return
    starRatingReportEditModel.setSectionData(sectionId, {
      list2: { ...otherObj, [key]: value }
    })
  }
  const allMoney: any = list.reduce((total: any, current: any) => {
    const num = isNaN(+current.totalAll) ? 0 : +current.totalAll
    return total + num
  }, 0)
  updateOtherObj('allMoney', allMoney)

  return (
    <Wrapper>
      {appStore.hisMatch({
        map: {
          nys: configNys.getTable(list, otherObj),
          'dghl,fqfybjy': configDghl.getTable(list, otherObj, updateOtherObj),
          //gzsrm: configGzsrm.getTable(list),暂时隐藏20210926
          default: configDefault.getTable(list)
        },
        vague: true
      })}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  margin: 5px 50px;
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    table-layout: fixed;
    tr {
      width: 100%;
    }
    .header,
    .footer {
      td {
        background: #f0f0f0;
      }
    }
    td {
      height: 30px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
      &.align-left {
        text-align: left;
      }
      input{
        border:none;
      }
    }
  }
  .table-gzsrm-total{
    text-align: left;
    padding-left: 4px;
  }
  .lm-arrow {
    height: 12px;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
`;
