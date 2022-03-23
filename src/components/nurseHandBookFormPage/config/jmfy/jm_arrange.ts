/**
 * 江门妇幼-月工作重点及周安排
 */
import { tick } from "../../function/click"
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
  { key: 'focus', name: '月工作重点', value: "月工作重点", width: 120, style:{ minHeight: "200px" } },
  { key: 'focusDetail', name: '月工作重点内容', value: "", width: 576, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]

const firstWeek: any = [
  { key: "time", name: "时间", value: "第一周", width: 120 },
  { key: "what", name: "内容", value: "", width: 240,  style:{ textAlign: "left" } },
  { key: "why", name: "责任人", value: "", width: 100 },
  { key: "where", name: "完成", value: "", width: 80, click: tick },
  { key: "who", name: "基本完成", value: "", width: 80, click: tick },
  { key: "when", name: "未完成", value: "", width: 80, click: tick },
]

const secondWeek: any = [
  { key: "time", name: "时间", value: "第二周", width: 120 },
  { key: "what", name: "内容", value: "", width: 240,  style:{ textAlign: "left" } },
  { key: "why", name: "责任人", value: "", width: 100 },
  { key: "where", name: "完成", value: "", width: 80, click: tick },
  { key: "who", name: "基本完成", value: "", width: 80, click: tick },
  { key: "when", name: "未完成", value: "", width: 80, click: tick },
]

const thirdWeek: any = [
  { key: "time", name: "时间", value: "第三周", width: 120 },
  { key: "what", name: "内容", value: "", width: 240,  style:{ textAlign: "left" } },
  { key: "why", name: "责任人", value: "", width: 100 },
  { key: "where", name: "完成", value: "", width: 80, click: tick },
  { key: "who", name: "基本完成", value: "", width: 80, click: tick },
  { key: "when", name: "未完成", value: "", width: 80, click: tick },
]

const fourthWeek: any = [
  { key: "time", name: "时间", value: "第四周", width: 120 },
  { key: "what", name: "内容", value: "", width: 240,  style:{ textAlign: "left" } },
  { key: "why", name: "责任人", value: "", width: 100 },
  { key: "where", name: "完成", value: "", width: 80, click: tick },
  { key: "who", name: "基本完成", value: "", width: 80, click: tick },
  { key: "when", name: "未完成", value: "", width: 80, click: tick },
]

const tBody3: any = [
  { key: 'focus', name: '存在问题', value: "存在问题", width: 120, style:{ minHeight: "150px" } },
  { key: 'focusDetail', name: '存在问题内容', value: "", width: 576, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

const tBody4: any = [
  { key: 'focus', name: '特殊事件记录', value: "特殊事件记录", width: 120, style:{ minHeight: "150px" } },
  { key: 'focusDetail', name: '特殊事件记录内容', value: "", width: 576, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [1,1,1,1,1,1,1],
  tableTitle: { value: "月工作重点及周安排", width: 695 },
  tBody:[tBody1,firstWeek,secondWeek,thirdWeek,fourthWeek,tBody3,tBody4],
  tHead:[tHead1,tHead2],
}