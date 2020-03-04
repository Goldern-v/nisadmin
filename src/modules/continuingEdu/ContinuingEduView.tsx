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
export interface Props extends RouteComponentProps {}
import 菜单设置 from "./views/菜单设置/MenuSettings";
import 主列表页 from "./views/主表单页/MainPage";

export default function ContinuingEdu(props: Props) {
  const [effect, setEffect] = useState(true);
  const [dataList, setDataList] = useState([] as any); // 菜单树
  // 查询获取菜单列表
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
                component: getComponent(item.name),
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
        return <JXJH />;
    }
  };

  // 获取组件变量名
  const getComponent = (name: any) => {
    switch (name) {
      case "菜单设置":
        return 菜单设置;
      default:
        return "";
    }
  };

  let currentRoutePath =
    `${props.history.location.pathname}${props.history.location.search}` || "";
  let currentRoute = getTargetObj(dataList, "path", currentRoutePath);
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
        <LeftMenu config={dataList} menuTitle="继续教育" />
      </LeftWrapper>
      <MainWrapper>
        {currentRoute && currentRoute.component && (
          <currentRoute.component
            getTitle={currentRoute && currentRoute.title} //对应菜单标题
            getId={currentRoute && currentRoute.id} //对应菜单id
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
