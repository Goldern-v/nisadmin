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
export default observer(function OperationEmSection(props: Props) {
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
      <div className="context">（1）人力资源情况：</div>
      <div className="context">急诊：</div>
      <div className="context">
        区域定编：<div>{}</div>人;实际编制:<div>{}</div>人; 截止本月底实际在岗:
        <div>{1}</div>人
      </div>
      <div className="context">
        本月离职护士 <div>{}</div>人（未转正护士 <div>{}</div>人，转正执业护士{" "}
        <div>{}</div>人）
      </div>
      <div className="context">
        本月护士离职率 <div>{}</div>
        %（公式：当月离职执业护士/期初+期末执业护士人数*2）
      </div>
      <div className="context">
        日间病房：定编： <div>{}</div>人；实际编制： <div>{}</div>
        人；截止本月底实际在岗<div>{}</div>人。
      </div>
      <div className="context">
        （2）<div>{}</div>月）上月急诊护理工作量得分： <div>{}</div>
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
