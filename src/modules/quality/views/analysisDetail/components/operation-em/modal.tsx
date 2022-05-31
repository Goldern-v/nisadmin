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
  let value: any = data ? data.value : { i1: "" } || { i1: "" };

  const handleChange = (e: any, key: string) => {
    if (setData) {
      setData();
    }
  };
  return (
    <OperationModCon>
        <div className="context">（1）人力资源情况：</div>
        <div className="context">急诊：</div>
        <div className="context">
          区域定编：
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          人;实际编制:
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          人; 截止本月底实际在岗:
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          人
        </div>
        <div className="context">
          本月离职护士{" "}
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          人（未转正护士{" "}
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          人，转正执业护士{" "}
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          人）
        </div>
        <div className="context">
          本月护士离职率 
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          %（公式：当月离职执业护士/期初+期末执业护士人数*2）
        </div>
        <div className="context">
          日间病房：定编： 
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          人；实际编制： 
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          人；截止本月底实际在岗
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          人。
        </div>
        <div className="context">
          （2）
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
          />
          月）上月急诊护理工作量得分： 
          <Input
            value={value.i1}
            onChange={(e: any) => handleChange(e.target.value, "i1")}
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
