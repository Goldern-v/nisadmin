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
import { meunConfig as menuConfig_dgxg } from "./config/menuConfig_dgxg";
import { meunConfig as menuConfig_whyx } from "./config/menuConfig_whyx";
import { meunConfig as menuConfig_qhwy } from "./config/menuConfig_qhwy";
import { meunConfig as menuConfig_lyrm } from "./config/menuConfig_lyrm";
import { meunConfig as menuConfig_whsl } from "./config/menuConfig_whsl";
import { meunConfig as menuConfig_wjgdszd } from "./config/menuConfig_wjgdszd";
import { meunConfig as menuConfig_nfzxy } from "./config/menuConfig_nfzxy";
import { meunConfig as menuConfig_zhzxy } from "./config/menuConfig_zhzxy";

export interface Props {
}

export default function PersonnelManagementView() {
  const leftMenuConfig = (() => {
    switch (appStore.HOSPITAL_ID) {
      case 'wh':
      case 'lyyz':
      case 'ytll':
        return menuConfig_wh;
      case 'qhwy':
        return menuConfig_qhwy;
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
      case 'nfzxy':
        return menuConfig_nfzxy;
      case 'lcey':
        return menuConfig_lcey;
      case 'fssdy':
        return menuConfig_wh;
      case 'gxjb':
        return menuConfig_gxjb;
      // if (authStore.isRoleManage) return menuConfig_gxjb;
      // return menuConfig_gxjbSelf
      case 'fsxt':
        return menuConfig_wh;
      case 'dgxg':
        return menuConfig_dgxg;
      case 'whyx'://武汉亚心
        return menuConfig_whyx;
      case 'sdlj'://顺德龙江
        return menuConfig_wh;
      case 'lyrm'://临邑人民
        return menuConfig_lyrm;
      case 'gdtj':
        return menuConfig_wh;
      case 'whsl':
        return menuConfig_whsl
      case 'wjgdszd':
        return menuConfig_wjgdszd
      case 'zhzxy':
        return menuConfig_zhzxy
      default:
        return menuConfig_hj;
    }
  })();
  const list = ((array: any) => {
    return array.map((item: any) => {
      if (item.iSlimit) {
        if (!item.special) item['hide'] = !authStore.isRoleManage
        else item['hide'] = !(authStore.user?.empNo == 'G6051' || authStore.user?.empNo == 'ADMIN')
      }
      if (item.children?.length > 0) {
        list(item.children)
      }
      return item
    })
  })

  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={list(leftMenuConfig)} />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
