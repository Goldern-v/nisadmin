import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import LeftMenu from "src/components/LeftMenu";
import Null from "src/components/null/Null";

import { ReactComponent as RYGL } from "./assets/icon_svg/RYGL.svg";
import { ReactComponent as YNXXB } from "./assets/icon_svg/YNXXB.svg";
import { ReactComponent as JXJH } from "./assets/icon_svg/JXJH.svg";
import { ReactComponent as LXGL } from "./assets/icon_svg/LXGL.svg";
import { ReactComponent as KSGL } from "./assets/icon_svg/KSGL.svg";
import { ReactComponent as SPXX } from "./assets/icon_svg/SPXX.svg";
import { ReactComponent as TKGL } from "./assets/icon_svg/TKGL.svg";
import { ReactComponent as PXGL } from "./assets/icon_svg/PXGL.svg";
import { ReactComponent as JJSZ } from "./assets/icon_svg/JJGL.svg";

export interface Props extends RouteComponentProps {}

import 人员管理 from "./人员管理";
import QuestionBankManagement from "../questionBankManagement/QuestionBankManagement";
import ChoiceQustionEdit from "../questionBankManagement/views/ChoiceQuestionEdit";
import FillingQuestionEdit from "../questionBankManagement/views/FillingQuestionEdit";
import ShortQuestionEdit from "../questionBankManagement/views/ShortQuestionEdit";
import LabelQuestionBank from "../questionBankManagement/views/LabelQuestionBank";
import UploadRecordQuestionBank from "../questionBankManagement/views/UploadRecordQuestionBank";
import UploadQuestionBank from "../questionBankManagement/views/UploadQuestionBank";
import WrongQuestionBank from "../questionBankManagement/views/WrongQuestionBank";
import TrainingManageHome from "./views/trainingManage/views/trainingManageHome/TrainingManageHome";
import 教学计划 from "./views/教学计划/教学计划";
// 继续教育
import ContinuingEducation from "./views/outsideHospital/views/continuingEducation/ContinuingEducation";
import 类型管理 from "./views/类型管理/类型管理";

const LEFT_MENU_CONFIG = [
  {
    title: "人员管理",
    icon: <RYGL />,
    path: "/continuingEdu/人员管理",
    component: 人员管理
  },
  {
    title: "新职工培训",
    icon: <RYGL />,
    children: [
      {
        title: "教学计划",
        path: "/continuingEdu/教学计划",
        component: 教学计划
      },
      {
        title: "类型管理",
        path: "/continuingEdu/类型管理",
        component: 类型管理,
        hide: true
      }
    ]
  },
  {
    title: "培训管理",
    icon: <RYGL />,
    path: "/continuingEdu/trainingManageHome",
    component: TrainingManageHome
  },
  {
    title: "院外培训",
    // icon: <RYGL />,
    children: [
      {
        title: "继续教育",
        path: "/continuingEdu/continuingEducation",
        component: ContinuingEducation
      }
    ]
  },
  {
    title: "院内学习班",
    icon: <YNXXB />,
    path: "/continuingEdu/院内学习班",
    component: Null
  },
  {
    title: "教学计划",
    icon: <JXJH />,
    path: "/continuingEdu/教学计划",
    component: Null
  },
  {
    title: "练习管理",
    icon: <LXGL />,
    path: "/continuingEdu/练习管理",
    component: Null
  },
  {
    title: "考试管理",
    icon: <KSGL />,
    path: "/continuingEdu/考试管理",
    component: Null
  },
  {
    title: "视频学习",
    icon: <SPXX />,
    path: "/continuingEdu/视频学习",
    component: Null
  },
  {
    title: "选择题新建和编辑",
    hide: true,
    path: "/continuingEdu/choiceQuestionEdit",
    component: ChoiceQustionEdit
  },
  {
    title: "填空题新建和编辑",
    hide: true,
    path: "/continuingEdu/fillingQuestionEdit",
    component: FillingQuestionEdit
  },
  {
    title: "问答题新建和编辑",
    hide: true,
    path: "/continuingEdu/shortQuestionEdit",
    component: ShortQuestionEdit
  },
  {
    title: "标签题库",
    hide: true,
    path: "/continuingEdu/labelQuestionBank",
    component: LabelQuestionBank
  },
  {
    title: "导入题库",
    hide: true,
    path: "/continuingEdu/uploadRecordQuestionBank",
    component: UploadRecordQuestionBank
  },
  {
    title: "上传新题库",
    hide: true,
    path: "/continuingEdu/uploadQuestionBank",
    component: UploadQuestionBank
  },
  {
    title: "错题反馈",
    hide: true,
    path: "/continuingEdu/wrongQuestionBank",
    component: WrongQuestionBank
  },
  {
    title: "题库管理",
    icon: <TKGL />,
    path: "/continuingEdu/questionBankManagement",
    component: QuestionBankManagement
  },
  {
    title: "培训管理",
    icon: <PXGL />,
    path: "/continuingEdu/培训管理",
    component: Null
  },
  {
    title: "晋级设置",
    icon: <JJSZ />,
    path: "/continuingEdu/晋级设置",
    component: Null
  }
];

export default function ContinuingEdu(props: Props) {
  let currentRoutePath = props.match.url || "";
  let currentRoute = getTargetObj(LEFT_MENU_CONFIG, "path", currentRoutePath);
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find(
          (item1: any) => item1[targetKey] === targetName
        );
      } else {
        return item[targetKey] === targetName;
      }
    });
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find(
        (item1: any) => item1[targetKey] === targetName
      );
    }
    return chooseRoute;
  }
  // let cacheSetHeadTitle = currentRoute && currentRoute.title
  return (
    <Wrapper>
      <LeftWrapper>
        <LeftMenu config={LEFT_MENU_CONFIG} menuTitle="继续教育" />
      </LeftWrapper>
      <MainWrapper>
        {currentRoute && currentRoute.component && (
          <currentRoute.component
            getTitle={currentRoute && currentRoute.title}
          />
        )}
      </MainWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const LeftWrapper = styled.div`
  #left-menu-con {
    overflow-x: hidden;
  }
`;
const MainWrapper = styled.div`
  position: absolute;
  left: 200px;
  top: 0;
  right: 0;
  bottom: 0;
`;
