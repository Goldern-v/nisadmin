/**
 * 江门妇幼-科研登记表
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { datePicker } from "../../function/click";
let user: any = authStore.user || {};

const tHead = {
  top: [
  { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
  { name: "科研/QCC/创新题目", colspan: "1", rowspan: "1", style:{ width: 250 } },
  { name: "项目负责人", colspan: "1", rowspan: "1", style:{ width: 100 } },
  { name: "负责人职称", colspan: "1", rowspan: "1", style:{ width: 100 } },
  { name: "立项级别", colspan: "1", rowspan: "1", style:{ width: 150 } },
  { name: "备注", colspan: "1", rowspan: "1", style:{ width: 150 } },
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "PaperTopics", name: "科研/QCC/创新题目", value: "", width: 250 },
  { key: "leader", name: "项目负责人", value: "", width: 100 },
  { key: "title", name: "负责人职称", value: "", width: 100 },
  { key: "level", name: "立项级别", value: "", width: 150 },
  { key: "remark", name: "备注", value: "", width: 150 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年科室科研、QCC、创新项目登记表`, width: 795 },
  tBody: [tBody],
  tHead: [tHead],
}