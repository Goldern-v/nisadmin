import styled from "styled-components";
import React from "react";
import LeftMenuPage from "src/components/LeftMenuPage";
import { appStore, authStore } from "src/stores";
import { meunConfig as menuConfig_wh } from "./config/menuConfig_wh";
import { meunConfig as menuConfig_jmfy } from "./config/menuConfig_jmfy";
import { meunConfig as menuConfig_gzhd } from "./config/menuConfig_gzhd";
import { meunConfig as menuConfig_hj } from "./config/menuConfig_hj";
import { meunConfig as menuConfig_nys } from "./config/menuConfig_nys";
import { meunConfig as menuConfig_dghl } from "./config/menuConfig_dghl";
import { meunConfig as menuConfig_lcey } from "./config/menuConfig_lcey";
import { meunConfig as menuConfig_gzsrm } from "./config/menuConfig_gzsrm";
import { meunConfig as menuConfig_gxjb } from "./config/menuConfig_gxjb";
import { meunConfig as menuConfig_gxjbSelf } from "./config/menuConfig_gxjbSelf";

export interface Props {
}

export default function PersonnelManagementView() {
  const leftMenuConfig = (() => {
    switch (appStore.HOSPITAL_ID) {
      case 'wh':
        return menuConfig_wh;
      case 'gzsrm':
        return menuConfig_gzsrm;
      case 'jmfy':
        return menuConfig_jmfy;
      case 'nys':
        return menuConfig_nys;
      case 'gzhd':
        return menuConfig_gzhd;
      case 'dghl':
      case 'fqfybjy':
        return menuConfig_dghl;
      case 'lcey':
        return menuConfig_lcey;
      case 'fssdy':
        return menuConfig_wh;
      case 'gxjb':
        // return menuConfig_wh;
        if (authStore.isRoleManage) return menuConfig_gxjb;
        return menuConfig_gxjbSelf
      case 'fsxt':
        return menuConfig_wh;
      default:
        return menuConfig_hj;
    }
  })();

  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
