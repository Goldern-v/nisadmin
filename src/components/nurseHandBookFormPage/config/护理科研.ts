/**
 * 聊城二院-护理科研登记表
 */
import moment from "moment";

const tHead = {
  top: [
    { name: "日期", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "类型", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "题目", colspan: "1", rowspan: "1", style:{ width: 400 } },
    { name: "作者", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "完成情况", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "time", name: "日期", value: "", width: 100, timePicker:true },
  { key: "type", name: "类型", value: "", width: 100, select:["课题","专利","论文","著作","创新","新技术新项目","其他"] },
  { key: "title", name: "题目", value: "", width: 400 },
  { key: "author", name: "作者", value: "", width: 150 },
  { key: "completion", name: "完成情况", value: "", width: 100 },
]

export default {
  defaulLength: [20],
  tableTitle: { value: `护理科研登记表`, width: 846 },
  tBody: [tBody],
  tHead: [tHead],
}