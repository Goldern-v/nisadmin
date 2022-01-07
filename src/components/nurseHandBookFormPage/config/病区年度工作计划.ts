/**
 * 聊城二院-病区年度工作计划
 */
import moment from "moment";
import { authStore } from 'src/stores'
let user: any = authStore.user || {};

const tBody: any = [
  { key: 'launchPlan', name: '年度工作计划', value: "", width: 700, style:{ textAlign: "left" } },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${user.deptName}年度工作计划`, width: 700 },
  tBody:[tBody],
}