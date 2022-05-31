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
  let cloneData: any = cloneJson(data || { text: [] });
  let ygznr = cloneData.text && cloneData.text.ygznr;
  let wcqk = cloneData.text && cloneData.text.wcqk;

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
              value={(ygznr && ygznr.gzjh) || ""}
              autosize={{ minRows: 6 }}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                ygznr.gzjh = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
          <div className="text">
            <div className="title"> 1.工作计划:</div>
            <TextArea
              className="cell-textArea"
              value={(wcqk && wcqk.gzjh) || ""}
              autosize={{ minRows: 6 }}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                wcqk.gzjh = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
          <div className="text">
            <div className="title"> 2.培训计划:</div>
            <TextArea
              className="cell-textArea"
              value={(ygznr && ygznr.pxjh) || ""}
              autosize={{ minRows: 6 }}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                ygznr.pxjh = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
          <div className="text">
            <div className="title"> 2.培训计划:</div>
            <TextArea
              className="cell-textArea"
              value={(wcqk && wcqk.pxjh) || ""}
              autosize={{ minRows: 6 }}
              placeholder="最多输入500个字"
              maxLength={500}
              onChange={(e) => {
                wcqk.pxjh = e.target.value;
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
