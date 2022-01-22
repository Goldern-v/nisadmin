/**
 * 江门妇幼-论文登记表
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { datePicker } from "../../function/click";
let user: any = authStore.user || {};

const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "论文题目", colspan: "1", rowspan: "1", style:{ width: 250 } },
    { name: "作者", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "作者职称", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "院内交流", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "发表刊物", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "发表日期", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "PaperTopics", name: "论文题目", value: "", width: 250 },
  { key: "author", name: "作者", value: "", width: 100 },
  { key: "title", name: "作者职称", value: "", width: 100 },
  { key: "communication", name: "院内交流", value: "", width: 150 },
  { key: "publications", name: "发表刊物", value: "", width: 150 },
  { key: "time", name: "发表日期", value: "", width: 100, click:datePicker },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年科室论文登记表`, width: 894 },
  tBody: [tBody],
  tHead: [tHead],
}