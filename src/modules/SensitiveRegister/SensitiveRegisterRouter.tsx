import styled from "styled-components";
import React, { useEffect, useState } from "react";
// import { Button } from "antd";
import LeftMenuPage from "src/components/LeftMenuPage";
import { appStore, authStore } from "src/stores";
import { ReactComponent as WPJJ } from "./images/icon/WPJJ.svg";
import { ReactComponent as TSWP } from "./images/icon/TSWP.svg";
import { ReactComponent as ZDHZ } from "./images/icon/ZDHZ.svg";
import { ReactComponent as YZHD } from "./images/icon/YZHD.svg";
import { ReactComponent as CDWXD } from "./images/icon/CDWXD.svg";
import { ReactComponent as ZWXKQ } from "./images/icon/ZWXKQ.svg";
import { ReactComponent as XDGL } from "./images/icon/XDGL.svg";
import { ReactComponent as CYHZ } from "./images/icon/CYHZ.svg";
import { ReactComponent as BYYP } from "./images/icon/BYYP.svg";
import { ReactComponent as YQSB } from "./images/icon/YQSB.svg";
import { ReactComponent as JJCSY } from "./images/icon/JJCSY.svg";
import { ReactComponent as DMYP } from "./images/icon/DMYP.svg";
import { ReactComponent as KFWP } from "./images/icon/KFWP.svg";
import { ReactComponent as ZYHL } from "./images/icon/ZYHL.svg";
import { ReactComponent as JMZL } from "./images/icon/JMZL.svg";
import { ReactComponent as HHGT } from "./images/icon/HHGT.svg";
import { ReactComponent as JKJY } from "./images/icon/JKJY.svg";
import { ReactComponent as SXJX } from "./images/icon/SXJX.svg";
import { ReactComponent as SMZC } from "./images/icon/SMZC.svg";
import 敏感指标登记本 from "./page/敏感指标登记本/敏感指标登记本";
import 登记本全科室导出 from "./page/登记本全科室导出/登记本全科室导出"
import IndexPage from './page/IndexPage'
import { sensitiveRegisterService } from './services/SensitiveRegisterService'
// import 基础模板登记本 from './page/基础模板登记本/基础模板登记本'

import { observer } from "mobx-react-lite";

// export interface Props { }

function SensitiveRegisterRouter() {

  const [registerList, setRegisterList] = useState([] as any)
  const [loading, setLoading] = useState(false)

  let leftMenuConfig = [
    {
      title: "缺少权限",
      path: "/sensitiveRegister",
      component: function Nope() {
        appStore.history.replace('/login')
        return <div></div>
      },
      icon: <BYYP />,
    }
  ] as any[]

  const exportAllMenuConfig = [
    {
      title: "备用药品管理登记本导出",
      path: "/sensitiveRegister/QCRG_10",
      component: 登记本全科室导出,
      icon: <BYYP />,
      payload: {
        registerCode: "QCRG_10",
        registerName: "备用药品管理登记本"
      }
    },
    {
      title: "急救车物品、药品检查登记本",
      path: "/sensitiveRegister/QCRG_12_2",
      component: 登记本全科室导出,
      icon: <JJCSY />,
      payload: {
        registerCode: "QCRG_12_2",
        registerName: "急救车物品、药品检查登记本"
      }
    }
  ]

  const editMenuConfig = [
    {
      title: "首页",
      path: "/sensitiveRegister",
      hide: true,
      component: IndexPage
    },
    ...registerList.map((item: any) => ({
      title: item.registerName,
      path: `/sensitiveRegister/${item.registerCode}`,
      component: { ...敏感指标登记本 },
      icon: <ZDHZ />,
      payload: {
        registerCode: item.registerCode,
        registerName: item.registerName
      }
    }))
  ]

  if (authStore.user?.empNo) {
    if ((authStore.user?.empNo || '').toUpperCase() == 'Y0001')
      leftMenuConfig = exportAllMenuConfig
    else
      leftMenuConfig = editMenuConfig
  }

  const initNavList = () => {
    setLoading(true)
    sensitiveRegisterService.getRegisterList()
      .then(res => {
        setLoading(false)
        if (res.data) setRegisterList(res.data)
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

export default observer(SensitiveRegisterRouter)

const Wrapper = styled.div`
  #left-menu-con {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
