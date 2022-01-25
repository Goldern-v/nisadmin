/**
 * 江门妇幼-培训登记表
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
    { name: "学习班名称", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "学习内容", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "学习地点", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "学习时长", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}
 
const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "name", name: "姓名", value: "", width: 100 },
  { key: "title", name: "职称", value: "", width: 100 },
  { key: "className", name: "学习班名称", value: "", width: 150 },
  { key: "content", name: "学习内容", value: "", width: 150 },
  { key: "place", name: "学习地点", value: "", width: 150 },
  { key: "time", name: "学习时长", value: "", width: 100 },
]
 
export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${user.deptName}护理人员院级以上培训登记表`, width: 794 },
  tBody: [tBody],
  tHead: [tHead],
}