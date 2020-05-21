import styled from "styled-components";
import React from "react";
import { formApplyModal } from "../../FormApplyModal"; // 仓库数据
import LCDJ from "./allForm/LCDJ"; //护理临床带教资质准入申请表
import RYZY from "./allForm/RYZY"; //护师人员执业/夜班准入资格申请表
import TSGW from "./allForm/TSGW"; //特殊护理岗位资质准入申请表
import RYZZ from "./allForm/RYZZ"; //护理会诊人员资质认定表
import CJJS from "./allForm/CJJS"; //护理人员岗位层级晋升申请表
import GFXZL from "./allForm/GFXZL"; //高风险诊疗技术操作人员资质申请表
import YNJX from "./allForm/YNJX"; //护理人员岗位院内进修备案简表

interface Props {}

export default function FormApply(props: Props) {
  const formList: any = [
    {
      name: "护理临床带教资质准入申请表",
      component: <LCDJ />
    },
    {
      name: "护师人员执业/夜班准入资格申请表",
      component: <RYZY />
    },
    {
      name: "特殊护理岗位资质准入申请表",
      component: <TSGW />
    },
    {
      name: "护理会诊人员资质认定表",
      component: <RYZZ />
    },
    {
      name: "护理人员岗位层级晋升申请表",
      component: <CJJS />
    },
    {
      name: "高风险诊疗技术操作人员资质申请表",
      component: <GFXZL />
    },
    {
      name: "护理人员院内进修备案简表",
      component: <YNJX />
    }
  ];

  return (
    <Wrapper>
      <Hospital>东莞市厚街医院</Hospital>
      <Title>{formApplyModal.getTitle}</Title>
      <FromContent>
        {
          formList.find((item: any) => item.name === formApplyModal.getTitle)
            .component
        }
      </FromContent>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px 0px;
  background: rgb(255, 255, 255);
  padding: 30px 40px;
  width: 740px;
  height: 1047px;
  box-sizing: border-box;
`;
const Hospital = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: bold;
`;
const Title = styled.div`
  font-size: 21px;
  padding: 3px 0 0px;
  text-align: center;
  font-weight: bold;
`;
const FromContent = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 92%;
  // border: 1px solid #000;
`;
