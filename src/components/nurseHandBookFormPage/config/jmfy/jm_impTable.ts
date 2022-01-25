/**
 * 江门妇幼-护理人员月度培训实施记录表
 */
import { datePicker } from "../../function/click";
import moment from "moment";
const tHead1 = {
  top: [
    { name: "日期", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "业务学习", colspan: "1", rowspan: "1", style:{ width: 300 } },
    { name: "主持人", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "参加人员", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "应到", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "实到", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}

const tHead2 = {
  top: [
    { name: "日期", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "护理业务查房", colspan: "1", rowspan: "1", style:{ width: 300 } },
    { name: "主持人", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "参加人员", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "应到", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "实到", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}

const tHead3 = {
  top: [
    { name: "日期", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "护理教学查房", colspan: "1", rowspan: "1", style:{ width: 300 } },
    { name: "主持人", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "参加人员", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "应到", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "实到", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}

const tBody1: any = [
  { key: "time", name: "日期", value: "", width: 100, click:datePicker },
  { key: "study", name: "业务学习", value: "", width: 300 },
  { key: "host", name: "主持人", value: "", width: 150 },
  { key: "join", name: "参加人员", value: "", width: 150 },
  { key: "shouldBe", name: "应到", value: "", width: 100 },
  { key: "actuallyRealized", name: "实到", value: "", width: 100 },
]

const tBody2: any = [
  { key: "time", name: "日期", value: "", width: 100, click:datePicker },
  { key: "businessOperation", name: "护理业务查房", value: "", width: 300 },
  { key: "host", name: "主持人", value: "", width: 150 },
  { key: "join", name: "参加人员", value: "", width: 150 },
  { key: "shouldBe", name: "应到", value: "", width: 100 },
  { key: "actuallyRealized", name: "实到", value: "", width: 100 },
]

const tBody3: any = [
  { key: "time", name: "日期", value: "", width: 100, click:datePicker },
  { key: "wardInspection", name: "护理教学查房", value: "", width: 300 },
  { key: "host", name: "主持人", value: "", width: 150 },
  { key: "join", name: "参加人员", value: "", width: 150 },
  { key: "shouldBe", name: "应到", value: "", width: 100 },
  { key: "actuallyRealized", name: "实到", value: "", width: 100 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [10,10,10],
  tableTitle: { value: `${moment().format('YYYY')}年${moment().format('MM')}月护理人员培训实施记录表`, width: 895 },
  tBody:[tBody1,tBody2,tBody3],
  tHead:[tHead1,tHead2,tHead3],
}