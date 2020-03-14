import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";
import LeftMenu from "src/components/LeftMenu";
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
export interface Props extends RouteComponentProps { }
import 人员管理 from "./人员管理";
import 审核发布 from "./views/auditEduPlant/AuditEduPlan";
import 评分管理 from "./views/scoreManage/ScoreManage";
import 菜单设置 from "./views/菜单设置/MenuSettings";
import 主列表页 from "./views/主表单页/MainPage";
import 无权限 from "./views/noAuthority/NoAuthority";
import 通知管理 from "./views/通知管理/Notification";
import { authStore } from "src/stores";

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
      hide: true
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
      hide: true
    },
    ...dataList,
    // 菜单设置只有护理部可见
    {
      title: "通知管理",
      icon: <RYGL />,
      path: "/continuingEdu/通知管理",
      component: 通知管理,
      hide: true
    },
    {
      title: "菜单设置",
      icon: <KSGL />,
      path: "/continuingEdu/菜单设置",
      component: 菜单设置,
      hide: !authStore.isDepartment
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
                    path: `/continuingEdu/${item.name}?Pid=${Pid}&id=${item.id}`
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
  // 获取组件变量名
  // const getComponent = (name: any) => {
  //   switch (name) {
  //     case "菜单设置":
  //       return 菜单设置;
  //     default:
  //       return "";
  //   }
  // };

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
            getTitle={currentRoute && currentRoute.title} //对应菜单标题
            getId={currentRoute && currentRoute.id} //对应菜单id
            getList={getList}
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
