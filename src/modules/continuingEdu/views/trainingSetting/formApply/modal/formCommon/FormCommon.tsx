import styled from "styled-components";
import React, { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { appStore } from "src/stores";
import { formApplyModal } from "../../FormApplyModal";
import { trainingSettingApi } from "../../../api/TrainingSettingApi";

import LCDJ from "./allForm/LCDJ"; //护理临床带教资质准入申请表
import RYZY from "./allForm/RYZY"; //护师人员执业/夜班准入资格申请表
import TSGW from "./allForm/TSGW"; //特殊护理岗位资质准入申请表
import RYZZ from "./allForm/RYZZ"; //护理会诊人员资质认定表
import CJJS from "./allForm/CJJS"; //护理人员岗位层级晋升申请表
import GFXZL from "./allForm/GFXZL"; //高风险诊疗技术操作人员资质申请表
import YNJX from "./allForm/YNJX"; //护理人员岗位院内进修备案简表

interface Props {}

export default observer(function FormApply(props: Props) {
  let formName = appStore.queryObj.formName;
  let formCode = appStore.queryObj.formCode;
  let formId = appStore.queryObj.formId;

  //根据formcode对应表单
  const formList: any = [
    {
      name: "FQA00001",
      component: <LCDJ />
    },
    {
      name: "FQA00002",
      component: <RYZY />
    },
    {
      name: "FQA00006",
      component: <TSGW />
    },
    {
      name: "FQA00004",
      component: <RYZZ />
    },
    {
      name: "FQA00005",
      component: <CJJS />
    },
    {
      name: "FQA00003",
      component: <GFXZL />
    },
    {
      name: "FQA00007",
      component: <YNJX />
    }
  ];

  //初始化函数
  const getData = () => {
    trainingSettingApi.formData(formId).then((res: any) => {
      res.data.id = formId;
      formApplyModal.allData(res.data, formCode);
    });
  };

  useLayoutEffect(() => {
    if (formId) getData();
  }, []);

  return (
    <Wrapper>
      <Hospital>东莞市厚街医院</Hospital>
      <Title>
        {formApplyModal.getTitle ? formApplyModal.getTitle : formName}
      </Title>
      <FromContent>
        {
          formList.find((item: any) =>
            item.name === formApplyModal.getFormCode
              ? formApplyModal.getFormCode
              : formCode
          ).component
        }
      </FromContent>
    </Wrapper>
  );
});
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
`;
