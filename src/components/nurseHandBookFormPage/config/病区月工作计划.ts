/**
 * 聊城二院-病区月工作计划
 */

import moment from "moment";
import { authStore } from 'src/stores'
let user: any = authStore.user || {};

const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "科室工作内容", colspan: "1", rowspan: "1", style:{ width: 300 } },
    { name: "责任人", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "实施方案", colspan: "1", rowspan: "1", style:{ width: 300 } },
    { name: "完成时间", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "完成情况", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "备注", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "jobContent", name: "科室工作内容", value: "", width: 300 },
  { key: "nurseList", name: "责任人", value: "", width: 100, select:["陶星宇","郑煜标"], multiple:"/", },
  { key: "plan", name: "实施方案", value: "", width: 300 },
  { key: "time", name: "完成时间", value: "", width: 100, timePicker:true },
  { key: "completion", name: "完成情况", value: "", width: 100, select:["已完成","未完成"], },
  { key: "remark", name: "备注", value: "", width: 100 },
]

export default {
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${moment().format('MM')}月${user.deptName}月工作计划`, width: 1044 },
  tBody: [tBody],
  tHead: [tHead],
}