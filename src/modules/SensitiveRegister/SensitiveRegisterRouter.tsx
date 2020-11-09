import styled from "styled-components";
import React, {
  // useState, useEffect 
} from "react";
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
// import 基础模板登记本 from './page/基础模板登记本/基础模板登记本'

import { observer } from "mobx-react-lite";

// export interface Props { }

function SensitiveRegisterRouter() {

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
    {
      title: "敏感指标登记本",
      path: "/sensitiveRegister/QCRG_03",
      component: { ...敏感指标登记本 },
      icon: <ZDHZ />,
      payload: {
        registerCode: "QCRG_03",
        registerName: "敏感指标登记本"
      }
    },
    {
      title: "医嘱核对登记本",
      path: "/sensitiveRegister/QCRG_04",
      component: { ...敏感指标登记本 },
      icon: <YZHD />,
      // hide: !appStore.isDev,
      payload: {
        registerCode: "QCRG_04",
        registerName: "医嘱核对登记本"
      }
    },
    {
      title: "床单位消毒登记本",
      path: "/sensitiveRegister/QCRG_05",
      component: { ...敏感指标登记本 },
      icon: <CDWXD />,
      payload: {
        registerCode: "QCRG_05",
        registerName: "床单位消毒登记本"
      }
    },
    {
      title: "出院患者登记本",
      path: "/sensitiveRegister/QCRG_08",
      component: { ...敏感指标登记本 },
      icon: <CYHZ />,
      payload: {
        registerCode: "QCRG_08",
        registerName: "出院患者登记本"
      }
    },
    {
      title: "药品管理登记本",
      icon: <BYYP />,
      children: [
        {
          title: "备用药品管理登记本",
          path: "/sensitiveRegister/QCRG_10",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_10",
            registerName: "备用药品管理登记本"
          }
        },
        // {
        //   title: "毒麻药品管理登记本",
        //   path: "/sensitiveRegister/QCRG_13",
        //   component: { ...敏感指标登记本 },
        //   payload: {
        //     registerCode: "QCRG_13",
        //     registerName: "毒麻药品管理登记本"
        //   }
        // },
      ],
    },
    {
      title: "急救车管理登记本",
      icon: <JJCSY />,
      children: [
        {
          title: "急救车使用登记本",
          path: "/sensitiveRegister/QCRG_12",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_12",
            registerName: "急救车使用登记本"
          }
        },
        {
          title: "急救车物品、药品检查登记本",
          path: "/sensitiveRegister/QCRG_12_2",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_12_2",
            registerName: "急救车物品、药品检查登记本"
          }
        },
      ]
    },
    {
      title: "物品管理登记本",
      icon: <KFWP />,
      children: [
        {
          title: "治疗室物品管理登记",
          path: "/sensitiveRegister/QCRG_21",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_21",
            registerName: "治疗室物品管理登记"
          }
        },
        {
          title: "库房物品管理登记",
          path: "/sensitiveRegister/QCRG_14_2",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_14_2",
            registerName: "库房物品管理登记"
          }
        },
      ]
    },
    {
      title: "静脉治疗登记",
      icon: <JMZL />,
      // hide: !appStore.isDev,
      children: [
        {
          title: "静脉治疗并发症登记本",
          path: "/sensitiveRegister/QCRG_16_1",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_16_1",
            registerName: "静脉治疗并发症登记本"
          }
        },
        {
          title: "静脉治疗月度统计登记",
          path: "/sensitiveRegister/QCRG_16_2",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_16_2",
            registerName: "静脉治疗月度统计登记"
          }
        },
        {
          title: "静脉治疗相关培训登记",
          path: "/sensitiveRegister/QCRG_16_3",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_16_3",
            registerName: "静脉治疗相关培训登记"
          }
        },
        {
          title: "静脉治疗日统计表",
          path: "/sensitiveRegister/QCRG_16_4",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_16_4",
            registerName: "静脉治疗日统计表"
          }
        }
      ]
    },
    {
      title: "实习进修新职工登记",
      path: "/sensitiveRegister/QCRG_19_2",
      icon: <SXJX />,
      component: { ...敏感指标登记本 },
      payload: {
        registerCode: "QCRG_19_2",
        registerName: "实习进修新职工登记"
      }
    },
    {
      title: "生命支持仪器管理",
      icon: <SMZC />,
      children: [
        {
          title: "生命支持仪器交接登记",
          path: "/sensitiveRegister/QCRG_20_1",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_20_1",
            registerName: "生命支持仪器交接登记"
          }
        },
        {
          title: "生命支持仪器检查登记（特殊科室）",
          path: "/sensitiveRegister/QCRG_20_2",
          component: { ...敏感指标登记本 },
          payload: {
            registerCode: "QCRG_20_2",
            registerName: "生命支持仪器检查登记（特殊科室）"
          }
        }
      ]
    },
  ]

  if (authStore.user?.empNo) {
    if ((authStore.user?.empNo || '').toUpperCase() == 'Y0001')
      leftMenuConfig = exportAllMenuConfig
    else
      leftMenuConfig = editMenuConfig
  }

  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} stopActiveNext={true} />
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
