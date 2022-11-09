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
export type ConfigType = (app:any,auth: any) => navConfigItem[]
const baseConfig:ConfigType = (app, auth) => ([
  {
    name: "学习培训",
    path: "/continuingEdu"
  },
  ...appStore.hisMatch({
    map: {
      'qhwy,whhk,dglb': [
        {
          name: "排班管理",
          path: "/personnelManagement"
        },
      ],
      other: []
    },
    vague: true
  })
]);

const beConfig: ConfigType = (app, auth) => ([]);

export const navConfig: ConfigType = appStore.onlyBadEvent
  ? beConfig
  : baseConfig;
