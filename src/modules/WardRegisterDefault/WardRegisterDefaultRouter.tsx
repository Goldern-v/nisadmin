import styled from "styled-components";
import React, { useEffect, useState } from "react";
// import { Button } from "antd";
import LeftMenuPage from "src/components/LeftMenuPage";
import { appStore, authStore } from "src/stores";
// import { ReactComponent as WPJJ } from "./images/icon/WPJJ.svg";
// import { ReactComponent as TSWP } from "./images/icon/TSWP.svg";
import { ReactComponent as ZDHZ } from "./images/icon/ZDHZ.svg";
// import { ReactComponent as YZHD } from "./images/icon/YZHD.svg";
// import { ReactComponent as CDWXD } from "./images/icon/CDWXD.svg";
// import { ReactComponent as ZWXKQ } from "./images/icon/ZWXKQ.svg";
// import { ReactComponent as XDGL } from "./images/icon/XDGL.svg";
// import { ReactComponent as CYHZ } from "./images/icon/CYHZ.svg";
import { ReactComponent as BYYP } from "./images/icon/BYYP.svg";
// import { ReactComponent as YQSB } from "./images/icon/YQSB.svg";
// import { ReactComponent as JJCSY } from "./images/icon/JJCSY.svg";
// import { ReactComponent as DMYP } from "./images/icon/DMYP.svg";
// import { ReactComponent as KFWP } from "./images/icon/KFWP.svg";
// import { ReactComponent as ZYHL } from "./images/icon/ZYHL.svg";
// import { ReactComponent as JMZL } from "./images/icon/JMZL.svg";
// import { ReactComponent as HHGT } from "./images/icon/HHGT.svg";
// import { ReactComponent as JKJY } from "./images/icon/JKJY.svg";
// import { ReactComponent as SXJX } from "./images/icon/SXJX.svg";
// import { ReactComponent as SMZC } from "./images/icon/SMZC.svg";
import 默认病区登记表记本 from "./page/默认病区登记表记本/默认病区登记表记本";
// import 登记本全科室导出 from "./page/登记本全科室导出/登记本全科室导出"
import IndexPage from './page/IndexPage'
import { wardRegisterDefaultService } from './services/WardRegisterDefaultService'
// import 基础模板登记本 from './page/基础模板登记本/基础模板登记本'

import { observer } from "mobx-react-lite";

// export interface Props { }

function WardRegisterDefaultRouter() {

  const [registerList, setRegisterList] = useState([] as any)
  const [loading, setLoading] = useState(false)

  // let leftMenuConfig = [
  //   {
  //     title: "缺少权限",
  //     path: "/wardRegister",
  //     component: function Nope() {
  //       appStore.history.replace('/login')
  //       return <div></div>
  //     },
  //     icon: <BYYP />,
  //   }
  // ] as any[]

  const leftMenuConfig = [
    {
      title: "首页",
      path: "/wardRegister",
      hide: true,
      component: IndexPage
    },
    ...registerList.map((item: any) => ({
      title: item.registerName,
      path: `/wardRegister/${item.registerCode}`,
      component: { ...默认病区登记表记本 },
      hide: !item.menu,
      icon: <ZDHZ />,
      payload: {
        registerCode: item.registerCode,
        registerName: item.registerName
      }
    }))
  ]

  const initNavList = () => {
    setLoading(true)
    wardRegisterDefaultService.getMenu()
      .then(res => {
        setLoading(false)
        if (res.data) setRegisterList(res.data.map((menuItem: any) => {
          let pathArr = menuItem.url.split('/')
          let registerCode = pathArr[pathArr.length - 1]

          return {
            ...menuItem,
            registerName: menuItem.name,
            registerCode,
          }
        }))
      }, () => setLoading(false))
  }
  useEffect(() => {
    initNavList()
  }, [])

  return (
    <Wrapper>
      <LeftMenuPage
        leftMenuConfig={leftMenuConfig}
        stopActiveNext={true}
        loading={loading} />
    </Wrapper>
  );
}

export default observer(WardRegisterDefaultRouter)

const Wrapper = styled.div`
  #left-menu-con {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
