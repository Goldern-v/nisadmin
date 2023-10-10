// 佛山第一人民医院 用聊城二院模板
import React from "react";
import { appStore, authStore } from "src/stores";
import qs from 'qs'
import CryptoJS from"crypto-js"
import axios from 'axios'

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
    name: "首页",
    path: "/home"
  },
  {
    name: "审核管理",
    path: "/auditsManagement",
    //hidden: !authStore.isRoleManage
  },
  {
    name: "病区日志",
    path: "/wardLog"
    // hidden: !appStore.isDev
  },
  {
    name: "档案管理",
    path: "/nurseFile",
    //hidden: !authStore.isRoleManage
  },
  // {
  //   name: '不良事件',
  //   path: '/badEventsNewList',
  //   hidden: !appStore.isDev,
  // },
  // {
  //   name: '不良事件分析报告',
  //   path: '/badEvents/alanysis/1/1'
  // },
  // {
  //   name: "质量管理",
  //   children: [
  //     {
  //       name: "专项检查",
  //       path: "/qcThree",
  //       icon: require("../images/menu-icon/三级质控@2x.png")
  //     },
  //     {
  //       name: "交叉检查",
  //       path: "/qcTwo",
  //       icon: require("../images/menu-icon/二级质控@2x.png")
  //     },
  //     {
  //       name: "科室自查",
  //       path: "/qcOneHj",
  //       icon: require("../images/menu-icon/一级质控@2x.png")
  //     },
  //     // {
  //     //   name: '病区登记本',
  //     //   path: '',
  //     //   icon: require('../images/menu-icon/病区登记本@2x.png')
  //     // },
  //     {
  //       name: "查询统计",
  //       path: "/queryStatistics",
  //       icon: require("../images/menu-icon/护理查房@2x.png")
  //     },
  //     {
  //       name: "夜查房",
  //       path: "/checkWard",
  //       icon: require("../images/menu-icon/护理查房@2x.png")
  //     }
  //   ]
  // },
  {
    name: "学习培训",
    path: "/continuingEdu"
    // hidden: !appStore.isDev
  },
  {
    name: "敏感指标",
    path: "/indicator"
  },
  {
    name: "敏感指标登记本",
    path: "/sensitiveRegister",
    // hidden: !appStore.isDev
  },
  {
    name: "统计查询",
    path: "/statistic"
  },
  {
    name: "通知公告",
    path: "/notice"
  },
  {
    name: "护理制度",
    path: "/nursingRulesNew"
  },
  {
    name: "系统设置",
    path: "/setting"
  },
  {
    name: "护理排班",
    path: "/personnelManagement"
  },
  {
    name: "质量管理",
    onClick:()=>{
      const acount =  JSON.parse(sessionStorage.getItem('user')!)!.empNo; // 待加密的明文数据
      const base64SecretKey = 'DjENO3BQGhSCpkwBWghkyQ=='; // 提供的密钥
      const secretKey = CryptoJS.enc.Base64.parse(base64SecretKey); // 将 Base64 字符串解析为密钥对象
      const encrypted = CryptoJS.AES.encrypt(acount, secretKey, {
        mode: CryptoJS.mode.ECB, 
        padding: CryptoJS.pad.Pkcs7 
      });
      const encryptedText = encrypted.toString(); // 将加密后的数据转换为字符串形式

      let params = {account:encryptedText}
      axios.post(`/crNursing/nursing-management/system/auth/thirdLogin`,qs.stringify(params)).then(res2=>{
        if(res2.data.data.accessToken){
          let {data:{data:{accessToken:token}}} = res2
          window.open(`http://192.168.103.158:9091/nursingManagementFront/?token=${token}`)
        }
      });
    }
  },
];

const beConfig: navConfigItem[] = []

export const navConfig: navConfigItem[] = appStore.onlyBadEvent ? beConfig : baseConfig
