import styled from "styled-components";
import React from "react";
import { cloneJson } from "src/utils/json/clone";
import { Input } from "src/vendors/antd";
import { OperationModCon } from "../../style/modal";
const { TextArea } = Input;
export interface Props {
  sectionId: string;
  data: any;
  setData: any;
}
export default function OperationEmModal(props: Props) {
  let { sectionId, setData, data } = props;
  // let cloneData: any = cloneJson(data || { value: [] })
  let value: any = data ? data.value : {}  ;
  let pageInfo:any= data && data.pageInfo ? data.pageInfo : {}
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
        <div className="context">（1）人力资源情况：</div>
        <div className="context">急诊：</div>
        <div className="context">
          区域定编：
          <Input
            value={value.emergencyAreaCount}
            onChange={(e: any) => handleChange(e.target.value, "emergencyAreaCount")}
          />
          人;实际编制:
          <Input
            value={value.actualEmergencyCount}
            onChange={(e: any) => handleChange(e.target.value, "actualEmergencyCount")}
          />
          人; 截止本月底实际在岗:
          <Input
            value={value.actualEmergencyDutyCount}
            onChange={(e: any) => handleChange(e.target.value, "actualEmergencyDutyCount")}
          />
          人
        </div>
        <div className="context">
          本月离职护士{" "}
          <Input
            value={value.emergencyResignNurse}
            onChange={(e: any) => handleChange(e.target.value, "emergencyResignNurse")}
          />
          人（未转正护士{" "}
          <Input
            value={value.notRectifiedNurse}
            onChange={(e: any) => handleChange(e.target.value, "notRectifiedNurse")}
          />
          人，转正执业护士{" "}
          <Input
            value={value.regularPracticeNurse}
            onChange={(e: any) => handleChange(e.target.value, "regularPracticeNurse")}
          />
          人）
        </div>
        <div className="context">
          本月护士离职率 
          <Input
            value={value.nurseTurnoverRate}
            onChange={(e: any) => handleChange(e.target.value, "nurseTurnoverRate")}
          />
          %（公式：当月离职执业护士/期初+期末执业护士人数*2）
        </div>
        <div className="context">
          日间病房：定编： 
          <Input
            value={value.dayWardCount}
            onChange={(e: any) => handleChange(e.target.value, "dayWardCount")}
          />
          人；实际编制： 
          <Input
            value={value.actualDayWardCount}
            onChange={(e: any) => handleChange(e.target.value, "actualDayWardCount")}
          />
          人；截止本月底实际在岗
          <Input
            value={value.actualDayWardDutyCount}
            onChange={(e: any) => handleChange(e.target.value, "actualDayWardDutyCount")}
          />
          人。
        </div>
        <div className="context">
          （2）<div className="month-context">{pageInfo.reportMonth}</div>
          （月）上月急诊护理工作量得分： 
          <Input
            value={value.nursingWorkloadScore}
            onChange={(e: any) => handleChange(e.target.value, "nursingWorkloadScore")}
          />
        </div>
    </OperationModCon>
  );
}
