import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";
import LeftMenu from "src/components/LeftMenu";
import { meunSettingApi } from "./views/menuSettings/api/MeunSettingApi";
import { ReactComponent as RYGL } from "./assets/icon_svg/RYGL.svg";
import { ReactComponent as YNXXB } from "./assets/icon_svg/YNXXB.svg";
import { ReactComponent as JXJH } from "./assets/icon_svg/JXJH.svg";
import { ReactComponent as LXGL } from "./assets/icon_svg/LXGL.svg";
import { ReactComponent as KSGL } from "./assets/icon_svg/KSGL.svg";
import { ReactComponent as SPXX } from "./assets/icon_svg/SPXX.svg";
import { ReactComponent as TKGL } from "./assets/icon_svg/TKGL.svg";
import { ReactComponent as PXGL } from "./assets/icon_svg/PXGL.svg";
import { ReactComponent as JJSZ } from "./assets/icon_svg/JJGL.svg";
import { ReactComponent as JSGL } from "./assets/icon_svg/JSGL.svg";
import { ReactComponent as TZGL } from "./assets/icon_svg/TZGL.svg";
export interface Props extends RouteComponentProps { }
import 人员管理 from "./人员管理";
import 审核发布 from "./views/auditEduPlant/AuditEduPlan";
import 评分管理 from "./views/scoreManage/ScoreManage";
import 菜单设置 from "./views/menuSettings/MenuSettings";
import 主列表页 from "./views/mainTablePage/MainPage";
import 无权限 from "./views/noAuthority/NoAuthority";
import 通知管理 from "./views/notificationManagement/Notification";
import 晋升管理 from "./views/promotionSetting/PromotionSetting";

import 题库管理 from "src/modules/questionBankManagement/QuestionBankManagement"
import ChoiceQustionEdit from '../questionBankManagement/views/ChoiceQuestionEdit'
import FillingQuestionEdit from '../questionBankManagement/views/FillingQuestionEdit'
import ShortQuestionEdit from '../questionBankManagement/views/ShortQuestionEdit'
import LabelQuestionBank from '../questionBankManagement/views/LabelQuestionBank'
import UploadRecordQuestionBank from '../questionBankManagement/views/UploadRecordQuestionBank'
import UploadQuestionBank from '../questionBankManagement/views/UploadQuestionBank'
import WrongQuestionBank from '../questionBankManagement/views/WrongQuestionBank'

import { authStore, appStore } from "src/stores";

export default function ContinuingEdu(props: Props) {
  const [effect, setEffect] = useState(true);
  const [dataList, setDataList] = useState([] as any); // 菜单树
  // 写死的菜单列表
  const LEFT_MENU_CONFIG = [
    {
      title: "人员管理",
      icon: <RYGL />,
      path: "/continuingEdu/人员管理",
      component: 人员管理,
      // hide: true
    },
    {
      title: "审核发布",
      icon: <YNXXB />,
      path: "/continuingEdu/审核发布",
      component: 审核发布
    },
    {
      title: "评分管理",
      icon: <LXGL />,
      path: "/continuingEdu/评分管理",
      component: 评分管理,
      // hide: !appStore.isDev
    },
    ...dataList,
    {
      title: "通知管理",
      icon: <TZGL />,
      path: "/continuingEdu/通知管理",
      component: 通知管理
    },
    {
      title: "晋升管理",
      icon: <JSGL />,
      path: "/continuingEdu/晋升管理",
      component: 晋升管理,
      // hide: true
    },
    {
      title: '选择题新建和编辑',
      hide: true,
      path: '/continuingEdu/choiceQuestionEdit',
      component: ChoiceQustionEdit
    },
    {
      title: '填空题新建和编辑',
      hide: true,
      path: '/continuingEdu/fillingQuestionEdit',
      component: FillingQuestionEdit
    },
    {
      title: '问答题新建和编辑',
      hide: true,
      path: '/continuingEdu/shortQuestionEdit',
      component: ShortQuestionEdit
    },
    {
      title: '标签题库',
      hide: true,
      path: '/continuingEdu/labelQuestionBank',
      component: LabelQuestionBank
    },
    {
      title: '导入题库',
      hide: true,
      path: '/continuingEdu/uploadRecordQuestionBank',
      component: UploadRecordQuestionBank
    },
    {
      title: '上传新题库',
      hide: true,
      path: '/continuingEdu/uploadQuestionBank',
      component: UploadQuestionBank
    },
    {
      title: '错题反馈',
      hide: true,
      path: '/continuingEdu/wrongQuestionBank',
      component: WrongQuestionBank
    },
    {
      title: "题库管理",
      icon: <TKGL />,
      path: "/continuingEdu/questionBankManagement",
      component: 题库管理,
      hide: true
    },
    {
      title: "菜单设置",
      icon: <KSGL />,
      path: "/continuingEdu/菜单设置",
      component: 菜单设置,
      hide: !authStore.isDepartment // 菜单设置只有护理部可见
    }
  ];
  // 查询获取动态菜单列表
  const getList = () => {
    if (effect) {
      meunSettingApi.getData().then((res: any) => {
        let newArr: any = [];
        if (res.data) {
          let arr = res.data;
          if (arr.length > 0) {
            arr.map((item: any, index: number) => {
              var obj1: any = {
                id: item.id,
                title: item.name,
                icon: getIcon(item.sort),
                component: 无权限,
                path: `/continuingEdu/${item.name}?Pid=${item.id}`
              };
              if (item.childList && item.childList.length) {
                let Pid = item.id;
                let arr: any = [];
                item.childList.map((item: any, index: any) => {
                  var obj2: any = {
                    id: item.id,
                    title: item.name,
                    component: 主列表页,
                    path: `/continuingEdu/${Pid}/${item.id}?Pid=${Pid}&id=${
                      item.id
                      }`
                  };
                  arr.push(obj2);
                  obj1.children = arr;
                });
              }
              newArr.push(obj1);
            });
            setDataList(newArr);
          } else {
            setDataList([]);
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
        return <JXJH />;
      case 2:
        return <LXGL />;
      case 3:
        return <SPXX />;
      case 4:
        return <TKGL />;
      case 5:
        return <PXGL />;
      case 6:
        return <JJSZ />;
      default:
        return <JXJH />;
    }
  };

  let currentRoutePath =
    `${props.history.location.pathname}${props.history.location.search}` || "";
  let currentRoute = getTargetObj(LEFT_MENU_CONFIG, "path", currentRoutePath);
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find(
          (item1: any) => targetName.indexOf(item1[targetKey]) >= 0
        );
      } else {
        return targetName.indexOf(item[targetKey]) >= 0;
      }
    });
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find(
        (item1: any) => targetName.indexOf(item1[targetKey]) >= 0
      );
    }
    return chooseRoute;
  }
  return (
    <Wrapper>
      <LeftWrapper>
        <LeftMenu config={LEFT_MENU_CONFIG} menuTitle="学习培训" />
      </LeftWrapper>
      <MainWrapper>
        {currentRoute && currentRoute.component && (
          <currentRoute.component
            getTitle={currentRoute && currentRoute.title} //菜单标题
            getId={currentRoute && currentRoute.id} //菜单id
            getList={getList} // 动态菜单树
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
