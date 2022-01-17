/**
 * 聊城二院-护理查房登记表
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { timePicker } from "../function/click";
let user: any = authStore.user || {};

const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "日期/时间", colspan: "1", rowspan: "1", style:{ width: 130 } },
    { name: "地点", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "主持人", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "查房者", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "查房类型", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "参加<br/>人数", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "患者姓名", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "病案号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "诊断", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "查房目的", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "主要解决问题", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "新知识点", colspan: "1", rowspan: "1", style:{ width: 100 } },
   
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "time", name: "日期/时间", value: "", width: 130, click: timePicker },
  { key: "place", name: "地点", value: "", width: 100 },
  { key: "host", name: "主持人", value: "", width: 100 },
  { key: "check", name: "查房者", value: "", width: 100 },
  { key: "type", name: "查房类型", value: "", width: 100, select: [ "临床护理查房", "个案护理查房", "教学护理查房", ] },
  { key: "number", name: "参加人数", value: "", width: 50 },
  { key: "patientName", name: "患者姓名", value: "", width: 100 },
  { key: "recordId", name: "病案号", value: "", width: 100 },
  { key: "diagnosis", name: "主要诊断", value: "", width: 100 },
  { key: "purpose", name: "查房目的", value: "", width: 150 },
  { key: "solveProblem", name: "主要解决问题", value: "", width: 150 },
  { key: "new", name: "新知识点", value: "", width: 100 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${user.deptName}护理查房登记表`, width: 1318 },
  tBody: [tBody],
  tHead: [tHead],
}