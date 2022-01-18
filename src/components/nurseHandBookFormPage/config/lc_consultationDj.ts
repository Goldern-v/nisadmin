/**
 * 聊城二院-护理会诊登记表
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { timePicker } from "../function/click";
let user: any = authStore.user || {};

const tHead = {
  top: [
    { name: "日期/时间", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "患者姓名", colspan: "1", rowspan: "1", style:{ width: 100 } },
    // { name: "病案号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "主要诊断", colspan: "1", rowspan: "1", style:{ width: 200 } },
    // { name: "会诊类型", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "受邀科室", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "会诊人员", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "申请时间", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "会诊时间", colspan: "1", rowspan: "1", style:{ width: 150 } },
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "consultationDate", name: "日期/时间", value: "", width: 150 },
  { key: "consultationObject", name: "患者姓名", value: "", width: 100 },
  // { key: "recordId", name: "病案号", value: "", width: 100 },
  { key: "nursingDiagnosis", name: "主要诊断", value: "", width: 200 },
  // { key: "type", name: "会诊类型", value: "", width: 100 },
  { key: "deptName", name: "受邀科室", value: "", width: 100 },
  { key: "consultationMember", name: "会诊人员", value: "", width: 150 },
  { key: "createTime", name: "申请时间", value: "", width: 150 },
  { key: "consultationTime", name: "会诊时间", value: "", width: 150 },
]

export default {
  noEditor:true,//不可编辑
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${user.deptName}护理会诊登记表`, width: 994 },
  tBody: [tBody],
  tHead: [tHead],
}