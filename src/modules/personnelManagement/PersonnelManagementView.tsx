import styled from "styled-components";
import React from "react";
import LeftMenuPage from "src/components/LeftMenuPage";
import { appStore } from "src/stores";
import { meunConfig as menuConfig_wh } from "./config/menuConfig_wh";
import { meunConfig as menuConfig_jmfy } from "./config/menuConfig_jmfy";
import { meunConfig as menuConfig_gzhd } from "./config/menuConfig_gzhd";
import { meunConfig as menuConfig_hj } from "./config/menuConfig_hj";
import { meunConfig as menuConfig_nys } from "./config/menuConfig_nys";
import { meunConfig as menuConfig_dghl } from "./config/menuConfig_dghl";
export interface Props { }

export default function PersonnelManagementView() {
  const leftMenuConfig = (() => {
    switch (appStore.HOSPITAL_ID) {
      case 'wh':
      case 'gzsrm':
        return menuConfig_wh;
      case 'jmfy':
        return menuConfig_jmfy;
      case 'nys':
        return menuConfig_nys;
      case 'gzhd':
        return menuConfig_gzhd;
      case 'dghl':
        return menuConfig_dghl;
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
