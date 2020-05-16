import React from "react";

import { ReactComponent as HLMGZL } from "./images/HLMGZL.svg";
import { ReactComponent as LCHL } from "./images/LCHL.svg";
import { ReactComponent as ZKHL } from "./images/ZKHL.svg";
import { ReactComponent as HLGZZL } from "./images/HLGZZL.svg";

export const LEFT_MENU = [
  {
    title: "护理质量相关数据",
    icon: <ZKHL />,
    path: "/indicator/护理质量相关数据"
  },
  {
    title: "护理敏感质量指标",
    icon: <HLMGZL />,
    children: [
      { title: "床护比统计", path: "/indicator/床护比统计" },
      { title: "护患比统计", path: "/indicator/护患比统计" },
      { title: "24小时平均护理时数", path: "/indicator/24小时平均护理时数" },
      { title: "不同级别护士配置", path: "/indicator/不同级别护士配置" },
      { title: "护士离职率", path: "/indicator/护士离职率" },
      { title: "住院患者跌倒发生率", path: "/indicator/住院患者跌倒发生率" },
      { title: "院内压疮发生率", path: "/indicator/院内压疮发生率" },
      { title: "住院患者身体约束率", path: "/indicator/住院患者身体约束率" },
      {
        title: "插管患者非计划拔管发生率",
        path: "/indicator/插管患者非计划拔管发生率"
      },
      {
        title: "导尿管相关尿路感染发生率",
        path: "/indicator/导尿管相关尿路感染发生率"
      },
      {
        title: "中心导管相关血流感染发生率",
        path: "/indicator/中心导管相关血流感染发生率"
      },
      {
        title: "呼吸机相关性肺炎发生率",
        path: "/indicator/呼吸机相关性肺炎发生率"
      },
      { title: "产科护理质量数据", path: "/indicator/产科护理质量数据" }
    ]
  },
  {
    title: "临床护理质量指标",
    icon: <LCHL />,
    children: [
      { title: "高危药物静脉外渗率", path: "/indicator/高危药物静脉外渗率" },
      { title: "输血/输液反应倒数", path: "/indicator/输血输液反应倒数" },
      { title: "非计划拔管发生率", path: "/indicator/非计划拔管发生率" },
      {
        title: "导管相关血液感染发生率",
        path: "/indicator/导管相关血液感染发生率"
      },
      {
        title: "尿管相关泌尿系感染发生率",
        path: "/indicator/尿管相关泌尿系感染发生率"
      },
      {
        title: "手术相关肺部感染发生率",
        path: "/indicator/手术相关肺部感染发生率"
      },
      {
        title: "患者入院前已有压疮统计",
        path: "/indicator/患者入院前已有压疮统计"
      },
      {
        title: "入院时压疮高风险患者评估率",
        path: "/indicator/入院时压疮高风险患者评估率"
      },
      {
        title: "住院压疮高风险压疮发生率",
        path: "/indicator/住院压疮高风险压疮发生率"
      },
      {
        title: "住院患者手术室压疮发生率",
        path: "/indicator/住院患者手术室压疮发生率"
      },
      {
        title: "排便失禁患者失禁性皮炎发生率",
        path: "/indicator/排便失禁患者失禁性皮炎发生率"
      },
      {
        title: "跌倒坠床高风险患者评估率",
        path: "/indicator/跌倒坠床高风险患者评估率"
      },
      { title: "住院患者跌倒发生率", path: "/indicator/住院患者跌倒发生率" },
      {
        title: "住院患者跌倒坠床伤害程度",
        path: "/indicator/住院患者跌倒坠床伤害程度"
      },
      {
        title: "住院患者误吸高风险评估率",
        path: "/indicator/住院患者误吸高风险评估率"
      },
      {
        title: "住院高风险患者误吸发生率",
        path: "/indicator/住院高风险患者误吸发生率"
      },
      {
        title: "患者走失高风险患者评估率",
        path: "/indicator/患者走失高风险患者评估率"
      },
      { title: "患者走失发生率", path: "/indicator/患者走失发生率" },
      { title: "患者足下垂的发生率", path: "/indicator/患者足下垂的发生率" }
    ]
  },
  {
    title: "专科护理质量指标",
    icon: <ZKHL />,
    children: [
      {
        title: "新生儿烧伤、烫伤发生率",
        path: "/indicator/新生儿烧伤烫伤发生率"
      }
    ]
  },
  {
    title: "护理工作质量指标",
    icon: <HLGZZL />,
    children: [
      { title: "查对制度落实合格率", path: "/indicator/查对制度落实合格率" },
      {
        title: "护理不良事件报告处理符合率",
        path: "/indicator/护理不良事件报告处理符合率"
      },
      {
        title: "使用药物错误的发生率",
        path: "/indicator/使用药物错误的发生率"
      },
      {
        title: "急救设备器材及药品完好合格率",
        path: "/indicator/急救设备器材及药品完好合格率"
      },
      { title: "无菌物品合格率", path: "/indicator/无菌物品合格率" },
      { title: "器械清洗合格率", path: "/indicator/器械清洗合格率" },
      { title: "包装合格率", path: "/indicator/包装合格率" },
      { title: "湿包发生率", path: "/indicator/湿包发生率" }
    ]
  }
];
