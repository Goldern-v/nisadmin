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
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人；助理护士定编
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人；护工
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人，文员
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人。
      </div>
      <div className="context">
        实际护士编制：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人；实际助理护士
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人；护工
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人，文员
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人。
      </div>
      <div className="context">
        截止本月底实际在岗护士
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人；助理护士
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人，护工
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人，文员
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人。
      </div>
      <div className="context">
        本月离职护士
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人（未转正护士
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人，转正执业护士
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        人）
      </div>
      <div className="context">
        本月护士离职率
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        %（公式：当月离职执业护士/期初+期末执业护士人数*2）
      </div>
      <div className="context context-title">
        （2）区域实际开放床位：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        张，床护比：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />{" "}
        ；
      </div>
      <div className="context">
        平均护患比：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />{" "}
        白班护患比：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />{" "}
        夜班护患比：
      </div>
      <div className="context context-title">
        （3）（
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        月）上月科室住院病人动态：（新QA“病案数据集结地—医院运营”中查询）
      </div>
      <div className="context">
        平均床位使用率：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        % ；病床周转次数：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        ；科室平均住院日：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
        ；
      </div>
      <div className="context">
        原有病人数：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />{" "}
        入院人数：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />{" "}
        转入病人数：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />{" "}
        出院人数：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
      </div>
      <div className="context">
        转出病人数：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />{" "}
        死亡人数：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
      </div>
      <div className="context">
        介入手术数：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />{" "}
        外科手术数：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
        />
      </div>
      <div className="context context-title">
        （4）各科室居家人数完成情况：
        <Input
          value={value.i}
          onChange={(e: any) => handleChange(e.target.value, "i")}
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
