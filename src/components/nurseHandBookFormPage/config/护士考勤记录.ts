/**
 * 聊城二院-护士考勤记录
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { timePicker } from "../function/click";
let user: any = authStore.user || {};

let attendanceType = ['全勤','正常休假','病假','事假','产假','超假旷工']
const tHead = {
  top: [
    { name: "姓名", colspan: "1", rowspan: "1", style:{ width: 80 } },
    { name: "一月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "二月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "三月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "四月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "五月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "六月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "七月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "八月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "九月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "十月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "十一月", colspan: "2", rowspan: "1", style:{ width: 100 } },
    { name: "十二月", colspan: "2", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
    { name: "考勤类型", colspan: "1", rowspan: "1", style:{ width: 70 } },
    { name: "天数", colspan: "1", rowspan: "1", style:{ width: 30 } },
  ],
  bottom: []
}

const tBody: any = [
  { key: "time", name: "姓名", value: "", width: 80 },
  { key: "place", name: "考勤类型1", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数1", value: "", width: 30 },
  { key: "place", name: "考勤类型2", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数2", value: "", width: 30 },
  { key: "place", name: "考勤类型3", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数3", value: "", width: 30 },
  { key: "place", name: "考勤类型4", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数4", value: "", width: 30 },
  { key: "place", name: "考勤类型5", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数5", value: "", width: 30 },
  { key: "place", name: "考勤类型6", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数6", value: "", width: 30 },
  { key: "place", name: "考勤类型7", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数7", value: "", width: 30 },
  { key: "place", name: "考勤类型8", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数8", value: "", width: 30 },
  { key: "place", name: "考勤类型9", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数9", value: "", width: 30 },
  { key: "place", name: "考勤类型10", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数10", value: "", width: 30 },
  { key: "place", name: "考勤类型11", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数11", value: "", width: 30 },
  { key: "place", name: "考勤类型12", value: "", width: 70, select: attendanceType },
  { key: "host", name: "天数12", value: "", width: 30 },
]

export default {
  defaulLength: [20],
  tableTitle: { value: `护士考勤记录`, width: 1256 },
  tBody: [tBody],
  tHead: [tHead],
  borderMessage: "备注：（除全勤外，均需注明天数）"
}