/**
 * 聊城二院-护士基本情况登记
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { timePicker } from "../function/click";
let user: any = authStore.user || {};

const tHead = {
  top: [
    { name: "姓名", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "出生年月", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "参加工作时间", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "政治面貌", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "最高学历", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "毕业学校", colspan: "1", rowspan: "1", style:{ width: 200 } },
    { name: "毕业时间", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "技术职称", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "职务", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "调入时间", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "调出时间", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "备注", colspan: "1", rowspan: "1", style:{ width: 100 } },
   
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "time", name: "姓名", value: "", width: 100 },
  { key: "place", name: "出生年月", value: "", width: 100 },
  { key: "host", name: "参加工作时间", value: "", width: 150 },
  { key: "number", name: "政治面貌", value: "", width: 100 },
  { key: "patientName", name: "最高学历", value: "", width: 100 },
  { key: "recordId", name: "毕业学校", value: "", width: 200 },
  { key: "diagnosis", name: "毕业时间", value: "", width: 100 },
  { key: "type", name: "技术职称", value: "", width: 100 },
  { key: "purpose", name: "职务", value: "", width: 100 },
  { key: "solveProblem", name: "调入时间", value: "", width: 100 },
  { key: "solveProblem", name: "调出时间", value: "", width: 100 },
  { key: "solveProblem", name: "备注", value: "", width: 100 },
]

export default {
  defaulLength: [20],
  tableTitle: { value: `护士基本情况登记`, width: 1339 },
  tBody: [tBody],
  tHead: [tHead],
}