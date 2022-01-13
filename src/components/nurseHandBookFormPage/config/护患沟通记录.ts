/**
 * 聊城二院-护患沟通记录
 */
import moment from "moment";
import { timePicker } from "../function/click";
import { authStore } from 'src/stores'
let user: any = authStore.user || {};


const complexHead: any = {
  boxWidth: 800,
  complexHeadList:[
    { key: 'time', name:'日期/时间', value: "", leftWidth: 100, rightWidth: 300, click: timePicker },
    { key: 'place', name:'地点', value: "", leftWidth: 100, rightWidth: 300, lastChild: true },
    { key: 'join', name:'参加人员', value: "", leftWidth: 100, rightWidth: 300 },
    { key: 'record', name:'记录人', value: "", leftWidth: 100, rightWidth: 300, lastChild: true },
  ]
}

const tHead = {
  top: [],
  mid: [],
  bottom: []
}

const tBody1: any = [
  { key: "content1", name: "内容", value: "主要内容：", width: 800, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]
const tBody2: any = [
  { key: "content2", name: "内容", value: "家属发言：", width: 800, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]
const tBody3: any = [
  { key: "content3", name: "内容", value: "护士长总结：", width: 800, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]


export default {
  hiddenFixHeader: true,
  defaulLength: [1,1,1],
  tableTitle: { value: `${user.deptName}护患沟通记录`, width: 800 },
  complexHead,
  tBody: [tBody1,tBody2,tBody3],
  tHead: [tHead],
}