/**
 * 江门妇幼-教学登记表
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { datePicker } from "../../function/click";
let user: any = authStore.user || {};

const tHead = {
  top: [
  { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
  { name: "姓名", colspan: "1", rowspan: "1", style:{ width: 100 } },
  { name: "职称", colspan: "1", rowspan: "1", style:{ width: 100 } },
  { name: "授课课题", colspan: "1", rowspan: "1", style:{ width: 300 } },
  { name: "学员人数", colspan: "1", rowspan: "1", style:{ width: 100 } },
  { name: "授课地点", colspan: "1", rowspan: "1", style:{ width: 150 } },
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "name", name: "姓名", value: "", width: 100 },
  { key: "title", name: "职称", value: "", width: 100 },
  { key: "lectureTopics", name: "授课课题", value: "", width: 300 },
  { key: "studentNum", name: "学员人数", value: "", width: 100 },
  { key: "venue", name: "授课地点", value: "", width: 150 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年科室教学登记表`, width: 795 },
  tBody: [tBody],
  tHead: [tHead],
}