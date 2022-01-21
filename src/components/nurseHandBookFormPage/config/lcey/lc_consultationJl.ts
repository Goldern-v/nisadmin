/**
 * 聊城二院-护理会诊单
 */
import moment from "moment";
import { authStore } from 'src/stores'
let user: any = authStore.user || {};


const complexHead: any = {
  boxWidth: 750,
  complexHeadList:[
    { key: 'time', name:'科别', value: "", leftWidth: 100, rightWidth: 150 },
    { key: 'time', name:'床号', value: "", leftWidth: 100, rightWidth: 150 },
    { key: 'place', name:'姓名', value: "", leftWidth: 100, rightWidth: 150, lastChild: true },
    { key: 'time', name:'性别', value: "", leftWidth: 100, rightWidth: 150 },
    { key: 'time', name:'年龄', value: "", leftWidth: 100, rightWidth: 150 },
    { key: 'place', name:'病案号', value: "", leftWidth: 100, rightWidth: 150, lastChild: true },
    { key: 'type', name:'会诊类型', value: "", leftWidth: 100, rightWidth: 650, preIndex: 3, select:['普通会诊','急会诊','多学科会诊'], rightStyle:{ textAlign: "left" }},

  ]
}

const tHead = {
  top: [],
  mid: [],
  bottom: []
}

const tBody1: any = [
  { key: "content1", name: "内容", value: "主要诊断：", width: 750, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]
const tBody2: any = [
  { key: "content2", name: "内容", value: "病情介绍：", width: 750, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]
const tBody3: any = [
  { key: "content3", name: "内容", value: "需会诊的问题：", width: 750, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]
const tBody4: any = [
  { key: "content3", name: "内容", value: "目前的护理措施：", width: 750, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]
const tBody5: any = [
  { key: "content3", name: "内容", value: "受邀请科室：", width: 750, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]
const tBody6: any = [
  { key: "content3", name: "内容", value: "会诊人员签名：", width: 750, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]
const tBody7: any = [
  { key: "content3", name: "内容", value: "会诊意见：", width: 750, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]

const sign = {
  department:{ key: 'department', value:'', width: "50%", preName:"申请科室", /*hidden: true*/ },
  proposer:{ key: 'proposer', value:'', width: "50%", preName:"申请人" },
  applyTime:{ key: 'applyTime', value:'', width: "50%", preName:"申请时间", /*hidden: true*/ },
  consultationTime:{ key: 'consultationTime', value:'', width: "50%", preName:"会诊时间" },
}

export default {
  hiddenFixHeader: true,
  defaulLength: [1,1,1,1,1,1,1],
  tableTitle: { value: `护理会诊单`, width: 750 },
  complexHead,
  tBody: [tBody1,tBody2,tBody3,tBody4,tBody5,tBody6,tBody7],
  tHead: [tHead],
  borderMessage: "注：被普通会诊，在接到通知后24小时内完成；急会诊，在10分钟内完成；多学科会诊，请根据约定时间参加。",
  sign: sign,//签名组件

}