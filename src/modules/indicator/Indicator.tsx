import moment from "moment";
import BaseTable from "src/components/BaseTable";
import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {RouteComponentProps} from "src/components/RouterView";
import {HorizontalMenuItem} from "src/types/horizontalMenu";
import {appStore} from "src/stores";
import {Radio, message, Button, DatePicker} from "antd";
import {crrentMonth} from "src/utils/moment/crrentMonth";
import BaseChart from "./components/BaseChart";
import StatisticLeftList from "./components/StatisticLeftList";
import TopCon from "./components/TopCon";
import {床护比统计} from "./views/床护比统计";
import {护患比统计} from "./views/护患比统计";
import {小时平均护理时数} from "./views/24小时平均护理时数";
import {不同级别护士配置} from "./views/不同级别护士配置";
import {护士离职率} from "./views/护士离职率";
import {住院患者跌倒发生率} from "./views/住院患者跌倒发生率";
import {院内压疮发生率} from "./views/院内压疮发生率";
import {住院患者身体约束率} from "./views/住院患者身体约束率";
import {插管患者非计划拔管发生率} from "./views/插管患者非计划拔管发生率";
import {导尿管相关尿路感染发生率} from "./views/导尿管相关尿路感染发生率";
import {中心导管相关血流感染发生率} from "./views/中心导管相关血流感染发生率";
import {呼吸机相关性肺炎发生率} from "./views/呼吸机相关性肺炎发生率";
import {产科护理质量数据} from "./views/产科护理质量数据";
import {高危药物静脉外渗率} from "./views2/高危药物静脉外渗率";
import {输血输液反应倒数} from "./views2/输血输液反应倒数";
import {非计划拔管发生率} from "./views2/非计划拔管发生率";
import {导管相关血液感染发生率} from "./views2/导管相关血液感染发生率";
import {尿管相关泌尿系感染发生率} from "./views2/尿管相关泌尿系感染发生率";
import {手术相关肺部感染发生率} from "./views2/手术相关肺部感染发生率";
import {患者入院前已有压疮统计} from "./views2/患者入院前已有压疮统计";
import {入院时压疮高风险患者评估率} from "./views2/入院时压疮高风险患者评估率";
import {住院压疮高风险压疮发生率} from "./views2/住院压疮高风险压疮发生率";
import {住院患者手术室压疮发生率} from "./views2/住院患者手术室压疮发生率";
import {排便失禁患者失禁性皮炎发生率} from "./views2/排便失禁患者失禁性皮炎发生率";
import {跌倒坠床高风险患者评估率} from "./views2/跌倒坠床高风险患者评估率";
import {住院患者跌倒发生率2} from "./views2/住院患者跌倒发生率";
import {住院患者跌倒坠床伤害程度} from "./views2/住院患者跌倒坠床伤害程度";
import {住院患者误吸高风险评估率} from "./views2/住院患者误吸高风险评估率";
import {住院高风险患者误吸发生率} from "./views2/住院高风险患者误吸发生率";
import {走失高风险住院患者评估阳性数} from "./views2/走失高风险住院患者评估阳性数";
import {患者走失发生率} from "./views2/患者走失发生率";
import {患者走失高风险患者评估率} from "./views2/患者走失高风险患者评估率";
import {患者足下垂的发生率} from "./views2/患者足下垂的发生率";
import {新生儿烧伤烫伤发生率} from "./views2/新生儿烧伤烫伤发生率";
import {查对制度落实合格率} from "./views2/查对制度落实合格率";
import {护理不良事件报告处理符合率} from "./views2/护理不良事件报告处理符合率";
import {使用药物错误的发生率} from "./views2/使用药物错误的发生率";
import {急救设备器材及药品完好合格率} from "./views2/急救设备器材及药品完好合格率";
import {无菌物品合格率} from "./views2/无菌物品合格率";
import {器械清洗合格率} from "./views2/器械清洗合格率";
import {包装合格率} from "./views2/包装合格率";
import {湿包发生率} from "./views2/湿包发生率";
import {LEFT_MENU} from "./config";
import {indicatorService} from "./services/IndicatorService";
// 图
import 护患比统计图 from "src/modules/indicator/chartView/护患比统计图.tsx";
import 无图 from "src/modules/indicator/chartView/无图.tsx";

// 护理质量相关数据
import NursingData from "./mainView/nursingData/NursingData";
// 护理质控指标
import NursingCharges from "./mainView/nursingCharges/NursingCharges";
//统计表
import StatisticTable from './statisticsTable'

export interface Props extends RouteComponentProps<{ name?: string }> {
}

const widthChar = "280%";
// surplusHeight: 280,
// surplusWidth: 260,
const ROUTE_LIST: any = [
  {
    name: "床护比统计",
    columns: 床护比统计.columns,
    dataSource: [] || 床护比统计.dataSource,
    // keys: ['实际开放床位数', '实际配备护士数'],
    // time: '10:10', call: 4, waiting: 2, people: 2
    serviceName: "nationalIndex/getBedNurseRatio",
    exportName: "nationalIndex/bedNurseRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      actualOpenBeds: "实际开放床位数",
      actualNurseCount: "实际配备护士数",
      actualBedNurseRatio: "实际床护比"
    },
    gName: "护理单元",
    keys: ["实际开放床位数", "实际配备护士数"],
    lineKey: "实际床护比",
    // rowKey: { actualOpenBeds: '实际开放床位数', actualNurseCount: '实际配备护士数' },
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "护患比统计",
    columns: 护患比统计.columns,
    dataSource: [] || 护患比统计.dataSource,
    serviceName: "nationalIndex/getPatientNurseRatio",
    exportName: "nationalIndex/patientNurseRatio/export",
    surplusHeight: 280,

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      nurseCount_A: "护士数",
      patientCount_A: "患者数",
      pNRatio_A: "护患比"
    },
    gName: "护理单元",
    keys: ["护士数", "患者数"],
    lineKey: "护患比",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "24小时平均护理时数",
    columns: 小时平均护理时数.columns,
    dataSource: [] || 小时平均护理时数.dataSource,
    serviceName: "nationalIndex/getNursingHours",
    exportName: "nationalIndex/nursingHours/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      tNurHours: "累计护理时数",
      tReceivePatients: "累计收治患者人次",
      avgNurHPerPatient: "每住院患者24小时平均护理时数"
    },
    gName: "护理单元",
    keys: ["累计护理时数", "累计收治患者人次"],
    lineKey: "每住院患者24小时平均护理时数",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "不同级别护士配置",
    columns: 不同级别护士配置.columns,
    dataSource: [] || 不同级别护士配置.dataSource,
    serviceName: "nationalIndex/getNurseAllocation",
    exportName: "nationalIndex/nurseAllocation/export",
    surplusHeight: 280,
    surplusWidth: 260,

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      nursetotal: "护士总人数"
    },
    gName: "护理单元",
    keys: ["护士总人数"],
    lineKey: "",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "护士离职率",
    columns: 护士离职率.columns,
    dataSource: [] || 护士离职率.dataSource,
    serviceName: "nationalIndex/getNurseResignRatio",
    exportName: "nationalIndex/nurseResignRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      resign_count: "统计周期内离职人数",
      payroll_count: "统计周期末在职人数",
      resign_ratio: "离职率"
    },
    gName: "护理单元",
    keys: ["统计周期内离职人数", "统计周期末在职人数"],
    lineKey: "离职率",
    widthChar: widthChar,
    chartComponent: 无图
  },
  {
    name: "住院患者跌倒发生率",
    columns: 住院患者跌倒发生率.columns,
    dataSource: [] || 住院患者跌倒发生率.dataSource,
    serviceName: "nationalIndex/getPatientFallRatio",
    exportName: "nationalIndex/patientFallRatio/export",
    // surplusWidth: 260

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      fall_count: "跌倒病例数",
      fall_ratio: "跌倒发生率"
    },
    gName: "护理单元",
    keys: ["跌倒病例数"],
    lineKey: "跌倒发生率",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "院内压疮发生率",
    columns: 院内压疮发生率.columns,
    dataSource: [] || 院内压疮发生率.dataSource,
    serviceName: "nationalIndex/getPuRatio",
    exportName: "nationalIndex/puRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      pu_cases: "压疮病例数",
      patient_count: "同期患者数",
      pu_ratio: "压疮发生率(%)"
    },
    gName: "护理单元",
    keys: ["压疮病例数", "同期患者数"],
    lineKey: "压疮发生率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "住院患者身体约束率",
    columns: 住院患者身体约束率.columns,
    dataSource: [] || 住院患者身体约束率.dataSource,
    // surplusHeight:'400',
    serviceName: "nationalIndex/getBrRatio",
    exportName: "nationalIndex/brRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      br_days: "约束天数",
      patient_days: "患者总人日数",
      br_ratio: "身体约束率(%)"
    },
    gName: "护理单元",
    keys: ["约束天数", "患者总人日数"],
    lineKey: "身体约束率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "插管患者非计划拔管发生率",
    columns: 插管患者非计划拔管发生率.columns,
    dataSource: [] || 插管患者非计划拔管发生率.dataSource,
    serviceName: "nationalIndex/getUexRatio",
    exportName: "nationalIndex/uexRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      uex_cases: "UEX例数",
      indwelling_cases: "导管置管例数",
      uex_ratio_bycase: "UEX发生率"
    },
    gName: "护理单元",
    keys: ["UEX例数", "导管置管例数"],
    lineKey: "UEX发生率",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "导尿管相关尿路感染发生率",
    columns: 导尿管相关尿路感染发生率.columns,
    dataSource: [] || 导尿管相关尿路感染发生率.dataSource,
    serviceName: "nationalIndex/getCautiRatio",
    exportName: "nationalIndex/cautiRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      uex_cases: "感染例数",
      indwelling_days: "留置导尿管总日数",
      infection_ratio: "感染率（例/千导管日）"
    },
    gName: "护理单元",
    keys: ["感染例数", "留置导尿管总日数"],
    lineKey: "感染率（例/千导管日）",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "中心导管相关血流感染发生率",
    columns: 中心导管相关血流感染发生率.columns,
    dataSource: [] || 中心导管相关血流感染发生率.dataSource,
    serviceName: "nationalIndex/getCrbsiRatio",
    exportName: "nationalIndex/crbsiRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      infection_case: "感染例数",
      indwelling_days: "留置导管总日数",
      infection_ratio: "感染率（例/千导管日）"
    },
    gName: "护理单元",
    keys: ["感染例数", "留置导管总日数"],
    lineKey: "感染率（例/千导管日）",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "呼吸机相关性肺炎发生率",
    columns: 呼吸机相关性肺炎发生率.columns,
    dataSource: [] || 呼吸机相关性肺炎发生率.dataSource,
    serviceName: "nationalIndex/getVapRatio",
    exportName: "nationalIndex/vapRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      infection_case: "感染例数",
      venti_case: "呼吸机患者例数",
      infection_ratio: "感染率（例/千机械通气日）"
    },
    gName: "护理单元",
    keys: ["感染例数", "留置导管总日数"],
    lineKey: "感染率（例/千机械通气日）",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "产科护理质量数据",
    columns: 产科护理质量数据.columns,
    dataSource: [] || 产科护理质量数据.dataSource,
    serviceName: "nationalIndex/getObNursingQuqlity",
    exportName: "nationalIndex/obNursingQuqlity/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      infection_case: "人数"
    },
    gName: "护理单元",
    keys: ["人数"],
    lineKey: "",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "高危药物静脉外渗率",
    columns: 高危药物静脉外渗率.columns,
    dataSource: [] || 高危药物静脉外渗率.dataSource,
    serviceName: "cnqIndex/getHRDrugsExoRatio",
    exportName: "cnqIndex/hRDrugsExoRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      exo_count: "静脉使用高危药物发生外渗的例数",
      accident_ratio: "高危药物静脉外渗率"
    },
    gName: "护理单元",
    keys: ["静脉使用高危药物发生外渗的例数"],
    lineKey: "高危药物静脉外渗率",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "输血输液反应倒数",
    columns: 输血输液反应倒数.columns,
    dataSource: [] || 输血输液反应倒数.dataSource,
    serviceName: "cnqIndex/getInfuReactCases",
    exportName: "cnqIndex/infuReactCases/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      btreact_count: "输血反应例数",
      ifreact_count: "输液反应例数"
    },
    gName: "护理单元",
    keys: ["输血反应例数", "输液反应例数"],
    lineKey: "",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "非计划拔管发生率",
    columns: 非计划拔管发生率.columns,
    dataSource: [] || 非计划拔管发生率.dataSource,
    serviceName: "cnqIndex/getUexRatio",
    exportName: "cnqIndex/uexRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      uex_case: "UEX例数",
      indwelling_days: "导管留置日数",
      uex_ratio: "UEX发生率(例数/留置日数)"
    },
    gName: "护理单元",
    keys: ["UEX例数", "导管留置日数"],
    lineKey: "UEX发生率(例数/留置日数)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "导管相关血液感染发生率",
    columns: 导管相关血液感染发生率.columns,
    dataSource: [] || 导管相关血液感染发生率.dataSource,
    serviceName: "cnqIndex/getCrbsiRatio",
    exportName: "cnqIndex/crbsiRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      infection_count: "感染人数",
      indwelling_days: "插管总日数",
      accident_ratio: "发生率(%)"
    },
    gName: "护理单元",
    keys: ["感染人数", "插管总日数"],
    lineKey: "发生率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "尿管相关泌尿系感染发生率",
    columns: 尿管相关泌尿系感染发生率.columns,
    dataSource: [] || 尿管相关泌尿系感染发生率.dataSource,
    serviceName: "cnqIndex/getCautiRatio",
    exportName: "cnqIndex/cautiRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      infection_count: "感染人数",
      indwelling_days: "插管总日数",
      accident_ratio: "发生率(%)"
    },
    gName: "护理单元",
    keys: ["感染人数", "插管总日数"],
    lineKey: "发生率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "手术相关肺部感染发生率",
    columns: 手术相关肺部感染发生率.columns,
    dataSource: [] || 手术相关肺部感染发生率.dataSource,
    serviceName: "cnqIndex/getSurPInfecRatio",
    exportName: "cnqIndex/surPInfecRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      infection_count: "感染例数",
      sur_count: "手术总例数",
      accident_ratio: "发生率"
    },
    gName: "护理单元",
    keys: ["感染例数", "插管总日数"],
    lineKey: "发生率",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "患者入院前已有压疮统计",
    columns: 患者入院前已有压疮统计.columns,
    dataSource: [] || 患者入院前已有压疮统计.dataSource,
    serviceName: "cnqIndex/getPreAdmiPUCount",
    exportName: "cnqIndex/preAdmiPUCount/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      pu_count: "入院前已有压疮例数",
      patient_count: "住院患者人数",
      pu_ratio: "已有压疮占比"
    },
    gName: "护理单元",
    keys: ["入院前已有压疮例数", "住院患者人数"],
    lineKey: "已有压疮占比",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "入院时压疮高风险患者评估率",
    columns: 入院时压疮高风险患者评估率.columns,
    dataSource: [] || 入院时压疮高风险患者评估率.dataSource,
    serviceName: "cnqIndex/getHRPUEsRatio",
    exportName: "cnqIndex/hRPUEsRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      pu_count: "高风险患者评估阳性例数",
      hres_count: "入院时评估高风险患者人数",
      hres_ratio: "评估率"
    },
    gName: "护理单元",
    keys: ["高风险患者评估阳性例数", "入院时评估高风险患者人数"],
    lineKey: "评估率",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "住院压疮高风险压疮发生率",
    columns: 住院压疮高风险压疮发生率.columns,
    dataSource: [] || 住院压疮高风险压疮发生率.dataSource,
    serviceName: "cnqIndex/getHRPUAcciRatio",
    exportName: "cnqIndex/hRPUAcciRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      pu_count: "发生压疮例数",
      hres_count: "入院评估高风险例数",
      accident_ratio: "压疮发生率"
    },
    gName: "护理单元",
    keys: ["发生压疮例数", "入院评估高风险例数"],
    lineKey: "压疮发生率",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    // 无图
    name: "住院患者手术室压疮发生率",
    columns: 住院患者手术室压疮发生率.columns,
    dataSource: [] || 住院患者手术室压疮发生率.dataSource,
    serviceName: "cnqIndex/getORPUAcciRatio",
    exportName: "cnqIndex/oRPUAcciRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元"
    },
    gName: "护理单元",
    keys: [],
    lineKey: "",
    widthChar: widthChar,
    chartComponent: 无图
  },
  {
    name: "排便失禁患者失禁性皮炎发生率",
    columns: 排便失禁患者失禁性皮炎发生率.columns,
    dataSource: [] || 排便失禁患者失禁性皮炎发生率.dataSource,
    serviceName: "cnqIndex/getIADAcciRatio",
    exportName: "cnqIndex/iADAcciRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      iad_count: "失禁患者发生失禁性皮炎人数",
      patient_count: "住院患者总人数",
      accident_ratio: "发生率(%)"
    },
    gName: "护理单元",
    keys: ["失禁患者发生失禁性皮炎人数", "住院患者总人数"],
    lineKey: "发生率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "跌倒坠床高风险患者评估率",
    columns: 跌倒坠床高风险患者评估率.columns,
    dataSource: [] || 跌倒坠床高风险患者评估率.dataSource,
    serviceName: "cnqIndex/getHRFallEsRatio",
    exportName: "cnqIndex/hRFallEsRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      fall_count: "跌倒/坠床高风险患者评估阳性例数",
      hres_count: "入院时高风险患者总人数",
      hres_ratio: "评估率(%)"
    },
    gName: "护理单元",
    keys: ["跌倒/坠床高风险患者评估阳性例数", "入院时高风险患者总人数"],
    lineKey: "评估率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "住院患者跌倒发生率",
    columns: 住院患者跌倒发生率2.columns,
    dataSource: [] || 住院患者跌倒发生率2.dataSource,
    serviceName: "cnqIndex/getPatientFallAcciRatio",
    exportName: "cnqIndex/patientFallAcciRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      fall_count: "跌倒人次",
      patient_count: "住院总人数",
      accident_ratio: "发生率(%)"
    },
    gName: "护理单元",
    keys: ["跌倒人次", "住院总人数"],
    lineKey: "发生率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "住院患者跌倒坠床伤害程度",
    columns: 住院患者跌倒坠床伤害程度.columns,
    dataSource: [] || 住院患者跌倒坠床伤害程度.dataSource,
    serviceName: "cnqIndex/getFallISS",
    exportName: "cnqIndex/fallISS/export",
    surplusHeight: 280,

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      minor_injury_count: "轻度伤害例数",
      total_count: "跌倒例数",
      minor_injury_ratio: "轻度伤害比例"
    },
    gName: "护理单元",
    keys: ["轻度伤害例数", "跌倒例数"],
    lineKey: "轻度伤害比例",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "住院患者误吸高风险评估率",
    columns: 住院患者误吸高风险评估率.columns,
    dataSource: [] || 住院患者误吸高风险评估率.dataSource,
    serviceName: "cnqIndex/getMisInhalEsRatio",
    exportName: "cnqIndex/misInhalEsRatio/export",
    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      misInhal_count: "误吸高风险患者评估阳性例数",
      estimate_count: "入院时评估误吸高风险患者总人数",
      estimate_ratio: "发生率(%)"
    },
    gName: "护理单元",
    keys: ["误吸高风险患者评估阳性例数", "入院时评估误吸高风险患者总人数"],
    lineKey: "发生率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "住院高风险患者误吸发生率",
    columns: 住院高风险患者误吸发生率.columns,
    dataSource: [] || 住院高风险患者误吸发生率.dataSource,
    serviceName: "cnqIndex/getMisInhalAcciRatio",
    exportName: "cnqIndex/misInhalAcciRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      misInhal_count: "住院患者发生误吸例数",
      patient_count: "住院患者总人数",
      accident_ratio: "发生率(%)"
    },
    gName: "护理单元",
    keys: ["住院患者发生误吸例数", "住院患者总人数"],
    lineKey: "发生率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "走失高风险住院患者评估阳性数",
    columns: 走失高风险住院患者评估阳性数.columns,
    dataSource: [] || 走失高风险住院患者评估阳性数.dataSource,
    keys: ["住院高风险患者例数", "走失高风险住院患者评估阳性数"],
    gName: "护理单元",
    lineKey: "评估率(%)",
    serviceName: "",
    exportName: "cnqIndex/hRPLostESRatio/export"
  },
  {
    name: "患者走失发生率",
    columns: 患者走失发生率.columns,
    dataSource: [] || 患者走失发生率.dataSource,
    serviceName: "cnqIndex/getPLostAcciRatio",
    exportName: "cnqIndex/pLostAcciRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      lost_count: "住院患者的走失例数",
      patient_count: "住院患者总人数",
      accident_ratio: "发生率(%)"
    },
    gName: "护理单元",
    keys: ["住院患者的走失例数", "住院患者总人数"],
    lineKey: "发生率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "患者走失高风险患者评估率",
    columns: 患者走失高风险患者评估率.columns,
    dataSource: [] || 患者走失高风险患者评估率.dataSource,
    serviceName: "cnqIndex/getHRPLostESRatio",
    exportName: "cnqIndex/hRPLostESRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      lost_count: "走失高风险住院患者评估阳性数",
      hres_count: "住院高风险患者例数",
      estimate_ratio: "评估率(%)"
    },
    gName: "护理单元",
    keys: ["走失高风险住院患者评估阳性数", "住院高风险患者例数"],
    lineKey: "评估率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "患者足下垂的发生率",
    columns: 患者足下垂的发生率.columns,
    dataSource: [] || 患者足下垂的发生率.dataSource,
    serviceName: "cnqIndex/getPFDropAcciRatio",
    exportName: "cnqIndex/pFDropAcciRatio/export",

    legendData: [
      {value: "actualOpenBeds", symbol: "square"},
      {value: "actualNurseCount", symbol: "square"}
    ],
    dictionary: {
      wardName: "护理单元",
      fdrop_count: "患者发生足下垂例数",
      patient_count: "住院患者总人数",
      accident_ratio: "发生率(%)"
    },
    gName: "护理单元",
    keys: ["患者发生足下垂例数", "住院患者总人数"],
    lineKey: "发生率(%)",
    widthChar: widthChar,
    chartComponent: 护患比统计图
  },
  {
    name: "新生儿烧伤烫伤发生率",
    columns: 新生儿烧伤烫伤发生率.columns,
    dataSource: [] || 新生儿烧伤烫伤发生率.dataSource,
    keys: ["住新生儿总人数", "烧伤烫伤例数"],
    gName: "护理单元",
    lineKey: "发生率(%)",
    serviceName: "",
    exportName: ""
  },
  {
    name: "查对制度落实合格率",
    columns: 查对制度落实合格率.columns,
    dataSource: [] || 查对制度落实合格率.dataSource,
    keys: ["检查查对制度的总条款数", "查对制度不合格条款数"],
    gName: "护理单元",
    lineKey: "不合格率(%)",
    serviceName: "",
    exportName: ""
  },
  {
    name: "护理不良事件报告处理符合率",
    columns: 护理不良事件报告处理符合率.columns,
    dataSource: [] || 护理不良事件报告处理符合率.dataSource,
    keys: ["检查总次数", "不合格数"],
    gName: "护理单元",
    lineKey: "不合格率(%)",
    serviceName: "",
    exportName: ""
  },
  {
    name: "使用药物错误的发生率",
    columns: 使用药物错误的发生率.columns,
    dataSource: [] || 使用药物错误的发生率.dataSource,
    keys: ["急救设备器材及药品总件数", "急救设备器材及药品不合格件数"],
    gName: "护理单元",
    lineKey: "错误发生率(%)",
    serviceName: "",
    exportName: ""
  },
  {
    name: "急救设备器材及药品完好合格率",
    columns: 急救设备器材及药品完好合格率.columns,
    dataSource: [] || 急救设备器材及药品完好合格率.dataSource,
    keys: ["急救设备器材及药品总件数", "急救设备器材及药品不合格件数"],
    gName: "护理单元",
    lineKey: "不合格率(%)",
    serviceName: "",
    exportName: ""
  },
  {
    name: "无菌物品合格率",
    columns: 无菌物品合格率.columns,
    dataSource: [] || 无菌物品合格率.dataSource,
    keys: ["全院无菌物品总件数", "无菌物品合格总件数"],
    gName: "护理单元",
    lineKey: "合格率(%)",
    serviceName: "",
    exportName: ""
  },
  {
    name: "器械清洗合格率",
    columns: 器械清洗合格率.columns,
    dataSource: [] || 器械清洗合格率.dataSource,
    keys: ["CSSD清洗器械总件数", "CSSD清洗器械合格件数"],
    gName: "护理单元",
    lineKey: "合格率(%)",
    serviceName: "",
    exportName: ""
  },
  {
    name: "包装合格率",
    columns: 包装合格率.columns,
    dataSource: [] || 包装合格率.dataSource,
    keys: ["CSSD灭菌包总件数", "合格灭菌器械包件数"],
    gName: "护理单元",
    lineKey: "合格率(%)",
    serviceName: "",
    exportName: ""
  },
  {
    name: "湿包发生率",
    columns: 湿包发生率.columns,
    dataSource: [] || 湿包发生率.dataSource,
    keys: ["CSSD灭菌包总件数", "湿包件数"],
    gName: "护理单元",
    lineKey: "湿包率(%)",
    serviceName: "",
    exportName: ""
  }
];
let widthCharGet: any = "";
export default function Indicator(props: Props) {
  let [showType, setShowType] = useState("详情");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let [loading, setLoading] = useState(false);
  let [currentRoute, setCurrentRoute]: [any, any] = useState(null);
  const [titleSecond, setTitleSecond] = useState("");
  const [templateShow, setTemplateShow] = useState(true);
  const [timeData, setTimeData]: any = useState(crrentMonth());
  const [nursingData, setNursingData] = useState(false); //是否展示护理主质量相关数据页面（--true展示）
  const [nursingCharges, setNursingCharges] = useState(false); //是否展示护理质控指标页面（--true展示）
  const [statistic, setStatistic] = useState(false); // 是否是统计表

  let topRef: any = React.createRef();
  useLayoutEffect(() => {
    setShowType("详情");
    setNursingCharges(false)
    setNursingData(false)
    setStatistic(false)
    if (props.match.params.name === "专科季度统计表" || props.match.params.name === "公共季度统计表") {
      setStatistic(true)
    } else if (props.match.params.name === "护理质量相关数据") { // 护理质量相关数据（吴敏）
      setNursingData(true);
    } else if (props.match.params.name === "护理质控指标") {
      setNursingCharges(true);
    } else {
      onload();
    }
  }, [props.match.params.name, timeData]);

  const onload = async () => {
    let currentRouteName = props.match.params.name;
    let currentRoute = {
      ...ROUTE_LIST.find((item: any) => item.name === currentRouteName)
    };

    if (currentRoute && currentRouteName !== "护理质量相关数据") {
      if (
        currentRoute!.name !== "新生儿烧伤烫伤发生率" &&
        currentRoute!.name !== "查对制度落实合格率" &&
        currentRoute!.name !== "护理不良事件报告处理符合率" &&
        currentRoute!.name !== "使用药物错误的发生率" &&
        currentRoute!.name !== "急救设备器材及药品完好合格率" &&
        currentRoute!.name !== "无菌物品合格率" &&
        currentRoute!.name !== "器械清洗合格率" &&
        currentRoute!.name !== "包装合格率" &&
        currentRoute!.name !== "湿包发生率"
      ) {
        setTemplateShow(true);
        setLoading(true);
        let startDate = timeData[0].format("YYYY-MM-DD");
        let endDate = timeData[1].format("YYYY-MM-DD");
        setStartDate(startDate);
        setEndDate(endDate);

        const {data} = await indicatorService.getIndicatoeData(
          currentRoute!.serviceName,
          startDate,
          endDate
        );
        setLoading(false);
        //除错
        if (currentRoute && data) {
          currentRoute.dataSource = [...data];
          let cacheTitle = currentRoute!.name + "统计";
          setTitleSecond(cacheTitle);
          setCurrentRoute(currentRoute);
        }
      } else {
        setTemplateShow(false);
      }
    }
  };

  //导出数据处理方法
  const fileDownload = (res: any) => {
    let filename = res.headers["content-disposition"]
      ? decodeURIComponent(
        res.headers["content-disposition"].replace("attachment;filename=", "")
      )
      : "导出文件";
    let blob = new Blob([res.data], {
      type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
    });
    if (res.data) {
      let a = document.createElement("a");
      let href = window.URL.createObjectURL(blob); // 创建链接对象
      a.href = href;
      a.download = filename; // 自定义文件名
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(href);
      document.body.removeChild(a); // 移除a元素
    } else {
      let reader = new FileReader();
      reader.addEventListener("loadend", function (data: any) {
        message.error(`${reader.result}`);
      });
      reader.readAsText(blob);
    }
  };
  //调用导出接口
  const onExport = async () => {
    let startDate = timeData[0].format("YYYY-MM-DD");
    let endDate = timeData[1].format("YYYY-MM-DD");
    let currentRouteName = props.match.params.name;
    let currentRoute = {
      ...ROUTE_LIST.find((item: any) => item.name === currentRouteName)
    };
    if (currentRoute) {
      if (
        currentRoute!.name !== "新生儿烧伤烫伤发生率" &&
        currentRoute!.name !== "查对制度落实合格率" &&
        currentRoute!.name !== "护理不良事件报告处理符合率" &&
        currentRoute!.name !== "使用药物错误的发生率" &&
        currentRoute!.name !== "急救设备器材及药品完好合格率" &&
        currentRoute!.name !== "无菌物品合格率" &&
        currentRoute!.name !== "器械清洗合格率" &&
        currentRoute!.name !== "包装合格率" &&
        currentRoute!.name !== "湿包发生率"
      ) {
        setTemplateShow(true);
        const data = await indicatorService.getIndicatoeData(
          currentRoute!.exportName,
          startDate,
          endDate
        );
        fileDownload(data);
      } else {
        setTemplateShow(false);
      }
    }
  };

  // widthCharGet = currentRoute ? currentRoute.widthChar : '250%'
  let ChartComponent =
    (currentRoute && currentRoute.chartComponent) || 护患比统计图;
  const restClick = () => {
  };

  // 条件渲染右侧组件
  const GetComponents = () => {
    if (nursingData) {
      // 护理质量相关数据
      return (
        <div className="nursingData">
          <NursingData getTitle={props.match.params.name}/>
        </div>
      )
    } else if (nursingCharges) {
      // 护理质控指标
      return (
        <div className="nursingCharges">
          <NursingCharges getTitle={props.match.params.name}/>
        </div>
      )
    } else if (statistic) {
      // 统计表
      return (
        <MainWrapper>
          <StatisticTable name={props.match.params.name || ''}/>
        </MainWrapper>
      )
    } else {
      // 其它
      return (
        <MainCon>
          {/* <TopCon ref={topRef} refreshData={onload} refExport={onExport} /> */}
          {/* <div onClick={restClick}> testclick</div> */}
          <HeaderCon>
            <span>日期:</span>
            <DatePicker.RangePicker
              value={timeData}
              onChange={data => {
                setTimeData(data);
              }}
              style={{width: 220, margin: "0 10px"}}
            />
            <Button
              type="primary"
              style={{marginRight: 10}}
              onClick={() => onload()}
            >
              查询
            </Button>
            <Button onClick={() => onExport()}>导出excl</Button>
          </HeaderCon>

          {templateShow ? (
            <MainScroll>
              {currentRoute && (
                <MainInner surplusHeight={currentRoute.surplusHeight || 250}>
                  <RadioCon>
                    <Radio.Group
                      value={showType}
                      buttonStyle="solid"
                      onChange={(e: any) => setShowType(e.target.value)}
                    >
                      <Radio.Button value="详情">详情</Radio.Button>
                      <Radio.Button value="图表">图表</Radio.Button>
                    </Radio.Group>{" "}
                  </RadioCon>

                  {/* <HisName>东莞厚街医院</HisName> */}
                  <Title>{currentRoute!.name + "统计"}</Title>
                  <Date>
                    日期：{startDate} 至 {endDate}
                  </Date>
                  {showType === "详情" && (
                    <BaseTableCon>
                      <BaseTable
                        loading={loading}
                        rowKey="index"
                        dataSource={currentRoute!.dataSource}
                        columns={currentRoute!.columns}
                        surplusHeight={currentRoute.surplusHeight || 250}
                        surplusWidth={currentRoute.surplusWidth || 0}
                      />
                    </BaseTableCon>
                  )}
                  {showType === "图表" && (
                    <BaseChartScrollCon widthGet={currentRoute!.widthChar}>
                      {/* <BaseChartScrollCon> */}
                      <div className="BaseCharCon">
                        <ChartComponent
                          dataSource={currentRoute!.dataSource}
                          keys={currentRoute!.keys}
                          name={currentRoute!.gName}
                          lineKey={currentRoute!.lineKey}
                          dictionary={currentRoute.dictionary}
                          legendData={currentRoute.legendData}
                        />
                      </div>
                    </BaseChartScrollCon>
                  )}
                </MainInner>
              )}
            </MainScroll>
          ) : (
            <div
              style={{
                marginTop: "200px",
                textAlign: "center",
                fontSize: "30px"
              }}
            >
              暂无数据
            </div>
          )}
        </MainCon>
      )
    }
  }

  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={LEFT_MENU} menuTitle="敏感指标"/>
        {/* <StatisticLeftList /> */}
      </LeftMenuCon>
      <GetComponents/>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
  overflow: hidden;
  .nursingData {
    height: 100%;
    width: 100%;
    padding: 0 15px 0 40px;
    box-sizing: border-box;
  }
  .nursingCharges {
    height: 100%;
    width: 88%;
    padding: 0 15px 0 40px;
    box-sizing: border-box;
  }
`;

const LeftMenuCon = styled.div`
  width: 200px;
  /* position: relative;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
  border-top: 0;
  height: 100%; */
`;
const MainCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  padding: 5px 15px;
`;
const MainScroll = styled.div`
  flex: 1;
  height: 0;
  /* overflow-x: hidden;
  overflow-y: auto; */
  overflow: hidden;
  /* padding: 5px 15px; */
`;

const MainInner = styled.div<{ surplusHeight: number }>`
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  /* min-height: calc(100vh - 168px); */
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px 5px 5px;
  display: flex;
  flex-direction: column;
`;

const HisName = styled.div`
  font-size: 20px;
  color: #333;
  text-align: center;
  font-weight: bold;
  letter-spacing: 4px;
`;
const Title = styled.div`
  /* font-size: 15px; */
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
`;
const Date = styled.div`
  font-size: 13px;
  color: #333;
  text-align: center;
`;

const RadioCon = styled.div`
  position: absolute;
  top: 20px;
  right: 35px;
`;
const BaseChartScrollCon = styled.div<{ widthGet: any }>`
  flex: 1;
  height: 0;
  width: 100%;
  overflow: hidden;
  overflow: auto;
  position: relative;
  /* overflow:auto; */
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
  .BaseCharCon {
    height: auto;
    overflow: hidden;
    width: ${props => props.widthGet};
    position: absolute;
    bottom: 0;
  }
`;
const BaseTableCon = styled.div`
  flex: 1;
  height: 0;
`;
const HeaderCon = styled.div`
  height: 50px;
  /* background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4; */
  font-size: 13px;
  position: relative;
  color: #333333;
  padding: 0 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`;

const MainWrapper = styled.div`
  flex:1;
`
