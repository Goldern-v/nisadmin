import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import LeftMenuPage from "src/components/LeftMenuPage";
import { appStore } from "src/stores";
import HandoverRegister from "./page/HandoverRegister/HandoverRegister";
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
export interface Props {}

export default function WardRegisterRouter() {
  const leftMenuConfig = [
    {
      title: "物品交接登记本",
      path: "/wardRegister",
      component: { ...HandoverRegister },
      icon: <WPJJ />,
      payload: {
        registerCode: "QCRG_01"
      }
    },
    {
      title: "特殊交接登记本",
      path: "/wardRegister/QCRG_02",
      component: { ...HandoverRegister },
      icon: <TSWP />,
      payload: {
        registerCode: "QCRG_02"
      }
    },
    {
      title: "重点患者评估登记本",
      path: "/wardRegister/QCRG_03",
      component: { ...HandoverRegister },
      icon: <ZDHZ />,
      payload: {
        registerCode: "QCRG_03"
      }
    },
    {
      title: "医嘱核对登记本",
      path: "/wardRegister/QCRG_04",
      component: { ...HandoverRegister },
      icon: <YZHD />,
      payload: {
        registerCode: "QCRG_04"
      }
    },
    {
      title: "床单位消毒登记本",
      path: "/wardRegister/QCRG_05",
      component: { ...HandoverRegister },
      icon: <CDWXD />,
      payload: {
        registerCode: "QCRG_05"
      }
    },
    {
      title: "紫外线空气消毒登记本",
      path: "/wardRegister/QCRG_06",
      component: { ...HandoverRegister },
      icon: <ZWXKQ />,
      payload: {
        registerCode: "QCRG_06"
      }
    },
    {
      title: "消毒隔离工作登记本",
      path: "/wardRegister/QCRG_07",
      component: { ...HandoverRegister },
      icon: <XDGL />,
      payload: {
        registerCode: "QCRG_07"
      }
    },
    {
      title: "出院患者登记本",
      path: "/wardRegister/QCRG_08",
      component: { ...HandoverRegister },
      icon: <CYHZ />,
      payload: {
        registerCode: "QCRG_08"
      }
    },
    {
      title: "备用药品管理登记本",
      path: "/wardRegister/QCRG_10",
      component: { ...HandoverRegister },
      icon: <BYYP />,
      payload: {
        registerCode: "QCRG_10"
      }
    },
    {
      title: "仪器设备使用登记",
      path: "/wardRegister/QCRG_11",
      component: { ...HandoverRegister },
      icon: <YQSB />,
      payload: {
        registerCode: "QCRG_11"
      }
    },
    {
      title: "急救车使用登记本",
      path: "/wardRegister/QCRG_12",
      component: { ...HandoverRegister },
      icon: <JJCSY />,
      payload: {
        registerCode: "QCRG_12"
      }
    },
    {
      title: "毒麻药品使用登记",
      path: "/wardRegister/QCRG_13",
      component: { ...HandoverRegister },
      icon: <DMYP />,
      payload: {
        registerCode: "QCRG_13"
      }
    },
    {
      title: "库房物品登记本",
      icon: <KFWP />,
      children: [
        {
          title: "库房物品入库登记",
          path: "/wardRegister/QCRG_14_1",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_14_1"
          }
        },
        {
          title: "库房物品管理登记",
          path: "/wardRegister/QCRG_14_2",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_14_2"
          }
        }
      ]
    },

    {
      title: "中医护理登记本",
      icon: <ZYHL />,
      children: [
        {
          title: "中医护理登记",
          path: "/wardRegister/QCRG_15_1",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_15_1"
          }
        },
        {
          title: "中医护理技术项目统计表",
          path: "/wardRegister/QCRG_15_2",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_15_2"
          }
        },
        {
          title: "中医护理方案季度评价总结表",
          path: "/wardRegister/QCRG_15_3",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_15_3"
          }
        },
        {
          title: "中医护理方案实施效果半年评价总结",
          path: "/wardRegister/QCRG_15_4",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_15_4"
          }
        }
      ]
    },
    {
      title: "静脉治疗登记",
      icon: <JMZL />,
      children: [
        {
          title: "静脉治疗并发登记本",
          path: "/wardRegister/QCRG_16_1",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_16_1"
          }
        },
        {
          title: "静脉治疗月度统计登记",
          path: "/wardRegister/QCRG_16_2",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_16_2"
          }
        },
        {
          title: "静脉治疗月度统计登记",
          path: "/wardRegister/QCRG_16_3",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_16_3"
          }
        }
      ]
    },

    {
      title: "护患沟通记录",
      icon: <HHGT />,
      path: "/wardRegister/QCRG_17",
      component: { ...HandoverRegister },
      payload: {
        registerCode: "QCRG_17"
      }
    },
    {
      title: "健康教育授课登记表",
      path: "/wardRegister/QCRG_18",
      component: { ...HandoverRegister },
      icon: <JKJY />,
      payload: {
        registerCode: "QCRG_18"
      }
    },
    {
      title: "实习、进修、新职工人员信息",
      icon: <SXJX />,
      children: [
        {
          title: "实习人员登记",
          path: "/wardRegister/QCRG_19_1",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_19_1"
          }
        },
        {
          title: "实习、进修人员、新职工、轮转职工登记",
          path: "/wardRegister/QCRG_19_1",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_19_2"
          }
        },
        {
          title: "新职工、轮转职工登记",
          path: "/wardRegister/QCRG_19_1",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_19_3"
          }
        }
      ]
    },
    {
      title: "生命支持仪器管理",
      icon: <SMZC />,
      children: [
        {
          title: "生命支持仪器交接登记",
          path: "/wardRegister/QCRG_20_1",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_20_1"
          }
        },
        {
          title: "生命支持仪器检查登记",
          path: "/wardRegister/QCRG_20_2",
          component: { ...HandoverRegister },
          payload: {
            registerCode: "QCRG_20_2"
          }
        }
      ]
    }
  ];

  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  #left-menu-con {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
