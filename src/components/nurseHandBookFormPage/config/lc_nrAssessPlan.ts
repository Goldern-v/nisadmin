/**
 * 聊城二院-护理部培训考核月计划记录
 */
import moment from "moment";
import { timePicker } from "../function/click";

const tHead = {
  top: [
    { name: "时间", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "课时", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "项目", colspan: "2", rowspan: "1", style:{ width: 98 } },
    { name: "具体内容", colspan: "1", rowspan: "1", style:{ width: 200 } },
    { name: "培训/考核对象", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "主讲人/组织者", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "地点", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "备注", colspan: "1", rowspan: "1", style:{ width: 100 } },
   
  ],
  mid: [
    { name: "培训", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "考核", colspan: "1", rowspan: "1", style:{ width: 50 } },
  ],
  bottom: []
}

const tBody: any = [
  { key: "time", name: "时间", value: "", width: 150, click: timePicker },
  { key: "classTime", name: "课时", value: "", width: 50 },
  { key: "train", name: "培训", value: "", width: 50, select:["学习","培训","考试","练习","实操","演练","实践"]},
  { key: "assess", name: "考核", value: "", width: 50 },
  { key: "content", name: "具体内容", value: "", width: 200 },
  { key: "object", name: "培训/考核对象", value: "", width: 100 },
  { key: "organizers", name: "主讲人/组织者", value: "", width: 100 },
  { key: "place", name: "地点", value: "", width: 100 },
  { key: "remark", name: "备注", value: "", width: 100 },
]

export default {
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${moment().format('MM')}月护理部培训考核计划`, width: 892 },
  tBody: [tBody],
  tHead: [tHead],
}