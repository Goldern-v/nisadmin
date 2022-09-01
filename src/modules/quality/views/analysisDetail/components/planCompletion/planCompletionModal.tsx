import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { cloneJson } from "src/utils/json/clone";
import { FieldDataCon } from "../../style/modal";
import { Input } from "src/vendors/antd";
import { MainCon } from "./style";
const { TextArea } = Input;

export interface Props {
  sectionId: string;
  data: any;
  setData: any;
}
export default function planCompletionModal(props: Props) {
  let { sectionId, setData, data } = props;
  let cloneData: any = cloneJson(data || { value: {} });
  let value = cloneData.value ? cloneData.value : {};

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <div className="context_box">
        <MainCon>
          <div className="title-top">月工作内容</div>
          <div className="title-top">完成情况</div>
          <div className="text">
            <div className="title"> 1.工作计划:</div>
            <TextArea
              className="cell-textArea"
              value={value.monthWorkPlan}
              autosize={{ minRows: 10 ,maxRows:10}}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                value.monthWorkPlan = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
          <div className="text">
            <div className="title"> 1.工作计划:</div>
            <TextArea
              className="cell-textArea"
              value={value.monthWorkDoneCase}
              autosize={{ minRows: 10 ,maxRows:10}}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                value.monthWorkDoneCase = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
          <div className="text">
            <div className="title"> 2.培训计划:</div>
            <TextArea
              className="cell-textArea"
              value={value.trainingPlanOfTheMonth}
              autosize={{ minRows: 10 ,maxRows:10}}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                value.trainingPlanOfTheMonth = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
          
          <div className="text">
            <div className="title"> 2.培训计划:</div>
            <TextArea
              className="cell-textArea"
              value={value.monthTrainDoneCase}
              autosize={{ minRows: 10 ,maxRows:10}}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                value.monthTrainDoneCase = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
        </MainCon>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled(FieldDataCon)`
  .title-top {
    text-align: center;
    font-size: 18px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-right: 60px;
  }
`;
