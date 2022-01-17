/**
 * 聊城二院-护理病例讨论登记
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { timePicker } from "../function/click";
let user: any = authStore.user || {};

const tHead = {
  top: [
    { name: "日期时间", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "地点", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "主持人", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "参加人数", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "患者姓名", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "病案号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "诊断", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "讨论类型", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "讨论目的", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "主要解决问题", colspan: "1", rowspan: "1", style:{ width: 150 } },
   
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "time", name: "日期", value: "", width: 150, click: timePicker },
  { key: "place", name: "地点", value: "", width: 100 },
  { key: "host", name: "主持人", value: "", width: 100 },
  { key: "number", name: "参加人数", value: "", width: 100 },
  { key: "patientName", name: "患者姓名", value: "", width: 100 },
  { key: "recordId", name: "病案号", value: "", width: 100 },
  { key: "diagnosis", name: "诊断", value: "", width: 100 },
  { key: "type", name: "讨论类型", value: "", width: 100 },
  { key: "purpose", name: "讨论目的", value: "", width: 150 },
  { key: "solveProblem", name: "主要解决问题", value: "", width: 150 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${user.deptName}病例讨论登记表`, width: 1141 },
  tBody: [tBody],
  tHead: [tHead],
}