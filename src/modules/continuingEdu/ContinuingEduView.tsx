import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";
import LeftMenu from "src/components/LeftMenu";
import Null from "src/components/null/Null";
import { meunSettingApi } from "./views/菜单设置/api/MeunSettingApi";

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
// 院外培训继续教育
import ContinuingEducation from "./views/outsideHospital/views/continuingEducation/ContinuingEducation";
// 院外培训短期培训
import ShortTermTraining from "./views/outsideHospital/views/shortTermTraining/ShortTermTraining";
// 院外培训会议文章
import MeetingArticle from "./views/outsideHospital/views/meetingArticle/MeetingArticle";
// 院外培训会议交流
import MeetingExchange from "./views/outsideHospital/views/meetingExchange/MeetingExchange";
// 院外培训其他类培训
import OtherTraining from "./views/outsideHospital/views/otherTraining/OtherTraining";
// 院外培训类型管理
import TypeManagement from "./views/outsideHospital/views/typeManagement/TypeManagement";
//晋升设置
import PromotionSetting from "./views/promotionSetting/PromotionSetting";

import 类型管理 from "./views/类型管理/类型管理";
import 菜单设置 from "./views/菜单设置/MenuSettings";

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
        path: "/continuingEdu/继续教育",
        component: ContinuingEducation
      },
      {
        title: "短期培训",
        path: "/continuingEdu/短期培训",
        component: ShortTermTraining
      },
      {
        title: "会议文章",
        path: "/continuingEdu/会议文章",
        component: MeetingArticle
      },
      {
        title: "会议交流",
        path: "/continuingEdu/会议交流",
        component: MeetingExchange
      },
      {
        title: "其他类培训",
        path: "/continuingEdu/其他类培训",
        component: OtherTraining
      },
      {
        title: "类型管理",
        path: "/continuingEdu/typeManagement",
        component: TypeManagement,
        hide: true
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
    component: PromotionSetting
  },
  {
    title: "菜单设置",
    icon: <KSGL />,
    path: "/continuingEdu/菜单设置",
    component: 菜单设置
  }
];

export default function ContinuingEdu(props: Props) {
  const [effect, setEffect] = useState(true);
  const [dataList, setDataList] = useState([] as any);
  // 查询
  const getList = () => {
    if (effect) {
      meunSettingApi.getGetData().then((res: any) => {
        let newArr: any = [];
        if (res.data) {
          let arr = res.data;
          if (arr.length > 0) {
            arr.map((item: any, index: number) => {
              var obj1: any = {
                id: item.id,
                title: item.name,
                icon: getIcon(item.sort),
                component: getComponent(item.name),
                path: `/continuingEdu/${item.name}`
              };
              if (item.childList && item.childList.length) {
                let arr: any = [];
                item.childList.map((item: any, index: any) => {
                  var obj2: any = {
                    id: item.id,
                    title: item.name,
                    component: getComponent(item.name),
                    path: `/continuingEdu/${item.name}`
                  };
                  arr.push(obj2);
                  obj1.children = arr;
                });
              }
              newArr.push(obj1);
            });
            setDataList(newArr);
          }
        }
      });
    }
  };
  useLayoutEffect(() => {
    setEffect(false);
  }, []);
  // 初始化
  useEffect(() => {
    setEffect(true);
    getList();
  }, [props.history.location.pathname]);
  // 获取icon
  const getIcon = (icon: any) => {
    switch (icon) {
      case 1:
        return <RYGL />;
      case 2:
        return <YNXXB />;
      case 3:
        return <JXJH />;
      case 4:
        return <LXGL />;
      case 5:
        return <KSGL />;
      case 6:
        return <SPXX />;
      default:
        return <RYGL />;
    }
  };
  // 获取组件变量名
  const getComponent = (name: any) => {
    switch (name) {
      case "菜单设置":
        return 菜单设置;
      default:
        return 菜单设置;
    }
  };

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
  return (
    <Wrapper>
      <LeftWrapper>
        <LeftMenu config={LEFT_MENU_CONFIG} menuTitle="继续教育" />
      </LeftWrapper>
      <MainWrapper>
        {currentRoute && currentRoute.component && (
          <currentRoute.component
            getTitle={currentRoute && currentRoute.title}
            // getId={currentRoute && currentRoute.id}
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
