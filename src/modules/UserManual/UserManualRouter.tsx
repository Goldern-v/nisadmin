import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { RouteComponentProps } from "src/components/RouterView";
import { KeepAlive } from "react-keep-alive";
export interface Props extends RouteComponentProps<{ name?: string }> {}
import { appStore, authStore } from "src/stores";
import Content from "./components/Content";
import { ReactComponent as YJZK } from "./images/YJZK.svg";
import { ReactComponent as SJZK } from "./images/SJZK.svg";
import { ReactComponent as EJZK } from "./images/EJZK.svg";
import { ReactComponent as SHGL } from "./images/SHGL.svg";
import { ReactComponent as WDDA } from "./images/WDDA.svg";
import { ReactComponent as HLZD } from "./images/HLZD.svg";
import { ReactComponent as PBGL } from "./images/PBGL.svg";
import { ReactComponent as DAGL } from "./images/DAGL.svg";
import { ReactComponent as BQDJ } from "./images/BQDJ.svg";
import { ReactComponent as BQGL } from "./images/BQGL.svg";
import { ReactComponent as TZGG } from "./images/TZGG.svg";
import { ReactComponent as SY } from "./images/SY.svg";
import { ReactComponent as KSGL } from "./images/KSGL.svg";
import 目录设置 from "./view/SetUserManual";
import { userManualApi } from "./api/UserManualApi";

export default function UserManualRouter(props: Props) {
  const [effect, setEffect] = useState(true);
  const [arrData, setArrData] = useState([] as any);
  const [type, setType] = useState(0); // 1--空页面

  useLayoutEffect(() => {
    setEffect(false);
  }, []);

  // 初始化
  useEffect(() => {
    setEffect(true);
    getDataList();
  }, [props.history.location.pathname]);

  const LEFT_MENU_CONFIG = [
    ...arrData,
    {
      title: "目录设置",
      icon: <KSGL />,
      path: "/UserManual/setUserManual",
      component: 目录设置,
      hide: !authStore.isAdmin
    }
  ];
  // 查询获取动态菜单列表

  // 查询目录列表
  const getDataList = () => {
    if (effect) {
      userManualApi.setGetData().then((res: any) => {
        let newArr: any = [];
        if (res.data.length > 0) {
          let arr = res.data.filter((item: any) => item.isShow);
          if (arr && arr.length > 0) {
            var obj1: any = {
              component: Content
            };
            arr.map((item: any, index: number) => {
              var obj2: any = {
                title: item.type,
                icon: getIcon(item.icon),
                path: `/UserManual/${item.type}`
              };
              let obj: any = { ...obj1, ...obj2 };
              newArr.push(obj);
            });
            setArrData(newArr);
            if (appStore.location.pathname == "/UserManual")
              appStore.history.push(`/UserManual/${newArr[0].title}`);
          } else {
            setArrData([]);
            if (authStore.isAdmin) {
              appStore.history.push(`/UserManual/setUserManual`);
            } else {
              setType(1);
              appStore.history.push(`/UserManual`);
            }
          }
        }
      });
    }
  };

  // 获取图表icon
  const getIcon = (icon: any) => {
    switch (icon) {
      case "1":
        return <SY />;
      case "2":
        return <SHGL />;
      case "3":
        return <PBGL />;
      case "4":
        return <BQDJ />;
      case "5":
        return <YJZK />;
      case "6":
        return <EJZK />;
      case "7":
        return <SJZK />;
      case "8":
        return <TZGG />;
      case "9":
        return <HLZD />;
      case "10":
        return <DAGL />;
      case "11":
        return <WDDA />;
      case "12":
        return <BQGL />;
      default:
        return <BQDJ />;
    }
  };

  let currentRoutePath = props.history.location.pathname || "";
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
      {type === 1 ? (
        <ContentSecond>暂无平台手册</ContentSecond>
      ) : (
        <ContentFirst>
          <LeftMenuCon>
            <LeftMenu config={LEFT_MENU_CONFIG} />
          </LeftMenuCon>
          <MainCon>
            {currentRoute && currentRoute.component && (
              <currentRoute.component
                getTitle={currentRoute && currentRoute.title} //菜单标题
                getDataList={getDataList} // 动态菜单树
              />
            )}
          </MainCon>
        </ContentFirst>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div``;

const ContentFirst = styled.div`
  overflow: hidden;
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
  .NtvMn svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    position: relative;
    top: 6px;
  }
  .cls-13 {
    fill: none !important;
  }
`;
const ContentSecond = styled.div`
  height: calc(100vh - 50px);
  text-align: center;
  font-size: 30px;
  line-height: calc(100vh - 50px);
`;
const LeftMenuCon = styled.div`
  width: 200px;
`;
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;
