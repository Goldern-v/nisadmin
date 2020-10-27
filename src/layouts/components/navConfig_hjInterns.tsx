import React from "react";
import { appStore, authStore } from "src/stores";

export interface navConfigItem {
  onClick?: any;
  name: string;
  path?: string;
  children?: navConfigItem[];
  hidden?: boolean | Function;
  icon?: any;
  menuStyle?: React.CSSProperties;
}

const baseConfig: navConfigItem[] = [
  {
    name: "学习培训",
    path: "/continuingEdu"
  }
];

const beConfig: navConfigItem[] = [];

export const navConfig: navConfigItem[] = appStore.onlyBadEvent
  ? beConfig
  : baseConfig;
