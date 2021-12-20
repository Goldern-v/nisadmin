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

const tBody1: any = [
  { key: 'focus', name: '月工作重点', defaultValue: "月工作重点", value: "", width: 120, style:{ minHeight: "200px" } },
  { key: 'focusDetail', name: '月工作重点内容', value: "", width: 576, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]

const firstWeek: any = [
  { key: "time", name: "时间", defaultValue: "第一周", value: "", width: 120 },
  { key: "what", name: "内容", value: "", width: 240,  style:{ textAlign: "left" } },
  { key: "why", name: "责任人", value: "", width: 100 },
  { key: "where", name: "完成", value: "", width: 80, click: tick },
  { key: "who", name: "基本完成", value: "", width: 80, click: tick },
  { key: "when", name: "未完成", value: "", width: 80, click: tick },
]

const secondWeek: any = [
  { key: "time", name: "时间", defaultValue: "第二周", value: "", width: 120 },
  { key: "what", name: "内容", value: "", width: 240,  style:{ textAlign: "left" } },
  { key: "why", name: "责任人", value: "", width: 100 },
  { key: "where", name: "完成", value: "", width: 80, click: tick },
  { key: "who", name: "基本完成", value: "", width: 80, click: tick },
  { key: "when", name: "未完成", value: "", width: 80, click: tick },
]

const thirdWeek: any = [
  { key: "time", name: "时间", defaultValue: "第三周", value: "", width: 120 },
  { key: "what", name: "内容", value: "", width: 240,  style:{ textAlign: "left" } },
  { key: "why", name: "责任人", value: "", width: 100 },
  { key: "where", name: "完成", value: "", width: 80, click: tick },
  { key: "who", name: "基本完成", value: "", width: 80, click: tick },
  { key: "when", name: "未完成", value: "", width: 80, click: tick },
]

const fourthWeek: any = [
  { key: "time", name: "时间", defaultValue: "第四周", value: "", width: 120 },
  { key: "what", name: "内容", value: "", width: 240,  style:{ textAlign: "left" } },
  { key: "why", name: "责任人", value: "", width: 100 },
  { key: "where", name: "完成", value: "", width: 80, click: tick },
  { key: "who", name: "基本完成", value: "", width: 80, click: tick },
  { key: "when", name: "未完成", value: "", width: 80, click: tick },
]

const tBody3: any = [
  { key: 'record1', name: '存在问题', defaultValue: "存在问题", value: "", width: 120, style:{ minHeight: "150px" } },
  { key: 'recordDetail1', name: '存在问题内容', value: "", width: 576, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

const tBody4: any = [
  { key: 'record2', name: '特殊事件记录', defaultValue: "特殊事件记录", value: "", width: 120, style:{ minHeight: "150px" } },
  { key: 'recordDetail2', name: '特殊事件记录内容', value: "", width: 576, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [1,5,5,5,5,1,1],
  tableTitle: { value: "月工作重点及周安排", width: 695 },
  tBody:[tBody1,firstWeek,secondWeek,thirdWeek,fourthWeek,tBody3,tBody4],
  tHead:[tHead1,tHead2],
}