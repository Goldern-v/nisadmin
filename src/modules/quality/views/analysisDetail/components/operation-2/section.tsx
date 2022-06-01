import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { observer } from "src/vendors/mobx-react-lite";
import { LastImproveItem, Report } from "../../types";
import { getModal } from "../../AnalysisDetailModal";
import EditButton from "src/modules/quality/components/EditButton";
import TwoLevelTitle from "src/modules/quality/components/TwoLevelTitle";
import { OperationSecCon } from "../../style/section";
export interface Props {
  sectionId: string;
  sectionTitle?: string | undefined;
  modalTitle?: string | undefined;
  keyName: string;
}
export default observer(function Operation2Section(props: Props) {
  let { sectionId, sectionTitle } = props;
  const analysisDetailModal = useRef(getModal());
  let data = analysisDetailModal.current.getSectionData(sectionId).list || {};
  let report: Report = (data ? data.report : {}) || {};
  return (
    <Wrapper>
      <TwoLevelTitle text={sectionTitle} />
      <EditButton
        onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}
      >
        编辑
      </EditButton>
      <div className="context context-title">（1）人力资源情况：</div>
      <div className="context">
        区域护士定编：<div>{}</div>人；助理护士定编<div>{}</div>人；护工
        <div>{}</div>人，文员<div>{}</div>人。
      </div>
      <div className="context">
        实际护士编制：<div>{}</div>人；实际助理护士<div>{}</div>人；护工
        <div>{}</div>人，文员<div>{}</div>人。
      </div>
      <div className="context">
        截止本月底实际在岗护士<div>{}</div>人；助理护士<div>{}</div>人，护工
        <div>{}</div>人，文员<div>{}</div>人。
      </div>
      <div className="context">
        本月离职护士<div>{}</div>人（未转正护士<div>{}</div>人，转正执业护士
        <div>{}</div>人）
      </div>
      <div className="context">
        本月护士离职率<div>{}</div>
        %（公式：当月离职执业护士/期初+期末执业护士人数*2）
      </div>
      <div className="context context-title">
        （2）区域实际开放床位：<div>{}</div>张，床护比：<div>{}</div> ；
      </div>
      <div className="context">
        平均护患比：<div>{}</div> 白班护患比：<div>{}</div> 夜班护患比：
      </div>
      <div className="context context-title">
        （3）（<div>{}</div>
        月）上月科室住院病人动态：（新QA“病案数据集结地—医院运营”中查询）
      </div>
      <div className="context">
        平均床位使用率：<div>{}</div>% ；病床周转次数：<div>{}</div>
        ；科室平均住院日：<div>{}</div>；
      </div>
      <div className="context">
        原有病人数：<div>{}</div> 入院人数：<div>{}</div> 转入病人数：
        <div>{}</div> 出院人数：<div>{}</div>
      </div>
      <div className="context">
        转出病人数：<div>{}</div> 死亡人数：<div>{}</div>
      </div>
      <div className="context">
        介入手术数：<div>{}</div> 外科手术数：<div>{}</div>
      </div>
      <div className="context context-title">
        （4）各科室居家人数完成情况：<div>{}</div>
      </div>
    </Wrapper>
  );
});
const Wrapper = styled(OperationSecCon)`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 60px;
  }

  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
`;
