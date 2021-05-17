import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { starRatingReportEditModel } from "../../model/StarRatingReportEditModel";
import { observer } from "src/vendors/mobx-react-lite";
import Table from "./Table";
import { appStore } from "src/stores";
import { starRatingReportService } from "../../api/StarRatingReportService";

export interface Props {
  sectionId: string;
  sectionTitle?: string | undefined;
  modalTitle?: string | undefined;
}

export default observer(function 夜班费上报表模块(props: Props) {
  let { sectionId, sectionTitle } = props;
  // let data = starRatingReportEditModel.getSectionData(sectionId);
  // let report: Report = starRatingReportEditModel.getDataInAllData("report");
  // let list = data ? data.list || [] : [];
  // let otherObj = data ? data.list2 || {} : {}
  // let totalSorce = 0;
  // for (let i = 0; i < list.length; i++) {
  //   totalSorce += list[i].deductScore || 0;
  // }

  const handleSave = () => {
    const data = starRatingReportEditModel.getSectionData(sectionId);
    const params = appStore.hisMatch({
      map: {
        dghl: {
          list1: data.list,
          list2: data.list2,
          schNightTotalModel: data.schNightTotalModel
        }
      }
    })
    starRatingReportService.editReport(params).then(res => {
      message.success("修改成功");
      starRatingReportEditModel.setSectionData(sectionId, {
        list: data.list,
        list2: data.list2,
        schNightTotalModel: data.schNightTotalModel
      })
    })
  }

  const handleEdit = () => {
    starRatingReportEditModel.openEditModal(sectionId)
  }

  return (
    <Wrapper>
      <div className="sup-title">
        {['dghl'].includes(appStore.HOSPITAL_ID) && <Button onClick={handleSave}>保存</Button>}
        <Button icon={"edit"} onClick={handleEdit}>编辑</Button>
      </div>
      <Table sectionId={sectionId}/>
      {/*<Table sectionId={sectionId} list={list} otherObj={otherObj} totalSorce={totalSorce}/>*/}
      {/*<EditButton onClick={() => starRatingReportEditModel.openEditModal(sectionId)}>*/}
      {/*  编辑*/}
      {/*</EditButton>*/}
    </Wrapper>
  );
});
const Wrapper = styled.div`
  min-height: 60px;
  padding: 5px 0 20px;
  position: relative;

  .sup-title {
    color: #000;
    font-weight: bold;
    width: 100%;
    padding: 0 50px;
    display: flex;
    justify-content: flex-end;
    button {
      border: 0
    }
  }
`;
