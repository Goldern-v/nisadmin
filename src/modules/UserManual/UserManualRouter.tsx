import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { RouteComponentProps } from "src/components/RouterView";
import { KeepAlive } from "react-keep-alive";
export interface Props extends RouteComponentProps<{ name?: string }> {}
import { appStore } from "src/stores";
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
import { userManualApi } from "./api/UserManualApi";

export default function UserManualRouter(props: Props) {
  const [effect, setEffect] = useState(true);
  const [arrData, setArrData] = useState([] as any);
  const [type, setType] = useState(1); //1--内容 2--提示跳转
  const [resData, setResData] = useState([] as any); // 测试用

  useLayoutEffect(() => {
    setEffect(false);
  }, []);

  // 初始化
  useEffect(() => {
    setEffect(true);
    getList();
  }, [props.history.location.pathname]);

  // 查询目录列表
  const getList = () => {
    if (effect) {
      userManualApi.setGetData().then((res: any) => {
        let newArr: any = [];
        if (res.data.length > 0) {
          setType(1);
          let arr = res.data.filter((item: any) => item.isShow);
          if (arr && arr.length > 0) {
            var obj1: any = {
              component: Content,
              keepAlive: true,
              disabledKeepAlive:
                (appStore.history && appStore.history.action) !== "POP"
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
            newArr = [
              {
                title: "首页相关指导",
                icon: <SY />,
                path: "/UserManual/首页相关指导",
                component: Content,
                keepAlive: true,
                disabledKeepAlive:
                  (appStore.history && appStore.history.action) !== "POP"
              }
            ];
            setArrData(newArr);
            appStore.history.push(`/UserManual/首页相关指导`);
          }
        } else {
          setType(0);
          newArr = [
            {
              title: "首页相关指导",
              icon: <SY />,
              path: "/UserManual/首页相关指导",
              component: Content,
              keepAlive: true,
              disabledKeepAlive:
                (appStore.history && appStore.history.action) !== "POP"
            }
          ];
          setArrData(newArr);
          appStore.history.push(`/UserManual/首页相关指导`);
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
  let currentRoute = getTargetObj(arrData, "path", currentRoutePath);
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
      <LeftMenuCon>
        <LeftMenu config={arrData} />
      </LeftMenuCon>
      <MainCon>
        {currentRoute &&
          currentRoute.component &&
          (currentRoute.keepAlive ? (
            <KeepAlive
              name={currentRoute.path}
              disabled={currentRoute.disabledKeepAlive}
            >
              <currentRoute.component
                getTitle={currentRoute && currentRoute.title}
              />
            </KeepAlive>
          ) : (
            <currentRoute.component
              getTitle={currentRoute && currentRoute.title}
            />
          ))}
      </MainCon>
    </Wrapper>
  );
}
const Wrapper = styled.div`
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
