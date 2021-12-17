/**
 * 江门妇幼-月工作重点及周安排
 */
import { tick } from "../function/click"
const tHead1 = {
  top: [],
  mid: [],
  bottom: []
}

const tHead2 = {
  top: [
    { name: "时间", colspan: "1", rowspan: "1", style:{ width: 120 } },
    { name: "内容", colspan: "1", rowspan: "1", style:{ width: 240 } },
    { name: "责任人", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "完成", colspan: "1", rowspan: "1", style:{ width: 80 } },
    { name: "基本完成", colspan: "1", rowspan: "1", style:{ width: 80 } },
    { name: "未完成", colspan: "1", rowspan: "1", style:{ width: 80 } },
  ],
  mid: [],
  bottom: []
}

const tHead3 = {
  top: [],
  mid: [],
  bottom: []
}

const tBody1: any = [
  { key: 'focus', name: '月工作重点', value: "", width: 120, style:{ minHeight: "200px" } },
  { key: 'focusDetail', name: '月工作重点内容', value: "", width: 580, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]

const tBody2: any = [
  { key: "time", name: "时间", value: "", width: 120 },
  { key: "what", name: "内容", value: "", width: 240 },
  { key: "why", name: "责任人", value: "", width: 100 },
  { key: "where", name: "完成", value: "", width: 80, click: tick },
  { key: "who", name: "基本完成", value: "", width: 80, click: tick },
  { key: "when", name: "未完成", value: "", width: 80, click: tick },
]

const tBody3: any = [
  { key: 'record', name: '记录', value: "", width: 120, style:{ minHeight: "150px" } },
  { key: 'recordDetail', name: '记录内容', value: "", width: 580, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [1,20,2],
  tableTitle: { value: "月工作重点及周安排", width: 700 },
  tBody:[tBody1,tBody2,tBody3],
  tHead:[tHead1,tHead2,tHead3],
}