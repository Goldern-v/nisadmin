/**
 * 聊城二院-护理部月工作计划
 */
import moment from "moment";
import { datePicker } from "../function/click";

const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "工作计划", colspan: "1", rowspan: "1", style:{ width: 400 } },
    { name: "完成时限", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "责任人", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "备注", colspan: "1", rowspan: "1", style:{ width: 150 } },
   
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "plan", name: "工作计划", value: "", width: 400 },
  { key: "time", name: "完成时限", value: "", width: 100, click: datePicker },
  { key: "nurseList", name: "责任人", value: "", width: 150 },
  { key: "remark", name: "备注", value: "", width: 150 },
]

export default {
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${moment().format('MM')}月护理部月工作计划`, width: 846 },
  tBody: [tBody],
  tHead: [tHead],
}