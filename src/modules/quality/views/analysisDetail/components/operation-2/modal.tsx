import styled from "styled-components";
import React from "react";
import { cloneJson } from "src/utils/json/clone";
import { Input } from "src/vendors/antd";
import { OperationModCon } from "../../style/modal";

export interface Props {
  sectionId: string;
  data: any;
  setData: any;
}
export default function Operation2Modal(props: Props) {
  let { sectionId, setData, data } = props;
  // let cloneData: any = cloneJson(data || { value: [] })
  let value: any = data ? data.value : {} || {};
 let pageInfo: any= data ? data.pageInfo : {}
  const handleChange = (e: any, key: string) => {
    if (setData) {
      setData({
        value: {
          ...value,
          [key]: e
        }
      });
    }
  };
  return (
    <OperationModCon>
      <div className="context context-title">（1）人力资源情况：</div>
      <div className="context">
        区域护士定编：
        <Input
          value={value.areaNurseCount}
          type='number'
          onChange={(e: any) => handleChange(e.target.value, "areaNurseCount")}
        />
        人；助理护士定编
        <Input
        type='number'
          value={value.assistantNurseCount}
          onChange={(e: any) => handleChange(e.target.value, "assistantNurseCount")}
        />
        人；护工
        <Input
        type='number'
          value={value.careWorkerCount}
          onChange={(e: any) => handleChange(e.target.value, "careWorkerCount")}
        />
        人，文员
        <Input
        type='number'
          value={value.clerkCount}
          onChange={(e: any) => handleChange(e.target.value, "clerkCount")}
        />
        人。
      </div>
      <div className="context">
        实际护士编制：
        <Input
        type='number'
          value={value.actualNurseCount}
          onChange={(e: any) => handleChange(e.target.value, "actualNurseCount")}
        />
        人；实际助理护士
        <Input
        type='number'
          value={value.actualAssistantNurseCount}
          onChange={(e: any) => handleChange(e.target.value, "actualAssistantNurseCount")}
        />
        人；护工
        <Input
        type='number'
          value={value.actualCareWorkerCount}
          onChange={(e: any) => handleChange(e.target.value, "actualCareWorkerCount")}
        />
        人，文员
        <Input
        type='number'
          value={value.actualClerkCount}
          onChange={(e: any) => handleChange(e.target.value, "actualClerkCount")}
        />
        人。
      </div>
      <div className="context">
        截止本月底实际在岗护士
        <Input
        type='number'
          value={value.dutyNurseCount}
          onChange={(e: any) => handleChange(e.target.value, "dutyNurseCount")}
        />
        人；助理护士
        <Input
        type='number'
          value={value.dutyAssistantNurseCount}
          onChange={(e: any) => handleChange(e.target.value, "dutyAssistantNurseCount")}
        />
        人，护工
        <Input
        type='number'
          value={value.dutyCareWorkerCount}
          onChange={(e: any) => handleChange(e.target.value, "dutyCareWorkerCount")}
        />
        人，文员
        <Input
        type='number'
          value={value.dutyClerkCount}
          onChange={(e: any) => handleChange(e.target.value, "dutyClerkCount")}
        />
        人。
      </div>
      <div className="context">
        本月离职护士
        <Input
        type='number'
          value={value.resignNurseCount}
          onChange={(e: any) => handleChange(e.target.value, "resignNurseCount")}
        />
        人（未转正护士
        <Input
        type='number'
          value={value.notRectifiedNurseCount}
          onChange={(e: any) => handleChange(e.target.value, "notRectifiedNurseCount")}
        />
        人，转正执业护士
        <Input
        type='number'
          value={value.regularPracticeNurseCount}
          onChange={(e: any) => handleChange(e.target.value, "regularPracticeNurseCount")}
        />
        人）
      </div>
      <div className="context">
        本月护士离职率
        <Input
        type='number'
          value={value.nurseTurnoverRate}
          onChange={(e: any) => handleChange(e.target.value, "nurseTurnoverRate")}
        />
        %（公式：当月离职执业护士/期初+期末执业护士人数*2）
      </div>
      <div className="context context-title">
        （2）区域实际开放床位：
        <Input
        type='number'
          value={value.actualOpenBedArea}
          onChange={(e: any) => handleChange(e.target.value, "actualOpenBedArea")}
        />
        张，床护比：
        <Input
          value={value.bedNurseRatio}
          onChange={(e: any) => handleChange(e.target.value, "bedNurseRatio")}
        />{" "}
        ；
      </div>
      <div className="context">
        平均护患比：
        <Input
          value={value.avgNursePatientRatio}
          onChange={(e: any) => handleChange(e.target.value, "avgNursePatientRatio")}
        />{" "}
        白班护患比：
        <Input
          value={value.dayNursePatientRatio}
          onChange={(e: any) => handleChange(e.target.value, "dayNursePatientRatio")}
        />{" "}
        夜班护患比：
        <Input
          value={value.nightNursePatientRatio}
          onChange={(e: any) => handleChange(e.target.value, "nightNursePatientRatio")}
        />
      </div>
      <div className="context context-title">
        （3）（<div>{pageInfo&&!isNaN(pageInfo.reportMonth) && Number(pageInfo.reportMonth) - 1 != 0 ? Number(pageInfo.reportMonth) - 1 : 12}</div>
        月）上月科室住院病人动态：（新QA“病案数据集结地—医院运营”中查询）
      </div>
      <div className="context">
        平均床位使用率：
        <Input
        type='number'
          value={value.avgBedUsage}
          onChange={(e: any) => handleChange(e.target.value, "avgBedUsage")}
        />
        % ；病床周转次数：
        <Input
        type='number'
          value={value.bedTurnoversCount}
          onChange={(e: any) => handleChange(e.target.value, "bedTurnoversCount")}
        />
        ；科室平均住院日：
        <Input
        type='number'
          value={value.deptAvgHospitalDay}
          onChange={(e: any) => handleChange(e.target.value, "deptAvgHospitalDay")}
        />
        ；
      </div>
      <div className="context">
        原有病人数：
        <Input
        type='number'
          value={value.existingPatientCount}
          onChange={(e: any) => handleChange(e.target.value, "existingPatientCount")}
        />{" "}
        入院人数：
        <Input
        type='number'
          value={value.admissionCount}
          onChange={(e: any) => handleChange(e.target.value, "admissionCount")}
        />{" "}
        转入病人数：
        <Input
        type='number'
          value={value.transferDiseaseCount}
          onChange={(e: any) => handleChange(e.target.value, "transferDiseaseCount")}
        />{" "}
        出院人数：
        <Input
        type='number'
          value={value.leaveHospitalCount}
          onChange={(e: any) => handleChange(e.target.value, "leaveHospitalCount")}
        />
      </div>
      <div className="context">
        转出病人数：
        <Input
        type='number'
          value={value.outDiseaseCount}
          onChange={(e: any) => handleChange(e.target.value, "outDiseaseCount")}
        />{" "}
        死亡人数：
        <Input
        type='number'
          value={value.deadCount}
          onChange={(e: any) => handleChange(e.target.value, "deadCount")}
        />
      </div>
      <div className="context">
        介入手术数：
        <Input
        type='number'
          value={value.interventionSurgeryCount}
          onChange={(e: any) => handleChange(e.target.value, "interventionSurgeryCount")}
        />{" "}
        外科手术数：
        <Input
        type='number'
          value={value.surgicalSurgeryCount}
          onChange={(e: any) => handleChange(e.target.value, "surgicalSurgeryCount")}
        />
      </div>
      <div className="context context-title">
        （4）各科室居家人数完成情况：
        <Input
          value={value.homeCountCompletionCase}
          onChange={(e: any) => handleChange(e.target.value, "homeCountCompletionCase")}
        />
      </div>
    </OperationModCon>
  );
}
const Wrapper = styled.div`
  .edit_text input {
    width: 60px;
    border: none;
    text-align: center;
    border-bottom: #000 solid 1px;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
  text {
    min-height: 200px !important;
    resize: none;
  }
  .context div {
    display: inline-block;
    width: 60px;
    text-align: center;
    border-bottom: 1px solid #000;
  }
`;
