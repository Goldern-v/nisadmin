/**
 * 聊城二院-护理部培训考核月计划登记
 */
import moment from "moment";

const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "培训考核内容", colspan: "1", rowspan: "1", style:{ width: 400 } },
    { name: "完成时限", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "责任人", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "备注", colspan: "1", rowspan: "1", style:{ width: 100 } },
   
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "plan", name: "培训考核内容", value: "", width: 400 },
  { key: "time", name: "完成时限", value: "", width: 100, timePicker:true },
  { key: "nurseList", name: "责任人", value: "", width: 100 },
  { key: "remark", name: "备注", value: "", width: 100 },
]

export default {
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${moment().format('MM')}月护理部培训考核登记`, width: 746 },
  tBody: [tBody],
  tHead: [tHead],
}